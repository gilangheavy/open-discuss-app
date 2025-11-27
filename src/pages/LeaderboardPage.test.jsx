import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {BrowserRouter} from 'react-router-dom';
import LeaderboardPage from './LeaderboardPage';
import leaderboardsReducer from '../features/leaderboards/leaderboardsSlice';

// Mock async actions to prevent actual API calls
vi.mock('../features/leaderboards/leaderboardsSlice', async () => {
  const actual = await vi.importActual('../features/leaderboards/leaderboardsSlice');
  return {
    ...actual,
    asyncReceiveLeaderboards: vi.fn(() => ({type: 'mock/leaderboards'})),
  };
});

// Helper function to render with Redux store
const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        leaderboards: leaderboardsReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) => {
  const Wrapper = ({children}) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );

  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
};

describe('LeaderboardPage', () => {
  it('should render leaderboard list correctly', () => {
    // Mock state with leaderboard data
    const mockLeaderboards = [
      {
        user: {
          id: 'user-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe',
        },
        score: 100,
      },
      {
        user: {
          id: 'user-2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
        },
        score: 75,
      },
      {
        user: {
          id: 'user-3',
          name: 'Bob Wilson',
          email: 'bob@example.com',
          avatar: 'https://ui-avatars.com/api/?name=Bob+Wilson',
        },
        score: 50,
      },
    ];

    const preloadedState = {
      leaderboards: {
        leaderboards: mockLeaderboards,
        status: 'succeeded',
        error: null,
      },
    };

    renderWithProviders(<LeaderboardPage />, {preloadedState});

    // Verify page title
    expect(screen.getByText('Klasemen Pengguna Aktif')).toBeInTheDocument();
    expect(screen.getByText('10 Pengguna Teratas')).toBeInTheDocument();

    // Verify all users are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();

    expect(screen.getByText('Bob Wilson')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();

    // Verify rank numbers
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should show loading indicator when status is loading', () => {
    const preloadedState = {
      leaderboards: {
        leaderboards: [],
        status: 'loading',
        error: null,
      },
    };

    renderWithProviders(<LeaderboardPage />, {preloadedState});

    // Verify loading message is displayed
    expect(screen.getByText('Memuat klasemen...')).toBeInTheDocument();

    // Verify page title is still visible
    expect(screen.getByText('Klasemen Pengguna Aktif')).toBeInTheDocument();
  });

  it('should show empty state when leaderboards data is empty', () => {
    const preloadedState = {
      leaderboards: {
        leaderboards: [],
        status: 'succeeded',
        error: null,
      },
    };

    renderWithProviders(<LeaderboardPage />, {preloadedState});

    // Verify page title is visible
    expect(screen.getByText('Klasemen Pengguna Aktif')).toBeInTheDocument();
    expect(screen.getByText('10 Pengguna Teratas')).toBeInTheDocument();

    // Verify no user data is displayed
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();

    // Note: LeaderboardPage doesn't have explicit empty state message
    // It just renders empty list, which is acceptable behavior
  });
});
