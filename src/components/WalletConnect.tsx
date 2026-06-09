import { useState } from "react";
import { BrowserProvider } from "ethers";

export default function WalletConnect() {
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    try {
      if (!(window as any).ethereum) {
        alert("Install MetaMask");
        return;
      }

      const provider = new BrowserProvider((window as any).ethereum);

      const accounts = await provider.send("eth_requestAccounts", []);

      setAddress(accounts[0]);

      localStorage.setItem("walletAddress", accounts[0]);

      await fetch("https://space-cargo-runner.onrender.com/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress: accounts[0],
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <button
        onClick={connectWallet}
        style={{
          width: 260,
          height: 52,
          borderRadius: 999,
          border: "none",
          cursor: "pointer",
          fontWeight: 800,
          background: "linear-gradient(180deg,#4fc3ff,#1e8cff)",
          color: "#fff",
        }}
      >
        {address ? "Wallet Connected" : "Connect Wallet"}
      </button>

      {address && (
        <div
          style={{
            color: "#4fc3ff",
            fontSize: 12,
          }}
        >
          {address.slice(0, 6)}...
          {address.slice(-4)}
        </div>
      )}
    </div>
  );
}
