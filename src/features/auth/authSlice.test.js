import {describe, it, expect, vi, beforeEach} from 'vitest';
import authReducer, {
  asyncLogin,
  asyncRegister,
  clearError,
  logout,
} from './authSlice';
import * as api from '../../services/api';

// Mock the API module
vi.mock('../../services/api');

const initialState = {
  authUser: null,
  status: 'idle',
  error: null,
};

describe('authSlice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(authReducer(undefined, {type: 'unknown'})).toEqual(initialState);
    });

    it('should handle clearError', () => {
      const previousState = {
        authUser: null,
        status: 'idle',
        error: 'Some error',
      };
      expect(authReducer(previousState, clearError())).toEqual({
        ...previousState,
        error: null,
      });
    });

    it('should handle logout', () => {
      const previousState = {
        authUser: {id: '1', name: 'Test User'},
        status: 'succeeded',
        error: null,
      };
      const result = authReducer(previousState, logout());
      expect(result).toEqual(initialState);
    });
  });

  describe('asyncLogin', () => {
    it('should handle login success', async () => {
      const mockUser = {
        id: 'user-1',
        name: 'Test User',
        email: 'test@example.com',
      };

      api.loginUser.mockResolvedValue(undefined);
      api.getOwnProfile.mockResolvedValue(mockUser);

      const dispatch = vi.fn();
      const getState = vi.fn();
      const thunk = asyncLogin({email: 'test@example.com', password: 'password'});

      await thunk(dispatch, getState, undefined);

      expect(api.loginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
      expect(api.getOwnProfile).toHaveBeenCalled();
    });

    it('should handle login failure', async () => {
      const errorMessage = 'Invalid credentials';
      api.loginUser.mockRejectedValue(new Error(errorMessage));

      const dispatch = vi.fn();
      const getState = vi.fn();
      const thunk = asyncLogin({email: 'test@example.com', password: 'wrong'});

      await thunk(dispatch, getState, undefined);

      expect(api.loginUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'wrong',
      });
    });

    it('should set status to loading when login is pending', () => {
      const action = {type: asyncLogin.pending.type};
      const state = authReducer({...initialState, error: 'previous error'}, action);

      expect(state.status).toBe('loading');
      expect(state.error).toBeNull();
    });

    it('should set authUser and status when login is fulfilled', () => {
      const mockUser = {id: '1', name: 'Test User'};
      const action = {type: asyncLogin.fulfilled.type, payload: mockUser};
      const state = authReducer(initialState, action);

      expect(state.status).toBe('succeeded');
      expect(state.authUser).toEqual(mockUser);
    });

    it('should set error when login is rejected', () => {
      const errorMsg = 'Login failed';
      const action = {type: asyncLogin.rejected.type, payload: errorMsg};
      const state = authReducer(initialState, action);

      expect(state.status).toBe('failed');
      expect(state.error).toBe(errorMsg);
    });
  });

  describe('asyncRegister', () => {
    it('should handle registration success', async () => {
      const mockUser = {
        id: 'user-2',
        name: 'New User',
        email: 'new@example.com',
      };

      api.registerUser.mockResolvedValue(mockUser);

      const dispatch = vi.fn();
      const getState = vi.fn();
      const thunk = asyncRegister({
        name: 'New User',
        email: 'new@example.com',
        password: 'password123',
      });

      await thunk(dispatch, getState, undefined);

      expect(api.registerUser).toHaveBeenCalledWith({
        name: 'New User',
        email: 'new@example.com',
        password: 'password123',
      });
    });

    it('should handle registration failure', async () => {
      const errorMessage = 'Email already exists';
      api.registerUser.mockRejectedValue(new Error(errorMessage));

      const dispatch = vi.fn();
      const getState = vi.fn();
      const thunk = asyncRegister({
        name: 'Test',
        email: 'existing@example.com',
        password: 'password',
      });

      await thunk(dispatch, getState, undefined);

      expect(api.registerUser).toHaveBeenCalled();
    });

    it('should set status to succeeded when registration is fulfilled', () => {
      const action = {type: asyncRegister.fulfilled.type};
      const state = authReducer(initialState, action);

      expect(state.status).toBe('succeeded');
      // authUser should remain null on register (user needs to login)
      expect(state.authUser).toBeNull();
    });

    it('should set error when registration is rejected', () => {
      const errorMsg = 'Registration failed';
      const action = {type: asyncRegister.rejected.type, payload: errorMsg};
      const state = authReducer(initialState, action);

      expect(state.status).toBe('failed');
      expect(state.error).toBe(errorMsg);
    });
  });
});
