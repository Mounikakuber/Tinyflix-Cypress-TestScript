import React, { useState } from 'react';

const CommentBox = ({ comments, setComments, videoId }) => {
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateComment = (comment) => {
    if (!comment.trim()) {
      return 'Comment cannot be empty';
    }
    if (comment.length < 3) {
      return 'Comment must be at least 3 characters long';
    }
    if (comment.length > 500) {
      return 'Comment must be less than 500 characters';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateComment(newComment);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const comment = {
        id: Date.now(),
        videoId,
        text: newComment.trim(),
        timestamp: new Date().toISOString(),
        likes: 0,
        replies: []
      };

      setComments([...comments, comment]);
      setNewComment('');
    } catch (err) {
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const handleReply = (commentId, replyText) => {
    if (!replyText.trim()) return;

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            replies: [...comment.replies, {
              id: Date.now(),
              text: replyText.trim(),
              timestamp: new Date().toISOString(),
              likes: 0
            }]
          }
        : comment
    ));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
            setError('');
          }}
          placeholder="Add a comment..."
          aria-label="Comment text"
          maxLength={500}
        />
        {error && <div className="error-message" role="alert">{error}</div>}
        <button 
          type="submit" 
          disabled={isSubmitting}
          aria-label="Post comment"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      <div className="comments-list">
        {comments
          .filter(comment => comment.videoId === videoId)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <span className="timestamp">{formatTimestamp(comment.timestamp)}</span>
                <button 
                  onClick={() => handleLike(comment.id)}
                  aria-label="Like comment"
                >
                  👍 {comment.likes}
                </button>
              </div>
              <p>{comment.text}</p>
              
              <div className="replies">
                {comment.replies.map(reply => (
                  <div key={reply.id} className="reply">
                    <span className="timestamp">{formatTimestamp(reply.timestamp)}</span>
                    <p>{reply.text}</p>
                    <button 
                      onClick={() => handleLike(reply.id)}
                      aria-label="Like reply"
                    >
                      👍 {reply.likes}
                    </button>
                  </div>
                ))}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const replyText = e.target.reply.value;
                    handleReply(comment.id, replyText);
                    e.target.reply.value = '';
                  }}
                  className="reply-form"
                >
                  <input
                    name="reply"
                    placeholder="Reply to this comment..."
                    aria-label="Reply text"
                  />
                  <button type="submit">Reply</button>
                </form>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentBox;
