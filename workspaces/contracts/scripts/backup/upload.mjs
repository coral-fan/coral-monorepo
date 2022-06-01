import { NFTStorage, File } from 'nft.storage';
import mime from 'mime';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

/*
  Pull in proper metadata file here (make sure you pull from correct directory)
*/
import { metadata } from '../projects/coral-test-v4/metadata/metadata.mjs';

config();

/*
  Set proper imagePath here (make sure you pull from correct directory)
*/
const imagePath =
  '/Users/0xmaks/Dev/Coral/coral-monorepo/workspaces/contracts/projects/coral-test-v4/image/image.png';

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_API_KEY;

if (!NFT_STORAGE_KEY) {
  throw 'Please set NFT_STORAGE_KEY in a .env file in this directory';
}

const fileFromPath = async (filePath) => {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  return new File([content], path.basename(filePath), { type });
};

const main = async () => {
  const image = await fileFromPath(imagePath);

  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
  console.log({ image, ...metadata });

  const upload = await nftstorage.store({
    image,
    ...metadata,
  });

  console.log('Metadata URI: ', upload.url);

  return upload;
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
