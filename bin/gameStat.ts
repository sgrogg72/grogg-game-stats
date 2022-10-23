import { run } from '../scheduler/game-stat-scheduler';
import { Context, APIGatewayEvent } from 'aws-lambda';


run({} as APIGatewayEvent , { functionName: 'gameStat' } as Context);