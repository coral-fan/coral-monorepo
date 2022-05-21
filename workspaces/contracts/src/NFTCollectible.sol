// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.14;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './AvaxUsd.sol';

contract NFTCollectible is ERC721, Ownable, AvaxUsd {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint256 public constant MAX_SUPPLY = 50;
  uint256 public constant USD_PRICE_PER_TOKEN = 100;
  uint256 public constant MAX_TOKENS_PER_WALLET = 10;

  string private _tokenURI =
    'ipfs://bafyreibbhcuoijlbwmxbuq6neafvmodzbgqoxdday62cdmks6rek35yuna/metadata.json';

  mapping(address => bool) private _relayList;

  constructor() ERC721('Coral Test v1', 'CTV1') {
    // Start token count at 1;
    _tokenIds.increment();
  }

  function totalSupply() public view returns (uint256) {
    // Subtract 1 since Token count starts at 1;
    return _tokenIds.current() - 1;
  }

  function setTokenURI(string memory _newTokenURI) external onlyOwner {
    _tokenURI = _newTokenURI;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');
    return _tokenURI;
  }

  function relayMint(address to) external {
    require(_relayList[msg.sender] == true, 'Not on relay list');

    uint256 newTokenID = _tokenIds.current();
    require(newTokenID <= MAX_SUPPLY, 'Already Sold Out');

    // require(balanceOf(to) < MAX_TOKENS_PER_WALLET, 'Wallet already owns maximum amount');

    _mint(to, newTokenID);
    _tokenIds.increment();
  }

  function publicMint() external payable {
    uint256 avaxTokenPrice = getAvaxPrice(USD_PRICE_PER_TOKEN);
    require(msg.value >= avaxTokenPrice, 'Not enough ether to purchase');

    uint256 newTokenID = _tokenIds.current();
    require(newTokenID <= MAX_SUPPLY, 'Already Sold Out');

    // require(balanceOf(msg.sender) < MAX_TOKENS_PER_WALLET, 'Wallet already owns maximum amount');

    _mint(msg.sender, newTokenID);
    _tokenIds.increment();
  }

  function withdraw() external onlyOwner {
    uint256 balance = address(this).balance;
    require(balance > 0, 'Nothing to withdraw');

    (bool success, ) = payable(msg.sender).call{ value: balance }('');
    require(success, 'Transfer failed');
  }

  function addRelayAddr(address _newRelayAddr) external onlyOwner {
    _relayList[_newRelayAddr] = true;
  }

  function revokeRelayAddrPrivilege(address _relayAddr) external onlyOwner {
    _relayList[_relayAddr] = false;
  }
}
