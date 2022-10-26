import sqllite3 from 'sqlite3';

const db = new sqllite3.Database('./sqlite/game.db');

db.serialize(() => {
    db.run(`create table if not exists GameData ( 
      playerId TEXT, playerName TEXT, teamId TEXT, teamName TEXT, playerAge TEXT, playerNumber TEXT, playerPosition TEXT, assists TEXT, goals TEXT,
      hits TEXT, points TEXT, penaltyMinutes TEXT, opponentTeam TEXT, createdUnixTime NUMBER)`);
});

db.close();
