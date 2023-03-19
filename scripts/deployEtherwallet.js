const hre = require("hardhat");

async function main() {
  const Etherwallet = await hre.ethers.getContractFactory("Etherwallet");
  const etherwallet = await Etherwallet.deploy();
  await etherwallet.deployed();
  console.log("saving contract deployed to:", etherwallet.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
