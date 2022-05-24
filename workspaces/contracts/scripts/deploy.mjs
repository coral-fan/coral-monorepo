import hre from 'hardhat';

const constructorArgs = {
  name: 'Coral Test 0524',
  symbol: 'CT24',
  usdPricePerToken: 25,
  maxSupply: 50,
  maxTokensPerWallet: 2,
  baseTokenURI: 'ipfs://bafyreihkbouhmgy7gp6ijixpputnzbip2fkqez2k7v6laon72f3u3rebdu/metadata.json',
};

async function main() {
  // Get contract that we want to deploy
  const contractFactory = await hre.ethers.getContractFactory('Coral');

  const { name, symbol, usdPricePerToken, maxSupply, maxTokensPerWallet, baseTokenURI } =
    constructorArgs;

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
