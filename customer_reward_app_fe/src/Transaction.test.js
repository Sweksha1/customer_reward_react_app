import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Transactions from './Transaction';
import { fetchTransactionData } from './api';

jest.mock('./api', () => ({
  fetchTransactionData: jest.fn(),
}));

test('displays error message when fetch fails', async () => {
  fetchTransactionData.mockRejectedValueOnce(new Error('Failed to fetch'));

  render(
    <MemoryRouter>
      <Transactions />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Failed to fetch transaction data. Please try again later.')).toBeInTheDocument();
  });
});

test('renders transactions and calculates points', async () => {
  fetchTransactionData.mockResolvedValueOnce([
    { customerId: '1', amount: 100, date: '2024-04-01' },
    { customerId: '1', amount: 200, date: '2024-05-01' },
    { customerId: '2', amount: 150, date: '2024-05-01' },
  ]);

  render(
    <MemoryRouter>
      <Transactions />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Customer 1')).toBeInTheDocument();
    expect(screen.getByText('Customer 2')).toBeInTheDocument();
  });

  const buttons = screen.getAllByText('Calculate Reward Points');
  expect(buttons.length).toBeGreaterThan(0);

  fireEvent.click(buttons[0]);
  await waitFor(() => {
    expect(screen.getByText('Reward Points')).toBeInTheDocument();
  });
});