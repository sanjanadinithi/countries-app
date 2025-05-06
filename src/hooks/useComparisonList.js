import { useState, useEffect } from 'react';

export default function useComparisonList() {
  const [comparisonList, setComparisonList] = useState(() => {
    const stored = localStorage.getItem('comparisonList');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('comparisonList', JSON.stringify(comparisonList));
  }, [comparisonList]);

  const addToComparison = (country) => {
    // Prevent adding duplicates
    if (!comparisonList.some(c => c.cca3 === country.cca3)) {
      // Limit to max 4 countries for reasonable UI
      if (comparisonList.length < 4) {
        setComparisonList(prev => [...prev, country]);
        return true;
      }
      return false;
    }
    return false;
  };

  const removeFromComparison = (countryCode) => {
    setComparisonList(prev => prev.filter(c => c.cca3 !== countryCode));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const isInComparison = (countryCode) => {
    return comparisonList.some(c => c.cca3 === countryCode);
  };

  return {
    comparisonList,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison
  };
}