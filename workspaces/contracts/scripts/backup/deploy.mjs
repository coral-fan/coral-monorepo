import hre from 'hardhat';

/*
Update constructorArgs import directory
*/
import constructorArgs from '../../projects/coral-test-v4/config.json' assert { type: 'json' };

async function main() {
  const {
    contractName,
    name,
    symbol,
    usdPricePerToken,
    maxSupply,
    maxTokensPerWallet,
    baseTokenURI,
  } = constructorArgs;

  // Get contract that we want to deploy
  const contractFactory = await hre.ethers.getContractFactory(contractName);

  // Deploy contract with the correct constructor arguments
  const contract = await contractFactory.deploy(
    name,
    symbol,
    usdPricePerToken,
    maxSupply,
    maxTokensPerWallet,
    baseTokenURI
  );

  // Wait for this transaction to be mined
  await contract.deployed();

  // Get contract address
  console.log('Contract deployed to:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
