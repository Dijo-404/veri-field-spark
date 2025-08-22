import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { DataNFT, Marketplace } from "../typechain-types";

describe("Marketplace", function () {
    let dataNFT: DataNFT;
    let marketplace: Marketplace;
    let owner: HardhatEthersSigner;
    let addr1: HardhatEthersSigner;
    let addr2: HardhatEthersSigner;

    const dataset1 = {
        cid: "QmXnnyufdzAWL5CqZ2Rn4g2FfbP512jC5A3pZkHbWJ3r2a",
        sha256sum: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        licenseUri: "https://creativecommons.org/publicdomain/zero/1.0/",
        domain: "science",
        tags: ["biology", "genomics"],
        verified: true,
    };

    async function deployContractsFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        const dataNFTFactory = await ethers.getContractFactory("DataNFT");
        const dataNFT = await dataNFTFactory.deploy();
        const dataNFTAddress = await dataNFT.getAddress();

        const marketplaceFactory = await ethers.getContractFactory("Marketplace");
        const marketplace = await marketplaceFactory.deploy(dataNFTAddress);

        return { dataNFT, marketplace, owner, addr1, addr2 };
    }

    beforeEach(async function () {
        const fixture = await loadFixture(deployContractsFixture);
        dataNFT = fixture.dataNFT;
        marketplace = fixture.marketplace;
        owner = fixture.owner;
        addr1 = fixture.addr1;
        addr2 = fixture.addr2;
    });

    describe("Deployment", function () {
        it("Should set the right DataNFT address", async function () {
            expect(await marketplace.dataNFTAddress()).to.equal(await dataNFT.getAddress());
        });
    });

    describe("Transactions", function () {
        const tokenId = 1;
        const price = ethers.parseEther("1.0");

        beforeEach(async function () {
            await dataNFT.connect(owner).mint(addr1.address, dataset1);
        });

        it("Should allow token owner to set price", async function () {
            await marketplace.connect(addr1).setPrice(tokenId, price);
            expect(await marketplace.getPrice(tokenId)).to.equal(price);
        });

        it("Should not allow non-owner to set price", async function () {
            await expect(marketplace.connect(addr2).setPrice(tokenId, price))
                .to.be.revertedWith("Marketplace: Not the owner");
        });

        it("Should allow a user to buy a token", async function () {
            await marketplace.connect(addr1).setPrice(tokenId, price);
            await dataNFT.connect(addr1).approve(await marketplace.getAddress(), tokenId);

            const sellerBalanceBefore = await ethers.provider.getBalance(addr1.address);

            await marketplace.connect(addr2).buy(tokenId, { value: price });

            const sellerBalanceAfter = await ethers.provider.getBalance(addr1.address);

            expect(await dataNFT.ownerOf(tokenId)).to.equal(addr2.address);
            expect(sellerBalanceAfter).to.equal(sellerBalanceBefore + price);
        });

        it("Should fail if incorrect price is sent", async function () {
            await marketplace.connect(addr1).setPrice(tokenId, price);
            const wrongPrice = ethers.parseEther("0.5");
            await expect(marketplace.connect(addr2).buy(tokenId, { value: wrongPrice }))
                .to.be.revertedWith("Marketplace: Incorrect price");
        });

        it("Should emit Purchased event on successful buy", async function () {
            await marketplace.connect(addr1).setPrice(tokenId, price);
            await dataNFT.connect(addr1).approve(await marketplace.getAddress(), tokenId);
            await expect(marketplace.connect(addr2).buy(tokenId, { value: price }))
                .to.emit(marketplace, "Purchased")
                .withArgs(tokenId, addr2.address, price);
        });
    });
});
