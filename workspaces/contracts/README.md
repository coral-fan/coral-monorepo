# Coral Smart Contracts

## IMPORTANT

- If deploying to mainnet, you **must** update the `priceFeed` address with the correct mainnet address for the Avax-USD pair: [Chainlink Datafeed - Avalanche](https://docs.chain.link/docs/avalanche-price-feeds/)

- NOTE: All script commands assume you are deploying to TESTNET, i.e. `fuji`. Update network for mainnet deployments.

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

## Run Airdrop Script (if applicable)

## Transfer Ownership

- Populate the `CONTRACT_ADDRESS` and `NEW_OWNER_ADDRESS` fields.

  - `CONTRACT_ADDRESS` refers to the contract that you are transferring ownership of.
  - `NEW_OWNER_ADDRESS` refers to the address of the new owner that will be able to perform all `onlyOwner` functions.
  - `NEW_OWNER_ADDRESS` _MUST BE_ one of Coral's Multi-Sig wallets.

- From `contracts`, run `npx hardhat transfer-ownership --network 'fuji'`
