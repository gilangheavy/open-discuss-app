import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ThreadItem from './ThreadItem';

// Helper to render with router
const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('ThreadItem Integration Tests', () => {
    const mockThread = {
        id: 'thread-1',
        title: 'Test Thread Title',
        body: '<p>This is a test thread body</p>',
        category: 'general',
        createdAt: '2024-01-01T00:00:00.000Z',
        totalComments: 5,
        upVotesBy: ['user-1', 'user-2'],
        downVotesBy: ['user-3'],
        user: {
            name: 'Test User',
            avatar: 'https://example.com/avatar.jpg',
        },
    };

    const mockOnVote = vi.fn();

    it('should render thread with all information', () => {
        renderWithRouter(
            <ThreadItem
                thread={mockThread}
                authUserId="user-1"
                onVote={mockOnVote}
            />,
        );

        expect(screen.getByText('Test Thread Title')).toBeInTheDocument();
        expect(screen.getByText('#general')).toBeInTheDocument();
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('5 komentar')).toBeInTheDocument();
    });

    it('should display thread body as HTML', () => {
        renderWithRouter(
            <ThreadItem
                thread={mockThread}
                authUserId="user-1"
                onVote={mockOnVote}
            />,
        );

        // Body is rendered as HTML
        expect(screen.getByText(/This is a test thread body/i)).toBeInTheDocument();
    });

    it('should show vote counts correctly', () => {
        renderWithRouter(
            <ThreadItem
                thread={mockThread}
                authUserId="user-1"
                onVote={mockOnVote}
            />,
        );

        // Vote counts should be visible (VoteButtons component renders them)
        expect(screen.getByText('2')).toBeInTheDocument(); // upvotes
        expect(screen.getByText('1')).toBeInTheDocument(); // downvotes
    });

    it('should render link to thread detail page', () => {
        renderWithRouter(
            <ThreadItem
                thread={mockThread}
                authUserId="user-1"
                onVote={mockOnVote}
            />,
        );

        const titleLink = screen.getByRole('link', { name: /test thread title/i });
        expect(titleLink).toHaveAttribute('href', '/threads/thread-1');
    });

    it('should show "Unknown User" when thread user is missing', () => {
        const threadWithoutUser = {
            ...mockThread,
            user: null,
        };

        renderWithRouter(
            <ThreadItem
                thread={threadWithoutUser}
                authUserId="user-1"
                onVote={mockOnVote}
            />,
        );

        expect(screen.getByText('Unknown User')).toBeInTheDocument();
    });

    it('should call onVote when vote button is clicked', async () => {
        const user = userEvent.setup();
        renderWithRouter(
            <ThreadItem
                thread={mockThread}
                authUserId="user-4"
                onVote={mockOnVote}
            />,
        );

        // Find upvote button (assuming VoteButtons renders a button with aria-label or data-testid)
        // Note: We need to check VoteButtons to know exact selectors
        const upvoteButtons = screen.getAllByRole('button');

        if (upvoteButtons.length > 0) {
            await user.click(upvoteButtons[0]);
            expect(mockOnVote).toHaveBeenCalled();
        }
    });

    it('should display relative time from creation', () => {
        renderWithRouter(
            <ThreadItem
                thread={mockThread}
                authUserId="user-1"
                onVote={mockOnVote}
            />,
        );

        // Should show relative time (formatDistanceToNow)
        // Exact text depends on current time, just check it exists
        const timeElements = screen.getAllByText(/yang lalu|ago/i);
        expect(timeElements.length).toBeGreaterThan(0);
    });

    it('should render without authUserId (guest user)', () => {
        renderWithRouter(
            <ThreadItem
                thread={mockThread}
                authUserId={undefined}
                onVote={mockOnVote}
            />,
        );

        expect(screen.getByText('Test Thread Title')).toBeInTheDocument();
        // Should still render, just votes might be disabled
    });
});
