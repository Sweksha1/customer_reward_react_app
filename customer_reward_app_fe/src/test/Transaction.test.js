import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Transactions from '../components/Transaction';

describe('Transactions Component', () => {
  const rewards = {
    'John Doe': {
      monthly: {
        January: 120,
        February: 150,
        March: 100,
      },
    },
    'Jane Smith': {
      monthly: {
        January: 200,
        February: 180,
        March: 220,
      },
    },
  };

  test('displays loading message when loading is true', () => {
    render(<Transactions rewards={{}} loading={true} error={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message when error is present', () => {
    render(<Transactions rewards={{}} loading={false} error="Error fetching data" />);
    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  test('displays customer names and their points', () => {
    render(<Transactions rewards={rewards} loading={false} error={null} />);
    
    // Check for customer names
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  
    // Check for monthly points
    const januaryElements = screen.getAllByText('Month January:');
    expect(januaryElements.length).toBe(2); // One for each customer
  
    // Check for specific points
    expect(screen.getByText('120 points')).toBeInTheDocument();
    expect(screen.getByText('200 points')).toBeInTheDocument();
  
    // Check for total points
    const totalPointsElements = screen.getAllByText('Total Points:');
    expect(totalPointsElements.length).toBe(2); // One for each customer
    totalPointsElements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  
    expect(screen.getByText('370 points')).toBeInTheDocument(); // John Doe's total points
    expect(screen.getByText('600 points')).toBeInTheDocument(); // Jane Smith's total points
  });
  
});
