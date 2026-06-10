import pkg from "hardhat";

const { ethers } = pkg;

async function main() {
  const GameRewards = await ethers.getContractFactory("GameRewards");

  const contract = await GameRewards.deploy();

  await contract.deployed();

  console.log("Deployed:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
