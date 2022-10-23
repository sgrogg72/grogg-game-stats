import schedule from 'node-schedule';
import { handleRetrieveGame } from '../lambda/retrieveGame';
import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export const liveGameJob = (id: string) => {
  return schedule.scheduleJob('*/1 * * * * *', async () => {
    const results: APIGatewayProxyResult = await handleRetrieveGame({} as APIGatewayEvent , { functionName: 'gameStat' } as Context);
    console.log('run game job');
  });
}