const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy DatasetNFT contract
  const DatasetNFT = await hre.ethers.getContractFactory("DatasetNFT");
  const datasetNFT = await DatasetNFT.deploy(deployer.address); // Platform wallet is deployer for now

  await datasetNFT.deployed();

  console.log("DatasetNFT deployed to:", datasetNFT.address);
  console.log("Platform wallet set to:", deployer.address);

  // Save deployment info
  const fs = require('fs');
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: datasetNFT.address,
    deployer: deployer.address,
    deployedAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    './deployment-info.json',
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("Deployment info saved to deployment-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });