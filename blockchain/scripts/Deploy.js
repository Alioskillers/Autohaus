const hre = require("hardhat");

async function main() {
  const CarPurchase = await hre.ethers.getContractFactory("CarPurchase");
  const contract = await CarPurchase.deploy();

  console.log("CarPurchase deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});