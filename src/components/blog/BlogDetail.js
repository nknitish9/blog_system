import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlogContext } from '../../contexts/BlogContext';
import Loader from '../common/Loader';
import CommentSection from './CommentSection';

const BlogDetail = () => {
  const { id } = useParams();
  const { currentBlog, fetchBlogById, loading, error, addLikeToBlog, blogs } = useBlogContext();
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // Fetch blog only once when component mounts or id changes
  useEffect(() => {
    const loadBlog = async () => {
      await fetchBlogById(parseInt(id));
      setInitialLoadDone(true);
    };
    
    loadBlog();
  }, [id, fetchBlogById]);

  // Find related blogs once have the current blog
  useEffect(() => {
    if (currentBlog && blogs && blogs.length > 0) {
      // Find related blogs based on tags
      const related = blogs
        .filter(blog => 
          blog.id !== currentBlog.id && 
          blog.tags.some(tag => currentBlog.tags.includes(tag))
        )
        .slice(0, 3);
      setRelatedBlogs(related);
    }
  }, [currentBlog, blogs]);

  // Only show loading on initial load
  if (!initialLoadDone && loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;
  if (!currentBlog) return <div className="error-message">Blog not found</div>;

  const handleLike = () => {
    addLikeToBlog(currentBlog.id);
  };

  return (
    <div className="blog-detail">
      <div className="container">
        <div className="blog-header">
          <h1 className="blog-title">{currentBlog.title}</h1>
          <div className="blog-meta">
            <span className="blog-author">{currentBlog.author}</span>
            <span className="blog-date">{currentBlog.date}</span>
          </div>
        </div>
        
        <div className="blog-image">
          <img src={currentBlog.image} alt={currentBlog.title} />
        </div>
        
        <div className="blog-content">
          {currentBlog.content.split('\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
        
        <div className="blog-tags">
          {currentBlog.tags.map(tag => (
            <span key={tag} className="blog-tag">{tag}</span>
          ))}
        </div>
        
        <div className="blog-actions">
          <button className="like-button" onClick={handleLike}>
            ❤️ Like ({currentBlog.likes})
          </button>
        </div>
        
        <CommentSection blogId={currentBlog.id} comments={currentBlog.comments} />
        
        {relatedBlogs.length > 0 && (
          <div className="related-blogs">
            <h3>Related Blogs</h3>
            <div className="related-blogs-grid">
              {relatedBlogs.map(blog => (
                <div key={blog.id} className="related-blog-card">
                  <Link to={`/blog/${blog.id}`}>
                    <img src={blog.image} alt={blog.title} />
                    <h4>{blog.title}</h4>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="blog-navigation">
          <Link to="/" className="back-button">← Back to Blogs</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;