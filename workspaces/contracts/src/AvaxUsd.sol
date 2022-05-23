// SPDX-License-Identifier: MIT

pragma solidity >=0.8.14;
// import 'hardhat/console.sol';
import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

contract AvaxUsd {
  AggregatorV3Interface internal _priceFeed;

  constructor() {
    // Avax-Usd on FUJI Testnet
    _priceFeed = AggregatorV3Interface(0x5498BB86BC934c8D34FDA08E81D444153d0D06aD);
  }

  function _getLatestPrice() private view returns (int256) {
    (, int256 price, , , ) = _priceFeed.latestRoundData();
    return price;
  }

  function getAvaxPrice(uint256 tokenUsdPrice) internal view returns (uint256) {
    // Convert USD price to same unit as Chainlink
    uint256 usdTokenPriceWithDecimals = tokenUsdPrice * (10**8);

    // Get current AvaxUsd price
    uint256 avaxUsdPriceAtWithDecimals = uint256(_getLatestPrice());

    // Avax Price in Wei
    uint256 avaxTokenPrice = (usdTokenPriceWithDecimals * (10**18)) / avaxUsdPriceAtWithDecimals;

    return avaxTokenPrice;
  }
}
