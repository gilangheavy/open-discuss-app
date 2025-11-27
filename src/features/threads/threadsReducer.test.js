import threadsReducer from './threadsSlice';

/**
 * Test scenario for threadsReducer
 * Testing pure reducer function behavior
 */

describe('threadsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = {
      threads: [],
      status: 'idle',
      error: null,
    };
    const action = {type: 'UNKNOWN'};

    // Act
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should handle asyncPopulateUsersAndThreads.fulfilled action', () => {
    // Arrange
    const initialState = {
      threads: [],
      status: 'idle',
      error: null,
    };
    const action = {
      type: 'threads/asyncPopulateUsersAndThreads/fulfilled',
      payload: [
        {id: 'thread-1', title: 'Thread Test 1'},
        {id: 'thread-2', title: 'Thread Test 2'},
      ],
    };

    // Act
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState.threads).toEqual(action.payload);
    expect(nextState.status).toBe('succeeded');
  });

  it('should handle asyncAddThread.fulfilled action', () => {
    // Arrange
    const initialState = {
      threads: [{id: 'thread-1', title: 'Existing Thread'}],
      status: 'idle',
      error: null,
    };
    const action = {
      type: 'threads/asyncAddThread/fulfilled',
      payload: {id: 'thread-2', title: 'New Thread'},
    };

    // Act
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState.threads).toHaveLength(2);
    expect(nextState.threads[0]).toEqual(action.payload);
  });
});
