# Coral Smart Contracts

## IMPORTANT

- If deploying to mainnet, you **must** update the `priceFeed` address with the correct mainnet address for the Avax-USD pair: [Chainlink Datafeed - Avalanche](https://docs.chain.link/docs/avalanche-price-feeds/)

## Setup Project

- From `contracts`, run `node scripts/create.mjs "<PROJECT_NAME>"` and follow the prompts. This creates an initial configuration file.

- After the script finishes running, add the image to the new project directory's image folder, and name it `image.png`.

- Review and update the `config.json` as needed - please add values for `dropDate`, `details` and `gatedContent`.

## Test

- Import the directory of the project you'd like to test in `tests/test.ts`: `import config from '../projects/<YOUR_PROJECT_DIR_HERE>/config.json';`

- Note: Hardhat times out over large mint sizes, may need to adjust the config to a lower maxSupply number to test. REMEMBER TO CHANGE THIS VALUE BACK AFTER TESTING, AND BEFORE DEPLOYING.

- Run `npx hardhat test --network 'hardhat'`

## Run Task

- Change the default network in `hardhat.config.json` to `fuji`

- Run `npx hardhat create-and-deploy --project "<PROJECT_NAME>"` to trigger the hardhat task that uploads metadata, deploys and verifies the contract.

- Change back the default network to `hardhat`

## Update Firestore DB

- From `coral-monorepo` run `yarn app run-script scripts/collection/add.ts "<PROJECT_NAME>`
