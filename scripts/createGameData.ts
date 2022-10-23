import sqllite3 from 'sqlite3';
import { handleSave } from '../lambda/save';
import { Context, APIGatewayEvent } from 'aws-lambda';
import { GameDataModel } from '../model/GameDataModel';



const db = new sqllite3.Database('./sqlite/game.db');

db.serialize(() => {
    db.run(`create table if not exists GameData ( 
      playerId TEXT, playerName TEXT, teamId TEXT, teamName TEXT, playerAge TEXT, playerNumber TEXT, playerPosition TEXT, assists TEXT, goals TEXT,
      hits TEXT, points TEXT, penaltyMinutes TEXT, opponentTeam TEXT, createdUnixTime NUMBER)`);
});

db.close();

const data: GameDataModel = {
  playerId: '1',
  playerName: 'Stephen',
  teamId: '2',
  teamName: 'Groggers',
  playerAge: '43',
  playerNumber: '72',
  playerPosition: 'center',
  assists: '1',
  goals: '2',
  hits: '5',
  points: '1',
  penaltyMinutes: '1',
  opponentTeam: 'Darps'
}

handleSave({ body: JSON.stringify(data) } as APIGatewayEvent, {} as Context);
