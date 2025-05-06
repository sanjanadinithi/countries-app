import React from 'react';
import { Link } from 'react-router-dom';

function ComparisonBar({ comparisonList, removeFromComparison, clearComparison }) {
  if (comparisonList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-700 p-3 shadow-lg border-t flex items-center justify-between">
      <div className="flex items-center gap-2 overflow-x-auto flex-grow">
        {comparisonList.map(country => (
          <div key={country.cca3} className="flex items-center bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow">
            <img src={country.flags.png} alt={country.name.common} className="w-5 h-4 mr-2" />
            <span className="truncate max-w-24">{country.name.common}</span>
            <button 
              onClick={() => removeFromComparison(country.cca3)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={clearComparison}
          className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
        >
          Clear
        </button>
        <Link 
          to="/compare" 
          className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
        >
          Compare
        </Link>
      </div>
    </div>
  );
}

export default ComparisonBar;