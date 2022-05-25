# Coral Smart Contracts

## IMPORTANT

- If deploying to mainnet, you **must** update the `priceFeed` address with the correct mainnet address for the Avax-USD pair: [Chainlink Datafeed - Avalanche](https://docs.chain.link/docs/avalanche-price-feeds/)

## Setup Project

- Copy `template` folder in `contracts/projects` and rename it
- Add the `description` and `attributes` inside `metadata/metadata.mjs`
- Populate all the fields inside `config.json` except the `baseTokenURI`
- Add the image to the `image` directory and name `image.png`

## Upload Metadata

- Update the `metadata` import inside `scripts/upload.mjs`, as well as the `image` path, using the proper project directory.
- Run `npx hardhat run scripts/upload.mjs`
- Copy the `Metadata URI` and paste in the `baseTokenURI` field in `projects/config.json`

## Test

- Update the `constructorArgs` import inside `scripts/deploy.mjs` with the proper directory
- Run `npx hardhat test`

## Deploy

- Update the `constructorArgs` import inside `scripts/deploy.mjs` with the proper directory
- Run `npx hardhat run scripts/deploy.mjs --network <network-name>`
- Copy the deployment address and paste inside `scripts/verify.mjs`

## Verify

- Ensure the proper contract address has been included
- Update the `constructorArgs` import inside `scripts/deploy.mjs` with the proper directory
- Run `npx hardhat run scripts/verify.mjs --network <network>`
