import schedule from 'node-schedule';
import { fetchScheduleByDate } from '../service/nhl';
import { GameStatusCode, ScheduleGame } from '../service/types';
import { liveGameJob } from './liveGameListener';

interface Jobs {
  [key: string]: schedule.Job;
}

const jobs: Jobs = {};
const job = schedule.scheduleJob('*/1 * * * * *', async () => {
  // retrieve games...
  // live games are indicated by statusCode
  // statusCode 3, 4 should be inprogress
  // for each live game create a live game job
  const schedule = await fetchScheduleByDate(new Date());
  const gamesLive = schedule.games.filter(g =>
    g.gameStatusCode === GameStatusCode.inProgress ||
    g.gameStatusCode === GameStatusCode.inProgressCritical);

  const notLiveGames = schedule.games.filter(g =>
    g.gameStatusCode !== GameStatusCode.inProgress &&
    g.gameStatusCode !== GameStatusCode.inProgressCritical);

  gamesLive.forEach((game) => {
    const id = game.gamePk.toString();
    const foundIt = Object.keys(jobs).find((k) => k === id);
    if(!foundIt) {
      const job = liveGameJob(id);
      jobs[id] = job;
    }
  });

  notLiveGames.forEach((game) => {
    const id = game.gamePk.toString();
    const foundIt = Object.keys(jobs).find((k) => k === id);
    if(foundIt) {
      jobs[foundIt].cancel();
      delete jobs[foundIt];
    }
  });
});