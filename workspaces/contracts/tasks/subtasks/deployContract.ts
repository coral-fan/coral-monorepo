import { subtask } from 'hardhat/config';
import { types } from 'hardhat/config';
import { Contract, ContractFactory } from 'ethers';
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers';
import { getDeploymentConsts, Network } from '../utils/getDeploymentConsts';
import { getErrorMessage } from '@coral/utils';

subtask('deployContract', 'Deploy contract')
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

    console.log('\n Deploying contract....');

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

      console.log('\n Waiting for confirmation....');
      // Wait 6 blocks for confirmation
      const txnReceipt = await contract.deployTransaction.wait(6);

      console.log('\n Contract deployed to: ', contract.address);

      return { network, txnReceipt };
    } catch (e: any) {
      console.error(`ERROR: ${getErrorMessage(e)}`);
      console.error(`ERROR: ${e.message}`);
    }
  });
