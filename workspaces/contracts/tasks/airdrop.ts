import { task } from 'hardhat/config';
import { Contract, ContractFactory } from 'ethers';
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers';
import { getDeploymentConsts, Network } from './utils/getDeploymentConsts';

import { fileExists, getConfigFilePath, parseProjectName } from './utils/utils';
import { readFile } from 'fs/promises';
import path from 'path';

import { parseCsv } from './utils/parseCsv';

// Helper function that groups together addresses for rounds of airdrops
const getAirdropRounds = (addresses: string[], maxAddressesPerRound: number) => {
  const rounds = [];
  for (let i = 0; i < addresses.length; i += maxAddressesPerRound) {
    const currentRound = addresses.slice(i, i + maxAddressesPerRound);
    rounds.push(currentRound);
  }
  return rounds;
};

task('execute-airdrop', 'Execute airdrop mint')
  .addParam('project', 'Coral NFT Project being airdropped')
  .addParam('recipient', 'Name of directory in airdrops/project with airdrop file')
  .setAction(async ({ project, recipient }, hre) => {
    const { ethers } = hre;
    const network = hre.network.name as Network;

    const { contractName, deployerRelayApiKey, deployerRelaySecretKey } =
      getDeploymentConsts(network) || {};

    const projectDir = parseProjectName(project);
    const configPath = getConfigFilePath(projectDir);

    if (!fileExists(configPath)) {
      throw 'Error: Project does not exist';
    }

    const projectData = await readFile(configPath, 'utf8');
    const configFile = JSON.parse(projectData);

    const contractAddress = configFile.contract.address;

    if (!contractAddress) {
      throw 'Contract address not found';
    }

    if (!contractName) {
      throw 'Contract name not found';
    }

    if (!deployerRelayApiKey || !deployerRelaySecretKey) {
      throw 'Deployer Relay keys not found';
    }

    const relayerCredentials = {
      apiKey: deployerRelayApiKey,
      apiSecret: deployerRelaySecretKey,
    };

    const __dirname = path.resolve();
    const airdropFile = path.resolve(__dirname, 'airdrops', projectDir, recipient, 'airdrop.csv');
    console.log(airdropFile);

    console.log('Parsing CSV...');
    console.log('');
    const addresses = await parseCsv(airdropFile);

    if (!Array.isArray(addresses)) {
      throw 'CSV Parser did not return array';
    }

    try {
      const provider = new DefenderRelayProvider(relayerCredentials);
      const signer = new DefenderRelaySigner(relayerCredentials, provider, { speed: 'fast' });

      const contractFactory: ContractFactory = await ethers.getContractFactory(contractName);
      const contract = new Contract(contractAddress, contractFactory.interface, signer);

      console.log('Starting airdrop...');
      console.log('');

      const addressGroups = getAirdropRounds(addresses, 4);

      for (let i = 0; i < addressGroups.length; i++) {
        console.log(`Airdropping group ${i + 1} of ${addressGroups.length}...`);
        console.log('');
        const txn = await contract.airdropMint(addressGroups[i]);
        const receipt = await txn.wait();
        if (receipt.status === 1) {
          console.log(`Airdrop Round ${i + 1} of ${addressGroups.length} successful`);
        }
      }
    } catch (e: any) {
      console.error(`ERROR: ${e}`);
    }
  });
