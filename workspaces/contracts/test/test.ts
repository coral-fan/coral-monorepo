import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract, ContractFactory } from 'ethers';
import { ethers, waffle } from 'hardhat';
import hre from 'hardhat';

const ESTIMATED_NFT_PRICE = '3.2';
const INSUFFICIENT_AVAX = '3.1';
const MAX_SUPPLY = 50;
const ONLY_OWNER_ERROR_MESSAGE = 'Ownable: caller is not the owner';

describe('NFT Contract', () => {
  let NFTContract: ContractFactory;
  let contract: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let relayer1: SignerWithAddress;
  let relayer2: SignerWithAddress;

  beforeEach(async () => {
    // Get the ContractFactory and Signers here.
    NFTContract = await hre.ethers.getContractFactory('NFTCollectible');
    [owner, addr1, addr2, relayer1, relayer2] = await hre.ethers.getSigners();

    contract = await NFTContract.deploy();

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
      await contract
        .connect(addr1)
        .publicMint({ value: ethers.utils.parseEther(ESTIMATED_NFT_PRICE) });

      expect(await contract.balanceOf(addr1.address)).to.equal(ethers.BigNumber.from(1));
    });

    it('Should return addr2 tokenBalance of 5', async () => {
      await contract
        .connect(addr2)
        .publicMint({ value: ethers.utils.parseEther(ESTIMATED_NFT_PRICE) });
      await contract
        .connect(addr2)
        .publicMint({ value: ethers.utils.parseEther(ESTIMATED_NFT_PRICE) });
      await contract
        .connect(addr2)
        .publicMint({ value: ethers.utils.parseEther(ESTIMATED_NFT_PRICE) });
      await contract
        .connect(addr2)
        .publicMint({ value: ethers.utils.parseEther(ESTIMATED_NFT_PRICE) });
      await contract
        .connect(addr2)
        .publicMint({ value: ethers.utils.parseEther(ESTIMATED_NFT_PRICE) });

      expect(await contract.balanceOf(addr2.address)).to.equal(ethers.BigNumber.from(5));
    });

    it('Should emit successful transfer event', async () => {
      await expect(
        contract.connect(addr1).publicMint({ value: ethers.utils.parseEther(ESTIMATED_NFT_PRICE) })
      )
        .to.emit(contract, 'Transfer')
        .withArgs(ethers.constants.AddressZero, addr1.address, 1);
    });

    it('Should revert due to insufficient Avax', async () => {
      await expect(
        contract.connect(addr1).publicMint({ value: ethers.utils.parseEther(INSUFFICIENT_AVAX) })
      ).to.be.revertedWith(`Not enough ether to purchase`);
    });

    it(`Contract should have eth balance of ${ESTIMATED_NFT_PRICE} avax after mint`, async () => {
      const provider = waffle.provider;

      await contract
        .connect(addr1)
        .publicMint({ value: ethers.utils.parseEther(ESTIMATED_NFT_PRICE) });

      expect(await provider.getBalance(contract.address)).to.equal(
        ethers.utils.parseEther(ESTIMATED_NFT_PRICE)
      );
    });

    it('Should revert after total supply is minted', async () => {
      const mintMaxSupplyPlusOne = async () => {
        for (let i = 1; i <= MAX_SUPPLY + 1; i++) {
          await contract
            .connect(addr2)
            .publicMint({ value: ethers.utils.parseEther(ESTIMATED_NFT_PRICE) });
        }
      };

      await expect(mintMaxSupplyPlusOne()).to.revertedWith('Already Sold Out');
    });

    it(`Should return total supply of ${MAX_SUPPLY}`, async () => {
      const mintMaxSupplyPlusOne = async () => {
        for (let i = 1; i <= MAX_SUPPLY; i++) {
          await contract
            .connect(addr2)
            .publicMint({ value: ethers.utils.parseEther(ESTIMATED_NFT_PRICE) });
        }
      };

      await mintMaxSupplyPlusOne();

      expect(await contract.totalSupply()).to.equal(ethers.BigNumber.from(MAX_SUPPLY));
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

      await contract
        .connect(addr1)
        .publicMint({ value: ethers.utils.parseEther(ESTIMATED_NFT_PRICE) });

      const tx = await contract.connect(owner).withdraw();
      const receipt = await tx.wait();
      const gasSpent = receipt.gasUsed.mul(receipt.effectiveGasPrice);

      expect(await provider.getBalance(owner.address)).to.equal(
        ethers.utils.parseEther(ESTIMATED_NFT_PRICE).sub(gasSpent).add(startingBalance)
      );
    });

    it('Owner can pause sale', async () => {
      await contract.connect(owner).setSaleState(false);

      await expect(contract.connect(addr1).publicMint()).to.be.revertedWith('Sale not active');
    });
  });

  // describe('Burnable', () => {
  //   it('Should return total supply of 0 after minting and burning', async () => {
  //     await contract
  //       .connect(addr1)
  //       .publicMint({ value: ethers.utils.parseEther(ESTIMATED_NFT_PRICE) });

  //     await contract.connect(addr1).burn(1);

  //     expect(await contract.totalSupply()).to.equal(ethers.BigNumber.from(0));
  //   });
  // });

  describe('Token URI', () => {
    it('Should return correct URI', async () => {
      await contract
        .connect(addr1)
        .publicMint({ value: ethers.utils.parseEther(ESTIMATED_NFT_PRICE) });

      expect(await contract.tokenURI(1)).to.equal(
        'ipfs://bafyreibbhcuoijlbwmxbuq6neafvmodzbgqoxdday62cdmks6rek35yuna/metadata.json'
      );
    });

    it('Should return updated URI', async () => {
      await contract.connect(owner).setTokenURI('ipfs://newTokenURI/metadata.json');

      await contract
        .connect(addr1)
        .publicMint({ value: ethers.utils.parseEther(ESTIMATED_NFT_PRICE) });

      expect(await contract.tokenURI(1)).to.equal('ipfs://newTokenURI/metadata.json');
    });

    it('Should revert because caller is not owner', async () => {
      await expect(
        contract.connect(addr1).setTokenURI('ipfs://newTokenURI/metadata.json')
      ).to.be.revertedWith(ONLY_OWNER_ERROR_MESSAGE);
    });
  });
});
