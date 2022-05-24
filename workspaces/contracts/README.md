# Coral Smart Contracts

TODO: Create single `constructorArgs` file for test and deploy files.

## Upload Metadata

- Create asset folder in assets with `image` and `metadata` folders
- Add image file to `image`
- Create and add `metadata.js` file to `metadata`
- Update `scripts/upload.mjs` with correct metadata import and image file

Run `npx hardhat run scripts/upload.mjs`

Copy the `Metadata URI`.

## Test

Update the `constructorArgs` in `test/test.ts`, past the `Metadata URI` from the Upload Metada step in the `baseTokenURI`.

Run `npx hardhat test`

## Deploy

Update the `constructorArgs` in `test/test.ts`, past the `Metadata URI` from the Upload Metada step in the `baseTokenURI`.

Update the contract name with the correct contract.

Run `npx hardhat run scripts/deploy.mjs --network <network-name>`

## Verify

Update the address and constructor arguments in the verify script.

`npx hardhat run scripts/verify.mjs --network <network>`
