import { subtask } from 'hardhat/config';
import { Contract, ContractFactory } from 'ethers';
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers';
import { getDeploymentConsts, Network } from '../utils/getDeploymentConsts';

subtask('addRelayAddresses', 'Set Relay Addresses')
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
