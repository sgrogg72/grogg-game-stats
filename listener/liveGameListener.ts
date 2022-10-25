import schedule from 'node-schedule';

export const liveGameJob = (id: string) => {
  return schedule.scheduleJob('*/1 * * * * *', async () => {
    // statusCode 3, 4 should be inprogress

    // final 5, 6, 7 should be final
    console.log('run game job');
  });
}