import { task } from 'hardhat/config';
import fs from 'fs';
import { readFile } from 'fs/promises';
import { fileExists, getConfigFilePath, parseProjectName } from './utils/utils';

task('run-deploy', 'Creates and Deploys a new Project')
  .addParam('projectName', 'The name of the Project')
  .setAction(async ({ projectName }, hre) => {
    const projectDir = parseProjectName(projectName);
    const configPath = getConfigFilePath(projectDir);

    if (!fileExists(configPath)) {
      throw 'Error: Project does not exist';
    }

    const constructorArgs = await hre.run('upload', { projectDir });

    try {
      const address = await hre.run('deployContract', { constructorArgs });
      const args = JSON.parse(constructorArgs);
      const verifyArgs = JSON.stringify({ address, ...args });

      const projectData = await readFile(configPath, 'utf8');
      const configFile = JSON.parse(projectData);

      configFile.contract.address = address;
      configFile.contract.tokenURI = args.baseTokenURI;
      configFile.contract.avaxUsdPriceFeedAddress = args.avaxUsdPriceFeedAddress;

      fs.writeFileSync(configPath, JSON.stringify(configFile, null, 2), 'utf8');

      console.log('\n Starting verification now...');
      await hre.run('verifyContract', { verifyArgs });

      console.log('\n Adding relay addresses...');
      await hre.run('addRelayAddresses', { address });

      console.log('\n Updating sentinels...');
      const newAddress = address;

      // Don't think you can pass boolean via hardhat, must be string
      await hre.run('updateSentinels', { newAddress });

      await hre.run('addCollection', { projectDir });
    } catch (e: any) {
      console.error(e);
    }
  });
