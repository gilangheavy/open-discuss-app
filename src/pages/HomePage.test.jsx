import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';
import threadsReducer from '../features/threads/threadsSlice';
import authReducer from '../features/auth/authSlice';

// Mock ThreadItem component to simplify testing
vi.mock('../components/ThreadItem', () => ({
    default: ({ thread }) => (
        <div data-testid="thread-item">
            <span>{thread.title}</span>
            <span>{thread.category}</span>
        </div>
    ),
}));

// Mock async actions to prevent actual API calls
vi.mock('../features/threads/threadsSlice', async () => {
    const actual = await vi.importActual('../features/threads/threadsSlice');
    return {
        ...actual,
        asyncPopulateUsersAndThreads: vi.fn(() => ({ type: 'mock/populate' })),
        asyncToggleVoteThread: vi.fn(() => ({ type: 'mock/vote' })),
    };
});

// Helper to render with Redux Provider
const renderWithProviders = (
    ui,
    {
        preloadedState = {},
        store = configureStore({
            reducer: {
                threads: threadsReducer,
                auth: authReducer,
            },
            preloadedState,
        }),
        ...renderOptions
    } = {},
) => {
    const Wrapper = ({ children }) => (
        <Provider store={store}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    );
    return render(ui, { wrapper: Wrapper, ...renderOptions });
};

describe('HomePage Component - Thread Filter Logic', () => {
    const mockThreads = [
        {
            id: 'thread-1',
            title: 'React Thread 1',
            category: 'React',
            body: 'Body 1',
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
            createdAt: new Date().toISOString(),
        },
        {
            id: 'thread-2',
            title: 'Redux Thread 1',
            category: 'Redux',
            body: 'Body 2',
            ownerId: 'user-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
            createdAt: new Date().toISOString(),
        },
        {
            id: 'thread-3',
            title: 'React Thread 2',
            category: 'React',
            body: 'Body 3',
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
            createdAt: new Date().toISOString(),
        },
    ];

    const initialState = {
        threads: {
            threads: mockThreads,
            status: 'idle',
            error: null,
        },
        auth: {
            authUser: { id: 'user-1', name: 'Test User' },
        },
    };

    it('should render all threads initially', () => {
        renderWithProviders(<HomePage />, { preloadedState: initialState });

        // Verify all threads are displayed
        expect(screen.getByText('React Thread 1')).toBeInTheDocument();
        expect(screen.getByText('Redux Thread 1')).toBeInTheDocument();
        expect(screen.getByText('React Thread 2')).toBeInTheDocument();

        // Verify "Semua" button is present
        expect(screen.getByText('Semua')).toBeInTheDocument();
    });

    it('should filter threads by category when a category button is clicked', () => {
        renderWithProviders(<HomePage />, { preloadedState: initialState });

        // Click "React" category button
        const reactButton = screen.getByText('#React');
        fireEvent.click(reactButton);

        // Verify ONLY React threads are displayed
        expect(screen.getByText('React Thread 1')).toBeInTheDocument();
        expect(screen.getByText('React Thread 2')).toBeInTheDocument();
        expect(screen.queryByText('Redux Thread 1')).not.toBeInTheDocument();
    });

    it('should reset filter when "Semua" button is clicked', () => {
        renderWithProviders(<HomePage />, { preloadedState: initialState });

        // First filter by Redux
        fireEvent.click(screen.getByText('#Redux'));
        expect(screen.queryByText('React Thread 1')).not.toBeInTheDocument();

        // Then click "Semua"
        fireEvent.click(screen.getByText('Semua'));

        // Verify ALL threads are back
        expect(screen.getByText('React Thread 1')).toBeInTheDocument();
        expect(screen.getByText('Redux Thread 1')).toBeInTheDocument();
    });

    it('should display empty state message when no threads exist in selected category', () => {
        // This scenario is tricky with the current mock data because categories are derived from threads.
        // If a category exists in the buttons, it means there are threads for it.
        // However, we can test the "loading" or "empty" state if we pass empty threads.

        const emptyState = {
            ...initialState,
            threads: {
                threads: [],
                status: 'idle',
                error: null,
            }
        };

        renderWithProviders(<HomePage />, { preloadedState: emptyState });

        // Should show empty message (based on HomePage.jsx logic)
        // Line 86: filteredThreads.length === 0 ? "Tidak ada diskusi dalam kategori ini."
        expect(screen.getByText('Tidak ada diskusi dalam kategori ini.')).toBeInTheDocument();
    });
});
