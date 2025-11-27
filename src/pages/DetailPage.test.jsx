import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {BrowserRouter} from 'react-router-dom';
import DetailPage from './DetailPage';
import threadDetailReducer from '../features/threadDetail/threadDetailSlice';
import authReducer from '../features/auth/authSlice';

// Mock child components to simplify testing
vi.mock('../components/VoteButtons', () => ({
  default: ({upVotesBy, downVotesBy}) => (
    <div data-testid="vote-buttons">
      Votes: {upVotesBy.length} up, {downVotesBy.length} down
    </div>
  ),
}));

vi.mock('../components/CommentInput', () => ({
  default: ({addComment}) => (
    <div data-testid="comment-input">
      <button onClick={() => addComment('test')}>Add Comment</button>
    </div>
  ),
}));

vi.mock('../components/CommentItem', () => ({
  default: ({comment}) => (
    <div data-testid="comment-item">
      Comment: {comment.content}
    </div>
  ),
}));

// Mock async actions to prevent actual API calls
vi.mock('../features/threadDetail/threadDetailSlice', async () => {
  const actual = await vi.importActual('../features/threadDetail/threadDetailSlice');
  return {
    ...actual,
    asyncReceiveThreadDetail: vi.fn(() => ({type: 'mock/threadDetail'})),
    asyncAddComment: vi.fn(() => ({type: 'mock/addComment'})),
    asyncToggleVoteThreadDetail: vi.fn(() => ({type: 'mock/voteThread'})),
    asyncToggleVoteComment: vi.fn(() => ({type: 'mock/voteComment'})),
  };
});

// Helper to render with Redux Provider
const renderWithProviders = (
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        threadDetail: threadDetailReducer,
        auth: authReducer,
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
  return render(ui, {wrapper: Wrapper, ...renderOptions});
};

describe('DetailPage', () => {
  const mockThreadDetail = {
    id: 'thread-1',
    title: 'Test Thread Title',
    body: '<p>This is the thread content</p>',
    category: 'React',
    createdAt: '2025-01-01T00:00:00.000Z',
    owner: {
      id: 'user-1',
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    },
    upVotesBy: ['user-2'],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'First comment',
        createdAt: '2025-01-01T01:00:00.000Z',
        owner: {
          id: 'user-2',
          name: 'Jane Smith',
          avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
      {
        id: 'comment-2',
        content: 'Second comment',
        createdAt: '2025-01-01T02:00:00.000Z',
        owner: {
          id: 'user-3',
          name: 'Bob Wilson',
          avatar: 'https://ui-avatars.com/api/?name=Bob+Wilson',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  };

  const initialState = {
    threadDetail: {
      threadDetail: mockThreadDetail,
      status: 'succeeded',
      error: null,
    },
    auth: {
      authUser: {id: 'user-1', name: 'Test User'},
    },
  };

  it('should render thread details correctly', () => {
    renderWithProviders(<DetailPage />, {preloadedState: initialState});

    // Verify thread title
    expect(screen.getByText('Test Thread Title')).toBeInTheDocument();

    // Verify thread category
    expect(screen.getByText('#React')).toBeInTheDocument();

    // Verify thread content (rendered via dangerouslySetInnerHTML)
    expect(screen.getByText(/This is the thread content/i)).toBeInTheDocument();

    // Verify owner name
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render VoteButtons for thread', () => {
    renderWithProviders(<DetailPage />, {preloadedState: initialState});

    // Verify VoteButtons is rendered (we have 3: thread + 2 comments)
    const voteButtons = screen.getAllByTestId('vote-buttons');
    expect(voteButtons.length).toBeGreaterThan(0);

    // First VoteButtons should be for the thread
    expect(voteButtons[0]).toHaveTextContent('Votes: 1 up, 0 down');
  });

  it('should render CommentInput component', () => {
    renderWithProviders(<DetailPage />, {preloadedState: initialState});

    // Verify CommentInput is rendered
    expect(screen.getByTestId('comment-input')).toBeInTheDocument();
  });

  it('should render CommentItem for each comment', () => {
    renderWithProviders(<DetailPage />, {preloadedState: initialState});

    // Verify all comments are rendered
    const commentItems = screen.getAllByTestId('comment-item');
    expect(commentItems).toHaveLength(2);

    // Verify comment content
    expect(screen.getByText('Comment: First comment')).toBeInTheDocument();
    expect(screen.getByText('Comment: Second comment')).toBeInTheDocument();
  });

  it('should show loading state when status is loading', () => {
    const loadingState = {
      threadDetail: {
        threadDetail: null,
        status: 'loading',
        error: null,
      },
      auth: {
        authUser: {id: 'user-1', name: 'Test User'},
      },
    };

    renderWithProviders(<DetailPage />, {preloadedState: loadingState});

    // Verify loading message is displayed
    expect(screen.getByText('Memuat detail diskusi...')).toBeInTheDocument();
  });

  it('should show comments count correctly', () => {
    renderWithProviders(<DetailPage />, {preloadedState: initialState});

    // Verify comments count header
    expect(screen.getByText('Komentar (2)')).toBeInTheDocument();
  });
});
