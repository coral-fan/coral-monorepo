# Coral Smart Contracts

## IMPORTANT

- If deploying to mainnet, you **must** update the `priceFeed` address with the correct mainnet address for the Avax-USD pair: [Chainlink Datafeed - Avalanche](https://docs.chain.link/docs/avalanche-price-feeds/)

- Must have the following API keys set in your `contracts/.env` file:
  - `SNOWTRACE_API_KEY`
  - `FUJI_TESTNET_PRIVATE_KEY`
  - `NFT_STORAGE_API_KEY`
  - `DEFENDER_TEAM_API_KEY`
  - `DEFENDER_TEAM_SECRET_KEY`

## Setup Project

- From `contracts`, run `node scripts/create.mjs "<PROJECT_NAME>"` and follow the prompts. This creates an initial configuration file.

- For `dropDate`, please enter the date and time in your local environment, the output will be converted to UTC time.

- After the script finishes running, add the image to the new project directory's image folder, and name it `image.png`.

- Review and update the `config.json` as needed - please add values for `details` and `gatedContent`.

## Test

- Import the directory of the project you'd like to test in `tests/test.ts`: `import config from '../projects/<YOUR_PROJECT_DIR_HERE>/config.json';`

- Note: Hardhat times out over large mint sizes, may need to adjust the config to a lower maxSupply number to test. REMEMBER TO CHANGE THIS VALUE BACK AFTER TESTING, AND BEFORE DEPLOYING.

- Run `npx hardhat test --network 'hardhat'`

## Run Deploy Task

- IMPORTANT: Review and confirm that the values in the `config.json` file are all correct.

- Run `npx hardhat create-and-deploy --project "<PROJECT_NAME>" --network 'fuji'` to trigger the hardhat task that uploads metadata, deploys and verifies the contract.

## Update Firestore DB

- From `coral-monorepo` run `yarn app run-script scripts/collection/add.ts '<PROJECT_NAME>'`

## Add Contract Address to Sentinel

- Add the contract address to both the `Relay Mint Events` and `Transfer Events` Sentinels

## Run Airdrop Script (if applicable)

## Update Smart Contract As Needed

- Transfer ownership
