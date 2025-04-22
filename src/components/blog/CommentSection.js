import React, { useState } from 'react';
import { useBlogContext } from '../../contexts/BlogContext';

const CommentSection = ({ blogId, comments }) => {
  const { addCommentToBlog } = useBlogContext();
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [commentError, setCommentError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setCommentError('Please enter a name');
      return;
    }
    
    if (!newComment.trim()) {
      setCommentError('Please enter a comment');
      return;
    }
    
    const comment = {
      username,
      text: newComment,
      date: new Date().toLocaleDateString()
    };
    
    const success = await addCommentToBlog(blogId, comment);
    if (success) {
      setNewComment('');
      setCommentError('');
    } else {
      setCommentError('Failed to add comment. Please try again.');
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>
      
      <div className="comment-form-container">
        <form className="comment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              rows="4"
            ></textarea>
          </div>
          
          {commentError && <div className="error-message">{commentError}</div>}
          
          <button type="submit" className="comment-button">Post Comment</button>
        </form>
      </div>
      
      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment, index) => (
            <div key={comment.id || index} className="comment">
              <div className="comment-header">
                <span className="comment-username">{comment.username}</span>
                <span className="comment-date">{comment.date}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;