import {describe, it, expect, vi, beforeEach} from 'vitest';
import {asyncPopulateUsersAndThreads, asyncAddThread} from './threadsSlice';
import * as api from '../../services/api';

/**
 * Test scenario for threads thunks
 * Testing async thunk functions with API mocking
 */

// Mock the API module
vi.mock('../../services/api');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch fulfilled action when data fetch succeeds', async () => {
    // Arrange
    const mockUsers = [
      {id: 'user-1', name: 'User 1'},
      {id: 'user-2', name: 'User 2'},
    ];
    const mockThreads = [
      {
        id: 'thread-1',
        title: 'Thread 1',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
      },
      {
        id: 'thread-2',
        title: 'Thread 2',
        ownerId: 'user-2',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    // Mock API calls
    vi.spyOn(api, 'getAllUsers').mockResolvedValue(mockUsers);
    vi.spyOn(api, 'getAllThreads').mockResolvedValue(mockThreads);

    const dispatch = vi.fn();
    const getState = vi.fn();

    // Act
    const thunk = asyncPopulateUsersAndThreads();
    await thunk(dispatch, getState, undefined);

    // Assert
    expect(api.getAllUsers).toHaveBeenCalled();
    expect(api.getAllThreads).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'threads/asyncPopulateUsersAndThreads/fulfilled',
      }),
    );
  });
});

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch fulfilled action when thread creation succeeds', async () => {
    // Arrange
    const newThread = {
      title: 'New Thread',
      body: 'Thread content',
      category: 'general',
    };
    const mockCreatedThread = {
      id: 'thread-1',
      ...newThread,
      ownerId: 'user-1',
    };

    // Mock API call
    vi.spyOn(api, 'createThread').mockResolvedValue(mockCreatedThread);

    const dispatch = vi.fn();
    const getState = vi.fn();

    // Act
    const thunk = asyncAddThread(newThread);
    await thunk(dispatch, getState, undefined);

    // Assert
    expect(api.createThread).toHaveBeenCalledWith(newThread);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'threads/asyncAddThread/fulfilled',
        payload: mockCreatedThread,
      }),
    );
  });

  it('should dispatch rejected action when thread creation fails', async () => {
    // Arrange
    const newThread = {
      title: 'New Thread',
      body: 'Thread content',
      category: 'general',
    };
    const errorMessage = 'Failed to create thread';

    // Mock API to throw error
    vi.spyOn(api, 'createThread').mockRejectedValue(new Error(errorMessage));

    const dispatch = vi.fn();
    const getState = vi.fn();

    // Act
    const thunk = asyncAddThread(newThread);
    await thunk(dispatch, getState, undefined);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'threads/asyncAddThread/rejected',
      }),
    );
  });
});
