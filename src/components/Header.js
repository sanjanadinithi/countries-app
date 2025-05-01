import React from 'react';
import { Link } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const [darkMode, setDarkMode] = useDarkMode();
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 text-black dark:text-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Where in the world?</Link>
      
      <div className="flex items-center space-x-4">
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
          <span>🌙 Dark Mode</span>
        </button>
      </div>
    </header>
  );
}

export default Header;