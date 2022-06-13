// TODO: Convert TypeScript / Research CLI Library Options

import fs from 'fs';
import path from 'path';
import readline from 'readline';

import { config } from 'dotenv';
config();

const AVAX_USD_PRICEFEED_FUJI = process.env.AVAX_USD_PRICEFEED_FUJI;
const AVAX_USD_PRICEFEED_MAINNET = process.env.AVAX_USD_PRICEFEED_MAINNET;

if (process.argv.length != 4) {
  throw Error('Please add project name and network as parameters');
}

const projectName = process.argv[2];
const network = process.argv[3];

if (network !== 'mainnet' && network !== 'fuji') {
  throw 'Network must be mainnet or fuji';
}

const avaxUsdPriceFeedAddress =
  network === 'mainnet' ? AVAX_USD_PRICEFEED_MAINNET : AVAX_USD_PRICEFEED_FUJI;

const dirName = projectName
  .replace(/^\.*\/|\/|\/?[^\/]+\.[a-z]+|\/$/g, '')
  .replaceAll(' ', '-')
  .toLowerCase();

/*
https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
*/
const isValidDate = (s) => {
  // Assumes s is "mm/dd/yyyy"
  if (!/^\d\d\/\d\d\/\d\d\d\d$/.test(s)) {
    return false;
  }
  const parts = s.split('/').map((p) => parseInt(p, 10));
  parts[0] -= 1;
  const d = new Date(parts[2], parts[0], parts[1]);
  return d.getMonth() === parts[0] && d.getDate() === parts[1] && d.getFullYear() === parts[2];
};

const isValidTime = (t) => {
  const isValid = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(t);
  return isValid;
};

const convertToSeconds = (date) => {
  const d = new Date(date);
  return Math.floor(d.getTime() / 1000);
};

/*
Initial JSON File Config
*/
const initialConfig = {
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
    avaxUsdPriceFeedAddress,
  },
  collectionData: {
    artistId: '',
    imageUrl: '',
    type: '',
    dropDate: '',
    details: [],
    gatedContent: {
      type: '',
      id: '',
    },
    isInPerson: false,
  },
};

console.log(`---------------------------------------------`);
console.log(`>>> Creating new project: ${projectName.toUpperCase()}`);
console.log(`---------------------------------------------`);
console.log(` `);

const createDirectories = () => {
  const __dirname = path.resolve();

  fs.mkdirSync(path.resolve(__dirname, 'projects', dirName), { recursive: false }, (e) => {
    if (e) throw e;
  });
  fs.mkdirSync(path.resolve(__dirname, 'projects', dirName, 'image'), { recursive: false }, (e) => {
    if (e) throw e;
  });

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
  return new Promise((resolve, reject) => {
    rl.question('What is the ERC721 Symbol ', (answer) => {
      initialConfig.contract.symbol = answer;
      console.log(`Symbol: ${answer}`);
      resolve();
    });
  });
};

const addDescription = () => {
  return new Promise((resolve, reject) => {
    rl.question('Please add the Collection Description: ', (answer) => {
      initialConfig.contract.description = answer;
      resolve();
    });
  });
};

const addNumAttributes = () => {
  return new Promise((resolve, reject) => {
    rl.question('How many attributes? ', (answer) => {
      initialConfig.contract.numAttributes = parseInt(answer);
      resolve();
    });
  });
};

const addTraitType = (attributeNum) => {
  return new Promise((resolve, reject) => {
    rl.question(`What is the trait type of attribute ${attributeNum + 1}? `, (answer) => {
      initialConfig.contract.attributes.push({ trait_type: answer });
      resolve();
    });
  });
};

const addTraitValue = (attributeNum) => {
  const trait_type = initialConfig.contract.attributes[attributeNum].trait_type;
  return new Promise((resolve, reject) => {
    rl.question(
      `What is the value for attribute ${attributeNum + 1}'s ${trait_type}? `,
      (answer) => {
        initialConfig.contract.attributes[attributeNum].value = answer;
        resolve();
      }
    );
  });
};

const addAttributes = async (numAttributes) => {
  for (let i = 0; i < numAttributes; i++) {
    await addTraitType(i);
    await addTraitValue(i);
  }
};

const addUsdPrice = () => {
  return new Promise((resolve, reject) => {
    rl.question('What is the USD Price per Token? ', (answer) => {
      initialConfig.contract.usdPricePerToken = parseInt(answer);
      console.log(`USD Price per Token: ${answer}`);
      resolve();
    });
  });
};

const addMaxSupply = () => {
  return new Promise((resolve, reject) => {
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
let date;
const addSalesStartingDate = () => {
  return new Promise((resolve, reject) => {
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
  return new Promise((resolve, reject) => {
    rl.question(
      'What is the drop time? Please enter in 24HR "HH:MM" format, aka "21:00": ',
      (answer) => {
        if (isValidTime(answer)) {
          const timeParts = answer.split(':').map((part) => parseInt(part));
          date.setHours(timeParts[0], timeParts[1]);
          initialConfig.collectionData.dropDate = date;
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
  return new Promise((resolve, reject) => {
    rl.question('What address should ERC-2981 Royalty Fees go to? ', (answer) => {
      initialConfig.contract.royaltyFeeRecipient = answer;
      resolve();
    });
  });
};

const addRoyaltyFeeNumerator = () => {
  return new Promise((resolve, reject) => {
    rl.question('How many basis points (e.g. 5% is 500) is the Royalty Fee? ', (answer) => {
      initialConfig.contract.royaltyFeeNumerator = parseInt(answer);
      console.log(`Royalty Fee: ${answer}, or ${(answer / 10000).toFixed(2)}%`);
      resolve();
    });
  });
};

const addArtistId = () => {
  return new Promise((resolve, reject) => {
    rl.question("What is the artist's ID (wallet address)? ", (answer) => {
      initialConfig.collectionData.artistId = answer;
      resolve();
    });
  });
};

const addCollectionType = () => {
  const answerArray = ['video', 'music', 'stream', 'merch', 'all_access'];
  return new Promise((resolve, reject) => {
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

const addIsInPerson = () => {
  const answerArray = ['yes', 'no'];
  return new Promise((resolve, reject) => {
    rl.question(
      `Is this collection for an in-person event? [ ${answerArray.join(' / ')} ] `,
      (answer) => {
        if (answerArray.includes(answer)) {
          initialConfig.collectionData.isInPerson = answer === answerArray[0] ? true : false;
          resolve();
        } else {
          console.log(`Please choose one of: ${answerArray.join(' / ')}`);
          console.log(` `);
          resolve(addIsInPerson());
        }
      }
    );
  });
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
  await addDescription();
  await addNumAttributes();
  await addAttributes(initialConfig.contract.numAttributes);
  await addUsdPrice();
  await addMaxSupply();
  await addSalesStartingDate();
  await addSalesStartingTime();
  await addRoyaltyFeeRecipient();
  await addRoyaltyFeeNumerator();
  console.log(`---------------------------------------------`);
  console.log(`Next let's add artist and collection data for ${projectName}: `);
  console.log(`---------------------------------------------`);
  console.log(` `);
  await addArtistId();
  await addCollectionType();
  await addIsInPerson();
  rl.close();
  createInitialConfigJSON();
  console.log(`---------------------------------------------`);
  console.log(`Generating initial config file for ${projectName}...`);
  console.log(`---------------------------------------------`);
  console.log(` `);
  printConfig();
};

main();
