import pkg from "hardhat";

const { ethers } = pkg;

async function main() {
  const [signer] = await ethers.getSigners();

  console.log("Wallet:", signer.address);

  const balance = await signer.getBalance();

  console.log("Balance:", ethers.utils.formatEther(balance), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch(console.error);
