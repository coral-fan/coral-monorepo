import { getDocumentReferenceServerSide, initializeFirebaseAdmin } from '@coral/firebase';
import { CollectionData } from '@coral/models';
import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import { task } from 'hardhat/config';
import path from 'path';
import { getConfigFilePath, getMerchFilePath } from 'tasks/utils';
import { Network } from './utils/getDeploymentConsts';

task('addMerchOptions', 'Add merch to Firebase')
  .addParam('projectDir', 'The project directory')
  .setAction(async ({ projectDir }, hre) => {
    console.log('\n Adding merch options...');

    const network = hre.network.name as Network;

    const __dirname = path.resolve();
    const envVariablePath =
      network === 'mainnet' ? '/../app/.env.production.local' : '/../app/.env.development.local';

    config({ path: __dirname + envVariablePath });

    await initializeFirebaseAdmin();

    // Get config file
    const configFilePath = getConfigFilePath(projectDir);
    const projectData = await readFile(configFilePath, 'utf8');
    const configFile = JSON.parse(projectData);

    const { contract } = configFile;
    const { address } = contract;

    // Get Merch file
    const merchFilePath = getMerchFilePath(projectDir);
    const merchData = await readFile(merchFilePath, 'utf8');
    const merchFile = JSON.parse(merchData);

    // Check that quantities add up
    const { quantities, subOptions } = merchFile;
    for (let i = 0; i < quantities.length; i++) {
      const total = quantities[i];

      const { type, values, quantities: subOptionQuantities } = subOptions[i];

      if (values.length !== subOptionQuantities.length) {
        throw Error(
          `${type} values (${values.length} items) and quantities (${subOptionQuantities.length} items) do not match`
        );
      }

      const sumQuantities = subOptionQuantities.reduce(
        (total: number, next: number) => total + next,
        0
      );

      if (total !== sumQuantities) {
        throw Error(`${type} quantities does not equal ${total}`);
      }
    }

    const collectionRef = await getDocumentReferenceServerSide<CollectionData>(
      'collections',
      address
    );

    await collectionRef.update({
      merchOptions: merchFile,
    });

    console.log('Merch added to collection!');
  });
