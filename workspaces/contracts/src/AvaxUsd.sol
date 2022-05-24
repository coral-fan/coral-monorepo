// SPDX-License-Identifier: MIT

pragma solidity >=0.8.14;
// import 'hardhat/console.sol';
import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract AvaxUsd is Ownable {
  AggregatorV3Interface internal priceFeed;

  constructor() {
    // Avax-Usd on FUJI Testnet
    priceFeed = AggregatorV3Interface(0x5498BB86BC934c8D34FDA08E81D444153d0D06aD);
  }

  function _getLatestPrice() private view returns (int256) {
    (, int256 price, , , ) = priceFeed.latestRoundData();
    return price;
  }

  function _getAvaxPrice(uint256 tokenUsdPrice) internal view returns (uint256) {
    // Convert USD price to same unit as Chainlink
    uint256 usdTokenPriceWithDecimals = tokenUsdPrice * (10**8);

    // Get current AvaxUsd price
    uint256 avaxUsdPriceWithDecimals = uint256(_getLatestPrice());

    // Avax Price in Wei
    uint256 avaxTokenPrice = (usdTokenPriceWithDecimals * (10**18)) / avaxUsdPriceWithDecimals;

    return avaxTokenPrice;
  }

  function setPriceFeedAddress(address _newAddress) public onlyOwner {
    priceFeed = AggregatorV3Interface(_newAddress);
  }
}
