import { NFTStorage, File } from 'nft.storage';
import mime from 'mime';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

config();

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_API_KEY;

if (!NFT_STORAGE_KEY) {
  throw 'Please set NFT_STORAGE_KEY in a .env file in this directory';
}

async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  return new File([content], path.basename(filePath), { type });
}

async function storeNFT(imagePath, name, description) {
  const image = await fileFromPath(imagePath);

  // Create a new NFTStorage client
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

  return nftstorage.store({
    image,
    name,
    description,
  });
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 3) {
    console.error(`usage: ${process.argv[0]} ${process.argv[1]} <image-path> <name> <description>`);
    process.exit(1);
  }

  const [imagePath, name, description] = args;
  const result = await storeNFT(imagePath, name, description);
  console.log(result);
}

// Don't forget to actually call the main function!
// We can't `await` things at the top level, so this adds
// a .catch() to grab any errors and print them to the console.
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
