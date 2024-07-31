import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Transactions from '../components/Transaction';
import { fetchTransactionData } from '../api';
import { calculateRewardPoints } from '../utils';

jest.mock('../api', () => ({
  fetchTransactionData: jest.fn(),
}));

jest.mock('../utils', () => ({
  calculateRewardPoints: jest.fn(),
}));

jest.mock('../components/Modal', () => ({ isOpen, onClose, points }) => (
  isOpen ? (
    <div>
      <p>Points: {points}</p>
      <button onClick={onClose}>Close</button>
    </div>
  ) : null
));

describe('Transactions Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    fetchTransactionData.mockResolvedValue([]);
    render(<Transactions />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error message if fetching fails', async () => {
    fetchTransactionData.mockRejectedValue(new Error('Failed to fetch'));
    render(<Transactions />);
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch transaction data. Please try again later./i)).toBeInTheDocument();
    });
  });

  test('renders transaction data correctly', async () => {
    const mockData = [
      { customerName: 'John Doe', amount: 100, date: '2024-01-15' },
      { customerName: 'Jane Smith', amount: 50, date: '2024-01-20' },
    ];

    fetchTransactionData.mockResolvedValue(mockData);
    calculateRewardPoints.mockImplementation(amount => amount * 1);

    render(<Transactions />);
    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();

      const monthItems = screen.getAllByText(/Month 1:/i);
      expect(monthItems.length).toBe(2); // Adjust based on the actual expected count
    });
  });

  test('opens and closes modal with correct points', async () => {
    const mockData = [
      { customerName: 'John Doe', amount: 100, date: '2024-01-15' },
    ];

    fetchTransactionData.mockResolvedValue(mockData);
    calculateRewardPoints.mockImplementation(amount => amount * 1);

    render(<Transactions />);
    await waitFor(() => {
      const calculateButton = screen.getByText(/Calculate Reward Points/i);
      expect(calculateButton).toBeInTheDocument();
      
      fireEvent.click(calculateButton);
      expect(screen.getByText(/Points: 100/i)).toBeInTheDocument();

      const closeButton = screen.getByText(/Close/i);
      fireEvent.click(closeButton);
      expect(screen.queryByText(/Points: 100/i)).toBeNull();
    });
  });

  test('disables calculate button if points are already calculated', async () => {
    const mockData = [
      { customerName: 'John Doe', amount: 100, date: '2024-01-15' },
    ];

    fetchTransactionData.mockResolvedValue(mockData);
    calculateRewardPoints.mockImplementation(amount => amount * 1);

    render(<Transactions />);
    await waitFor(() => {
      const calculateButton = screen.getByText(/Calculate Reward Points/i);
      fireEvent.click(calculateButton);

      expect(calculateButton).toBeDisabled();
    });
  });
});
