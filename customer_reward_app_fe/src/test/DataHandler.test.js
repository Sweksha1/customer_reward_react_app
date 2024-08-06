import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DataHandler from '../DataHandler';
import { fetchTransactionData } from '../api';
import { calculateRewardPoints } from '../utils';

jest.mock('../api');
jest.mock('../utils');

describe('DataHandler Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Home component on root route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <DataHandler />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test('renders Transactions component on /transactions route', async () => {
    const mockData = [
      { customerName: 'John Doe', amount: 120, date: '2024-01-15' },
      { customerName: 'Jane Smith', amount: 200, date: '2024-01-22' }
    ];

    fetchTransactionData.mockResolvedValue(mockData);
    calculateRewardPoints.mockImplementation(amount => amount * 0.1); 

    render(
      <MemoryRouter initialEntries={['/transactions']}>
        <DataHandler />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    });
  });

  test('displays error message on fetch failure', async () => {
    fetchTransactionData.mockRejectedValue(new Error('Failed to fetch'));

    render(
      <MemoryRouter initialEntries={['/transactions']}>
        <DataHandler />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch transaction data. Please try again later./i)).toBeInTheDocument();
    });
  });
});
