import { useState } from "react";
import MainMenu from "./components/MainMenu";
import Hangar from "./components/Hangar";
import GameOver from "./components/GameOver";
import GameplayScreen from "./components/GameplayScreen";

type Screen = "menu" | "hangar" | "gameplay" | "gameover";

export default function App() {
  const [screen, setScreen] = useState<Screen>("menu");

  const [finalScore, setFinalScore] = useState(0);
  const [finalCoins, setFinalCoins] = useState(0);
  const [finalCargo, setFinalCargo] = useState(0);
  const [totalCoins, setTotalCoins] = useState(() =>
    Number(localStorage.getItem("totalCoins") || 0),
  );

  const [bestScore, setBestScore] = useState(() =>
    Number(localStorage.getItem("bestScore") || 0),
  );

  if (screen === "menu") {
    return (
      <MainMenu
        onStart={() => setScreen("gameplay")}
        onHangar={() => setScreen("hangar")}
      />
    );
  }

  if (screen === "hangar") {
    return (
      <Hangar
        coins={totalCoins}
        onBack={() => setScreen("menu")}
        onShipSelect={() => {}}
      />
    );
  }

  if (screen === "gameplay") {
    return (
      <GameplayScreen
        initialLives={3}
        initialCoins={0}
        initialFuel={100}
        level={1}
        onGameOver={(score, coins, cargo) => {
          console.log("GAME OVER VALUES", score, coins, cargo);
          setFinalScore(score);
          setFinalCoins(coins);
          setFinalCargo(cargo);
          const wallet = localStorage.getItem("walletAddress") ?? "Guest";

          const leaderboard = JSON.parse(
            localStorage.getItem("leaderboard") ?? "[]",
          );

          leaderboard.push({
            wallet,
            score,
            coins,
            cargo,
            date: Date.now(),
          });

          leaderboard.sort((a: any, b: any) => b.score - a.score);

          localStorage.setItem(
            "leaderboard",
            JSON.stringify(leaderboard.slice(0, 10)),
          );
          const newTotalCoins = totalCoins + coins;
          setTotalCoins(newTotalCoins);
          localStorage.setItem("totalCoins", newTotalCoins.toString());

          const newBestScore = Math.max(bestScore, score);
          setBestScore(newBestScore);
          localStorage.setItem("bestScore", newBestScore.toString());

          fetch("https://space-cargo-runner.onrender.com", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              wallet,
              score,
            }),
          })
            .then((r) => r.json())
            .then((data) => console.log("Leaderboard Updated", data))
            .catch(console.error);
          setScreen("gameover");
        }}
      />
    );
  }

  if (screen === "gameover") {
    return (
      <GameOver
        score={finalScore}
        coins={finalCoins}
        cargo={finalCargo}
        onRetry={() => setScreen("gameplay")}
      />
    );
  }
  return null;
}
