import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy DataNFT contract
  const dataNFT = await ethers.deployContract("DataNFT");
  await dataNFT.waitForDeployment();
  const dataNFTAddress = await dataNFT.getAddress();
  console.log("DataNFT deployed to:", dataNFTAddress);

  // Deploy Marketplace contract
  const marketplace = await ethers.deployContract("Marketplace", [dataNFTAddress]);
  await marketplace.waitForDeployment();
  const marketplaceAddress = await marketplace.getAddress();
  console.log("Marketplace deployed to:", marketplaceAddress);

  console.log("\n--- Seeding Sample Data ---");

  // Mint sample dataset 1
  const dataset1 = {
    cid: "QmXnnyufdzAWL5CqZ2Rn4g2FfbP512jC5A3pZkHbWJ3r2a",
    sha256sum: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    licenseUri: "https://creativecommons.org/publicdomain/zero/1.0/",
    domain: "science",
    tags: ["biology", "genomics"],
    verified: true,
  };
  const mintTx1 = await dataNFT.mint(deployer.address, dataset1);
  const mintReceipt1 = await mintTx1.wait();
  const tokenId1 = 1; // Assuming the first token ID is 1
  console.log(`Minted sample dataset 1 with tokenId: ${tokenId1}`);

  // Set price for sample dataset 1
  const price1 = ethers.parseEther("0.1");
  await marketplace.setPrice(tokenId1, price1);
  console.log(`Set price for tokenId ${tokenId1} to ${ethers.formatEther(price1)} ETH`);

  // Mint sample dataset 2
  const dataset2 = {
    cid: "QmWms6fCqK3Jc7CgN9q2Z5n5wW4E3XzAbK2t2J6H4p5q7",
    sha256sum: "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
    licenseUri: "https://opensource.org/licenses/MIT",
    domain: "finance",
    tags: ["stocks", "trading"],
    verified: false,
  };
  const mintTx2 = await dataNFT.mint(deployer.address, dataset2);
  await mintTx2.wait();
  const tokenId2 = 2; // Assuming the second token ID is 2
  console.log(`Minted sample dataset 2 with tokenId: ${tokenId2}`);

  // Set price for sample dataset 2
  const price2 = ethers.parseEther("0.5");
  await marketplace.setPrice(tokenId2, price2);
  console.log(`Set price for tokenId ${tokenId2} to ${ethers.formatEther(price2)} ETH`);

  console.log("\n--- Deployment and Seeding Complete ---");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
