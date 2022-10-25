

jest.mock("axios");
import axios from "axios";

import { fetchLiveGameById, fetchScheduleByDate } from "../../service/nhl";



describe('nhl service fetchScheduleByDate', () => {

  test('should include data as param', async () => {
    const date = new Date();
    const dateParam = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDay()}}`;
    axios.get = jest.fn().mockResolvedValue({ data: {}});
    const res = await fetchScheduleByDate(date);
    expect(axios.get).toBeCalledWith(`https://statsapi.web.nhl.com/api/v1/schedule?date${dateParam}`);
  });
});

describe('nhl service fetchLiveGameById', () => {
  test('should include gameId', async () => {
    const gameId:string = 'foogameid';
    const res = await fetchLiveGameById(gameId);
    expect(axios.get).toBeCalledWith(`https://statsapi.web.nhl.com/api/v1/game/${gameId}/feed/live`);
  });
});