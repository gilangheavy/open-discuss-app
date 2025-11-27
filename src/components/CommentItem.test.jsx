import {describe, it, expect, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import CommentItem from './CommentItem';

// Mock VoteButtons component
vi.mock('./VoteButtons', () => ({
  default: ({upVotesBy, downVotesBy, authUserId, onVote}) => (
    <div data-testid="vote-buttons">
      <button onClick={() => onVote('up')}>Upvote</button>
      <button onClick={() => onVote('down')}>Downvote</button>
      <span data-testid="upvotes">{upVotesBy.length}</span>
      <span data-testid="downvotes">{downVotesBy.length}</span>
      <span data-testid="auth-user">{authUserId}</span>
    </div>
  ),
}));

describe('CommentItem', () => {
  const mockComment = {
    id: 'comment-1',
    content: '<p>This is a test comment</p>',
    createdAt: '2025-01-01T00:00:00.000Z',
    owner: {
      id: 'user-2',
      name: 'Jane Smith',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
    },
    upVotesBy: ['user-3'],
    downVotesBy: [],
  };

  const mockOnVote = vi.fn();

  it('should render comment content correctly', () => {
    render(
      <CommentItem
        comment={mockComment}
        authUserId="user-1"
        onVote={mockOnVote}
      />,
    );

    // Content is rendered via dangerouslySetInnerHTML, so we check for the text
    expect(screen.getByText(/This is a test comment/i)).toBeInTheDocument();
  });

  it('should render owner name and avatar', () => {
    render(
      <CommentItem
        comment={mockComment}
        authUserId="user-1"
        onVote={mockOnVote}
      />,
    );

    // Check owner name
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    // Check avatar image
    const avatar = screen.getByAltText('Jane Smith');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockComment.owner.avatar);
  });

  it('should render formatted time', () => {
    render(
      <CommentItem
        comment={mockComment}
        authUserId="user-1"
        onVote={mockOnVote}
      />,
    );

    // formatDistanceToNow will show something like "sekian waktu yang lalu" in Indonesian
    // We just check that some time-related text is present
    const timeElement = screen.getByText(/yang lalu/i);
    expect(timeElement).toBeInTheDocument();
  });

  it('should render VoteButtons with correct props', () => {
    render(
      <CommentItem
        comment={mockComment}
        authUserId="user-1"
        onVote={mockOnVote}
      />,
    );

    // Verify VoteButtons is rendered
    expect(screen.getByTestId('vote-buttons')).toBeInTheDocument();

    // Verify props passed to VoteButtons
    expect(screen.getByTestId('upvotes')).toHaveTextContent('1');
    expect(screen.getByTestId('downvotes')).toHaveTextContent('0');
    expect(screen.getByTestId('auth-user')).toHaveTextContent('user-1');
  });

  it('should call onVote with comment id and vote type', () => {
    render(
      <CommentItem
        comment={mockComment}
        authUserId="user-1"
        onVote={mockOnVote}
      />,
    );

    // Click upvote button in mocked VoteButtons
    const upvoteButton = screen.getByText('Upvote');
    upvoteButton.click();

    // Verify onVote called with comment id and vote type
    expect(mockOnVote).toHaveBeenCalledWith('comment-1', 'up');
  });
});
