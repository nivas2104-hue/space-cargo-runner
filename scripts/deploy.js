import hre from "hardhat";

async function main() {
  const GameRewards = await hre.ethers.getContractFactory("GameRewards");

  const contract = await GameRewards.deploy();

  await contract.waitForDeployment();

  console.log("Deployed:", await contract.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
