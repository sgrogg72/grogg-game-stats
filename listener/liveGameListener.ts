import schedule from 'node-schedule';
import { handleRetrieveGame } from '../lambda/retrieveGame';
import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export const liveGameJob = (id: string) => {
  return schedule.scheduleJob('*/1 * * * * *', async () => {
    // statusCode 3, 4 should be inprogress
    // final 5, 6, 7 should be final

    const results: APIGatewayProxyResult = await handleRetrieveGame({} as APIGatewayEvent , { functionName: 'gameStat' } as Context);
    console.log('run game job');
  });
}