import { render, screen, fireEvent } from '@testing-library/react';
import CountryCard from '../components/CountryCard';

const mockCountry = {
  cca3: 'FRA',
  name: { common: 'France' },
  flags: { png: 'https://flagcdn.com/w320/fr.png' },
  population: 67000000,
  region: 'Europe',
  capital: ['Paris'],
};

test('renders country info correctly', () => {
  render(
    <CountryCard
      country={mockCountry}
      toggleFavorite={() => {}}
      isFav={false}
      addToComparison={() => {}}
      isInComparison={() => false}
    />
  );

  expect(screen.getByText('France')).toBeInTheDocument();
  expect(screen.getByText(/Population/i)).toBeInTheDocument();
  expect(screen.getByText(/Europe/)).toBeInTheDocument();
});
