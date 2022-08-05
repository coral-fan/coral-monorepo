import { subtask } from 'hardhat/config';
import { types } from 'hardhat/config';

subtask('verifyContract', 'Verify contract')
  .addParam('verifyArgs', 'Arguments supplied to the verify script', {}, types.json)
  .setAction(async ({ verifyArgs }, hre) => {
    const {
      address,
      name,
      symbol,
      usdPricePerToken,
      maxSupply,
      maxTokensPerWallet,
      baseTokenURI,
      saleStartTime,
      royaltyFeeRecipient,
      royaltyFeeNumerator,
      avaxUsdPriceFeedAddress,
    } = JSON.parse(verifyArgs);

    try {
      await hre.run('verify:verify', {
        address,
        constructorArguments: [
          name,
          symbol,
          usdPricePerToken,
          maxSupply,
          maxTokensPerWallet,
          baseTokenURI,
          saleStartTime,
          royaltyFeeRecipient,
          royaltyFeeNumerator,
          avaxUsdPriceFeedAddress,
        ],
      });
    } catch (e: any) {
      if (e.message.includes('Reason: Already Verified')) {
        console.log('\n Contract is already verified!');
      } else {
        console.log(e.message);
      }
    }
  });
