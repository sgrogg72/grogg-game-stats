import schedule from 'node-schedule';
import { ingest } from '../job/gameIngest';


export const liveGameJob = (id: string) => {
  return schedule.scheduleJob('*/10 * * * * *', async () => {
    try {
      ingest(id);
    } catch (err) {
      console.error(err);
    }
  });
}