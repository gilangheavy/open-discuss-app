import {describe, it, expect, vi, beforeEach} from 'vitest';
import {asyncRegister, asyncLogin} from './authSlice';
import * as api from '../../services/api';

/**
 * Test scenario for auth thunks
 * Testing async thunk functions with API mocking
 */

// Mock the API module
vi.mock('../../services/api');

describe('asyncRegister thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch fulfilled action when register succeeds', async () => {
    // Arrange
    const fakeUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    const mockResponse = {id: 'user-1', name: 'Test User', email: 'test@example.com'};

    // Mock API to return success
    vi.spyOn(api, 'registerUser').mockResolvedValue(mockResponse);

    const dispatch = vi.fn();
    const getState = vi.fn();

    // Act
    const thunk = asyncRegister(fakeUser);
    await thunk(dispatch, getState, undefined);

    // Assert
    expect(api.registerUser).toHaveBeenCalledWith(fakeUser);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'auth/asyncRegister/pending',
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'auth/asyncRegister/fulfilled',
        payload: mockResponse,
      }),
    );
  });

  it('should dispatch rejected action when register fails', async () => {
    // Arrange
    const fakeUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    const errorMessage = 'Email already exists';

    // Mock API to throw error
    vi.spyOn(api, 'registerUser').mockRejectedValue(new Error(errorMessage));

    const dispatch = vi.fn();
    const getState = vi.fn();

    // Act
    const thunk = asyncRegister(fakeUser);
    await thunk(dispatch, getState, undefined);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'auth/asyncRegister/rejected',
      }),
    );
  });
});

describe('asyncLogin thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch fulfilled action when login succeeds', async () => {
    // Arrange
    const credentials = {
      email: 'test@example.com',
      password: 'password123',
    };
    const mockUser = {id: 'user-1', name: 'Test User', email: 'test@example.com'};

    // Mock API calls
    vi.spyOn(api, 'loginUser').mockResolvedValue(undefined);
    vi.spyOn(api, 'getOwnProfile').mockResolvedValue(mockUser);

    const dispatch = vi.fn();
    const getState = vi.fn();

    // Act
    const thunk = asyncLogin(credentials);
    await thunk(dispatch, getState, undefined);

    // Assert
    expect(api.loginUser).toHaveBeenCalledWith(credentials);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'auth/asyncLogin/fulfilled',
        payload: mockUser,
      }),
    );
  });
});
