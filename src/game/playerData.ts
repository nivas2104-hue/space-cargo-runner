export interface PlayerData {
  totalCoins: number;

  engineLevel: number;
  shieldLevel: number;
  fuelLevel: number;
  magnetLevel: number;

  selectedShip: string;
}

export const defaultPlayerData: PlayerData = {
  totalCoins: 0,

  engineLevel: 1,
  shieldLevel: 1,
  fuelLevel: 1,
  magnetLevel: 1,

  selectedShip: "viper",
};
