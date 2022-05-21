import hre from 'hardhat';

// Define the NFT
const baseURI = 'ipfs://bafyreibbhcuoijlbwmxbuq6neafvmodzbgqoxdday62cdmks6rek35yuna/metadata.json';

async function main() {
  await hre.run('verify:verify', {
    address: '0x99321B52A696167E0ed571dAFdb79FBd934E965a',
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
