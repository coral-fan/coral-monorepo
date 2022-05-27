# Coral Smart Contracts

## IMPORTANT

- If deploying to mainnet, you **must** update the `priceFeed` address with the correct mainnet address for the Avax-USD pair: [Chainlink Datafeed - Avalanche](https://docs.chain.link/docs/avalanche-price-feeds/)

## Setup Project

- Run `node scripts/create.mjs "<PROJECT_NAME>"` and follow the prompts. This creates an initial configuration file.

- After the script finishes running, add the image to the new project directory's image folder, and name it `image.png`.

## Run Task

- Run `npx hardhat create-and-deploy --project "<PROJECT_NAME>"` to trigger the hardhat task that uploads metadata, deploys and verifies the contract.
