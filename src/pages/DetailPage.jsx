import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, Link} from 'react-router-dom';
import {
  asyncReceiveThreadDetail,
  clearThreadDetail,
  asyncToggleVoteThreadDetail,
  asyncAddComment,
  asyncToggleVoteComment,
} from '../features/threadDetail/threadDetailSlice';
import VoteButtons from '../components/VoteButtons';
import CommentInput from '../components/CommentInput';
import CommentItem from '../components/CommentItem';
import {formatDistanceToNow} from 'date-fns';
import {id} from 'date-fns/locale';
import {ArrowLeft} from 'lucide-react';

function DetailPage() {
  const {id: threadId} = useParams();
  const dispatch = useDispatch();
  const {threadDetail, status} = useSelector((state) => state.threadDetail);
  const {authUser} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
    return () => {
      dispatch(clearThreadDetail());
    };
  }, [dispatch, threadId]);

  const onVoteThread = (voteType) => {
    dispatch(asyncToggleVoteThreadDetail({threadId, voteType}));
  };

  const onVoteComment = (commentId, voteType) => {
    dispatch(asyncToggleVoteComment({threadId, commentId, voteType}));
  };

  const onAddComment = (content) => {
    dispatch(asyncAddComment({threadId, content}));
  };

  if (status === 'loading' || !threadDetail) {
    return (
      <div
        className={
          'min-h-screen flex items-center justify-center ' +
          'text-muted-foreground'
        }
      >
        Memuat detail diskusi...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Navigation & Title */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/"
            className={
              'p-2 -ml-2 text-muted-foreground ' +
              'hover:text-foreground transition-colors'
            }
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold truncate">Detail Diskusi</h1>
        </div>

        {/* Thread Content */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm mb-6">
          <div className="mb-4">
            <span
              className={
                'inline-block px-3 py-1 text-sm font-medium bg-secondary ' +
                'text-secondary-foreground rounded-full mb-3'
              }
            >
              #{threadDetail.category}
            </span>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {threadDetail.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <span className="font-medium text-foreground">
                {threadDetail.owner.name}
              </span>
              <span>•</span>
              <span>
                {formatDistanceToNow(new Date(threadDetail.createdAt), {
                  addSuffix: true,
                  locale: id,
                })}
              </span>
            </div>
          </div>

          <div
            className="prose prose-sm sm:prose-base dark:prose-invert max-w-none mb-6"
            dangerouslySetInnerHTML={{__html: threadDetail.body}}
          />

          <div className="flex items-center gap-2">
            <VoteButtons
              upVotesBy={threadDetail.upVotesBy}
              downVotesBy={threadDetail.downVotesBy}
              authUserId={authUser.id}
              onVote={onVoteThread}
              orientation="horizontal"
            />
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-6">
            Komentar ({threadDetail.comments.length})
          </h3>

          <CommentInput addComment={onAddComment} />

          <div className="space-y-6">
            {threadDetail.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                authUserId={authUser.id}
                onVote={onVoteComment}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DetailPage;
