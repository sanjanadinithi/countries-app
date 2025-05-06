import React, { useState, useEffect } from 'react';
import { fetchAllCountries } from '../services/countryService';

function StatisticsDashboard() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('population'); // population, area, density
    const [regionFilter, setRegionFilter] = useState('all');

    // For top countries display
    const [topCount, setTopCount] = useState(10);

    useEffect(() => {
        async function loadCountries() {
            setLoading(true);
            try {
                const data = await fetchAllCountries();
                setCountries(data);
            } catch (err) {
                console.error('Failed to fetch countries:', err);
            }
            setLoading(false);
        }

        loadCountries();
    }, []);

    // Process data for visualization
    const processData = () => {
        if (!countries.length) return [];

        // Filter by region if needed
        let filteredData = regionFilter === 'all'
            ? countries
            : countries.filter(country => country.region === regionFilter);

        // Sort and map data based on the view mode
        let processedData;

        switch (viewMode) {
            case 'population':
                processedData = filteredData
                    .filter(country => country.population > 0)
                    .sort((a, b) => b.population - a.population)
                    .slice(0, topCount);
                break;

            case 'area':
                processedData = filteredData
                    .filter(country => country.area > 0)
                    .sort((a, b) => b.area - a.area)
                    .slice(0, topCount);
                break;

            case 'density':
                processedData = filteredData
                    .filter(country => country.area > 0 && country.population > 0)
                    .map(country => ({
                        ...country,
                        populationDensity: country.population / country.area
                    }))
                    .sort((a, b) => b.populationDensity - a.populationDensity)
                    .slice(0, topCount);
                break;

            default:
                processedData = [];
        }

        return processedData;
    };

    // Process region distribution data
    const getRegionData = () => {
        if (!countries.length) return [];

        const regionCounts = countries.reduce((acc, country) => {
            if (!country.region) return acc;

            if (!acc[country.region]) {
                acc[country.region] = 0;
            }
            acc[country.region]++;
            return acc;
        }, {});

        return Object.entries(regionCounts);
    };

    // Get the title based on view mode
    const getChartTitle = () => {
        switch (viewMode) {
            case 'population':
                return `Top ${topCount} Countries by Population`;
            case 'area':
                return `Top ${topCount} Countries by Area`;
            case 'density':
                return `Top ${topCount} Countries by Population Density`;
            default:
                return 'Country Statistics';
        }
    };

    // Calculate maximum value for bar scaling
    const calculateMaxValue = (data) => {
        if (!data.length) return 0;

        if (viewMode === 'population') {
            return Math.max(...data.map(country => country.population));
        } else if (viewMode === 'area') {
            return Math.max(...data.map(country => country.area));
        } else if (viewMode === 'density') {
            return Math.max(...data.map(country => country.populationDensity));
        }
        return 0;
    };

    // Render a simple bar for each country
    const renderBar = (country, index, maxValue) => {
        const value = viewMode === 'population'
            ? country.population
            : viewMode === 'area'
                ? country.area
                : country.populationDensity;

        const percentage = (value / maxValue) * 100;

        // Format display value based on view mode
        const displayValue = viewMode === 'population'
            ? (country.population / 1000000).toFixed(2) + 'M'
            : viewMode === 'area'
                ? (country.area / 1000).toFixed(2) + 'K km²'
                : country.populationDensity.toFixed(2) + ' people/km²';

        return (
            <div key={index} className="mb-3">
                <div className="flex items-center mb-1">
                    <img src={country.flags.png} alt={country.name.common} className="w-6 h-4 mr-2" />
                    <span className="font-medium text-sm truncate">{country.name.common}</span>
                    <span className="ml-auto text-sm">{displayValue}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        );
    };

    // Render simple pie chart segments for regions
    const renderRegionDistribution = (regionData) => {
        const total = regionData.reduce((sum, [_, count]) => sum + count, 0);
        let currentAngle = 0;

        // Colors for the pie chart segments
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

        return (
            <div className="relative">
                <svg viewBox="0 0 100 100" className="w-64 h-64 mx-auto">
                    {regionData.map(([region, count], index) => {
                        const percentage = (count / total) * 100;
                        const angle = (percentage / 100) * 360;

                        // Calculate start and end points for the arc
                        const startAngle = currentAngle;
                        const endAngle = currentAngle + angle;
                        currentAngle = endAngle;

                        // Convert angles to radians
                        const startRad = (startAngle - 90) * Math.PI / 180;
                        const endRad = (endAngle - 90) * Math.PI / 180;

                        // Calculate points
                        const x1 = 50 + 40 * Math.cos(startRad);
                        const y1 = 50 + 40 * Math.sin(startRad);
                        const x2 = 50 + 40 * Math.cos(endRad);
                        const y2 = 50 + 40 * Math.sin(endRad);

                        // For large arcs (>180 degrees), we need to set the large-arc-flag
                        const largeArcFlag = angle > 180 ? 1 : 0;

                        // Create path for the arc
                        const path = `
              M 50 50
              L ${x1} ${y1}
              A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
              Z
            `;

                        return (
                            <path
                                key={region}
                                d={path}
                                fill={colors[index % colors.length]}
                                stroke="#fff"
                                strokeWidth="0.5"
                            />
                        );
                    })}
                </svg>

                {/* Legend */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                    {regionData.map(([region, count], index) => (
                        <div key={region} className="flex items-center">
                            <div
                                className="w-3 h-3 mr-2"
                                style={{ backgroundColor: colors[index % colors.length] }}
                            ></div>
                            <span className="text-sm">{region}: {count} countries</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading statistics...</div>;
    }

    const chartData = processData();
    const regionData = getRegionData();
    const maxValue = calculateMaxValue(chartData);

    // Calculate summary statistics
    const totalCountries = countries.length;
    const totalPopulation = countries.reduce((sum, country) => sum + (country.population || 0), 0);
    const averageArea = countries.reduce((sum, country) => sum + (country.area || 0), 0) / totalCountries;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Country Statistics Dashboard</h2>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium mb-1">View Mode</label>
                    <select
                        value={viewMode}
                        onChange={(e) => setViewMode(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="population">Population</option>
                        <option value="area">Area</option>
                        <option value="density">Population Density</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Region Filter</label>
                    <select
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="all">All Regions</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Display Count</label>
                    <select
                        value={topCount}
                        onChange={(e) => setTopCount(Number(e.target.value))}
                        className="border rounded p-2"
                    >
                        <option value="5">Top 5</option>
                        <option value="10">Top 10</option>
                        <option value="15">Top 15</option>
                        <option value="20">Top 20</option>
                    </select>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">{getChartTitle()}</h3>
                    <div className="h-96 overflow-y-auto pr-2">
                        {chartData.map((country, index) => renderBar(country, index, maxValue))}
                    </div>
                </div>

                {/* Pie Chart - Region Distribution */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4">Countries by Region</h3>
                    <div className="h-96 flex items-center justify-center">
                        {renderRegionDistribution(regionData)}
                    </div>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Total Countries</h3>
                    <p className="text-3xl font-bold">{totalCountries}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Total Population</h3>
                    <p className="text-3xl font-bold">
                        {(totalPopulation / 1000000000).toFixed(2)}B
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Average Area</h3>
                    <p className="text-3xl font-bold">
                        {(averageArea / 1000).toFixed(2)}K km²
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StatisticsDashboard;