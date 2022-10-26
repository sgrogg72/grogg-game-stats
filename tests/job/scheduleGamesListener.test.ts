jest.mock('../../service/nhl', () => ({
  fetchScheduleByDate: jest.fn()
}));
jest.mock('../../listener/liveGameListener', () => ({
  liveGameJob: jest.fn()
}));

import { fetchScheduleByDate } from '../../service/nhl';
import { liveGameJob } from '../../listener/liveGameListener';
import { GameStatusCode } from '../../service/types';
import { scheduleGameListener } from '../../job/scheduleGameListener';
import { Jobs } from '../../job/types';
import { Job } from 'node-schedule';

describe('games listener', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (liveGameJob as jest.Mock).mockClear();
    (liveGameJob as jest.Mock).mockReturnValue({});
  });
  test('should fetch schedule and ignore games that are not in progress.', async () => {
    (fetchScheduleByDate as jest.Mock).mockResolvedValue({
      games: [{
      gamePk: '1',
      gameStatusCode: GameStatusCode.final,
    }]});

    const jobs: Jobs = {};
    const updatedJobs = await scheduleGameListener(jobs);

    expect(fetchScheduleByDate).toBeCalled();
    expect(liveGameJob).not.toBeCalled();
    expect(jobs).toEqual(updatedJobs);
  });
  test('should create a live game if in progress.', async () => {
    (fetchScheduleByDate as jest.Mock).mockResolvedValue({
      games: [{
      gamePk: '1',
      gameStatusCode: GameStatusCode.inProgress,
    }]});

    const jobs: Jobs = {};
    const updatedJobs = await scheduleGameListener(jobs);
    expect(fetchScheduleByDate).toBeCalled();
    expect(liveGameJob).toBeCalled();
    expect(updatedJobs['1']).toBeDefined();
  });

  test('should remove live games that are not live anymore.', async () => {
    (fetchScheduleByDate as jest.Mock).mockResolvedValue({
      games: [{
      gamePk: '1',
      gameStatusCode: GameStatusCode.final2,
    }]});

    const jobs: Jobs = {};
    const mockCancel = jest.fn();
    // @ts-ignore
    jobs['1'] = { cancel: mockCancel };
    const updatedJobs = await scheduleGameListener(jobs);
    expect(fetchScheduleByDate).toBeCalled();
    expect(liveGameJob).not.toBeCalled();
    expect(mockCancel).toBeCalled();
    expect(updatedJobs['1']).toBeUndefined();
  });

  test('should ignore jobs that already exist that are still in progress.', async () => {
    (fetchScheduleByDate as jest.Mock).mockResolvedValue({
      games: [{
      gamePk: '1',
      gameStatusCode: GameStatusCode.inProgressCritical,
    }]});

    const jobs: Jobs = {};

    const mockCancel = jest.fn();
    // @ts-ignore
    jobs['1'] = { cancel: mockCancel };
    const updatedJobs = await scheduleGameListener(jobs);
    expect(fetchScheduleByDate).toBeCalled();
    expect(liveGameJob).not.toBeCalled();
    expect(updatedJobs['1']).toBeDefined();
  });
});