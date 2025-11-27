import usersReducer, {clearUsersError} from './usersSlice';

/**
 * Test scenario for usersReducer
 * Testing pure reducer function behavior
 */

describe('usersReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const initialState = {
      users: [],
      status: 'idle',
      error: null,
    };
    const action = {type: 'UNKNOWN'};

    // Act
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should handle asyncGetAllUsers.fulfilled action', () => {
    // Arrange
    const initialState = {
      users: [],
      status: 'idle',
      error: null,
    };
    const action = {
      type: 'users/asyncGetAllUsers/fulfilled',
      payload: [
        {id: 'user-1', name: 'User 1', email: 'user1@test.com'},
        {id: 'user-2', name: 'User 2', email: 'user2@test.com'},
      ],
    };

    // Act
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState.users).toEqual(action.payload);
    expect(nextState.status).toBe('succeeded');
  });

  it('should handle clearUsersError action', () => {
    // Arrange
    const initialState = {
      users: [],
      status: 'failed',
      error: 'Some error',
    };
    const action = clearUsersError();

    // Act
    const nextState = usersReducer(initialState, action);

    // Assert
    expect(nextState.error).toBeNull();
  });
});
