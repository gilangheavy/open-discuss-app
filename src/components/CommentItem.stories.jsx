import CommentItem from './CommentItem';

export default {
  title: 'Components/CommentItem',
  component: CommentItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onVote: {action: 'voted'},
  },
};

export const Default = {
  args: {
    comment: {
      id: 'comment-1',
      content: '<p>This is a sample comment with <strong>HTML</strong> content. It demonstrates how comments are displayed in the application.</p>',
      createdAt: '2025-01-01T00:00:00.000Z',
      owner: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
      },
      upVotesBy: ['user-2', 'user-3'],
      downVotesBy: [],
    },
    authUserId: 'user-4',
    onVote: (commentId, voteType) => console.log('Voted on comment:', commentId, voteType),
  },
};

export const WithVotes = {
  args: {
    comment: {
      id: 'comment-2',
      content: '<p>Another comment example with multiple votes!</p>',
      createdAt: '2025-01-15T12:30:00.000Z',
      owner: {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=FF6B6B&color=fff',
      },
      upVotesBy: ['user-1', 'user-3', 'user-4'],
      downVotesBy: ['user-5'],
    },
    authUserId: 'user-1',
    onVote: (commentId, voteType) => console.log('Voted on comment:', commentId, voteType),
  },
};
