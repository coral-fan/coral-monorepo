import hre from 'hardhat';

// Define the NFT

async function main() {
  await hre.run('verify:verify', {
    address: '0xd2500179117ac7faa3706080Be799bfcd4d31794',
    constructorArguments: [
      'Coral Test 0524',
      'CT24',
      25,
      50,
      2,
      'ipfs://bafyreihkbouhmgy7gp6ijixpputnzbip2fkqez2k7v6laon72f3u3rebdu/metadata.json',
    ],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
