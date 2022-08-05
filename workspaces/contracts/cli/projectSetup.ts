import fs from 'fs';
import path from 'path';
import readline from 'readline';

import { config } from 'dotenv';
config();

if (process.argv.length != 3) {
  throw Error('Please add project name as a parameter');
}

const projectName = process.argv[2];

const dirName = projectName
  .replace(/^\.*\/|\/|\/?[^\/]+\.[a-z]+|\/$/g, '')
  .replace(/ /gi, '-')
  .toLowerCase();

/*
https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
*/
const isValidDate = (s: string) => {
  // Assumes s is "mm/dd/yyyy"
  if (!/^\d\d\/\d\d\/\d\d\d\d$/.test(s)) {
    return false;
  }
  const parts = s.split('/').map((p: string) => parseInt(p, 10));
  parts[0] -= 1;
  const d = new Date(parts[2], parts[0], parts[1]);
  return d.getMonth() === parts[0] && d.getDate() === parts[1] && d.getFullYear() === parts[2];
};

const isValidTime = (t: string) => {
  const isValid = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(t);
  return isValid;
};

const convertToSeconds = (date: Date) => {
  const d = new Date(date);
  return Math.floor(d.getTime() / 1000);
};

interface Attribute {
  trait_type: string;
  value: string;
}

interface Contract {
  address: string;
  contractName: string;
  name: string;
  symbol: string;
  usdPricePerToken: number;
  maxSupply: number;
  maxTokensPerWallet: number;
  saleStartTime: number;
  royaltyFeeRecipient: string;
  royaltyFeeNumerator: number;
  description: string;
  tokenURI: string;
  numAttributes: number;
  attributes: Attribute[];
  avaxUsdPriceFeedAddress: string;
}

interface CollectionData {
  artistId: string;
  imageUrl: string;
  type: string;
  dropTime: Date | undefined;
  details: string[];
  gatedContent: {
    type: string;
    value: string | null;
  };
  merchOptionTypes: string[] | null;
  accessGrantingTokenAddresses: string[];
}

interface Config {
  contract: Contract;
  collectionData: CollectionData;
}
/*
Initial JSON File Config
*/
const initialConfig: Config = {
  contract: {
    address: '',
    contractName: 'CoralNftV1',
    name: projectName,
    symbol: '',
    usdPricePerToken: 0,
    maxSupply: 0,
    maxTokensPerWallet: 2,
    saleStartTime: 0,
    royaltyFeeRecipient: '',
    royaltyFeeNumerator: 0,
    description: '',
    tokenURI: '',
    numAttributes: 0,
    attributes: [],
    avaxUsdPriceFeedAddress: '',
  },
  collectionData: {
    artistId: '',
    imageUrl: '',
    type: '',
    dropTime: undefined,
    details: [],
    gatedContent: {
      type: '',
      value: '',
    },
    merchOptionTypes: [],
    accessGrantingTokenAddresses: [],
  },
};

console.log(`---------------------------------------------`);
console.log(`>>> Creating new project: ${projectName.toUpperCase()}`);
console.log(`---------------------------------------------`);
console.log(` `);

const createDirectories = () => {
  const __dirname = path.resolve();

  fs.mkdirSync(path.resolve(__dirname, 'projects', dirName), { recursive: false });
  fs.mkdirSync(path.resolve(__dirname, 'projects', dirName, 'image'), { recursive: false });

  console.log('>>> New project directory created...');
};

const createInitialConfigJSON = () => {
  const json = JSON.stringify(initialConfig, null, 2);
  fs.writeFileSync(`projects/${dirName}/config.json`, json, 'utf8');
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const addSymbol = () => {
  return new Promise<void>((resolve, reject) => {
    rl.question('What is the ERC721 Symbol ', (answer) => {
      initialConfig.contract.symbol = answer;
      console.log(`Symbol: ${answer}`);
      resolve();
    });
  });
};

const addDescription = () => {
  return new Promise<void>((resolve, reject) => {
    rl.question('Please add the Collection Description: ', (answer) => {
      initialConfig.contract.description = answer;
      resolve();
    });
  });
};

const addNumAttributes = () => {
  return new Promise<void>((resolve, reject) => {
    rl.question('How many attributes? ', (answer) => {
      initialConfig.contract.numAttributes = parseInt(answer);
      resolve();
    });
  });
};

const addTraitType = (attributeNum: number) => {
  return new Promise<void>((resolve, reject) => {
    rl.question(`What is the trait type of attribute ${attributeNum + 1}? `, (answer) => {
      initialConfig.contract.attributes.push({ trait_type: answer, value: '' });
      resolve();
    });
  });
};

const addTraitValue = (attributeNum: number) => {
  const trait_type = initialConfig.contract.attributes[attributeNum].trait_type;
  return new Promise<void>((resolve, reject) => {
    rl.question(
      `What is the value for attribute ${attributeNum + 1}'s ${trait_type}? `,
      (answer) => {
        initialConfig.contract.attributes[attributeNum].value = answer;
        resolve();
      }
    );
  });
};

const addAttributes = async (numAttributes: number) => {
  for (let i = 0; i < numAttributes; i++) {
    await addTraitType(i);
    await addTraitValue(i);
  }
};

const addUsdPrice = () => {
  return new Promise<void>((resolve, reject) => {
    rl.question('What is the USD Price per Token? ', (answer) => {
      initialConfig.contract.usdPricePerToken = parseInt(answer);
      console.log(`USD Price per Token: ${answer}`);
      resolve();
    });
  });
};

const addMaxSupply = () => {
  return new Promise<void>((resolve, reject) => {
    rl.question('What is the maximum supply of the NFT? ', (answer) => {
      initialConfig.contract.maxSupply = parseInt(answer);
      console.log(`Max NFT Supply: ${answer}`);
      resolve();
    });
  });
};

/*
Set Starting Time
*/
let date: Date;
const addSalesStartingDate = () => {
  return new Promise<void>((resolve, reject) => {
    rl.question('What is the drop date? Please enter in "MM/DD/YYYY" format: ', (answer) => {
      if (isValidDate(answer)) {
        const dateParts = answer.split('/').map((p) => parseInt(p));
        date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
        resolve();
      } else {
        console.log('Please use proper format');
        resolve(addSalesStartingDate());
      }
    });
  });
};

const addSalesStartingTime = () => {
  return new Promise<void>((resolve, reject) => {
    rl.question(
      'What is the drop time? Please enter in 24HR "HH:MM" format, aka "21:00": ',
      (answer) => {
        if (isValidTime(answer)) {
          const timeParts = answer.split(':').map((part) => parseInt(part));
          date.setHours(timeParts[0], timeParts[1]);
          initialConfig.collectionData.dropTime = date;
          console.log('Drop Date: ', date);
          initialConfig.contract.saleStartTime = convertToSeconds(date);
          resolve();
        } else {
          console.log('Please use proper format');
          resolve(addSalesStartingTime());
        }
      }
    );
  });
};

/*
Royalty Fee Setup
*/
const addRoyaltyFeeRecipient = () => {
  return new Promise<void>((resolve, reject) => {
    rl.question('What address should ERC-2981 Royalty Fees go to? ', (answer) => {
      initialConfig.contract.royaltyFeeRecipient = answer;
      resolve();
    });
  });
};

const addRoyaltyFeeNumerator = () => {
  return new Promise<void>((resolve, reject) => {
    rl.question('How many basis points (e.g. 5% is 500) is the Royalty Fee? ', (answer) => {
      initialConfig.contract.royaltyFeeNumerator = parseInt(answer);
      console.log(`Royalty Fee: ${answer}, or ${(parseInt(answer) / 10000).toFixed(2)}%`);
      resolve();
    });
  });
};

const addArtistId = () => {
  return new Promise<void>((resolve, reject) => {
    rl.question("What is the artist's ID (wallet address)? ", (answer) => {
      initialConfig.collectionData.artistId = answer;
      resolve();
    });
  });
};

const addCollectionType = () => {
  const answerArray = ['video', 'music', 'stream', 'merch', 'all_access'];
  return new Promise<void>((resolve, reject) => {
    rl.question(`What type of collection? [ ${answerArray.join(' / ')} ] `, (answer) => {
      if (answerArray.includes(answer)) {
        initialConfig.collectionData.type = answer;
        resolve();
      } else {
        console.log(`Please choose one of: ${answerArray.join(' / ')}`);
        console.log(` `);
        resolve(addCollectionType());
      }
    });
  });
};

let numMerchOptions: number;
const addNumMerchOptions = () => {
  return new Promise<void>((resolve, reject) => {
    rl.question('How many merch options? ', (answer) => {
      numMerchOptions = parseInt(answer);
      resolve();
    });
  });
};

const addMerchType = (num: number) => {
  const answerArray = ['size', 'color'];
  return new Promise<void>((resolve, reject) => {
    rl.question(
      `Which merch option do you want to add (${
        num + 1
      } of ${numMerchOptions})? [ ${answerArray.join(' / ')} ] `,
      (answer) => {
        if (answerArray.includes(answer)) {
          initialConfig.collectionData.merchOptionTypes?.push(answer);
          console.log(`Merch type of ${answer} added...`);
          resolve();
        } else {
          console.log(`Please choose one of: ${answerArray.join(' / ')}`);
          console.log(` `);
          resolve(addCollectionType());
        }
      }
    );
  });
};

const addMerchOptions = async (numOptions: number) => {
  if (numOptions === 0) {
    initialConfig.collectionData.merchOptionTypes = null;
  } else {
    for (let i = 0; i < numOptions; i++) {
      await addMerchType(i);
    }
  }
};

const addGatedContentType = () => {
  const answerArray = ['url', 'stream'];
  return new Promise<void>((resolve, reject) => {
    rl.question(`What type of gated content? [ ${answerArray.join(' / ')} ] `, (answer) => {
      if (answerArray.includes(answer)) {
        initialConfig.collectionData.gatedContent.type = answer;
        resolve();
      } else {
        console.log(`Please choose one of: ${answerArray.join(' / ')}`);
        console.log(` `);
        resolve(addCollectionType());
      }
    });
  });
};

const addGatedContentValue = () => {
  return new Promise<void>((resolve, reject) => {
    rl.question(
      `What is the value for the gated content ${initialConfig.collectionData.gatedContent.type}? `,
      (answer) => {
        initialConfig.collectionData.gatedContent.value = answer;
        resolve();
      }
    );
  });
};

let numAccessGrantingTokenAddresses: number;
const getNumAccessGrantingTokenAddresses = () => {
  return new Promise<void>((resolve, reject) => {
    rl.question('How many Access Granting Token Addresses do you want to add? ', (answer) => {
      numAccessGrantingTokenAddresses = parseInt(answer);
      resolve();
    });
  });
};

const addAccessGrantingTokenAddress = async () => {
  return new Promise<void>((resolve, reject) => {
    rl.question(`Add an Access Granting Token Address: `, (answer) => {
      if (!initialConfig.collectionData.accessGrantingTokenAddresses.includes(answer)) {
        initialConfig.collectionData.accessGrantingTokenAddresses.push(answer);
        resolve();
      } else {
        console.log('Address already exists in array');
        resolve(addAccessGrantingTokenAddress());
      }
    });
  });
};

const addAccessGrantingTokenAddresses = async () => {
  if (numAccessGrantingTokenAddresses === 0) {
    initialConfig.collectionData.accessGrantingTokenAddresses = [];
  } else {
    for (let i = 0; i < numAccessGrantingTokenAddresses; i++) {
      await addAccessGrantingTokenAddress();
    }
  }
};

const printConfig = () => {
  console.log(`---------------------------------------------`);
  console.log(`>>> ${projectName.toUpperCase()} created: `);
  console.log(`---------------------------------------------`);
  console.log(` `);
  console.log(initialConfig);
  console.log(`---------------------------------------------`);
  console.log(`>>> IMPORTANT: `);
  console.log(`>>> Add image file to the newly created directory! Please name it image.png`);
  console.log(`---------------------------------------------`);
};

const main = async () => {
  createDirectories();
  console.log(`---------------------------------------------`);
  console.log(`Let's populate the initial config File for ${projectName}: `);
  console.log(`---------------------------------------------`);
  console.log(` `);
  await addSymbol();
  console.log(` `);
  await addDescription();
  console.log(` `);
  await addNumAttributes();
  await addAttributes(initialConfig.contract.numAttributes);
  console.log(` `);
  await addUsdPrice();
  console.log(` `);
  await addMaxSupply();
  console.log(` `);
  await addSalesStartingDate();
  await addSalesStartingTime();
  console.log(` `);
  await addRoyaltyFeeRecipient();
  await addRoyaltyFeeNumerator();
  console.log(` `);
  await addArtistId();
  console.log(` `);
  await addCollectionType();
  console.log(` `);
  await addGatedContentType();
  await addGatedContentValue();
  console.log(` `);
  await getNumAccessGrantingTokenAddresses();
  await addAccessGrantingTokenAddresses();

  if (initialConfig.collectionData.type === 'merch') {
    await addNumMerchOptions();
    await addMerchOptions(numMerchOptions);
  }

  rl.close();
  createInitialConfigJSON();
  console.log(`-------------------------------------------------------------`);
  console.log(`Generating initial config file for ${projectName}...`);
  console.log(`-------------------------------------------------------------`);
  console.log(` `);
  printConfig();
};

main();
