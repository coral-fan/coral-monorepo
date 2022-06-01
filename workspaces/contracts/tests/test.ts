import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract, ContractFactory } from 'ethers';
import { ethers, waffle } from 'hardhat';
import hre from 'hardhat';

/*
Update constructorArgs here
*/
import config from '../projects/coral-test-0601/config.json';
const constructorArgs = config.contract;
const contractName = constructorArgs.contractName;

const ONLY_OWNER_ERROR_MESSAGE = 'Ownable: caller is not the owner';

describe(`Running Tests on ${contractName}...`, () => {
  let NFTContract: ContractFactory;
  let contract: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let relayer1: SignerWithAddress;
  let relayer2: SignerWithAddress;

  beforeEach(async () => {
    // Get the ContractFactory and Signers here.
    NFTContract = await hre.ethers.getContractFactory(constructorArgs.contractName);
    [owner, addr1, addr2, relayer1, relayer2] = await hre.ethers.getSigners();

    const { name, symbol, usdPricePerToken, maxSupply, maxTokensPerWallet, tokenURI } =
      constructorArgs;

    contract = await NFTContract.deploy(
      name,
      symbol,
      usdPricePerToken,
      maxSupply,
      maxTokensPerWallet,
      tokenURI
    );

    await contract.connect(owner).setSaleState(true);
  });

  describe('Deployment', () => {
    it('Should set the correct owner', async () => {
      expect(await contract.owner()).to.equal(owner.address);
    });

    it('Should return tokenSupply of 0', async () => {
      expect(await contract.totalSupply()).to.equal(ethers.BigNumber.from(0));
    });
  });

  describe('Public Mints', () => {
    it('Should return addr1 tokenBalance of 1', async () => {
      const estimatedTokenPrice = await contract.connect(addr1).getTokenPriceInAvax();
      await contract.connect(addr1).publicMint({ value: estimatedTokenPrice });

      expect(await contract.balanceOf(addr1.address)).to.equal(ethers.BigNumber.from(1));
    });

    it('Should return addr2 tokenBalance of 2', async () => {
      const estimatedTokenPrice = await contract.connect(addr1).getTokenPriceInAvax();
      await contract.connect(addr2).publicMint({ value: estimatedTokenPrice });
      await contract.connect(addr2).publicMint({ value: estimatedTokenPrice });

      expect(await contract.balanceOf(addr2.address)).to.equal(ethers.BigNumber.from(2));
    });

    it('Should emit successful transfer event', async () => {
      const estimatedTokenPrice = await contract.connect(addr1).getTokenPriceInAvax();
      await expect(contract.connect(addr1).publicMint({ value: estimatedTokenPrice }))
        .to.emit(contract, 'Transfer')
        .withArgs(ethers.constants.AddressZero, addr1.address, 1);
    });

    it('Should revert due to insufficient Avax', async () => {
      const estimatedTokenPrice = await contract.connect(addr1).getTokenPriceInAvax();
      const insufficientPrice = estimatedTokenPrice.sub(10000000);
      await expect(
        contract.connect(addr1).publicMint({ value: insufficientPrice })
      ).to.be.revertedWith(`Not enough ether to purchase`);
    });

    it(`Contract should have eth balance of estimated NFT avax after mint`, async () => {
      const provider = waffle.provider;
      const estimatedTokenPrice = await contract.connect(addr1).getTokenPriceInAvax();

      await contract.connect(addr1).publicMint({ value: estimatedTokenPrice });

      expect(await provider.getBalance(contract.address)).to.equal(estimatedTokenPrice);
    });

    it('Should revert after total supply is minted', async () => {
      const estimatedTokenPrice = await contract.connect(addr1).getTokenPriceInAvax();
      const mintMaxSupplyPlusOne = async () => {
        for (let i = 1; i <= constructorArgs.maxSupply + 1; i++) {
          let wallet = ethers.Wallet.createRandom();
          wallet = wallet.connect(ethers.provider);
          await addr1.sendTransaction({ to: wallet.address, value: ethers.utils.parseEther('4') });
          await contract.connect(wallet).publicMint({ value: estimatedTokenPrice });
        }
      };

      await expect(mintMaxSupplyPlusOne()).to.revertedWith('Already Sold Out');
    });

    it('Should revert because max wallet balance exceeded', async () => {
      const estimatedTokenPrice = await contract.connect(addr1).getTokenPriceInAvax();
      await contract.connect(addr2).publicMint({ value: estimatedTokenPrice });
      await contract.connect(addr2).publicMint({ value: estimatedTokenPrice });
      await expect(
        contract.connect(addr2).publicMint({ value: estimatedTokenPrice })
      ).to.revertedWith('Wallet already owns maximum amount');
    });

    it(`Should return total supply of ${constructorArgs.maxSupply}`, async () => {
      const estimatedTokenPrice = await contract.connect(addr1).getTokenPriceInAvax();
      const mintMaxSupply = async () => {
        for (let i = 1; i <= constructorArgs.maxSupply; i++) {
          let wallet = ethers.Wallet.createRandom();
          wallet = wallet.connect(ethers.provider);
          await addr1.sendTransaction({ to: wallet.address, value: ethers.utils.parseEther('4') });
          await contract.connect(wallet).publicMint({ value: estimatedTokenPrice });
        }
      };

      await mintMaxSupply();

      expect(await contract.totalSupply()).to.equal(
        ethers.BigNumber.from(constructorArgs.maxSupply)
      );
    });
  });

  describe('Relay Mints', () => {
    it('Should emit successful transfer event with relayer assigned on relay list mint', async () => {
      await contract.connect(owner).addRelayAddr(relayer1.address);

      await expect(contract.connect(relayer1).relayMint(addr1.address))
        .to.emit(contract, 'Transfer')
        .withArgs(ethers.constants.AddressZero, addr1.address, 1);
    });

    it('Should revert because addr1 not on relay list', async () => {
      await contract.connect(owner).addRelayAddr(relayer1.address);
      await expect(contract.connect(addr1).relayMint(addr1.address)).to.be.revertedWith(
        'Not on relay list'
      );
    });

    it('Should reflect token balance of 1 for addr1', async () => {
      await contract.connect(owner).addRelayAddr(relayer1.address);
      await contract.connect(relayer1).relayMint(addr1.address);
      expect(await contract.balanceOf(addr1.address)).to.equal(ethers.BigNumber.from(1));
    });

    it('Should emit successful RelayMint event', async () => {
      await contract.connect(owner).addRelayAddr(relayer1.address);

      await expect(contract.connect(relayer1).relayMint(addr1.address))
        .to.emit(contract, 'RelayMint')
        .withArgs(1);
    });
  });

  describe('Admin', () => {
    it('Add relay address should revert because caller is not the owner', async () => {
      await expect(contract.connect(addr1).addRelayAddr(addr1.address)).to.be.revertedWith(
        ONLY_OWNER_ERROR_MESSAGE
      );
    });

    it('Owner should be able to revoke relayList privilege', async () => {
      await contract.connect(owner).addRelayAddr(relayer1.address);
      await contract.connect(owner).addRelayAddr(relayer2.address);

      await contract.connect(relayer2).relayMint(addr1.address);

      await contract.connect(owner).revokeRelayAddrPrivilege(relayer2.address);

      await expect(contract.connect(relayer2).relayMint(addr1.address)).to.be.revertedWith(
        'Not on relay list'
      );
    });

    it('Withdraw should revert because caller is not the owner', async () => {
      await expect(contract.connect(addr1).withdraw()).to.be.revertedWith(ONLY_OWNER_ERROR_MESSAGE);
    });

    it('Owner of contract should be able to withdraw funds', async () => {
      const provider = waffle.provider;
      const startingBalance = await owner.getBalance();
      const estimatedTokenPrice = await contract.connect(addr1).getTokenPriceInAvax();
      await contract.connect(addr1).publicMint({ value: estimatedTokenPrice });

      const tx = await contract.connect(owner).withdraw();
      const receipt = await tx.wait();
      const gasSpent = receipt.gasUsed.mul(receipt.effectiveGasPrice);

      expect(await provider.getBalance(owner.address)).to.equal(
        estimatedTokenPrice.sub(gasSpent).add(startingBalance)
      );
    });

    it('Owner can pause sale', async () => {
      await contract.connect(owner).setSaleState(false);

      await expect(contract.connect(addr1).publicMint()).to.be.revertedWith('Sale not active');
    });

    it('Set new priceFeedAddress should revert because caller is not owner', async () => {
      await expect(
        contract.connect(addr1).setPriceFeedAddress('0x0A77230d17318075983913bC2145DB16C7366156')
      ).to.be.revertedWith(ONLY_OWNER_ERROR_MESSAGE);
    });

    it('Owner sets new price feed address', async () => {
      const tx = await contract
        .connect(owner)
        .setPriceFeedAddress('0x0A77230d17318075983913bC2145DB16C7366156');

      const receipt = await tx.wait();

      expect(receipt.status).to.equal(1);
    });

    it('Owner can transfer ownership', async () => {
      await contract.connect(owner).transferOwnership(addr1.address);
      expect(await contract.owner()).to.equal(addr1.address);
    });
  });

  describe('Token URI', () => {
    it('Should return correct URI', async () => {
      const estimatedTokenPrice = await contract.connect(addr1).getTokenPriceInAvax();
      await contract.connect(addr1).publicMint({ value: estimatedTokenPrice });

      expect(await contract.tokenURI(1)).to.equal(constructorArgs.tokenURI);
    });

    it('Should return updated URI', async () => {
      const estimatedTokenPrice = await contract.connect(addr1).getTokenPriceInAvax();
      await contract.connect(owner).setTokenURI('ipfs://newTokenURI/metadata.json');

      await contract.connect(addr1).publicMint({ value: estimatedTokenPrice });

      expect(await contract.tokenURI(1)).to.equal('ipfs://newTokenURI/metadata.json');
    });

    it('Should revert because caller is not owner', async () => {
      await expect(
        contract.connect(addr1).setTokenURI('ipfs://newTokenURI/metadata.json')
      ).to.be.revertedWith(ONLY_OWNER_ERROR_MESSAGE);
    });
  });
});
