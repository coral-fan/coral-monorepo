# Coral Smart Contracts

## IMPORTANT

- Must have the following environmental variables set in your `contracts/.env` file:

  - `SNOWTRACE_API_KEY`
  - `NFT_STORAGE_API_KEY`
  - `DEFENDER_TEAM_API_KEY`
  - `DEPLOYER_RELAY_API_KEY_FUJI`
  - `DEPLOYER_RELAY_SECRET_KEY_FUJI`
  - `DEPLOYER_RELAY_API_KEY_MAINNET`
  - `DEPLOYER_RELAY_SECRET_KEY_MAINNET`
  - `APPROVED_MULTI_SIG_ADDRESSES`
  - `MULTI_SIG_ADDRESS`
  - `PAYMENT_RELAY_ADDRESSES_FUJI`
  - `PAYMENT_RELAY_ADDRESSES_MAINNET`
  - `CONTRACT_NAME`
  - `SENTINEL_ID_TRANSFER_IN_PERSON_FUJI`
  - `SENTINEL_ID_RELAY_MINT_FUJI`
  - `SENTINEL_ID_TRANSFER_FUJI`
  - `SENTINEL_ID_TRANSFER_IN_PERSON_MAINNET`
  - `SENTINEL_ID_RELAY_MINT_MAINNET`
  - `SENTINEL_ID_TRANSFER_MAINNET`
  - `AVAX_USD_PRICEFEED_FUJI`
  - `AVAX_USD_PRICEFEED_MAINNET`

## Setup Project

- From `contracts`, run `node project-setup-cli.mjs "<PROJECT_NAME>" "<NETWORK>"` and follow the prompts. This creates an initial configuration file.

- For Drop date and time, please enter the date and time in your local environment, the output will be converted to UTC time.

- After the script finishes running, add the image to the new project directory's image folder, and name it `image.png`.

- Review and update the `config.json` as needed - please add values for `details` and `gatedContent`.

## Test

- Import the directory of the project you'd like to test in `tests/test.ts`: `import config from '../projects/<YOUR_PROJECT_DIR_HERE>/config.json';`

- Note: Hardhat times out over large mint sizes, may need to adjust the config to a lower maxSupply number to test. REMEMBER TO CHANGE THIS VALUE BACK AFTER TESTING, AND BEFORE DEPLOYING.

- Run `npx hardhat test` (Note: default network is set to `hardhat`)

## Run Deploy Task

- IMPORTANT: Review and confirm that the values in the `config.json` file are all correct.

- Run `npx hardhat create-and-deploy --project <PROJECT_NAME> --network <NETWORK_NAME>` to trigger the hardhat task that uploads metadata, deploys and verifies the contract.

- Note: For testnet, set `NETWORK_NAME` to `fuji`; To deploy to mainnet, set `NETWORK_NAME` to `mainnet`

## Update Firestore DB

- From `coral-monorepo` run `yarn app run-script:<development_OR_production> scripts/collection/add.ts <PROJECT_NAME>`

## Run Airdrop Script (if applicable)

- Ensure that `airdrops/<PROJECT_DIRECTORY>/<RECIPIENT_DIRECTORY>/airdrop.csv` exists.

- From `contracts`, run `npx hardhat execute-airdrop --project <PROJECT_NAME> --recipient <RECIPIENT_NAME> --network <NETWORK_NAME>`

## Transfer Ownership

- From `contracts`, run `npx hardhat transfer-ownership --contract-address '<CONTRACT_ADDRESS>' --network <NETWORK_NAME>`

- Note: For testnet, set `NETWORK_NAME` to `fuji`; To deploy to mainnet, set `NETWORK_NAME` to `mainnet`
