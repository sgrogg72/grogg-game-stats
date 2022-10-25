import axios from 'axios';

export const fetchScheduleByDate = async (date: Date) => {
  const dateParam = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDay()}}`;
  const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/schedule?date${dateParam}`);
  return res.data;
};

export const fetchLiveGameById = async (gameId: string) => {
  const res = await axios.get(`https://statsapi.web.nhl.com/api/v1/game/${gameId}/feed/live`);
  return res;
}