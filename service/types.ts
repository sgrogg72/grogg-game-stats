
export enum GameStatusCode {
  scheduled = "1",
  preGame = "2",
  inProgress = "3",
  inProgressCritical = "4",
  finalGameOver = "5",
  final = "6",
  final2 = "7",
  scheduledTBD = "8",
  postponed = "9",
}

export interface ScheduleGame {
  gamePk: number;
  gameStatusCode: GameStatusCode;
}

export interface Schedule {
  games: ScheduleGame[];
}

export interface LiveGame {
  gamePk: string;
  gameStatusCode: GameStatusCode;
  playerStats: PlayerStats[];
}

export interface PlayerStats {
    teamId: number,
    teamName: string,
    playerId: number,
    playerNumber: number,
    playerPosition: string,
    playerName: string,
    assists: number;
    goals: number;
    hits: number;
    points: number;
    penaltyMinutes: number;
}