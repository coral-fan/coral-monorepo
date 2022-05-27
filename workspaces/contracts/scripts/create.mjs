import fs from 'fs';
import path from 'path';
import readline from 'readline';

if (process.argv.length != 3) {
  throw Error('Please add project name as parameter');
}

const collectionName = process.argv[2];

const dirName = collectionName
  .replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, '')
  .replaceAll(' ', '-')
  .toLowerCase();

/*
Initial JSON File Config
*/
const initialConfig = {
  contract: {
    address: '',
    contractName: 'Coral',
    name: collectionName,
    symbol: '',
    usdPricePerToken: 0,
    maxSupply: 0,
    maxTokensPerWallet: 2,
    description: '',
    tokenURI: '',
    numAttributes: 0,
    attributes: [],
  },
  collectionData: {
    artistId: '',
    imageUrl: '',
    type: '',
    dropDate: '',
    details: '',
    gatedContent: {
      type: '',
      id: '',
    },
  },
};

console.log(`---------------------------------------------`);
console.log(`>>> Creating new project: ${collectionName.toUpperCase()}`);
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

const removeDirectory = () => {
  const __dirname = path.resolve();
  const dir = path.resolve(__dirname, 'projects', dirName);
  fs.rmSync(dir, { recursive: true });
};

const fileExists = (contractName) => {
  const __dirname = path.resolve();
  const fullPath = path.resolve(__dirname, 'src', 'projects', `${contractName}.sol`);

  return fs.existsSync(fullPath);
};

const createInitialConfigJSON = () => {
  const json = JSON.stringify(initialConfig, null, 2);
  fs.writeFileSync(`projects/${dirName}/config.json`, json, 'utf8');
};

const addImage = async () => {
  const artistRef = await addDocumentReferenceServerSide(
    'artists',
    '0xabcdefghijklmnopqrstuvwxyz01234567891011'
  );
  const artistDocSnapshot = await artistRef.add();
  console.log(artistDocSnapshot);
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

const printConfig = () => {
  console.log(`---------------------------------------------`);
  console.log(`>>> ${collectionName.toUpperCase()} created: `);
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
  console.log(`Let's populate the initial config File for ${collectionName}: `);
  await addSymbol();
  await addDescription();
  await addNumAttributes();
  await addAttributes(initialConfig.contract.numAttributes);
  await addUsdPrice();
  await addMaxSupply();
  rl.close();
  createInitialConfigJSON();
  printConfig();
};

main();
