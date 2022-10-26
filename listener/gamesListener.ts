import schedule from 'node-schedule';
import { scheduleGameListener } from '../job/scheduleGameListener';
import { Jobs } from '../job/types';

let jobs: Jobs = {};

schedule.scheduleJob('*/10 * * * * *', async () => {
  try {
    jobs = await scheduleGameListener(jobs);
  } catch (err) {
    console.log(err);
  }
});