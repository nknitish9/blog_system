import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogContext } from '../../contexts/BlogContext';

const BlogCard = ({ blog }) => {
  const { addLikeToBlog } = useBlogContext();
  
  const handleLike = (e) => {
    e.preventDefault();
    addLikeToBlog(blog.id);
  };

  return (
    <div className="blog-card">
      <Link to={`/blog/${blog.id}`} className="blog-card-link">
        <div className="blog-card-image">
          <img src={blog.image} alt={blog.title} />
        </div>
        <div className="blog-card-content">
          <h3 className="blog-card-title">{blog.title}</h3>
          <p className="blog-card-excerpt">{blog.excerpt}</p>
          <div className="blog-card-meta">
            <span className="blog-card-author">{blog.author}</span>
            <span className="blog-card-date">{blog.date}</span>
          </div>
          <div className="blog-card-tags">
            {blog.tags.map(tag => (
              <span key={tag} className="blog-card-tag">{tag}</span>
            ))}
          </div>
          <div className="blog-card-stats">
            <button className="like-button" onClick={handleLike}>
              ❤️ {blog.likes}
            </button>
            <span className="comment-count">
              💬 {blog.comments.length}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;