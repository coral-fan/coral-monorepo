import { File } from 'nft.storage';
import mime from 'mime';
import fs from 'fs';
import path from 'path';
import { isAddress } from 'ethers/lib/utils';

export const parseProjectName = (projectName: string) =>
  projectName
    .replace(/^\.*\/|\/|\/?[^\/]+\.[a-z]+|\/$/g, '')
    .replaceAll(' ', '-')
    .toLowerCase();

export const fileExists = (filepath: string) => {
  return fs.existsSync(filepath);
};

export const getImagePath = (projectDir: string) => {
  const __dirname = path.resolve();
  return path.resolve(__dirname, 'projects', projectDir, 'image', 'image.png');
};

export const getConfigFilePath = (projectDir: string) => {
  const __dirname = path.resolve();
  return path.resolve(__dirname, 'projects', projectDir, 'config.json');
};

export const getMerchFilePath = (projectDir: string) => {
  const __dirname = path.resolve();
  return path.resolve(__dirname, 'projects', projectDir, 'merch.json');
};

export const fileFromPath = async (filePath: string) => {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  if (type) {
    return new File([content], path.basename(filePath), { type });
  }
};

export const parseAccessGrantingTokenAddresses = (addressesArgument: string) => {
  if (addressesArgument === undefined) {
    return null;
  }

  const accessGrantingTokenAddresses = JSON.parse(addressesArgument);

  if (!Array.isArray(accessGrantingTokenAddresses)) {
    throw 'accessGrantingTokenAddresses must be an array.';
  }

  if (accessGrantingTokenAddresses.some((address) => !isAddress(address))) {
    throw `All elements in accessGrantingTokenAddresses [${accessGrantingTokenAddresses}] must be a valid address.`;
  }

  return accessGrantingTokenAddresses;
};
