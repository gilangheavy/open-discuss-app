import VoteButtons from './VoteButtons';

export default {
  title: 'Components/VoteButtons',
  component: VoteButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onVote: {action: 'voted'},
  },
};

export const Neutral = {
  args: {
    upVotesBy: [],
    downVotesBy: [],
    authUserId: 'user-1',
    onVote: (voteType) => console.log('Voted:', voteType),
  },
};

export const Upvoted = {
  args: {
    upVotesBy: ['user-1'],
    downVotesBy: [],
    authUserId: 'user-1',
    onVote: (voteType) => console.log('Voted:', voteType),
  },
};

export const Downvoted = {
  args: {
    upVotesBy: [],
    downVotesBy: ['user-1'],
    authUserId: 'user-1',
    onVote: (voteType) => console.log('Voted:', voteType),
  },
};
