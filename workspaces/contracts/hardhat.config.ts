import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import { HardhatUserConfig } from 'hardhat/types';
import { config } from 'dotenv';

// hardhat tasks are imported here
import './tasks';

config();

const hardhatConfig: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: '0.8.14' }],
  },
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: process.env.SNOWTRACE_API_KEY,
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.URL_FUJI || '',
      },
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      chainId: 31337,
    },
    fuji: {
      url: process.env.URL_FUJI || '',
      chainId: 43113,
      accounts: [],
    },
    mainnet: {
      url: process.env.URL_MAINNET || '',
      chainId: 43114,
      accounts: [],
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
