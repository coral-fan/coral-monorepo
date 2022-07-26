import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-gas-reporter';
import 'hardhat-deploy';
import { HardhatUserConfig } from 'hardhat/types';
import { config } from 'dotenv';

// hardhat tasks are imported here
import './tasks';

config();

const hardhatConfig: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: process.env.SNOWTRACE_API_KEY,
  },
  solidity: '0.8.14',
  networks: {
    hardhat: {
      forking: {
        url: process.env.URL_FUJI || '',
      },
    },
    fuji: {
      url: process.env.URL_FUJI || '',
      chainId: 43113,
      accounts: [],
      saveDeployments: true,
    },
    mainnet: {
      url: process.env.URL_MAINNET || '',
      chainId: 43114,
      accounts: [],
      saveDeployments: true,
    },
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    outputFile: 'gas-report.txt',
    noColors: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: 'AVAX',
  },
  paths: {
    sources: 'src',
    tests: 'tests',
  },
  typechain: {
    outDir: 'dist',
    target: 'ethers-v5',
    externalArtifacts: ['external_artifacts/*.json'],
  },
};

export default hardhatConfig;
