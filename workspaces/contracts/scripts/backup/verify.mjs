import hre from 'hardhat';
/*
Update import directory
*/
import constructorArgs from '../projects/coral-test-0601/config.json' assert { type: 'json' };

const CONTRACT_ADDRESS = '0x189348c6c4EB8Ff9a56521fA61d8D0B959eFCf28';

const { contract } = constructorArgs;
const { name, symbol, usdPricePerToken, maxSupply, maxTokensPerWallet, baseTokenURI } = contract;
console.log(contract);

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
