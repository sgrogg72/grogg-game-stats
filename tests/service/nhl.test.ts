

jest.mock("axios");
import axios from "axios";

import { fetchLiveGameById, fetchScheduleByDate } from "../../service/nhl";
import { GameStatusCode } from "../../service/types";
import * as mockGameData from './liveData.json';



describe('nhl service fetchScheduleByDate', () => {

  test('should include data as param', async () => {
    const date = new Date();
    const dateParam = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDay()}}`;
    axios.get = jest.fn().mockResolvedValue({ data: { dates: [{games: [{ gamePk: 2020020033, status: { statusCode: GameStatusCode.inProgress }}]}]}});
    const res = await fetchScheduleByDate(date);
    expect(axios.get).toBeCalledWith(`https://statsapi.web.nhl.com/api/v1/schedule?date${dateParam}`);
    expect(res.games.length).toBe(1);
    expect(res.games[0].gamePk).toBe(2020020033);
    expect(res.games[0].gameStatusCode).toBe(GameStatusCode.inProgress);

  });
});

describe('nhl service fetchLiveGameById', () => {
  test('should include gameId', async () => {
    const gameId = '2022020092';
    axios.get = jest.fn().mockResolvedValue({ data: mockGameData });
    const res = await fetchLiveGameById(gameId);
    expect(axios.get).toBeCalledWith(`https://statsapi.web.nhl.com/api/v1/game/${gameId}/feed/live`);
    expect(res.gamePk).toBe(gameId);
    expect(res.gameStatusCode).toBe(GameStatusCode.final2);
    expect(res.playerStats[0]).toEqual(
      {
        teamId: 9,
        teamName: 'Ottawa Senators',
        playerId: 8480073,
        playerNumber: '26',
        playerPosition: 'Defenseman',
        playerName: 'Erik Brannstrom',
        assists: 0,
        goals: 0,
        hits: 0,
        points: 0,
        penaltyMinutes: 0,
        opponentTeam: 25
      })
  });
});