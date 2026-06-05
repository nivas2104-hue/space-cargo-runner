import Phaser from "phaser";
import MainScene from "./scenes/MainScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 400,
  height: 800,
  backgroundColor: "#000",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [MainScene],
};
