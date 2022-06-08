import { subtask, task } from 'hardhat/config';
import { NFTStorage } from 'nft.storage';
import fs from 'fs';
import { readFile } from 'fs/promises';
import { config } from 'dotenv';
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

config();

if (!process.env.FUJI_TESTNET_PRIVATE_KEY) {
  throw Error(`Missing environment variable: FUJI_TESTNET_PRIVATE_KEY`);
}

if (!process.env.DEFENDER_API_KEY) {
  throw Error(`Missing environment variable: DEFENDER_API_KEY`);
}

if (!process.env.DEFENDER_SECRET_KEY) {
  throw Error(`Missing environment variable: DEFENDER_SECRET_KEY`);
}

const DEFENDER_API_KEY = process.env.DEFENDER_API_KEY;
const DEFENDER_SECRET_KEY = process.env.DEFENDER_SECRET_KEY;
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_API_KEY;
const PK = process.env.FUJI_TESTNET_PRIVATE_KEY;
const RELAY_ADDRESSES = ['0x070a9c67173b6fef04802caff90388fa3edfec81'];

const sentinelClient = new SentinelClient({
  apiKey: DEFENDER_API_KEY,
  apiSecret: DEFENDER_SECRET_KEY,
});

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
    const provider = ethers.provider;
    const signer = new ethers.Wallet(PK, provider);

    const contractFactory: ContractFactory = await ethers.getContractFactory('CoralNftV1');
    const contract = new ethers.Contract(address, contractFactory.interface, signer);

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

task('update-sentinels', 'Update Sentinels', async () => {
  const sentinelResponse = await sentinelClient.get('f4302190-7921-4b82-89c9-bab6423c0c88');
  console.log(sentinelResponse);
  console.log(sentinelResponse.addressRules.map((rule) => rule.addresses.join(',')));
});
