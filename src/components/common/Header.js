import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlogContext } from '../../contexts/BlogContext';

const Header = () => {
  const { searchTerm, setSearchTerm } = useBlogContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled via context
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // In a real app, clear auth tokens here
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>Global Blogs</h1>
          </Link>
          
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          
          <nav className="nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              {isLoggedIn ? (
                <>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;