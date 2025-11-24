import PropTypes from 'prop-types';
import {ThumbsUp, ThumbsDown} from 'lucide-react';
import {cn} from '../lib/utils';

function VoteButtons({
  upVotesBy,
  downVotesBy,
  authUserId,
  onVote,
  orientation = 'vertical',
}) {
  const isUpVoted = upVotesBy.includes(authUserId);
  const isDownVoted = downVotesBy.includes(authUserId);

  const handleUpVote = (e) => {
    e.stopPropagation();
    onVote(isUpVoted ? 'neutral' : 'up');
  };

  const handleDownVote = (e) => {
    e.stopPropagation();
    onVote(isDownVoted ? 'neutral' : 'down');
  };

  return (
    <div
      className={cn(
        'flex items-center gap-1',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
      )}
    >
      <button
        onClick={handleUpVote}
        className={cn(
          'flex items-center gap-1 p-1 rounded hover:bg-muted transition-colors',
          isUpVoted && 'text-primary font-bold',
        )}
        aria-label="Upvote"
      >
        <ThumbsUp size={18} className={cn(isUpVoted && 'fill-current')} />
        <span className="text-xs">{upVotesBy.length}</span>
      </button>

      <button
        onClick={handleDownVote}
        className={cn(
          'flex items-center gap-1 p-1 rounded hover:bg-muted transition-colors',
          isDownVoted && 'text-destructive font-bold',
        )}
        aria-label="Downvote"
      >
        <ThumbsDown size={18} className={cn(isDownVoted && 'fill-current')} />
        <span className="text-xs">{downVotesBy.length}</span>
      </button>
    </div>
  );
}

VoteButtons.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string,
  onVote: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
};

export default VoteButtons;
