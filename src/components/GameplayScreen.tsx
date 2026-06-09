import { useState, useEffect, useRef, useCallback } from "react";
import ShipSVG from "../components/ShipSVG";
import PauseOverlay from "./gameplay/PauseOverlay";
import GameplayHUD from "./gameplay/GameplayHUD";
import BackgroundEffects from "./gameplay/BackgroundEffects";
import { CrateSVG, HeartSVG, FuelBolt } from "./gameplay/GameSVGs";
import GameObjects from "./gameplay/GameObjects";
import { COLOR, injectGlobalStyles } from "./design-system";

// ─── Types ────────────────────────────────────────────────────────────────────
interface GameplayScreenProps {
  selectedShip?: string;
  initialLives?: number;
  initialCoins?: number;
  initialFuel?: number;
  level?: number;
  onPause?: () => void;
  onGameOver?: (score: number, coins: number, cargo: number) => void;
}
interface Star {
  id: number;
  x: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}
interface CargoCrate {
  id: number;
  x: number;
  y: number;
  speed: number;
  coinValue: number;
}
interface FloatingCoin {
  id: number;
  x: number;
  y: number;
  speed: number;
}
interface FuelCan {
  id: number;
  x: number;
  y: number;
  speed: number;
}
interface Asteroid {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotateSpeed: number;
  isMeteor?: boolean;
}
interface LaserWall {
  id: number;
  gapX: number;
  y: number;
  speed: number;
}
interface Drone {
  id: number;
  x: number;
  y: number;
  speed: number;
  direction: 1 | -1;
}

// ─── Deterministic seeded random ──────────────────────────────────────────────
const seededRand = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

// ─── Generate background objects ──────────────────────────────────────────────
const generateStars = (): Star[] => {
  const r = seededRand(42);
  return Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: r() * 100,
    size: i % 6 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1,
    opacity: 0.15 + r() * 0.7,
    duration: 4 + r() * 12,
    delay: -(r() * 16),
    // Updated star colors — cyan/white only, no purple
    color: i % 9 === 0 ? COLOR.cyanSoft : i % 13 === 0 ? COLOR.cyan : "#fff",
  }));
};

const generateWarpLines = () => {
  const r = seededRand(77);
  return Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: r() * 100,
    width: 1 + r() * 1,
    height: 40 + r() * 80,
    duration: 0.4 + r() * 0.5,
    delay: -(r() * 1.5),
    opacity: 0.08 + r() * 0.12,
  }));
};

// ─── Spawn helpers (all logic unchanged) ─────────────────────────────────────
let asteroidCounter = 100;
const spawnAsteroid = (r: () => number): Asteroid => {
  const lanes = [12, 25, 38, 52, 65, 78, 88];
  return {
    id: asteroidCounter++,
    x: lanes[Math.floor(r() * lanes.length)] + (r() * 6 - 3),
    y: -10,
    size: 28 + Math.floor(r() * 36),
    speed: 0.008 + r() * 0.004,
    rotateSpeed: (1 + r() * 3) * (r() > 0.5 ? 1 : -1),
  };
};

let crateCounter = 200;
const spawnCrate = (r: () => number): CargoCrate => ({
  id: crateCounter++,
  x: 8 + r() * 84,
  y: -10,
  speed: 0.006 + r() * 0.003,
  coinValue: r() > 0.7 ? 20 : 10,
});

let coinCounter = 300;
const spawnCoin = (r: () => number): FloatingCoin => ({
  id: coinCounter++,
  x: 8 + r() * 84,
  y: -10,
  speed: 0.007 + r() * 0.003,
});

let laserCounter = 1000;
const spawnLaserWall = (r: () => number): LaserWall => ({
  id: laserCounter++,
  gapX: 20 + r() * 60,
  y: -10,
  speed: 0.007,
});

let fuelCounter = 500;
const spawnFuelCan = (r: () => number): FuelCan => ({
  id: fuelCounter++,
  x: 8 + r() * 84,
  y: -10,
  speed: 0.006 + r() * 0.002,
});

let droneCounter = 2000;
const spawnDrone = (r: () => number): Drone => {
  const fromLeft = r() > 0.5;
  return {
    id: droneCounter++,
    x: fromLeft ? -10 : 110,
    y: 45 + r() * 30,
    speed: 0.018 + r() * 0.008,
    direction: fromLeft ? 1 : -1,
  };
};

// ─── Ship theme — updated to design-system palette ───────────────────────────
const SHIP_THEMES: Record<string, string> = {
  viper: COLOR.cyan,
  falcon: COLOR.cyanSoft,
  storm: "#FF6688",
  nebula: COLOR.amber,
  phantom: COLOR.green,
  nova: "#FF44CC",
};

// ─── Main Component ────────────────────────────────────────────────────────────
export default function GameplayScreen({
  selectedShip = "viper",
  initialLives = 3,
  initialCoins = 0,
  initialFuel = 100,
  level = 1,
  onPause,
  onGameOver,
}: GameplayScreenProps) {
  // ── All state/refs unchanged ──────────────────────────────────────────────
  const [lives, setLives] = useState(initialLives);
  const [coins, setCoins] = useState(initialCoins);

  const savedUpgrades = JSON.parse(localStorage.getItem("upgrades") || "[]");
  const engineLevel =
    savedUpgrades.find((u: any) => u.id === "engine")?.cur || 0;
  const shieldLevel =
    savedUpgrades.find((u: any) => u.id === "shield")?.cur || 0;
  const fuelLevel = savedUpgrades.find((u: any) => u.id === "fuel")?.cur || 0;
  const magnetLevel =
    savedUpgrades.find((u: any) => u.id === "magnet")?.cur || 0;
  const maxFuel = 100 + fuelLevel * 25;

  const [fuel, setFuel] = useState(initialFuel + fuelLevel * 25);
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [cargo, setCargo] = useState(0);
  const [showDeliveryPortal, setShowDeliveryPortal] = useState(false);
  const [portalTimer, setPortalTimer] = useState(10);
  const [isPaused, setIsPaused] = useState(false);
  const [shipX, setShipX] = useState(50);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [crates, setCrates] = useState<CargoCrate[]>([]);
  const [floatingCoins, setFloatingCoins] = useState<FloatingCoin[]>([]);
  const [fuelCans, setFuelCans] = useState<FuelCan[]>([]);
  const [laserWalls, setLaserWalls] = useState<LaserWall[]>([]);
  const [drones, setDrones] = useState<Drone[]>([]);
  const [scorePopups, setScorePopups] = useState<
    { id: number; x: number; y: number; val: string }[]
  >([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hitFlash, setHitFlash] = useState(false);
  const [deliveries, setDeliveries] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("highScore") || 0),
  );

  const scoreRef = useRef(0);
  const coinsRef = useRef(0);
  const cargoRef = useRef(0);
  const stars = useRef<Star[]>(generateStars());
  const warpLines = useRef(generateWarpLines());
  const randRef = useRef(seededRand(Date.now()));
  const frameRef = useRef<number>(0);
  const lastSpawnAsteroid = useRef(0);
  const lastMeteorShower = useRef(0);
  const lastSpawnCrate = useRef(0);
  const lastSpawnCoin = useRef(0);
  const lastSpawnFuel = useRef(0);
  const lastSpawnLaser = useRef(0);
  const lastSpawnDrone = useRef(0);
  const lastFuelTick = useRef(0);
  const shipXRef = useRef(50);
  const levelRef = useRef(1);
  const lastScoreTick = useRef(0);
  const gameTimeRef = useRef(0);
  const popupCounter = useRef(0);
  const lastTimeRef = useRef(performance.now());

  const shipTheme = SHIP_THEMES[selectedShip] ?? COLOR.cyan;

  const savedShips = JSON.parse(localStorage.getItem("ships") || "[]");
  const currentShip = savedShips.find((s: any) => s.id === selectedShip);
  const shipSpeed = currentShip?.spd || 50;
  const shipShield = currentShip?.shd || 50;
  const shipCargo = currentShip?.cap || 50;
  const cargoCapacity = Math.floor(shipCargo / 5);

  // ── Refs synced ───────────────────────────────────────────────────────────
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  useEffect(() => {
    coinsRef.current = coins;
  }, [coins]);
  useEffect(() => {
    cargoRef.current = cargo;
  }, [cargo]);

  useEffect(() => {
    if (!showDeliveryPortal) return;
    const timer = setInterval(() => {
      setPortalTimer((prev) => {
        if (prev <= 1) {
          setShowDeliveryPortal(false);
          setCargo(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showDeliveryPortal]);

  useEffect(() => {
    injectGlobalStyles();
  }, []);

  useEffect(() => {
    if (isGameOver && score > highScore) {
      localStorage.setItem("highScore", String(score));
      setHighScore(score);
    }
  }, [isGameOver]);

  // ── Game handlers (all logic unchanged) ──────────────────────────────────
  const triggerGameOver = () => {
    console.log("GAME OVER TRIGGERED");
    localStorage.setItem(
      "runStats",
      JSON.stringify({
        score: scoreRef.current,
        cargo: cargoRef.current,
        deliveries,
      }),
    );
    setIsGameOver(true);
    setTimeout(() => {
      onGameOver?.(scoreRef.current, coinsRef.current, cargoRef.current);
    }, 0);
  };

  const handlePause = useCallback(() => {
    setIsPaused((p) => !p);
    onPause?.();
  }, [onPause]);

  const handleShipMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      const newX = Math.max(8, Math.min(92, pct));
      setShipX((prev) => {
        const moveSpeed = Math.min(shipSpeed / 100, 0.95);
        const next = prev + (newX - prev) * moveSpeed;
        shipXRef.current = next;
        return next;
      });
    },
    [],
  );

  const SHIP_HITBOX_WIDTH = 7;
  const SHIP_HITBOX_HEIGHT = 6;

  const checkCollision = (shipX: number, objX: number, objY: number) => {
    const noseHit = Math.abs(shipX - objX) <= 4 && Math.abs(70 - objY) <= 4;

    const wingHit = Math.abs(shipX - objX) <= 8 && Math.abs(76 - objY) <= 3;

    return noseHit || wingHit;
  };

  const addScorePopup = (x: number, y: number, val: string) => {
    const id = popupCounter.current++;
    setScorePopups((prev) => [...(prev ?? []).slice(-5), { id, x, y, val }]);
    setTimeout(
      () => setScorePopups((prev) => (prev ?? []).filter((p) => p.id !== id)),
      900,
    );
  };

  // ── Game tick (all logic unchanged) ──────────────────────────────────────
  const tick = (now: number) => {
    const dt = now - lastTimeRef.current;
    lastTimeRef.current = now;
    gameTimeRef.current += dt;
    const t = gameTimeRef.current;

    const asteroidInterval = Math.max(350, 1800 - levelRef.current * 120);
    if (t - lastSpawnAsteroid.current > asteroidInterval) {
      lastSpawnAsteroid.current = t;
      setAsteroids((prev) => [
        ...prev.slice(-30),
        spawnAsteroid(randRef.current),
      ]);
    }
    if (levelRef.current >= 10 && t - lastMeteorShower.current > 7000) {
      lastMeteorShower.current = t;
      setAsteroids((prev) => [
        ...prev,
        {
          ...spawnAsteroid(randRef.current),
          isMeteor: true,
          size: 45 + Math.random() * 40,
        },
        {
          ...spawnAsteroid(randRef.current),
          isMeteor: true,
          size: 45 + Math.random() * 40,
        },
        {
          ...spawnAsteroid(randRef.current),
          isMeteor: true,
          size: 45 + Math.random() * 40,
        },
        {
          ...spawnAsteroid(randRef.current),
          isMeteor: true,
          size: 45 + Math.random() * 40,
        },
        {
          ...spawnAsteroid(randRef.current),
          isMeteor: true,
          size: 45 + Math.random() * 40,
        },
      ]);
    }

    const crateInterval = Math.max(800, 2800 - levelRef.current * 100);
    if (t - lastSpawnCrate.current > crateInterval) {
      lastSpawnCrate.current = t;
      setCrates((prev) => [...prev.slice(-8), spawnCrate(randRef.current)]);
    }
    if (t - lastSpawnCoin.current > 1600) {
      lastSpawnCoin.current = t;
      setFloatingCoins((prev) => [
        ...prev.slice(-10),
        spawnCoin(randRef.current),
      ]);
    }
    if (t - lastSpawnFuel.current > 10000) {
      lastSpawnFuel.current = t;
      console.log("FUEL SPAWNED");
      setFuelCans((prev) => [...prev.slice(-3), spawnFuelCan(randRef.current)]);
    }

    if (t - lastFuelTick.current > 400) {
      lastFuelTick.current = t;
      const fuelDrain = 0.8 + levelRef.current * 0.18;
      setFuel((f) => Math.max(0, f - fuelDrain));
    }
    if (levelRef.current >= 6 && t - lastSpawnLaser.current > 12000) {
      lastSpawnLaser.current = t;
      setLaserWalls((prev) => [
        ...prev.slice(-2),
        spawnLaserWall(randRef.current),
      ]);
    }

    if (t - lastScoreTick.current > 100) {
      lastScoreTick.current = t;
      setScore((s) => {
        const newScore = s + 5;
        const newLevel = Math.floor(newScore / 1000) + 1;
        levelRef.current = newLevel;
        setCurrentLevel(newLevel);
        return newScore;
      });
    }
    if (levelRef.current >= 10 && t - lastSpawnDrone.current > 6000) {
      lastSpawnDrone.current = t;
      setDrones((prev) => [...prev.slice(-4), spawnDrone(randRef.current)]);
    }

    setAsteroids((prev) =>
      prev
        .map((a) => ({
          ...a,
          y:
            a.y +
            a.speed *
              dt *
              (1 + levelRef.current * 0.25) *
              (1 + engineLevel * 0.1),
        }))
        .filter((a) => a.y < 140),
    );
    setAsteroids((prev) => {
      const remaining: Asteroid[] = [];
      prev.forEach((a) => {
        if (checkCollision(shipXRef.current, a.x, a.y, 5, 6)) {
          setHitFlash(true);
          setTimeout(() => setHitFlash(false), 150);
          setLives((l) => {
            const damageMultiplier = 1 - shipShield / 120;
            const next = l - damageMultiplier;
            if (next <= 0.5) {
              triggerGameOver();
              return 0;
            }
            return next;
          });
        } else {
          remaining.push(a);
        }
      });
      return remaining;
    });

    setCrates((prev) => {
      const remaining: CargoCrate[] = [];
      prev.forEach((c) => {
        const nextY =
          c.y + c.speed * dt * levelRef.current * (1 + engineLevel * 0.1);
        if (
          checkCollision(shipXRef.current, c.x, nextY, 10 + magnetLevel * 3, 8)
        ) {
          setCargo((v) => {
            const nextCargo = Math.min(cargoCapacity, v + 1);
            if (
              nextCargo >= cargoCapacity &&
              !showDeliveryPortal &&
              v < cargoCapacity
            ) {
              setPortalTimer(10);
              setShowDeliveryPortal(true);
            }
            return nextCargo;
          });
          const cargoBonus = Math.floor(shipCargo / 5);
          setCoins((v) => v + 25 + cargoBonus);
          setFuel((v) => Math.min(maxFuel, v + 3));
          setScore((v) => v + 100);
          addScorePopup(c.x, nextY, "+100");
        } else if (nextY < 140) {
          remaining.push({ ...c, y: nextY });
        }
      });
      return remaining;
    });

    setFloatingCoins((prev) => {
      const remaining: FloatingCoin[] = [];
      prev.forEach((c) => {
        const nextY =
          c.y + c.speed * dt * levelRef.current * (1 + engineLevel * 0.1);
        if (
          checkCollision(shipXRef.current, c.x, nextY, 11 + magnetLevel * 3, 8)
        ) {
          setCoins((v) => v + 10);
          setScore((v) => v + 25);
          addScorePopup(c.x, nextY, "+25");
        } else if (nextY < 140) {
          remaining.push({ ...c, y: nextY });
        }
      });
      return remaining;
    });

    setFuelCans((prev) => {
      const remaining: FuelCan[] = [];
      prev.forEach((f) => {
        const nextY = f.y + f.speed * dt * levelRef.current;
        if (checkCollision(shipXRef.current, f.x, nextY, 8, 7)) {
          setFuel((v) => Math.min(maxFuel, v + 20));
          addScorePopup(f.x, nextY, "+FUEL");
        } else if (nextY < 140) {
          remaining.push({ ...f, y: nextY });
        }
      });
      return remaining;
    });

    setLaserWalls((prev) => {
      const remaining: LaserWall[] = [];
      prev.forEach((wall) => {
        const nextY = wall.y + wall.speed * dt * levelRef.current;
        const inGap =
          shipXRef.current > wall.gapX - 12 &&
          shipXRef.current < wall.gapX + 12;
        if (Math.abs(nextY - 80) < 5 && !inGap) {
          triggerGameOver();
          return;
        }
        if (nextY < 140) {
          remaining.push({ ...wall, y: nextY });
        }
      });
      return remaining;
    });

    setDrones((prev) => {
      const remaining: Drone[] = [];
      prev.forEach((d) => {
        const nextX =
          d.x + d.speed * dt * d.direction * (1 + levelRef.current * 0.05);
        if (checkCollision(shipXRef.current, nextX, d.y, 5, 4)) {
          triggerGameOver();
          return;
        }
        if (nextX > -20 && nextX < 120) {
          remaining.push({ ...d, x: nextX, y: d.y + Math.sin(t / 300) * 0.08 });
        }
      });
      return remaining;
    });

    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (isPaused || isGameOver) return;
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isPaused, isGameOver, level]);

  useEffect(() => {
    if (fuel <= 0 && lives > 0) triggerGameOver();
  }, [fuel, lives]);
  useEffect(() => {
    if (isGameOver) cancelAnimationFrame(frameRef.current);
  }, [isGameOver]);

  const handleCollectCrate = (id: number, x: number) => {
    setCargo((c) => Math.min(cargoCapacity, c + 1));
    setCoins((c) => c + 25);
    setScore((s) => s + 100);
    setCrates((prev) => prev.filter((c) => c.id !== id));
    addScorePopup(x, 60, "+100");
  };
  const handleCollectCoin = (id: number, x: number) => {
    setCoins((c) => c + 10);
    setScore((s) => s + 25);
    setFloatingCoins((prev) => prev.filter((coin) => coin.id !== id));
    addScorePopup(x, 50, "+25");
  };
  const handleHitAsteroid = (id: number) => {
    setLives((l) => {
      const damage = shieldLevel >= 3 ? 0 : shieldLevel >= 2 ? 0.5 : 1;
      const newLives = l - damage;
      if (newLives <= 0) {
        triggerGameOver();
        return 0;
      }
      return newLives;
    });
    setAsteroids((prev) => prev.filter((a) => a.id !== id));
  };

  const fuelPct = Math.round(
    Math.max(0, Math.min(100, (fuel / maxFuel) * 100)),
  );
  const isLowFuel = fuelPct < 25;
  const fuelColor = "linear-gradient(90deg,#00A0B8,#00E5FF,#4FD1FF)"; // updated to cyan

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        margin: 0,
        overflow: "hidden",
        userSelect: "none",
        touchAction: "none",
        // Updated: deep navy instead of purple
        background: `radial-gradient(ellipse at 50% 25%, #0D1830 0%, ${COLOR.bgDeep} 60%, #050A14 100%)`,
        fontFamily: "'Rajdhani', sans-serif",
      }}
      onPointerMove={handleShipMove}
      onPointerDown={handleShipMove}
    >
      <BackgroundEffects
        stars={stars.current}
        warpLines={warpLines.current}
        level={currentLevel}
      />

      <GameObjects
        asteroids={asteroids}
        crates={crates}
        floatingCoins={floatingCoins}
        scorePopups={scorePopups}
        fuelCans={fuelCans}
        drones={drones}
        laserWalls={laserWalls}
        handleHitAsteroid={handleHitAsteroid}
        handleCollectCrate={handleCollectCrate}
        handleCollectCoin={handleCollectCoin}
      />

      {/* ── Delivery portal ── */}
      {showDeliveryPortal && (
        <div
          onClick={() => {
            const deliveryCoins = cargo * 100;
            const deliveryScore = cargo * 250;
            setCoins((v) => v + deliveryCoins);
            setScore((v) => v + deliveryScore);
            setDeliveries((d) => d + 1);
            setCargo(0);
            setShowDeliveryPortal(false);
            setPortalTimer(10);
            addScorePopup(50, 40, "DELIVERED!");
          }}
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 120,
            borderRadius: "50%",
            cursor: "pointer",
            zIndex: 20,
            // Updated portal: cyan-dominant instead of purple
            background: `radial-gradient(circle, rgba(0,229,255,0.28), rgba(0,150,200,0.4), transparent 70%)`,
            boxShadow: `0 0 30px ${COLOR.cyan}, 0 0 60px rgba(0,229,255,0.4), inset 0 0 20px rgba(255,255,255,0.25)`,
            animation: "thrusterGlow 1s ease-in-out infinite",
          }}
        >
          {/* Countdown timer */}
          <div
            style={{
              position: "absolute",
              top: -34,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: COLOR.amber,
              textShadow: `0 0 10px ${COLOR.amberGlow}`,
              letterSpacing: "0.1em",
            }}
          >
            {portalTimer}s
          </div>

          {/* Outer ring */}
          <div
            style={{
              position: "absolute",
              inset: 14,
              borderRadius: "50%",
              border: `2px solid ${COLOR.cyan}`,
              opacity: 0.8,
            }}
          />
          {/* Inner ring */}
          <div
            style={{
              position: "absolute",
              inset: 28,
              borderRadius: "50%",
              border: `2px solid ${COLOR.cyanSoft}`,
              opacity: 0.6,
            }}
          />
          {/* Center dot */}
          <div
            style={{
              position: "absolute",
              inset: 46,
              borderRadius: "50%",
              background: COLOR.cyan,
              opacity: 0.7,
              boxShadow: `0 0 10px ${COLOR.cyan}`,
            }}
          />

          {/* DELIVER label */}
          <div
            style={{
              position: "absolute",
              bottom: -28,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "0.18em",
              color: COLOR.cyan,
              whiteSpace: "nowrap",
            }}
          >
            DELIVER
          </div>
        </div>
      )}

      {/* ── Ship ── */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: `${shipX}%`,
          transform: "translateX(-50%)",
          zIndex: 15,
          animation: "shipFloat 2.2s ease-in-out infinite",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            transform: "scale(0.85)",
            transformOrigin: "center bottom",
          }}
        >
          <ShipSVG shipId={selectedShip} />
        </div>
      </div>
      {/* ── Ground line — updated to cyan ── */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 0,
          right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, rgba(0,229,255,0.2), rgba(0,200,255,0.25), transparent)`,
          pointerEvents: "none",
        }}
      />

      {/* ── HUD ── */}
      <GameplayHUD
        coins={coins}
        lives={lives}
        fuelPct={fuelPct}
        isLowFuel={isLowFuel}
        fuelColor={fuelColor}
        score={score}
        currentLevel={currentLevel}
        cargo={`${cargo}/${cargoCapacity}`}
        isPaused={isPaused}
        onPause={handlePause}
        FuelBolt={FuelBolt}
        HeartSVG={HeartSVG}
        CrateSVG={CrateSVG}
      />

      {/* ── Pause overlay ── */}
      {isPaused && (
        <PauseOverlay
          score={score}
          coins={coins}
          cargo={cargo}
          onResume={handlePause}
        />
      )}

      {/* ── Hit flash — updated: thinner, less intrusive ── */}
      {hitFlash && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 999,
            pointerEvents: "none",
            // Red vignette instead of full-screen fill — more cinematic
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(255,60,60,0.28) 100%)",
            boxShadow: "inset 0 0 60px rgba(255,60,60,0.45)",
          }}
        />
      )}

      {/* ── Low fuel vignette — bonus effect ── */}
      {isLowFuel && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 18,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(255,90,90,0.12) 100%)",
            animation: "fuelLowPulse 0.65s ease-in-out infinite",
          }}
        />
      )}
    </div>
  );
}
