import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-gas-reporter';
import { HardhatUserConfig } from 'hardhat/types';
import { config } from 'dotenv';

// hardhat tasks are imported here
import './tasks';

config();

const { SNOWTRACE_API_KEY } = process.env;

const hardhatConfig: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: SNOWTRACE_API_KEY,
  },
  solidity: '0.8.14',
  networks: {
    hardhat: {
      forking: {
        url: 'https://api.avax.network/ext/bc/C/rpc',
      },
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      accounts: [],
    },
    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      chainId: 43114,
      accounts: [],
    },
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
