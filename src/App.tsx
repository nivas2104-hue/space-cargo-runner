import { useState, useEffect } from "react";
import MainMenu from "./components/MainMenu";
import Hangar from "./components/Hangar";
import GameOver from "./components/GameOver";
import GameplayScreen from "./components/GameplayScreen";
import Profile from "./components/Profile";
import { getTelegramUser } from "./utils/telegram";
import { injectGlobalStyles } from "./components/design-system";
type Screen = "menu" | "hangar" | "gameplay" | "gameover" | "profile";
export default function App() {
  useEffect(() => {
    injectGlobalStyles();
  }, []);
  const [screen, setScreen] = useState<Screen>("menu");
  useEffect(() => {
    const tgUser = getTelegramUser();

    console.log("TELEGRAM USER:", tgUser);
    if (!tgUser) return;

    fetch("https://space-cargo-runner.onrender.com/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: tgUser.username,
        telegramId: tgUser.id,
      }),
    });
  }, []);
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
  const tgUser = getTelegramUser();
  const [selectedShip, setSelectedShip] = useState(
    localStorage.getItem("selectedShip") || "VIPER_MK1",
  );
  const [username] = useState(() => {
    if (tgUser?.username) {
      localStorage.setItem("username", tgUser.username);
      return tgUser.username;
    }

    let name = localStorage.getItem("username");

    if (!name) {
      name = "Guest";
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
        username: tgUser?.username || username,
        telegramId: tgUser?.id?.toString() || null,
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
        onShipSelect={(ship) => {
          setSelectedShip(ship);
          localStorage.setItem("selectedShip", ship);
        }}
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
        selectedShip={selectedShip}
        initialLives={3}
        initialCoins={0}
        initialFuel={100}
        level={1}
        onGameOver={(score, coins, cargo) => {
          console.log("GAME OVER VALUES", score, coins, cargo);

          setFinalScore(score);
          setFinalCoins(coins);
          setFinalCargo(cargo);

          const userId =
            tgUser?.id?.toString() ||
            localStorage.getItem("walletAddress") ||
            username;
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
            .then(async (data) => {
              console.log("SCORE RESPONSE", data);

              if (data.xpEarned) {
                setXp((prev) => prev + data.xpEarned);
              }

              await fetch("https://space-cargo-runner.onrender.com/session", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId,
                  score,
                  coins,
                  cargo,
                }),
              });

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
        onHangar={() => setScreen("hangar")}
      />
    );
  }

  return null;
}
