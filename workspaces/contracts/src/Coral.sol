// SPDX-License-Identifier: MIT
pragma solidity >=0.8.14;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './AvaxUsd.sol';

contract Coral is ERC721, Ownable, AvaxUsd {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint256 public usdPricePerToken;
  uint256 public maxSupply;
  uint8 public maxTokensPerWallet;
  string private baseTokenURI;

  bool public isSaleActive = false;

  mapping(address => bool) private _relayList;

  constructor(
    string memory _name,
    string memory _symbol,
    uint256 _usdPricePerToken,
    uint256 _maxSupply,
    uint8 _maxTokensPerWallet,
    string memory _baseTokenURI
  ) ERC721(_name, _symbol) {
    usdPricePerToken = _usdPricePerToken;
    maxSupply = _maxSupply;
    maxTokensPerWallet = _maxTokensPerWallet;
    baseTokenURI = _baseTokenURI;

    // Start token count at 1;
    _tokenIds.increment();
  }

  function totalSupply() public view returns (uint256) {
    // Subtract 1 since Token count starts at 1;
    return _tokenIds.current() - 1;
  }

  function setTokenURI(string memory _newTokenURI) external onlyOwner {
    baseTokenURI = _newTokenURI;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), 'ERC721Metadata: URI query for nonexistent token');
    return baseTokenURI;
  }

  function relayMint(address to) external {
    require(isSaleActive, 'Sale not active');
    require(_relayList[msg.sender] == true, 'Not on relay list');
    require(balanceOf(to) < maxTokensPerWallet, 'Wallet already owns maximum amount');

    uint256 newTokenID = _tokenIds.current();
    require(newTokenID <= maxSupply, 'Already Sold Out');

    _mint(to, newTokenID);
    _tokenIds.increment();
  }

  function publicMint() external payable {
    require(isSaleActive, 'Sale not active');
    require(balanceOf(msg.sender) < maxTokensPerWallet, 'Wallet already owns maximum amount');

    uint256 avaxTokenPrice = _getAvaxPrice(usdPricePerToken);
    require(msg.value >= avaxTokenPrice, 'Not enough ether to purchase');

    uint256 newTokenID = _tokenIds.current();
    require(newTokenID <= maxSupply, 'Already Sold Out');

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

  function setSaleState(bool _newState) external onlyOwner {
    isSaleActive = _newState;
  }

  function getTokenPriceInAvax() public view returns (uint256) {
    return _getAvaxPrice(usdPricePerToken);
  }
}
