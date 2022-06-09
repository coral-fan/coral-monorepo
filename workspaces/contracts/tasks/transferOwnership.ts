import { task } from 'hardhat/config';
import { Contract, ContractFactory } from 'ethers';
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers';

const DEPLOYER_RELAY_API_KEY = process.env.DEPLOYER_RELAY_API_KEY;
const DEPLOYER_RELAY_SECRET_KEY = process.env.DEPLOYER_RELAY_SECRET_KEY;

// TODO: Update with New Multi-Sig Address
const APPROVED_MUTLI_SIG_ADDRESSES = process.env.APPROVED_MULTI_SIG_ADDRESSES;
const NEW_OWNER_ADDRESS = process.env.MULTI_SIG_ADDRESS;

task('transfer-ownership', 'Set Relay Addresses')
  .addParam('contractAddress', 'Multisig Contract Address')
  .setAction(async ({ contractAddress }, { ethers }) => {
    if (!DEPLOYER_RELAY_API_KEY || !DEPLOYER_RELAY_SECRET_KEY) {
      throw 'Deployer Relay keys not found';
    }

    const relayerCredentials = {
      apiKey: DEPLOYER_RELAY_API_KEY,
      apiSecret: DEPLOYER_RELAY_SECRET_KEY,
    };

    if (!NEW_OWNER_ADDRESS || !APPROVED_MUTLI_SIG_ADDRESSES) {
      throw 'Addresses not found';
    }

    if (!APPROVED_MUTLI_SIG_ADDRESSES.split(',').includes(NEW_OWNER_ADDRESS)) {
      throw `${NEW_OWNER_ADDRESS} is not an approved address!`;
    }

    try {
      const provider = new DefenderRelayProvider(relayerCredentials);
      const signer = new DefenderRelaySigner(relayerCredentials, provider, { speed: 'fast' });

      const contractFactory: ContractFactory = await ethers.getContractFactory('CoralNftV1');
      const contract = new Contract(contractAddress, contractFactory.interface, signer);

      console.log(`Transferring ownership of ${contractAddress} to ${NEW_OWNER_ADDRESS}....`);

      const txn = await contract.transferOwnership(NEW_OWNER_ADDRESS);
      const receipt = await txn.wait();

      if (receipt.status === 1) {
        console.log(
          `Ownership of ${contractAddress} successfully transferred to ${NEW_OWNER_ADDRESS}`
        );
      }
    } catch (e: any) {
      console.error(`ERROR: ${e.error.reason}`);
    }
  });
