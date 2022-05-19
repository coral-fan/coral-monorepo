// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

contract NFTCollectible is ERC721, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;

  uint8 public constant MAX_SUPPLY = 50;

  uint256 public usdPrice;
  uint256 public platformFeeNumerator;
  uint256 public totalUsdPrice;

  string public baseTokenURI;

  AggregatorV3Interface internal priceFeed;

  constructor(
    string memory _baseURI,
    uint256 _usdPrice,
    uint256 _platformFeeNumerator
  ) ERC721('Coral Test v1', 'CTV1') {
    usdPrice = _usdPrice;
    platformFeeNumerator = _platformFeeNumerator;
    totalUsdPrice = usdPrice + ((usdPrice * (platformFeeNumerator * 10)) / 1000);

    setBaseURI(_baseURI);
    _tokenIds.increment();

    // Avax-Usd on FUJI Testnet
    priceFeed = AggregatorV3Interface(0x5498BB86BC934c8D34FDA08E81D444153d0D06aD);
  }

  function totalSupply() external view returns (uint256) {
    return _tokenIds.current() - 1;
  }

  // TODO: Set to Private
  function getLatestPrice() public view returns (int256) {
    (, int256 price, , , ) = priceFeed.latestRoundData();
    return price;
  }

  function getAvaxTotalPrice() internal view returns (uint256) {
    uint256 usdPriceAt108 = totalUsdPrice * (10**8);
    uint256 avaxPriceAt108 = uint256(getLatestPrice());

    uint256 avaxPrice = usdPriceAt108 / avaxPriceAt108;

    return avaxPrice;
  }

  function getAvaxPriceInWei() public view returns (uint256) {
    return getAvaxTotalPrice() * (10**18);
  }

  function setBaseURI(string memory _baseTokenURI) public onlyOwner {
    baseTokenURI = _baseTokenURI;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');
    return baseTokenURI;
  }

  function mintNFT() public payable onlyOwner {
    uint256 avaxPriceInWei = getAvaxTotalPrice() * (10**18);
    require(msg.value >= avaxPriceInWei, 'Not enough ether to purchase');

    uint256 newTokenID = _tokenIds.current();
    require(newTokenID <= MAX_SUPPLY, 'Already Sold Out');

    _safeMint(msg.sender, newTokenID);
    _tokenIds.increment();
  }

  function withdraw() public onlyOwner {
    uint256 balance = address(this).balance;
    require(balance > 0, 'Nothing to withdraw');

    (bool success, ) = (msg.sender).call{ value: balance }('');
    require(success, 'Transfer failed');
  }
}
