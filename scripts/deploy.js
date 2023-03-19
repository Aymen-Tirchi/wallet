const hre = require("hardhat");

async function main() {
  const walletFactory = await hre.ethers.getContractFactory("Wallet");
  const wallet = await walletFactory.deploy();
  await wallet.deployed();
  console.log("Wallet contract deployed to:", wallet.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
