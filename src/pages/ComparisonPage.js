import React from 'react';
import { Link } from 'react-router-dom';
import useComparisonList from '../hooks/useComparisonList';

function ComparisonPage() {
  const { comparisonList, removeFromComparison, clearComparison } = useComparisonList();

  if (comparisonList.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Country Comparison</h2>
        <p className="mb-4">You haven't selected any countries to compare.</p>
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
          Return to Home
        </Link>
      </div>
    );
  }

  // Prepare data for comparison
  const comparisonFields = [
    { label: 'Official Name', accessor: country => country.name.official },
    { label: 'Population', accessor: country => country.population.toLocaleString() },
    { label: 'Area', accessor: country => country.area ? `${country.area.toLocaleString()} km²` : 'N/A' },
    { label: 'Region', accessor: country => country.region },
    { label: 'Subregion', accessor: country => country.subregion || 'N/A' },
    { label: 'Capital', accessor: country => country.capital?.[0] || 'N/A' },
    { label: 'Languages', accessor: country => country.languages ? Object.values(country.languages).join(', ') : 'N/A' },
    { label: 'Currencies', accessor: country => {
      if (!country.currencies) return 'N/A';
      return Object.values(country.currencies)
        .map(currency => `${currency.name} (${currency.symbol || 'N/A'})`)
        .join(', ');
    }},
    { label: 'UN Member', accessor: country => country.unMember ? 'Yes' : 'No' },
    { label: 'Independent', accessor: country => country.independent ? 'Yes' : 'No' },
    { label: 'Driving Side', accessor: country => country.car?.side || 'N/A' },
    { label: 'Timezones', accessor: country => country.timezones?.join(', ') || 'N/A' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Country Comparison</h2>
        <div className="flex gap-2">
          <button 
            onClick={clearComparison}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear All
          </button>
          <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Back to Home
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-3 px-4 border-b text-left">Attribute</th>
              {comparisonList.map(country => (
                <th key={country.cca3} className="py-3 px-4 border-b">
                  <div className="flex flex-col items-center">
                    <img
                      src={country.flags.png}
                      alt={`${country.name.common} flag`}
                      className="w-16 h-10 object-cover mb-2 shadow"
                    />
                    <div className="font-bold">{country.name.common}</div>
                    <button
                      onClick={() => removeFromComparison(country.cca3)}
                      className="mt-1 text-xs text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonFields.map((field, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}>
                <td className="py-3 px-4 border-b font-semibold">{field.label}</td>
                {comparisonList.map(country => (
                  <td key={country.cca3} className="py-3 px-4 border-b text-center">
                    {field.accessor(country)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComparisonPage;