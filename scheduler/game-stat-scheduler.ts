import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';


export const run = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  const time = new Date();
  console.log(`Your cron function "${context.functionName}" ran at ${time}`);
  return {} as APIGatewayProxyResult;
}