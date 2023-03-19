const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Wallet", function () {
  let Wallet;
  let wallet;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    Wallet = await ethers.getContractFactory("Wallet");
    wallet = await Wallet.connect(owner).deploy();
  });

  it("should deposit", async function () {
    await wallet.deposit({ value: ethers.utils.parseEther("1.0") });
    const balance = await wallet.balanceOf(owner.address);
    assert.equal(balance.toString(), ethers.utils.parseEther("1.0").toString());
  });
});
