import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './contexts/BlogContext';
import Header from './components/common/Header';
import BlogList from './components/blog/BlogList';
import BlogDetail from './components/blog/BlogDetail';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './styles/main.css';

function App() {
  return (
    <BlogProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <footer className="footer">
            <div className="container">
              <p>&copy; {new Date().getFullYear()} Global Blogs - A React Blog System</p>
            </div>
          </footer>
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;