import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("https://space-cargo-runner.onrender.com/leaderboard")
      .then((r) => r.json())
      .then(setPlayers);
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>

      {players.map((p: any, i) => (
        <div key={i}>
          #{i + 1} {p.user_id} {p.score}
        </div>
      ))}
    </div>
  );
}
