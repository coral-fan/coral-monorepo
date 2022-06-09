import { task } from 'hardhat/config';
import { Contract, ContractFactory } from 'ethers';

const PRIVATE_KEY = process.env.FUJI_TESTNET_PRIVATE_KEY;

// TODO: Update with Multi-Sig Address
// Should this be an env variable?
const APPROVED_NEW_OWNER_ADDRESSES = [
  '0x91BB59085E5aCc4dC6b515cf84F3be0Afc9d5a6c',
  '0x2208BBb8dE9c16C7e18a03C93BFd893137552241',
  '0xA34D4367Bd647B996b1e2A790073e9022fa73De8',
];

/*
Populate correct values here before transferring ownership
*/
const CONTRACT_ADDRESS = '0x7f9804c220DCA83C0c0cB1c04d942Ffe2fdBEbF5';
const NEW_OWNER_ADDRESS = '0xA34D4367Bd647B996b1e2A790073e9022fa73De8';

task('transfer-ownership', 'Set Relay Addresses', async (_, { ethers }) => {
  if (!PRIVATE_KEY) {
    throw 'Private key not found';
  }

  if (!APPROVED_NEW_OWNER_ADDRESSES.includes(NEW_OWNER_ADDRESS)) {
    throw `${NEW_OWNER_ADDRESS} is not an approved address!`;
  }

  const provider = ethers.provider;
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  const contractFactory: ContractFactory = await ethers.getContractFactory('CoralNftV1');
  const contract = new Contract(CONTRACT_ADDRESS, contractFactory.interface, signer);

  console.log(`Transferring ownership of ${CONTRACT_ADDRESS} to ${NEW_OWNER_ADDRESS}....`);

  const txn = await contract.transferOwnership(NEW_OWNER_ADDRESS);
  const receipt = await txn.wait();

  if (receipt.status === 1) {
    console.log(`Ownership of ${CONTRACT_ADDRESS} transferred to: ${NEW_OWNER_ADDRESS}`);
  } else {
    console.log(`Error, ownership not transferred`);
  }
});
