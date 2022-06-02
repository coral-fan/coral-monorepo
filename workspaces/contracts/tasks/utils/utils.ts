import { File } from 'nft.storage';
import mime from 'mime';
import fs from 'fs';
import path from 'path';

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

export const fileFromPath = async (filePath: string) => {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  if (type) {
    return new File([content], path.basename(filePath), { type });
  }
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
