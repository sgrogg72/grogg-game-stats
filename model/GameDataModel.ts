export interface GameDataModel {
  playerId: string;
  playerName: string;
  teamId: string;
  teamName: string;
  playerAge: string;
  playerNumber: string;
  playerPosition: string;
  assists: string;
  goals: string;
  hits: string;
  points: string;
  penaltyMinutes: string;
  opponentTeam: string;
  createdUnixTime?: number;
}