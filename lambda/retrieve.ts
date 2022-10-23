import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';


export const handleRetrieve = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  return { statusCode: 404, body: {} } as APIGatewayProxyResult;
}