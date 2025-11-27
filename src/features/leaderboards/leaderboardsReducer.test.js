import leaderboardsReducer from './leaderboardsSlice';

/**
 * Test scenario for leaderboardsReducer
 * Testing pure reducer function behavior
 */

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = {
      leaderboards: [],
      status: 'idle',
      error: null,
    };
    const action = {type: 'UNKNOWN'};

    // Act
    const nextState = leaderboardsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should handle asyncReceiveLeaderboards.fulfilled action', () => {
    // Arrange
    const initialState = {
      leaderboards: [],
      status: 'idle',
      error: null,
    };
    const action = {
      type: 'leaderboards/receive/fulfilled',
      payload: [
        {user: {id: 'user-1', name: 'User 1'}, score: 100},
        {user: {id: 'user-2', name: 'User 2'}, score: 80},
      ],
    };

    // Act
    const nextState = leaderboardsReducer(initialState, action);

    // Assert
    expect(nextState.leaderboards).toEqual(action.payload);
    expect(nextState.status).toBe('succeeded');
  });

  it('should handle asyncReceiveLeaderboards.rejected action', () => {
    // Arrange
    const initialState = {
      leaderboards: [],
      status: 'loading',
      error: null,
    };
    const action = {
      type: 'leaderboards/receive/rejected',
      payload: 'Network error',
    };

    // Act
    const nextState = leaderboardsReducer(initialState, action);

    // Assert
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe('Network error');
  });
});
