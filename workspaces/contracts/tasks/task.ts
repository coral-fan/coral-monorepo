import { subtask, task } from 'hardhat/config';
import { NFTStorage } from 'nft.storage';
import fs from 'fs';
import { readFile } from 'fs/promises';
import { types } from 'hardhat/config';
import {
  fileExists,
  fileFromPath,
  getConfigFilePath,
  getImagePath,
  parseProjectName,
  sleep,
} from './utils/utils';
import { Contract, ContractFactory } from 'ethers';
import { SentinelClient } from 'defender-sentinel-client';
import type { CreateBlockSubscriberResponse } from 'defender-sentinel-client/lib/models/subscriber';
import { config } from 'dotenv';

config();

const DEFENDER_TEAM_API_KEY = process.env.DEFENDER_TEAM_API_KEY;
const DEFENDER_TEAM_SECRET_KEY = process.env.DEFENDER_TEAM_SECRET_KEY;
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_API_KEY;
const PK = process.env.FUJI_TESTNET_PRIVATE_KEY;

const RELAY_ADDRESSES = ['0x070a9c67173b6fef04802caff90388fa3edfec81'];
const SENTINEL_IDS = [
  '7b0b2398-31d7-4c93-a560-efb85e541ce4',
  'b89eefbf-5f44-466c-9c7f-fe9251db0f6a',
  'f4302190-7921-4b82-89c9-bab6423c0c88',
];

// TODO: Separate tasks and subtasks in more modular way (different files and directories)
task('create-and-deploy', 'Creates and Deploys a new Project')
  .addParam('project', 'The name of the Project')
  .setAction(async ({ project }, hre) => {
    const projectDir = parseProjectName(project);
    const configPath = getConfigFilePath(projectDir);

    if (!fileExists(configPath)) {
      throw 'Error: Project does not exist';
    }

    const constructorArgs = await hre.run('upload', { projectDir });
    const address = await hre.run('deploy-contract', { constructorArgs });

    const args = JSON.parse(constructorArgs);
    const verifyArgs = JSON.stringify({ address, ...args });

    const projectData = await readFile(configPath, 'utf8');
    const configFile = JSON.parse(projectData);

    configFile.contract.address = address;
    configFile.contract.tokenURI = args.baseTokenURI;

    fs.writeFileSync(configPath, JSON.stringify(configFile, null, 2), 'utf8');

    console.log(' ');
    console.log('Verifying contract - please wait 15 seconds....');

    // TODO: Poll for contract state rater than waiting set amount of time
    // Wait 15 seconds to verify
    await sleep(15000);
    console.log('Starting verification now...');

    await hre.run('verify-contract', { verifyArgs });

    console.log('Adding relay addresses...');

    await hre.run('add-relay-addresses', { address });

    console.log('Updating sentinels...');

    const newAddress = address;

    await hre.run('update-sentinels', { newAddress });
  });

subtask('upload', 'Upload metadata via nft.storage')
  .addParam('projectDir', 'The project directory')
  .setAction(async ({ projectDir }) => {
    if (!NFT_STORAGE_KEY) {
      throw 'Please set NFT_STORAGE_KEY in a .env file in this directory';
    }
    const imagePath = getImagePath(projectDir);
    const configPath = getConfigFilePath(projectDir);
    const image = await fileFromPath(imagePath);

    const projectData = await readFile(configPath, 'utf8');

    const {
      contractName,
      name,
      symbol,
      usdPricePerToken,
      maxSupply,
      maxTokensPerWallet,
      saleStartTime,
      description,
      attributes,
      royaltyFeeRecipient,
      royaltyFeeNumerator,
    } = JSON.parse(projectData).contract;

    if (!image) {
      throw 'Error: Image not found';
    }

    const metadata = { name: name, description: description, attributes: attributes, image };
    console.log(metadata);
    const client = new NFTStorage({ token: NFT_STORAGE_KEY });

    const upload =
      image &&
      (await client.store({
        ...metadata,
      }));

    const constructorArgs = {
      contractName,
      name,
      symbol,
      usdPricePerToken,
      maxSupply,
      maxTokensPerWallet,
      baseTokenURI: '',
      saleStartTime,
      royaltyFeeRecipient,
      royaltyFeeNumerator,
    };

    if (upload) {
      console.log('Upload successful! Metadata URI: ', upload.url);
      constructorArgs.baseTokenURI = upload.url;
      return JSON.stringify(constructorArgs);
    } else {
      throw 'Error: Upload failed!';
    }
  });

subtask('deploy-contract', 'Deploy contract')
  .addParam('constructorArgs', 'Contract constructor arguments', {}, types.json)
  .setAction(async ({ constructorArgs }, hre) => {
    const args = JSON.parse(constructorArgs);
    console.log(args);

    // Passing Coral in directly as contract name because otherwise
    // hre.ethers was pulling in the Chainlink ABI (?)
    const contractFactory: ContractFactory = await hre.ethers.getContractFactory('CoralNftV1');

    const contract: Contract = await contractFactory.deploy(
      args.name,
      args.symbol,
      args.usdPricePerToken,
      args.maxSupply,
      args.maxTokensPerWallet,
      args.baseTokenURI,
      args.saleStartTime,
      args.royaltyFeeRecipient,
      args.royaltyFeeNumerator
    );

    await contract.deployed();

    console.log('Contract deployed to: ', contract.address);

    return contract.address;
  });

subtask('verify-contract', 'Verify contract')
  .addParam('verifyArgs', 'Arguments supplied to the verify script', {}, types.json)
  .setAction(async ({ verifyArgs }, hre) => {
    const {
      address,
      name,
      symbol,
      usdPricePerToken,
      maxSupply,
      maxTokensPerWallet,
      baseTokenURI,
      saleStartTime,
      royaltyFeeRecipient,
      royaltyFeeNumerator,
    } = JSON.parse(verifyArgs);

    try {
      await hre.run('verify:verify', {
        address,
        constructorArguments: [
          name,
          symbol,
          usdPricePerToken,
          maxSupply,
          maxTokensPerWallet,
          baseTokenURI,
          saleStartTime,
          royaltyFeeRecipient,
          royaltyFeeNumerator,
        ],
      });
    } catch (e: any) {
      if (e.message.includes('Reason: Already Verified')) {
        console.log('Contract is already verified!');
      } else {
        console.log(e.message);
      }
    }
  });

subtask('add-relay-addresses', 'Set Relay Addresses')
  .addParam('address', 'Deployed contract Address')
  .setAction(async ({ address }, { ethers }) => {
    if (!PK) {
      throw 'Private Key Missing';
    }

    const provider = ethers.provider;
    const signer = new ethers.Wallet(PK, provider);

    const contractFactory: ContractFactory = await ethers.getContractFactory('CoralNftV1');
    const contract = new Contract(address, contractFactory.interface, signer);

    for (let i = 0; i < RELAY_ADDRESSES.length; i++) {
      const txn = await contract.addRelayAddr(RELAY_ADDRESSES[i]);
      const receipt = await txn.wait();
      if (receipt.status === 1) {
        console.log(`Relay Address: ${RELAY_ADDRESSES[i]} added...`);
      } else {
        console.log(`Relay Address not added!`);
      }
    }
  });

subtask('update-sentinels', 'Update Sentinels')
  .addParam('newAddress', 'Deployed contract Address')
  .setAction(async ({ newAddress }) => {
    if (!DEFENDER_TEAM_API_KEY || !DEFENDER_TEAM_SECRET_KEY) {
      throw 'Defender API Keys Missing';
    }

    const sentinelClient = new SentinelClient({
      apiKey: DEFENDER_TEAM_API_KEY,
      apiSecret: DEFENDER_TEAM_SECRET_KEY,
    });

    for (let i = 0; i < SENTINEL_IDS.length; i++) {
      const sentinelId = SENTINEL_IDS[i];

      const sentinelResponse = await sentinelClient.get(sentinelId);
      const createBlockSubscriberResponse = sentinelResponse as CreateBlockSubscriberResponse;

      if (createBlockSubscriberResponse.addressRules === undefined) {
        throw 'sentinelResponse does not match interface for CreateBlockSubscriberResponse';
      }

      const addressesByRule = createBlockSubscriberResponse.addressRules.map(
        (rule) => rule.addresses
      );

      // Assumes single rule
      // TODO: Research Sentinel rules
      const addresses = addressesByRule[0];

      addresses.push(newAddress);

      // Ensure unique addresses
      const addressesSet = new Set(addresses);
      const uniqueAddresses = [...addressesSet];

      await sentinelClient.update(sentinelId, { type: 'BLOCK', addresses: uniqueAddresses });
      console.log(`Added ${newAddress} to ${sentinelResponse.name}`);
    }
  });
