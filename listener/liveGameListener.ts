import schedule from 'node-schedule';
import { handleRetrieveGame } from '../lambda/retrieveGame';
import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

ttps://statsapi.web.nhl.com/api/v1/game/2022020092/feed/live/diffPatch?startTimecode=20221025_115410
export const liveGameJob = (id: string) => {
  return schedule.scheduleJob('*/1 * * * * *', async () => {
    //liveData.boxscore.teams.away or home
    // get player data
    // for each team
    Object.values(players);
    // statusCode 3, 4 should be inprogress
    // final 5, 6, 7 should be final
    const results: APIGatewayProxyResult = await handleRetrieveGame({} as APIGatewayEvent , { functionName: 'gameStat' } as Context);
    console.log('run game job');
  });
}