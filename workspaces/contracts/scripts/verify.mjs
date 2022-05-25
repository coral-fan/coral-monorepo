import hre from 'hardhat';
/*
Update import directory
*/
import constructorArgs from '../projects/coral-test-v4/config.json' assert { type: 'json' };

const CONTRACT_ADDRESS = '0xd3aC73861B6f5d6A5Bb9A09bA3C558637246187A';

const { name, symbol, usdPricePerToken, maxSupply, maxTokensPerWallet, baseTokenURI } =
  constructorArgs;

async function main() {
  await hre.run('verify:verify', {
    address: CONTRACT_ADDRESS,
    constructorArguments: [
      name,
      symbol,
      usdPricePerToken,
      maxSupply,
      maxTokensPerWallet,
      baseTokenURI,
    ],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
