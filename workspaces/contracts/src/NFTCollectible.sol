// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.4;

/*
    Implementation from:
    https://medium.com/scrappy-squirrels/tutorial-writing-an-nft-collectible-smart-contract-9c7e235e96da
*/

import 'hardhat/console.sol';

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';

contract NFTCollectible is ERC721Enumerable, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;

  uint256 public constant MAX_SUPPLY = 10;
  uint256 public constant PRICE = 0.01 ether;
  uint256 public constant MAX_PER_MINT = 2;

  string public baseTokenURI;

  constructor(string memory baseURI) ERC721('Test NFT v2', 'CGNF') {
    setBaseURI(baseURI);
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return baseTokenURI;
  }

  function setBaseURI(string memory _baseTokenURI) public onlyOwner {
    baseTokenURI = _baseTokenURI;
  }

  function mintNFTs(uint256 _count) public payable {
    uint256 totalMinted = _tokenIds.current();
    uint256 potentialMinted = totalMinted + _count;
    uint256 totalCost = PRICE * _count;
    require(potentialMinted <= MAX_SUPPLY, 'Already Sold Out');
    require(_count > 0 && _count <= MAX_PER_MINT, 'Cannot mint this number of NFTs');
    require(msg.value >= totalCost, 'Not enough ether to purchase');

    for (uint256 i = 0; i < _count; i++) {
      _mintSingleNFT();
    }
  }

  function _mintSingleNFT() private {
    uint256 newTokenID = _tokenIds.current();
    _safeMint(msg.sender, newTokenID);
    _tokenIds.increment();
  }

  function tokensOfOwner(address _owner) external view returns (uint256[] memory) {
    uint256 tokenCount = balanceOf(_owner);
    uint256[] memory tokenIDs = new uint256[](tokenCount);

    for (uint256 i = 0; i < tokenCount; i++) {
      tokenIDs[i] = tokenOfOwnerByIndex(_owner, i);
    }

    return tokenIDs;
  }

  function withdraw() public payable onlyOwner {
    uint256 balance = address(this).balance;
    require(balance > 0, 'Nothing to withdraw');

    (bool success, ) = (msg.sender).call{ value: balance }('');
    require(success, 'Transfer failed');
  }
}
