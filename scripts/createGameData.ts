import sqllite3 from 'sqlite3';


const db = new sqllite3.Database('./sqlite/game.db');

interface GameData {
  playerId: string;
  playerName: string;
  teamId: string;
  teamName: string;
  playerAge: string;
  playerNumber: string;
  playerPosition: string;
  assists: string;
  goals: string;
  hits: string;
  points: string;
  penaltyMinutes: string;
  opponnetTeam: string;
  createdUnixTime: number;
}

db.serialize(() => {
    db.run('create table if not exists GameData ( ' +
      'playerId TEXT, playerName TEXT, teamId TEXT, teamName TEXT, playerAge TEXT, playerNumber TEXT, playerPosition TEXT, assists TEXT, goals TEXT' +
      'hits TEXT, points: TEXT, penaltyMinutes TEXT, opponentTeam TEXT, createdUnixTime NUMBER)');
});

db.close();