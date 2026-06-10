import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "./GameRewards";

export async function saveScoreOnChain(score: number) {
  if (!(window as any).ethereum) {
    throw new Error("MetaMask not found");
  }

  const provider = new ethers.providers.Web3Provider((window as any).ethereum);

  const signer = provider.getSigner();

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  const tx = await contract.saveScore(score);

  await tx.wait();

  console.log("ON CHAIN SCORE SAVED");

  return tx.hash;
}
