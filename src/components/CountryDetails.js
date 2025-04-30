import React from 'react';

function CountryDetails({ country }) {
  return (
    <div className="p-6">
      <img src={country.flags.png} alt={country.name.common} className="w-48 mb-4" />
      <h2 className="text-2xl font-bold">{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
    </div>
  );
}

export default CountryDetails;
