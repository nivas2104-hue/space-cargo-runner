import { useState, useEffect } from "react";
import MainMenu from "./components/MainMenu";
import Hangar from "./components/Hangar";
import GameOver from "./components/GameOver";
import GameplayScreen from "./components/GameplayScreen";
import Profile from "./components/Profile";
type Screen = "menu" | "hangar" | "gameplay" | "gameover" | "profile";
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
  const [xp, setXp] = useState(0);
  const [username] = useState(() => {
    let name = localStorage.getItem("username");

    if (!name) {
      name = prompt("Enter Username") || "Guest";
      localStorage.setItem("username", name);
    }

    return name;
  });

  useEffect(() => {
    fetch("https://space-cargo-runner.onrender.com/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        telegramId: null,
        walletAddress: localStorage.getItem("walletAddress"),
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log("User Saved", data);

        if (data.user) {
          setXp(data.user.xp || 0);
        }
      })
      .catch(console.error);
  }, [username]);

  if (screen === "menu") {
    return (
      <MainMenu
        onStart={() => setScreen("gameplay")}
        onHangar={() => setScreen("hangar")}
        onProfile={() => setScreen("profile")}
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
  if (screen === "profile") {
    return (
      <Profile
        username={username}
        xp={xp}
        bestScore={bestScore}
        totalCoins={totalCoins}
        onBack={() => setScreen("menu")}
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

          const userId = username;

          const leaderboard = JSON.parse(
            localStorage.getItem("leaderboard") ?? "[]",
          );

          leaderboard.push({
            wallet: userId,
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

          fetch("https://space-cargo-runner.onrender.com/score", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              wallet: userId,
              score,
            }),
          })
            .then((r) => r.json())
            .then((data) => {
              console.log("Leaderboard Updated", data);

              if (data.xpEarned) {
                alert(`+${data.xpEarned} XP Earned`);
              }

              setScreen("gameover");
            })
            .catch((err) => {
              console.error(err);
              setScreen("gameover");
            });
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
