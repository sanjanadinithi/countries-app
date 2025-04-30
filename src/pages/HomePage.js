import React, { useState, useEffect, useCallback } from 'react';
import {
  fetchAllCountries,
  fetchCountryByName,
  fetchCountriesByRegion,
} from '../services/countryService';
import CountryCard from '../components/CountryCard';
import SearchFilter from '../components/SearchFilter';
import useFavorites from '../hooks/useFavorites';

function HomePage() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(true);

  // Favorites
  const [favorites, toggleFavorite] = useFavorites();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Load Countries Function
  const loadCountries = useCallback(async () => {
    setLoading(true);
    try {
      if (search) {
        const data = await fetchCountryByName(search);
        setCountries(data);
      } else if (region) {
        const data = await fetchCountriesByRegion(region);
        setCountries(data);
      } else {
        const data = await fetchAllCountries();
        setCountries(data);
      }
    } catch (err) {
      console.error('Failed to fetch countries:', err);
      setCountries([]);
    }
    setLoading(false);
  }, [search, region]);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  // Apply favorites filter
  const filtered = showOnlyFavorites
    ? countries.filter((c) => favorites.includes(c.cca3))
    : countries;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <SearchFilter
          search={search}
          setSearch={setSearch}
          region={region}
          setRegion={setRegion}
        />
        <button
          onClick={() => setShowOnlyFavorites((prev) => !prev)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          {showOnlyFavorites ? 'Show All Countries' : 'Show Favorites'}
        </button>
      </div>

      {loading ? (
        <div className="text-center text-lg">Loading countries...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500">No countries found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              toggleFavorite={toggleFavorite}
              isFav={favorites.includes(country.cca3)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
