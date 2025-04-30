import React from 'react';
import useDarkMode from '../hooks/useDarkMode';

function Header() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <header className="bg-white dark:bg-gray-800 text-black dark:text-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Where in the world?</h1>
      <button onClick={() => setDarkMode(!darkMode)} className="flex items-center space-x-2">
        <span>🌙 Dark Mode</span>
      </button>
    </header>
  );
}

export default Header;
