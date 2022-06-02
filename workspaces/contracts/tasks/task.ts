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
  parseCollectionName,
  sleep,
} from './utils/utils';

config();

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_API_KEY;

// TODO: Separate tasks and subtasks in more modular way (different files and directories)
task('create-and-deploy', 'Creates and Deploys a new Project')
  .addParam('project', 'The name of the Project')
  .setAction(async ({ project }, hre) => {
    const projectDir = parseCollectionName(project);
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
      description,
      attributes,
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
    const contractFactory = await hre.ethers.getContractFactory('CoralNftV1');

    console.log('Contract Factory: ', contractFactory);

    const contract = await contractFactory.deploy(
      args.name,
      args.symbol,
      args.usdPricePerToken,
      args.maxSupply,
      args.maxTokensPerWallet,
      args.baseTokenURI
    );

    await contract.deployed();

    console.log('Contract deployed to: ', contract.address);

    return contract.address;
  });

subtask('verify-contract', 'Verify contract')
  .addParam('verifyArgs', 'Arguments supplied to the verify script', {}, types.json)
  .setAction(async ({ verifyArgs }, hre) => {
    const { address, name, symbol, usdPricePerToken, maxSupply, maxTokensPerWallet, baseTokenURI } =
      JSON.parse(verifyArgs);

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
