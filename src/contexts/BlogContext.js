import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { getAllBlogs, getBlogById, addComment, addLike } from '../services/blogService';

const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [fetchingBlog, setFetchingBlog] = useState(false);

  // Load all blogs only once on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getAllBlogs();
        setBlogs(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch blogs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Memoize fetchBlogById to prevent re-creation on every render
  const fetchBlogById = useCallback(async (id) => {
    // Prevent multiple simultaneous calls for the same blog
    if (fetchingBlog) {
      return null;
    }
    
    // Check if we already have this blog in our blogs array
    const existingBlog = blogs.find(blog => blog.id === parseInt(id));
    if (existingBlog) {
      setCurrentBlog(existingBlog);
      return existingBlog;
    }
    
    try {
      setFetchingBlog(true);
      setLoading(true);
      const blog = await getBlogById(parseInt(id));
      setCurrentBlog(blog);
      setError(null);
      return blog;
    } catch (err) {
      setError('Failed to fetch blog details');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
      setFetchingBlog(false);
    }
  }, [blogs, fetchingBlog]);

  const addCommentToBlog = async (blogId, comment) => {
    try {
      await addComment(blogId, comment);
      // Update local state to reflect the new comment
      setBlogs(prevBlogs => {
        return prevBlogs.map(blog => {
          if (blog.id === parseInt(blogId)) {
            return {
              ...blog,
              comments: [...blog.comments, { ...comment, id: Date.now() }]
            };
          }
          return blog;
        });
      });

      if (currentBlog && currentBlog.id === parseInt(blogId)) {
        setCurrentBlog({
          ...currentBlog,
          comments: [...currentBlog.comments, { ...comment, id: Date.now() }]
        });
      }
      return true;
    } catch (err) {
      console.error('Failed to add comment:', err);
      return false;
    }
  };

  const addLikeToBlog = async (blogId) => {
    try {
      await addLike(blogId);
      // Update local state to reflect the new like
      setBlogs(prevBlogs => {
        return prevBlogs.map(blog => {
          if (blog.id === parseInt(blogId)) {
            return {
              ...blog,
              likes: blog.likes + 1
            };
          }
          return blog;
        });
      });

      if (currentBlog && currentBlog.id === parseInt(blogId)) {
        setCurrentBlog({
          ...currentBlog,
          likes: currentBlog.likes + 1
        });
      }
      return true;
    } catch (err) {
      console.error('Failed to add like:', err);
      return false;
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||  blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = filterTag ? blog.tags.includes(filterTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <BlogContext.Provider
      value={{
        blogs: filteredBlogs,
        loading,
        error,
        currentBlog,
        fetchBlogById,
        addCommentToBlog,
        addLikeToBlog,
        searchTerm,
        setSearchTerm,
        filterTag,
        setFilterTag
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContext;