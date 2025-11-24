import {useState} from 'react';
import PropTypes from 'prop-types';
import {Send} from 'lucide-react';

function CommentInput({addComment}) {
  const [content, setContent] = useState('');

  const onCommentSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    addComment(content);
    setContent('');
  };

  return (
    <form onSubmit={onCommentSubmit} className="mb-8">
      <div className="flex gap-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis komentar..."
          className="flex-grow px-4 py-3 border border-input rounded-lg
            focus:outline-none focus:ring-2 focus:ring-ring
            bg-background resize-none h-24"
          required
        />
        <button
          type="submit"
          className="self-end p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          title="Kirim Komentar"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
