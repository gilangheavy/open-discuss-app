import {describe, it, expect, vi, afterEach} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import VoteButtons from './VoteButtons';

describe('VoteButtons', () => {
  const mockOnVote = vi.fn();

  const defaultProps = {
    upVotesBy: [],
    downVotesBy: [],
    authUserId: 'user-1',
    onVote: mockOnVote,
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call onVote with "up" when upvote button clicked', () => {
    render(<VoteButtons {...defaultProps} />);

    const upvoteButton = screen.getByLabelText('Upvote');
    fireEvent.click(upvoteButton);

    expect(mockOnVote).toHaveBeenCalledWith('up');
    expect(mockOnVote).toHaveBeenCalledTimes(1);
  });

  it('should call onVote with "down" when downvote button clicked', () => {
    render(<VoteButtons {...defaultProps} />);

    const downvoteButton = screen.getByLabelText('Downvote');
    fireEvent.click(downvoteButton);

    expect(mockOnVote).toHaveBeenCalledWith('down');
    expect(mockOnVote).toHaveBeenCalledTimes(1);
  });

  it('should show upvoted state when authUserId in upVotesBy', () => {
    const props = {
      ...defaultProps,
      upVotesBy: ['user-1'],
    };

    render(<VoteButtons {...props} />);

    const upvoteButton = screen.getByLabelText('Upvote');

    // Check if button has the upvoted styling (text-primary class)
    expect(upvoteButton).toHaveClass('text-primary');
    expect(upvoteButton).toHaveClass('font-bold');
  });

  it('should show downvoted state when authUserId in downVotesBy', () => {
    const props = {
      ...defaultProps,
      downVotesBy: ['user-1'],
    };

    render(<VoteButtons {...props} />);

    const downvoteButton = screen.getByLabelText('Downvote');

    // Check if button has the downvoted styling (text-destructive class)
    expect(downvoteButton).toHaveClass('text-destructive');
    expect(downvoteButton).toHaveClass('font-bold');
  });

  it('should call onVote with "neutral" when already upvoted button clicked again', () => {
    const props = {
      ...defaultProps,
      upVotesBy: ['user-1'],
    };

    render(<VoteButtons {...props} />);

    const upvoteButton = screen.getByLabelText('Upvote');
    fireEvent.click(upvoteButton);

    expect(mockOnVote).toHaveBeenCalledWith('neutral');
  });

  it('should call onVote with "neutral" when already downvoted button clicked again', () => {
    const props = {
      ...defaultProps,
      downVotesBy: ['user-1'],
    };

    render(<VoteButtons {...props} />);

    const downvoteButton = screen.getByLabelText('Downvote');
    fireEvent.click(downvoteButton);

    expect(mockOnVote).toHaveBeenCalledWith('neutral');
  });
});
