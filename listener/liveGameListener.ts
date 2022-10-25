import schedule from 'node-schedule';
import { fetchLiveGameById } from '../service/nhl';
import { save } from '../model/gameData';
import { GameDataModel } from '../model/GameDataModel';


export const liveGameJob = (id: string) => {
  return schedule.scheduleJob('*/10 * * * * *', async () => {
    // statusCode 3, 4 should be inprogress
    const game = await fetchLiveGameById(id);
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
  });
}