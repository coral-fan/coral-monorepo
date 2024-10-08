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
  - `SENTINEL_ID_TRANSFER_CRYPTO_PURCHASES_FUJI`
  - `SENTINEL_ID_TRANSFER_IN_PERSON_MAINNET`
  - `SENTINEL_ID_RELAY_MINT_MAINNET`
  - `SENTINEL_ID_TRANSFER_MAINNET`
  - `SENTINEL_ID_TRANSFER_CRYPTO_PURCHASES_MAINNET`
  - `AVAX_USD_PRICEFEED_FUJI`
  - `AVAX_USD_PRICEFEED_MAINNET`

## Setup Project

- If you don't already have a `projects` folder in `contract`, please create one.

- From `contracts`, run `yarn run create "<PROJECT_NAME>"` and follow the prompts. This creates an initial configuration file.

- For Drop date and time, please enter the date and time in your local environment, the output will be converted to UTC time.

- After the script finishes running, add the image to the new project directory's image folder, and name it `image.png`.

- Review and update the `config.json` as needed - please add values for `details`.

## Test

- Import the directory of the project you'd like to test in `tests/test.ts`: `import config from '../projects/<YOUR_PROJECT_DIR_HERE>/config.json';`

- Note: Hardhat times out over large mint sizes, may need to adjust the config to a lower maxSupply number to test. REMEMBER TO CHANGE THIS VALUE BACK AFTER TESTING, AND BEFORE DEPLOYING.

- Run `npx hardhat test` (Note: default network is set to `hardhat`)

## Run Deploy Task

- IMPORTANT: Review and confirm that the values in the `config.json` file are all correct.

- Run `npx hardhat run-deploy --project-name <PROJECT_NAME> --network <NETWORK_NAME>` to trigger the hardhat task that uploads metadata, deploys and verifies the contract.

- Note: For testnet, set `NETWORK_NAME` to `fuji`; To deploy to mainnet, set `NETWORK_NAME` to `mainnet`

## Add Merch Options (if applicable)

- Populate a `merch.json` file with `merchOptions` and add to the project directory (similar to `config.json`);

- Run `npx hardhat addMerchOptions --project-dir <PROJECT_DIRECTORY> --network <NETWORK_NAME>`

## Run Airdrop Script (if applicable)

- Ensure that `airdrops/<PROJECT_DIRECTORY>/<RECIPIENT_DIRECTORY>/airdrop.csv` exists.

- CSV should have a header row and be structured as `tokenId,owner`

- [Snapshot Tool](https://tools.roland.xyz/snapshot)

- From `contracts`, run `npx hardhat execute-airdrop --project <PROJECT_NAME> --recipient <RECIPIENT_NAME> --network <NETWORK_NAME>`

## Transfer Ownership

- From `contracts`, run `npx hardhat transfer-ownership --contract-address '<CONTRACT_ADDRESS>' --network <NETWORK_NAME>`

- Note: For testnet, set `NETWORK_NAME` to `fuji`; To deploy to mainnet, set `NETWORK_NAME` to `mainnet`
