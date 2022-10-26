import { ingest } from '../../job/gameIngest';
jest.mock('node-schedule', () => {
  scheduleJob: jest.fn()
});
jest.mock('../../service/nhl', () => ({
  fetchScheduleByDate: jest.fn()
}));
jest.mock('../../listener/liveGameListener', () => ({
  liveGameJob: jest.fn()
}));
import schedule from 'node-schedule'
import { save } from '../../model/gameData';
import { fetchScheduleByDate } from '../../service/nhl';
import { liveGameJob } from '../../listener/liveGameListener';


describe('live game ingest', () => {
  beforeEach(() => {
    (schedule.scheduleJob as jest.Mock).mockImplementation((cron: string, func: Function) => {
      func();
    });
  });
  test('should fetch live game data and save', async () => {
    const gameId = '12345';
    await ingest(gameId);

    expect(fetchLiveGameById).toBeCalled();
    expect(save).toHaveBeenCalledWith({
      assists: '0',
      goals: '0',
      hits: '0',
      opponentTeam: '25',
      penaltyMinutes: '0',
      playerAge: '',
      playerId: '8480073',
      playerName: 'Erik Brannstrom',
      playerNumber: '26',
      playerPosition: 'Defenseman',
      points: '0',
      teamId: '9',
      teamName: 'Ottawa Senators'
    })
  });
});