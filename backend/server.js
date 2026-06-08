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
    const earnedXP = Math.floor(score / 10);

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
    await pool.query(
      `
  UPDATE users
  SET xp = COALESCE(xp,0) + $1
  WHERE user_id = $2
  `,
      [earnedXP, wallet],
    );
    const leaderboard = await pool.query(`
      SELECT *
      FROM leaderboard
      ORDER BY score DESC
      LIMIT 20
    `);

    res.json({
      success: true,
      xpEarned: earnedXP,
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

// Start Server
app.listen(process.env.PORT || 3000, () => {
  console.log("Backend running on port 3000");
});
