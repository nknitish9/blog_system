import React from 'react';
import { useBlogContext } from '../../contexts/BlogContext';
import BlogCard from './BlogCard';
import Loader from '../common/Loader';

const BlogList = () => {
  const { blogs, loading, error, filterTag, setFilterTag } = useBlogContext();

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  // Get unique tags from all blogs
  const allTags = [...new Set(blogs.flatMap(blog => blog.tags))];

  return (
    <div className="blog-list">
      <div className="container">
        <h2 className="section-title">Latest Blog Posts</h2>
        
        <div className="tag-filter">
          <span>Filter by tag: </span>
          <button 
            className={filterTag === '' ? 'active' : ''} 
            onClick={() => setFilterTag('')}
          >
            All
          </button>
          {allTags.map(tag => (
            <button 
              key={tag} 
              className={filterTag === tag ? 'active' : ''} 
              onClick={() => setFilterTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {blogs.length === 0 ? (
          <div className="no-blogs">No blogs found matching your criteria.</div>
        ) : (
          <div className="blog-grid">
            {blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;