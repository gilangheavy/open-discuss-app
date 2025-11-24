import {describe, it, expect, vi, beforeEach} from 'vitest';
import threadsReducer, {asyncAddThread, asyncPopulateUsersAndThreads} from './threadsSlice';
import * as api from '../../services/api';

// Mock the API module
vi.mock('../../services/api');

describe('threadsSlice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('reducer', () => {
    const initialState = {
      threads: [],
      status: 'idle',
      error: null,
    };

    it('should return the initial state', () => {
      expect(threadsReducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });
  });

  describe('asyncPopulateUsersAndThreads', () => {
    // TODO: Fix async thunk test - hangs in CI because dispatch mock never resolves
    it.skip('should populate threads with user data', async () => {
      const mockUsers = [
        {id: 'user-1', name: 'User One'},
        {id: 'user-2', name: 'User Two'},
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
          upVotesBy: ['user-2'],
          downVotesBy: [],
        },
      ];

      api.getAllUsers.mockResolvedValue(mockUsers);
      api.getAllThreads.mockResolvedValue(mockThreads);

      const dispatch = vi.fn();
      const getState = vi.fn();
      const thunk = asyncPopulateUsersAndThreads();

      await thunk(dispatch, getState, undefined);

      expect(api.getAllUsers).toHaveBeenCalled();
      expect(api.getAllThreads).toHaveBeenCalled();
    });

    it('should set status to loading when pending', () => {
      const action = {type: asyncPopulateUsersAndThreads.pending.type};
      const state = threadsReducer(undefined, action);

      expect(state.status).toBe('loading');
    });

    it('should set threads and status when fulfilled', () => {
      const mockThreads = [
        {id: 'thread-1', title: 'Thread 1'},
        {id: 'thread-2', title: 'Thread 2'},
      ];
      const action = {
        type: asyncPopulateUsersAndThreads.fulfilled.type,
        payload: mockThreads,
      };
      const state = threadsReducer(undefined, action);

      expect(state.status).toBe('succeeded');
      expect(state.threads).toEqual(mockThreads);
    });

    it('should set error when rejected', () => {
      const errorMsg = 'Failed to load threads';
      const action = {
        type: asyncPopulateUsersAndThreads.rejected.type,
        payload: errorMsg,
      };
      const state = threadsReducer(undefined, action);

      expect(state.status).toBe('failed');
      expect(state.error).toBe(errorMsg);
    });
  });

  describe('asyncAddThread', () => {
    it.skip('should add new thread successfully', async () => {
      const newThread = {
        id: 'thread-new',
        title: 'New Thread',
        body: 'Thread content',
        category: 'general',
      };

      api.createThread.mockResolvedValue(newThread);

      const dispatch = vi.fn();
      const getState = vi.fn();
      const thunk = asyncAddThread({
        title: 'New Thread',
        body: 'Thread content',
        category: 'general',
      });

      await thunk(dispatch, getState, undefined);

      expect(api.createThread).toHaveBeenCalledWith({
        title: 'New Thread',
        body: 'Thread content',
        category: 'general',
      });
    });

    it('should add thread to beginning of list when fulfilled', () => {
      const existingThreads = [{id: 'thread-1', title: 'Existing'}];
      const newThread = {id: 'thread-new', title: 'New'};

      const initialState = {
        threads: existingThreads,
        status: 'idle',
        error: null,
      };

      const action = {
        type: asyncAddThread.fulfilled.type,
        payload: newThread,
      };
      const state = threadsReducer(initialState, action);

      expect(state.threads).toHaveLength(2);
      expect(state.threads[0]).toEqual(newThread);
      expect(state.threads[1]).toEqual(existingThreads[0]);
    });

    it.skip('should handle add thread failure', async () => {
      const errorMessage = 'Failed to create thread';
      api.createThread.mockRejectedValue(new Error(errorMessage));

      const dispatch = vi.fn();
      const getState = vi.fn();
      const thunk = asyncAddThread({
        title: 'Fail',
        body: 'Fail',
        category: 'test',
      });

      await thunk(dispatch, getState, undefined);

      expect(api.createThread).toHaveBeenCalled();
    });
  });
});
