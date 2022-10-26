import { save } from "../model/gameData";
import { GameDataModel } from "../model/GameDataModel";
import { fetchLiveGameById } from "../service/nhl";

export const ingest = async (gameId: string) => {
  // statusCode 3, 4 should be inprogress
  const game = await fetchLiveGameById(gameId);
  console.log('game', game);
  const { playerStats } = game;
  playerStats.forEach((stats) => {
    const gameData: GameDataModel = {
      playerId: stats.playerId.toString(),
      playerName: stats.playerName,
      teamId: stats.teamId.toString(),
      teamName: stats.teamName,
      playerAge: '',
      playerNumber: stats.playerNumber.toString(),
      playerPosition: stats.playerPosition,
      assists: stats.assists.toString(),
      goals: stats.goals.toString(),
      hits: stats.hits.toString(),
      points: stats.points.toString(),
      penaltyMinutes: stats.penaltyMinutes.toString(),
      opponentTeam: stats.opponentTeam.toString(),
    }
    console.log('saving game data', JSON.stringify(gameData));
    save(gameData);
  });
};
