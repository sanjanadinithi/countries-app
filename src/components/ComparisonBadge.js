import React from 'react';

function ComparisonBadge({ isInComparison, onClick, position = "top-left" }) {
  const positionClasses = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2"
  };

  return (
    <button 
      onClick={onClick} 
      className={`absolute ${positionClasses[position]} z-10 bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold p-1 rounded-full w-6 h-6 flex items-center justify-center`}
    >
      {isInComparison ? "✓" : "+"}
    </button>
  );
}

export default ComparisonBadge;
