import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountryByCode } from '../services/countryService';
import CountryDetails from '../components/CountryDetails';

function CountryPage() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function loadCountry() {
      try {
        const [data] = await fetchCountryByCode(code);
        setCountry(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadCountry();
  }, [code]);

  if (!country) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <CountryDetails country={country} />
    </div>
  );
}

export default CountryPage;
