import schedule from 'node-schedule';
import { handleRetrieve } from '../lambda/retrieve';
import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export const liveGameJob = (id: string) => {
  return schedule.scheduleJob('*/1 * * * * *', async () => {
    const results: APIGatewayProxyResult = await handleRetrieve({} as APIGatewayEvent , { functionName: 'gameStat' } as Context);
    console.log('run game job');
  });
}