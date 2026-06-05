const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());

let leaderboard = [];

if (fs.existsSync("leaderboard.json")) {
  leaderboard = JSON.parse(fs.readFileSync("leaderboard.json", "utf8"));
}
// Health check
app.get("/", (req, res) => {
  res.json({
    status: "Space Cargo Backend Running",
  });
});

// Get leaderboard
app.get("/leaderboard", (req, res) => {
  res.json(leaderboard);
});

// Submit score
app.post("/score", (req, res) => {
  console.log("SCORE RECEIVED:", req.body);
  const { wallet, score } = req.body;

  if (!wallet || score === undefined) {
    return res.status(400).json({
      success: false,
      message: "wallet and score are required",
    });
  }

  leaderboard.push({
    wallet,
    score,
    date: Date.now(),
  });

  leaderboard.sort((a, b) => b.score - a.score);
  fs.writeFileSync("leaderboard.json", JSON.stringify(leaderboard, null, 2));
  res.json({
    success: true,
    leaderboard,
  });
});

// Start server
app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
