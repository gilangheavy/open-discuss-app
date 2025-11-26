import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import CommentInput from './CommentInput';

describe('CommentInput', () => {
  it('should call addComment with content when form submitted', () => {
    const mockAddComment = vi.fn();
    render(<CommentInput addComment={mockAddComment} />);

    const textarea = screen.getByPlaceholderText('Tulis komentar...');
    const submitButton = screen.getByRole('button', {name: /kirim komentar/i});

    // Type comment
    fireEvent.change(textarea, {target: {value: 'Test comment'}});

    // Submit form
    fireEvent.click(submitButton);

    expect(mockAddComment).toHaveBeenCalledWith('Test comment');
    expect(mockAddComment).toHaveBeenCalledTimes(1);
  });

  it('should clear input after successful submit', () => {
    const mockAddComment = vi.fn();
    render(<CommentInput addComment={mockAddComment} />);

    const textarea = screen.getByPlaceholderText('Tulis komentar...');
    const submitButton = screen.getByRole('button', {name: /kirim komentar/i});

    // Type and submit
    fireEvent.change(textarea, {target: {value: 'Test comment'}});
    fireEvent.click(submitButton);

    // Verify input is cleared
    expect(textarea.value).toBe('');
  });

  it('should not submit when input is empty', () => {
    const mockAddComment = vi.fn();
    render(<CommentInput addComment={mockAddComment} />);

    const textarea = screen.getByPlaceholderText('Tulis komentar...');
    const form = textarea.closest('form');

    // Try to submit empty form
    fireEvent.submit(form);

    // addComment should not be called because input is empty
    expect(mockAddComment).not.toHaveBeenCalled();
  });

  it('should have required attribute on textarea', () => {
    const mockAddComment = vi.fn();
    render(<CommentInput addComment={mockAddComment} />);

    const textarea = screen.getByPlaceholderText('Tulis komentar...');

    expect(textarea).toHaveAttribute('required');
  });
});
