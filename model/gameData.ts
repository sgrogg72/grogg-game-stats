import { GameDataModel } from "./GameDataModel";
import sqllite3 from 'sqlite3';


export const save = (data: GameDataModel) => {
  const db = new sqllite3.Database('./sqlite/game.db');
  try {
    db.serialize(() => {    
        db.run(`INSERT INTO GameData (
          playerId, playerName, teamId, teamName TEXT, playerAge, playerNumber, playerPosition, assists, goals' +
          hits, points, penaltyMinutes, opponentTeam, createdUnixTime)
          VALUES (${data.playerId}, ${data.playerName}, ${data.teamId},
             ${data.teamId}, ${data.teamName}, ${data.playerAge}, ${data.playerNumber}, 
             ${data.playerPosition}, ${data.assists}, ${data.goals}, ${data.hits}, 
             ${data.points}, ${data.penaltyMinutes}, ${data.opponentTeam}, unixepoch())`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (db) {
      db.close();
    }
  }
}