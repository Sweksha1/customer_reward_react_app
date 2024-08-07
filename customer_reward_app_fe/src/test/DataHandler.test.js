import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
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
      { customerName: 'Alice', amount: 120, date: '2024-01-15' },
      { customerName: 'Fred', amount: 200, date: '2024-01-22' }
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
      expect(screen.getByText(/Alice/i)).toBeInTheDocument();
      expect(screen.getByText(/Fred/i)).toBeInTheDocument();
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
