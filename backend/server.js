require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Health Check
app.get("/", (req, res) => {
  res.json({
    status: "Space Cargo Backend Running",
  });
});

// Get Leaderboard
app.get("/leaderboard", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM leaderboard
      ORDER BY score DESC
      LIMIT 20
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// Save Score
app.post("/score", async (req, res) => {
  try {
    console.log("SCORE RECEIVED:", req.body);

    const { wallet, score } = req.body;

    if (!wallet || score === undefined) {
      return res.status(400).json({
        success: false,
        message: "wallet and score are required",
      });
    }

    await pool.query(
      `
      INSERT INTO leaderboard(user_id, score)
      VALUES($1,$2)
      `,
      [wallet, score],
    );

    const leaderboard = await pool.query(`
      SELECT *
      FROM leaderboard
      ORDER BY score DESC
      LIMIT 20
    `);

    res.json({
      success: true,
      leaderboard: leaderboard.rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.post("/session", async (req, res) => {
  try {
    const { userId, score, coins, cargo } = req.body;

    await pool.query(
      `
      INSERT INTO game_sessions
      (user_id, score, coins, cargo)
      VALUES($1,$2,$3,$4)
      `,
      [userId, score, coins, cargo],
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});
app.post("/user", async (req, res) => {
  try {
    const { username, telegramId, walletAddress } = req.body;

    const userId = telegramId || walletAddress || username;

    const result = await pool.query(
      `
      INSERT INTO users
      (
        user_id,
        telegram_username,
        wallet,
        xp,
        coins
      )
      VALUES($1,$2,$3,0,0)
      ON CONFLICT(user_id)
      DO UPDATE SET
      wallet = COALESCE(EXCLUDED.wallet, users.wallet)
      RETURNING *
      `,
      [userId, username, walletAddress],
    );

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});
import { useState, useEffect } from "react";
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
        userId: username,
        wallet: localStorage.getItem("walletAddress"),
        telegramUsername: username,
      }),
    })
      .then((r) => r.json())
      .then((data) => console.log("User Saved", data))
      .catch(console.error);
  }, [username]);

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
            .then((data) => console.log("Leaderboard Updated", data))
            .catch(console.error);

          fetch("https://space-cargo-runner.onrender.com/session", {
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
          })
            .then((r) => r.json())
            .then((data) => console.log("Session Saved", data))
            .catch(console.error);

          setScreen("gameover");
        }}
      />
    );
  }
  app.post("/user", async (req, res) => {
    console.log("USER RECEIVED:", req.body);
    try {
      const { userId, wallet, telegramUsername } = req.body;

      const result = await pool.query(
        `
      INSERT INTO users
      (user_id, wallet, telegram_username)
      VALUES($1,$2,$3)
      ON CONFLICT(user_id)
      DO NOTHING
      RETURNING *
      `,
        [userId, wallet, telegramUsername],
      );

      res.json({
        success: true,
        user: result.rows[0],
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  });
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

// Start Server
app.listen(process.env.PORT || 3000, () => {
  console.log("Backend running on port 3000");
});
