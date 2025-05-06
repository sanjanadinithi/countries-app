import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { BrowserRouter } from 'react-router-dom';

test('renders loading initially', () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  expect(screen.getByText(/Loading countries/i)).toBeInTheDocument();
});
