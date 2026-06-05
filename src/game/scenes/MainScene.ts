import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  private ship!: Phaser.GameObjects.Image;
  private asteroids: Phaser.GameObjects.Image[] = [];
  private cargo!: Phaser.GameObjects.Image;

  private gameOver = false;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private score = 0;
  private cargoCount = 0;

  private coins = 0;
  private level = 1;

  private scoreText!: Phaser.GameObjects.Text;
  private cargoText!: Phaser.GameObjects.Text;
  private coinsText!: Phaser.GameObjects.Text;

  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("background", "src/assets/background.png");
    this.load.image("ship", "src/assets/ship.png");
    this.load.image("asteroid", "src/assets/asteroid.png");
    this.load.image("cargo", "src/assets/cargo.png");
  }

  create() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    const bg = this.add.image(gameWidth / 2, gameHeight / 2, "background");

    bg.setDisplaySize(gameWidth, gameHeight);

    this.coins = Number(localStorage.getItem("coins")) || 0;

    this.ship = this.add.image(gameWidth / 2, gameHeight - 180, "ship");

    this.ship.setScale(0.16);
    this.ship.setTint(0xffffff);

    this.cursors = this.input.keyboard!.createCursorKeys();

    this.scoreText = this.add.text(20, 20, "Score: 0", {
      fontSize: "32px",
      color: "#ffffff",
    });

    this.cargoText = this.add.text(20, 60, "Cargo: 0", {
      fontSize: "32px",
      color: "#00ff88",
    });

    this.coinsText = this.add.text(20, 100, `Coins: ${this.coins}`, {
      fontSize: "32px",
      color: "#ffd700",
    });

    for (let i = 0; i < 5; i++) {
      const asteroid = this.add.image(
        Phaser.Math.Between(80, gameWidth - 80),
        Phaser.Math.Between(-1200, -100),
        "asteroid",
      );

      asteroid.setScale(Phaser.Math.FloatBetween(0.04, 0.1));

      this.asteroids.push(asteroid);
    }

    this.cargo = this.add.image(
      Phaser.Math.Between(100, gameWidth - 100),
      -300,
      "cargo",
    );

    this.cargo.setScale(0.08);
  }

  update() {
    if (this.gameOver) return;

    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;

    this.score++;

    this.level = Math.floor(this.score / 1000) + 1;

    this.scoreText.setText(`Score: ${Math.floor(this.score / 10)}`);

    if (this.cursors.left.isDown) {
      this.ship.x -= 8;
    }

    if (this.cursors.right.isDown) {
      this.ship.x += 8;
    }

    if (this.ship.x < 80) {
      this.ship.x = 80;
    }

    if (this.ship.x > gameWidth - 80) {
      this.ship.x = gameWidth - 80;
    }

    for (const asteroid of this.asteroids) {
      asteroid.y += 8 + this.level;

      asteroid.rotation += 0.01;

      if (asteroid.y > gameHeight + 100) {
        asteroid.y = Phaser.Math.Between(-800, -100);

        asteroid.x = Phaser.Math.Between(80, gameWidth - 80);
      }

      const distance = Phaser.Math.Distance.Between(
        this.ship.x,
        this.ship.y,
        asteroid.x,
        asteroid.y,
      );

      if (distance < 70) {
        this.gameOver = true;

        this.add
          .text(gameWidth / 2, gameHeight / 2 - 100, "GAME OVER", {
            fontSize: "64px",
            color: "#ff4444",
          })
          .setOrigin(0.5);

        this.add
          .text(
            gameWidth / 2,
            gameHeight / 2,
            `Score: ${Math.floor(this.score / 10)}`,
            {
              fontSize: "40px",
              color: "#ffffff",
            },
          )
          .setOrigin(0.5);

        this.add
          .text(gameWidth / 2, gameHeight / 2 + 60, `Coins: ${this.coins}`, {
            fontSize: "40px",
            color: "#ffd700",
          })
          .setOrigin(0.5);

        return;
      }
    }

    this.cargo.y += 6;

    if (this.cargo.y > gameHeight + 100) {
      this.cargo.y = -200;

      this.cargo.x = Phaser.Math.Between(100, gameWidth - 100);
    }

    const cargoDistance = Phaser.Math.Distance.Between(
      this.ship.x,
      this.ship.y,
      this.cargo.x,
      this.cargo.y,
    );

    if (cargoDistance < 70) {
      this.cargoCount++;
      this.coins += 100;

      localStorage.setItem("coins", this.coins.toString());

      this.cargoText.setText(`Cargo: ${this.cargoCount}`);

      this.coinsText.setText(`Coins: ${this.coins}`);

      this.cargo.y = -200;

      this.cargo.x = Phaser.Math.Between(100, gameWidth - 100);
    }
  }
}
