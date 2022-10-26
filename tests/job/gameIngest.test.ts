import { ingest } from '../../job/gameIngest';

jest.mock('../../service/nhl', () => ({
  fetchLiveGameById: jest.fn()
}));
jest.mock('../../model/gameData', () => ({
  save: jest.fn()
}));
import { save } from '../../model/gameData';
import { fetchLiveGameById } from '../../service/nhl';
import { mockPlayerStats } from './mockPlayerStats';


describe('live game ingest', () => {
  beforeEach(() => {
    (fetchLiveGameById as jest.Mock).mockResolvedValue(mockPlayerStats);
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