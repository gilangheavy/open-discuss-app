import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {MessageSquare} from 'lucide-react';
import VoteButtons from './VoteButtons';
import {formatDistanceToNow} from 'date-fns';
import {id} from 'date-fns/locale';

function ThreadItem({thread, authUserId, onVote}) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Vote Buttons (Left Side) */}
        <div className="flex-shrink-0">
          <VoteButtons
            upVotesBy={thread.upVotesBy}
            downVotesBy={thread.downVotesBy}
            authUserId={authUserId}
            onVote={(voteType) => onVote(thread.id, voteType)}
            orientation="vertical"
          />
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0">
          <div className="mb-2">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full mb-2">
              #{thread.category}
            </span>
            <Link to={`/threads/${thread.id}`} className="block">
              <h3 className="text-lg font-semibold text-foreground hover:text-primary truncate">
                {thread.title}
              </h3>
            </Link>
          </div>

          <div
            className="text-muted-foreground text-sm line-clamp-2 mb-3"
            dangerouslySetInnerHTML={{__html: thread.body}}
          />

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="font-medium text-foreground">
                {thread.user?.name || 'Unknown User'}
              </span>
            </div>
            <span>•</span>
            <span>
              {formatDistanceToNow(new Date(thread.createdAt), {
                addSuffix: true,
                locale: id,
              })}
            </span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MessageSquare size={14} />
              <span>{thread.totalComments} komentar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
  authUserId: PropTypes.string,
  onVote: PropTypes.func.isRequired,
};

export default ThreadItem;
