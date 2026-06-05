import { useEffect, useRef } from "react";
import Phaser from "phaser";
import { gameConfig } from "../game/config";

export default function GameCanvas() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = new Phaser.Game(gameConfig);
    }

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div
      id="game-container"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
