import React from 'react';
import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const [darkMode, setDarkMode] = useDarkMode();
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 text-black dark:text-white shadow p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-xl font-bold">Where in the world?</Link>
        
        <nav className="flex items-center space-x-4 mt-3 md:mt-0">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/statistics" className="hover:text-blue-500">Statistics</Link>
          {currentUser && <Link to="/compare" className="hover:text-blue-500">Compare</Link>}
        </nav>
        
        <div className="flex items-center space-x-4 mt-3 md:mt-0">
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, {currentUser.name}</span>
              <button 
                onClick={logout}
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-sm text-blue-500 hover:text-blue-700">
              Login
            </Link>
          )}
          
          <button onClick={() => setDarkMode(!darkMode)} className="flex items-center space-x-2">
            <span>{darkMode ? '☀️ Light' : '🌙 Dark'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;