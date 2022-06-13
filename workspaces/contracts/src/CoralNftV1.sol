// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/common/ERC2981.sol';
import './AvaxUsd.sol';

contract CoralNftV1 is ERC721, ERC2981, Ownable, AvaxUsd {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  uint256 public usdPricePerToken;
  uint256 public maxSupply;
  uint8 public maxTokensPerWallet;
  string private baseTokenURI;
  uint256 public saleStartTime;

  bool private airdropMintOpen = true;
  bool public isSaleActive = true;

  // Manage approved relay list
  mapping(address => bool) private _relayList;
  address[] private _relayAddresses;

  modifier mintOpen() {
    require(isSaleActive, 'Sale not active');
    require(block.timestamp >= saleStartTime, 'Sale has not started yet');
    _;
  }

  event RelayMint(uint256 indexed tokenId);

  constructor(
    string memory _name,
    string memory _symbol,
    uint256 _usdPricePerToken,
    uint256 _maxSupply,
    uint8 _maxTokensPerWallet,
    string memory _baseTokenURI,
    uint256 _saleStartTime,
    address _royaltyRecipient,
    uint96 _royaltyFeeNumerator,
    address _priceFeedAddress
  ) ERC721(_name, _symbol) AvaxUsd(_priceFeedAddress) {
    usdPricePerToken = _usdPricePerToken;
    maxSupply = _maxSupply;
    maxTokensPerWallet = _maxTokensPerWallet;
    baseTokenURI = _baseTokenURI;
    saleStartTime = _saleStartTime;

    // Start token count at 1;
    _tokenIds.increment();

    // Set Royalties
    _setDefaultRoyalty(_royaltyRecipient, _royaltyFeeNumerator);
  }

  /// Tokens
  function totalSupply() external view returns (uint256) {
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

  /// Minting
  function relayMint(address to) external mintOpen {
    require(_relayList[msg.sender] == true, 'Not on relay list');
    require(balanceOf(to) < maxTokensPerWallet, 'Wallet already owns maximum amount');

    uint256 newTokenID = _tokenIds.current();
    require(newTokenID <= maxSupply, 'Already Sold Out');

    _mint(to, newTokenID);
    _tokenIds.increment();

    emit RelayMint(newTokenID);
  }

  function publicMint() external payable mintOpen {
    require(balanceOf(msg.sender) < maxTokensPerWallet, 'Wallet already owns maximum amount');

    uint256 avaxTokenPrice = _getAvaxPrice(usdPricePerToken);
    require(msg.value >= avaxTokenPrice, 'Not enough ether to purchase');

    uint256 newTokenID = _tokenIds.current();
    require(newTokenID <= maxSupply, 'Already Sold Out');

    _mint(msg.sender, newTokenID);
    _tokenIds.increment();
  }

  function airdropMint(address[] memory _recipients) external onlyOwner {
    require(airdropMintOpen, 'Airdrop mint no longer available');

    for (uint256 i = 0; i < _recipients.length; ) {
      uint256 newTokenID = _tokenIds.current();
      require(newTokenID <= maxSupply, 'Already Sold Out');

      _mint(_recipients[i], newTokenID);
      _tokenIds.increment();

      unchecked {
        ++i;
      }
    }
  }

  function closeAirdropMint() external onlyOwner {
    airdropMintOpen = false;
  }

  /// Admin
  function withdraw() external onlyOwner {
    uint256 balance = address(this).balance;

    require(balance > 0, 'Nothing to withdraw');
    payable(msg.sender).transfer(balance);
  }

  function addRelayAddr(address _newRelayAddr) external onlyOwner {
    _relayList[_newRelayAddr] = true;
    _relayAddresses.push(_newRelayAddr);
  }

  function revokeRelayAddrPrivilege(address _relayAddr) external onlyOwner {
    _relayList[_relayAddr] = false;
  }

  function revokeAllRelayAddrPrivileges() external onlyOwner {
    for (uint256 i = 0; i < _relayAddresses.length; ) {
      _relayList[_relayAddresses[i]] = false;

      unchecked {
        ++i;
      }
    }
  }

  function setSaleState(bool _newState) external onlyOwner {
    isSaleActive = _newState;
  }

  function setSaleStartTime(uint256 _newTime) external onlyOwner {
    saleStartTime = _newTime;
  }

  function getTokenPriceInAvax() external view returns (uint256) {
    return _getAvaxPrice(usdPricePerToken);
  }

  /**
   * @dev See {IERC165-supportsInterface}.
   */
  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721, ERC2981)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  /**
   * @dev See {ERC2981-_setDefaultRoyalty}.
   */
  function setDefaultRoyalty(address receiver, uint96 feeNumerator) external onlyOwner {
    _setDefaultRoyalty(receiver, feeNumerator);
  }

  /**
   * @dev See {ERC2981-_deleteDefaultRoyalty}.
   */
  function deleteDefaultRoyalty() external onlyOwner {
    _deleteDefaultRoyalty();
  }
}
