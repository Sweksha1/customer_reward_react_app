import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DataHandler from '../DataHandler'; // Assuming your main component is named App

test('renders Transactions component on /transactions route', () => {
  render(
    <BrowserRouter>
      <DataHandler />
    </BrowserRouter>
  );
  const transactionsLink = screen.getByRole('link', { name: /transactions/i });
  transactionsLink.click();
  
  // Wait for the navigation to complete and the Transactions component to render
  const transactionsElement = screen.getByText(/navigate to the transactions page to view transaction details/i);
  expect(transactionsElement).toBeInTheDocument();
});
