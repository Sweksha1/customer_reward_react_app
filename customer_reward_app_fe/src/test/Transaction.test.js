import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Transactions from '../components/Transaction'; // Ensure this path is correct
import { fetchTransactionData } from '../api'; // Ensure this path is correct
import { calculateRewardPoints } from '../utils'; // Ensure this path is correct
import '@testing-library/jest-dom';

jest.mock('../api'); // Ensure this path is correct
jest.mock('../utils'); // Ensure this path is correct

describe('Transactions Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders customer cards with correct data', async () => {
    const mockData = [
      { customerId: '1', amount: 200, date: '2024-06-15' },
      { customerId: '2', amount: 300, date: '2024-07-10' },
    ];
    const mockRewards = {
      '1': { total: 100, monthly: { '6': 100 } },
      '2': { total: 150, monthly: { '7': 150 } },
    };

    fetchTransactionData.mockResolvedValue(mockData);
    calculateRewardPoints.mockImplementation(amount => amount / 2); // Example calculation

    render(<Transactions />);
    await waitFor(() => {
      expect(screen.getByText('Customer 1')).toBeInTheDocument();
      expect(screen.getByText('Customer 2')).toBeInTheDocument();
      expect(screen.getByText('Month 6:')).toBeInTheDocument();
      expect(screen.getByText('Month 7:')).toBeInTheDocument();
    });
  });

  test('opens and closes modal correctly', async () => {
    const mockData = [
      { customerId: '1', amount: 200, date: '2024-06-15' },
    ];
    const mockRewards = {
      '1': { total: 100, monthly: { '6': 100 } },
    };

    fetchTransactionData.mockResolvedValue(mockData);
    calculateRewardPoints.mockImplementation(amount => amount / 2); // Example calculation

    render(<Transactions />);
    await waitFor(() => {
      expect(screen.getByText('Customer 1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Calculate Reward Points'));
    expect(screen.getByText('Thank You for choosing Us!!')).toBeInTheDocument();
    expect(screen.getByText('Your Reward')).toBeInTheDocument();
    expect(screen.getByText('100 points')).toBeInTheDocument(); // Update to the correct expected value

    fireEvent.click(screen.getByText('Close'));
    await waitFor(() => {
      expect(screen.queryByText('Thank You for choosing Us!!')).not.toBeInTheDocument();
    });
  });

  test('displays error message if data fetching fails', async () => {
    fetchTransactionData.mockRejectedValue(new Error('Network Error'));

    render(<Transactions />);
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch transaction data. Please try again later.')).toBeInTheDocument();
    });
  });
});
