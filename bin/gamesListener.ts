import schedule from 'node-schedule';
import { liveGameJob } from './liveGameListener';

const jobs: any = {};
const job = schedule.scheduleJob('*/1 * * * * *', () => {
  // retrieve games...
  // for each live game create a live game job
  const games: any = [ { id: 1, status: live }];
  games.map((game: any) => {
    const id = game.id;
    const foundIt = Object.keys(jobs).find((k) => k === id);
    if(!foundIt) {
      const job = liveGameJob(id);
      jobs[id] = job;
    } else {
      // if game isn't live anymore cancel
      const myjob = jobs[foundIt];
      myjob.cancel();
    }
  });
});