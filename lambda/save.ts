import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { save } from '../model/gameData';


export const handleSave = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
  if (event && event.body) {
    const data = JSON.parse(event.body);
    save(data);
  }

  return {} as APIGatewayProxyResult;
}