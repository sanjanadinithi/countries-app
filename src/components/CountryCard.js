import React from 'react';
import { Link } from 'react-router-dom';
import ComparisonBadge from './ComparisonBadge';

function CountryCard({ country, toggleFavorite, isFav, addToComparison, isInComparison }) {
  return (
    <div className="relative border rounded-lg overflow-hidden shadow hover:scale-105 transition bg-white dark:bg-gray-800 text-black dark:text-white">
      <img src={country.flags.png} alt={country.name.common} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{country.name.common}</h2>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Capital:</strong> {country.capital?.[0]}</p>
        <Link to={`/country/${country.cca3}`} className="block mt-2 text-blue-400 underline">
          View Details
        </Link>
        <button onClick={() => toggleFavorite(country.cca3)} className="absolute top-2 right-2">
          {isFav ? '⭐' : '☆'}
        </button>
        <ComparisonBadge 
          isInComparison={isInComparison(country.cca3)} 
          onClick={() => isInComparison(country.cca3) ? null : addToComparison(country)}
          position="bottom-right"
        />
      </div>
    </div>
  );
}

export default CountryCard;
