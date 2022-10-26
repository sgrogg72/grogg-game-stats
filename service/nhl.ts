import axios from 'axios';
import { GameStatusCode, LiveGame, Player, PlayerStats, Schedule } from './types';

export const fetchPlayer = async (playerId: number): Promise<Player | undefined> => {
  const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`);
  const people = res.data.people;
  // grab the first
  if (people.length > 0) {
    return {
      playerId: playerId,
      age: people[0].currentAge,
    } as Player;
  }
  return undefined;
}

export const fetchScheduleByDate = async (date: Date): Promise<Schedule> => {
  const dateParam = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDay()}}`;
  const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/schedule?date${dateParam}`);
  const games = res.data.dates
    .map((d: any) => d.games)
    .flat()
    .map((g: any) => { 
      return {
        gamePk: g.gamePk,
        gameStatusCode: g.status.statusCode
      };
    });
  return { games };
};

export const fetchLiveGameById = async (gameId: string): Promise<LiveGame> => {
  const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/game/${gameId}/feed/live`);
  const homeTeam = res.data.liveData.boxscore.teams.home;
  const awayTeam = res.data.liveData.boxscore.teams.away;
  const homePlayers = Object.values(homeTeam.players) as any[];
  const awayPlayers = Object.values(awayTeam.players) as any[];

  const homePlayerStats = homePlayers.map((player) => {
    const stats = player.stats.goalieStats || player.stats.skaterStats;
    return {
      teamId: homeTeam.team.id,
      teamName: homeTeam.team.name,
      playerId: player.person.id,
      playerNumber: player.jerseyNumber,
      playerPosition: player.position.name,
      playerName: player.person.fullName,
      assists: stats?.assists || 0,
      goals: stats?.goals || 0,
      hits: stats?.hits || 0,
      points: stats?.points || 0,
      penaltyMinutes: stats?.penaltyMinutes || 0,
      opponentTeam: awayTeam.team.id,
    } as PlayerStats 
  });

  const awayPlayerStats = awayPlayers.map((player) => {
    const stats = player.stats.goalieStats || player.stats.skaterStats;
    return {
      teamId: awayTeam.team.id,
      teamName: awayTeam.team.name,
      playerId: player.id,
      playerNumber: player.jerseyNumber,
      playerPosition: player.position.name,
      playerName: player.person.fullName,
      assists: stats?.assists || 0,
      goals: stats?.goals || 0,
      hits: stats?.hits || 0,
      points: stats?.points || 0,
      penaltyMinutes: stats?.penaltyMinutes || 0,
      opponentTeam: homeTeam.team.id,
    } as PlayerStats 
  });

  return {
    gamePk: gameId,
    gameStatusCode: res.data.gameData.status.statusCode as GameStatusCode,
    playerStats: [...homePlayerStats, ...awayPlayerStats],
  }
}