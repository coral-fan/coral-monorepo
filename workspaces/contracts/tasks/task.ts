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
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers';
import { getDeploymentConsts, Network } from './utils/getDeploymentConsts';

import { config } from 'dotenv';
config();

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

    // Don't think you can pass boolean via hardhat, must be string
    const isInPerson = configFile.collectionData.isInPerson.toString();
    await hre.run('update-sentinels', { newAddress, isInPerson });
  });

subtask('upload', 'Upload metadata via nft.storage')
  .addParam('projectDir', 'The project directory')
  .setAction(async ({ projectDir }, hre) => {
    const network = hre.network.name as Network;

    const { nftStorageKey, avaxUsdPriceFeedAddress } = getDeploymentConsts(network);

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
    const client = new NFTStorage({ token: nftStorageKey });

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
      avaxUsdPriceFeedAddress,
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
    const { ethers } = hre;
    const network = hre.network.name as Network;

    const { contractName, deployerRelayApiKey, deployerRelaySecretKey, avaxUsdPriceFeedAddress } =
      getDeploymentConsts(network);

    const args = JSON.parse(constructorArgs);
    console.log('Constructor Args: ', args);

    const relayerCredentials = {
      apiKey: deployerRelayApiKey,
      apiSecret: deployerRelaySecretKey,
    };

    const provider = new DefenderRelayProvider(relayerCredentials);
    const signer = new DefenderRelaySigner(relayerCredentials, provider, { speed: 'fastest' });

    const contractFactory: ContractFactory = await ethers.getContractFactory(contractName, signer);

    try {
      const contract: Contract = await contractFactory.deploy(
        args.name,
        args.symbol,
        args.usdPricePerToken,
        args.maxSupply,
        args.maxTokensPerWallet,
        args.baseTokenURI,
        args.saleStartTime,
        args.royaltyFeeRecipient,
        args.royaltyFeeNumerator,
        avaxUsdPriceFeedAddress
      );

      await contract.deployed();

      console.log('Contract deployed to: ', contract.address);

      return contract.address;
    } catch (e: any) {
      console.error(`ERROR: ${e}`);
    }
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
      avaxUsdPriceFeedAddress,
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
          avaxUsdPriceFeedAddress,
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
  .setAction(async ({ address }, hre) => {
    const { ethers } = hre;
    const network = hre.network.name as Network;

    const { contractName, deployerRelayApiKey, deployerRelaySecretKey, paymentRelayAddresses } =
      getDeploymentConsts(network);

    const relayerCredentials = {
      apiKey: deployerRelayApiKey,
      apiSecret: deployerRelaySecretKey,
    };

    const provider = new DefenderRelayProvider(relayerCredentials);
    const signer = new DefenderRelaySigner(relayerCredentials, provider, { speed: 'fastest' });

    const contractFactory: ContractFactory = await ethers.getContractFactory(contractName);
    const contract = new Contract(address, contractFactory.interface, signer);

    for (let i = 0; i < paymentRelayAddresses.length; i++) {
      const txn = await contract.addRelayAddr(paymentRelayAddresses[i]);
      const receipt = await txn.wait();
      if (receipt.status === 1) {
        console.log(`Relay Address: ${paymentRelayAddresses[i]} added...`);
      } else {
        console.log(`Relay Address not added!`);
      }
    }
  });

task('update-sentinels', 'Update Sentinels')
  .addParam('newAddress', 'Deployed contract Address')
  .addParam('isInPerson', 'isInPerson flag')
  .setAction(async ({ newAddress, isInPerson }, hre) => {
    const network = hre.network.name as Network;

    const { defenderTeamApiKey, defenderTeamSecretKey, sentinelIds } = getDeploymentConsts(network);

    const sentinelClient = new SentinelClient({
      apiKey: defenderTeamApiKey,
      apiSecret: defenderTeamSecretKey,
    });

    // Don't think you can pass boolean via hardhat, must be string
    // If not in person, do not need to update in person transfer sentinel
    const filteredSentinelIds =
      isInPerson === 'true'
        ? sentinelIds && Object.values(sentinelIds)
        : sentinelIds && [sentinelIds.relayMint, sentinelIds.transfer];

    if (!filteredSentinelIds) {
      throw 'Sentinel Ids not found';
    }

    for (let i = 0; i < filteredSentinelIds.length; i++) {
      const sentinelId = filteredSentinelIds[i];

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
