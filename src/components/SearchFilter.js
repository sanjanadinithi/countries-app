import React from 'react';

function SearchFilter({ search, setSearch, region, setRegion }) {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full md:w-1/2"
      />
      
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="border p-2 rounded w-full md:w-1/2"
      >
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}

export default SearchFilter;
