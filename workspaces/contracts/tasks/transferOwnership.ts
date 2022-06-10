import { task } from 'hardhat/config';
import { Contract, ContractFactory } from 'ethers';
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers';
import { getDeploymentConsts, Network } from './utils/getDeploymentConsts';
import { CoralNftV1__factory } from 'contracts/dist';

/*
Multi-Sig that ownership will be transferred to.
*/
const NEW_OWNER_ADDRESS = process.env.MULTI_SIG_ADDRESS;

/*
List of approved Multi-Sig addresses acts as additional check.
*/
const APPROVED_MUTLI_SIG_ADDRESSES = process.env.APPROVED_MULTI_SIG_ADDRESSES;

task('transfer-ownership', 'Transfer contract ownership to Multi-Sig')
  .addParam('contractAddress', 'NFT Contract Address with ownership being transferred')
  .setAction(async ({ contractAddress }, hre) => {
    const network = hre.network.name as Network;

    const { contractName, deployerRelayApiKey, deployerRelaySecretKey } =
      getDeploymentConsts(network) || {};

    if (!contractName) {
      throw 'Contract name not found';
    }

    if (!deployerRelayApiKey || !deployerRelaySecretKey) {
      throw 'Deployer Relay keys not found';
    }

    if (!NEW_OWNER_ADDRESS || !APPROVED_MUTLI_SIG_ADDRESSES) {
      throw 'Addresses not found';
    }

    if (!APPROVED_MUTLI_SIG_ADDRESSES.split(',').includes(NEW_OWNER_ADDRESS)) {
      throw `${NEW_OWNER_ADDRESS} is not an approved address!`;
    }

    const relayerCredentials = {
      apiKey: deployerRelayApiKey,
      apiSecret: deployerRelaySecretKey,
    };

    try {
      const provider = new DefenderRelayProvider(relayerCredentials);
      const signer = new DefenderRelaySigner(relayerCredentials, provider, { speed: 'fast' });

      const contract = CoralNftV1__factory.connect(contractAddress, signer);

      console.log(`Transferring ownership of ${contractAddress} to ${NEW_OWNER_ADDRESS}....`);

      const txn = await contract.transferOwnership(NEW_OWNER_ADDRESS);
      const receipt = await txn.wait();

      if (receipt.status === 1) {
        console.log(
          `Ownership of ${contractAddress} successfully transferred to ${NEW_OWNER_ADDRESS}`
        );
      }
    } catch (e: any) {
      console.error(`ERROR: ${e}`);
    }
  });
