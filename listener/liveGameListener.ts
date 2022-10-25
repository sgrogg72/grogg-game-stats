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
        playerName: stats.;
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
      }
    }
    save(gameData);
    // final 5, 6, 7 should be final
    console.log('run game job');
  });
}