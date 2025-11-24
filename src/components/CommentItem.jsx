import PropTypes from 'prop-types';
import {formatDistanceToNow} from 'date-fns';
import {id} from 'date-fns/locale';
import VoteButtons from './VoteButtons';

function CommentItem({comment, authUserId, onVote}) {
  return (
    <div className="border-b border-border last:border-0 pb-6 last:pb-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <img
            src={comment.owner.avatar}
            alt={comment.owner.name}
            className="w-8 h-8 rounded-full border border-border"
          />
          <div>
            <p className="text-sm font-medium text-foreground">
              {comment.owner.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
                locale: id,
              })}
            </p>
          </div>
        </div>
      </div>

      <div
        className="text-sm text-foreground mb-3"
        dangerouslySetInnerHTML={{__html: comment.content}}
      />

      <VoteButtons
        upVotesBy={comment.upVotesBy}
        downVotesBy={comment.downVotesBy}
        authUserId={authUserId}
        onVote={(voteType) => onVote(comment.id, voteType)}
        orientation="horizontal"
      />
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  authUserId: PropTypes.string.isRequired,
  onVote: PropTypes.func.isRequired,
};

export default CommentItem;
