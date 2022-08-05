import { subtask, task } from 'hardhat/config';
import { NFTStorage } from 'nft.storage';
import { readFile } from 'fs/promises';
import { fileFromPath, getConfigFilePath, getImagePath } from '../utils/utils';
import { getDeploymentConsts, Network } from '../utils/getDeploymentConsts';

export const upload = subtask('upload', 'Upload metadata via nft.storage')
  .addParam('projectDir', 'The project directory')
  .setAction(async ({ projectDir }, hre) => {
    const network = hre.network.name as Network;

    const { nftStorageKey, avaxUsdPriceFeedAddress } = getDeploymentConsts(network);

    const imagePath = getImagePath(projectDir);
    const configPath = getConfigFilePath(projectDir);
    const image = await fileFromPath(imagePath);

    const projectData = await readFile(configPath, 'utf8');

    const {
      contractName,
      name,
      symbol,
      usdPricePerToken,
      maxSupply,
      maxTokensPerWallet,
      saleStartTime,
      description,
      attributes,
      royaltyFeeRecipient,
      royaltyFeeNumerator,
    } = JSON.parse(projectData).contract;

    if (!image) {
      throw 'Error: Image not found';
    }

    const metadata = { name: name, description: description, attributes: attributes, image };
    console.log(metadata);
    const client = new NFTStorage({ token: nftStorageKey });

    const upload =
      image &&
      (await client.store({
        ...metadata,
      }));

    const constructorArgs = {
      contractName,
      name,
      symbol,
      usdPricePerToken,
      maxSupply,
      maxTokensPerWallet,
      baseTokenURI: '',
      saleStartTime,
      royaltyFeeRecipient,
      royaltyFeeNumerator,
      avaxUsdPriceFeedAddress,
    };

    if (upload) {
      console.log('Upload successful! Metadata URI: ', upload.url);
      constructorArgs.baseTokenURI = upload.url;
      return JSON.stringify(constructorArgs);
    } else {
      throw 'Error: Upload failed!';
    }
  });
