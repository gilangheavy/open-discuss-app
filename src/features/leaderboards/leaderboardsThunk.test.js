import {describe, it, expect, vi, beforeEach} from 'vitest';
import {asyncReceiveLeaderboards} from './leaderboardsSlice';
import * as api from '../../services/api';

/**
 * Test scenario for leaderboards thunks
 * Testing async thunk functions with API mocking
 */

// Mock the API module
vi.mock('../../services/api');

describe('asyncReceiveLeaderboards thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch fulfilled action when leaderboards fetch succeeds', async () => {
    // Arrange
    const mockLeaderboards = [
      {
        user: {
          id: 'user-1',
          name: 'User 1',
          email: 'user1@test.com',
          avatar: 'https://example.com/avatar1.jpg',
        },
        score: 100,
      },
      {
        user: {
          id: 'user-2',
          name: 'User 2',
          email: 'user2@test.com',
          avatar: 'https://example.com/avatar2.jpg',
        },
        score: 80,
      },
    ];

    // Mock API call
    vi.spyOn(api, 'getLeaderboard').mockResolvedValue(mockLeaderboards);

    const dispatch = vi.fn();
    const getState = vi.fn();

    // Act
    const thunk = asyncReceiveLeaderboards();
    await thunk(dispatch, getState, undefined);

    // Assert
    expect(api.getLeaderboard).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'leaderboards/receive/pending',
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'leaderboards/receive/fulfilled',
        payload: mockLeaderboards,
      }),
    );
  });

  it('should dispatch rejected action when leaderboards fetch fails', async () => {
    // Arrange
    const errorMessage = 'Network error';

    // Mock API to throw error
    vi.spyOn(api, 'getLeaderboard').mockRejectedValue(new Error(errorMessage));

    const dispatch = vi.fn();
    const getState = vi.fn();

    // Act
    const thunk = asyncReceiveLeaderboards();
    await thunk(dispatch, getState, undefined);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'leaderboards/receive/rejected',
      }),
    );
  });
});
