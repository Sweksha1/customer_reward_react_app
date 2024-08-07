import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Transactions from '../components/Transaction';

describe('Transactions Component', () => {
  const rewards = {
    'Alice': {
      monthly: {
        January: 120,
        February: 150,
        March: 100,
      },
    },
    'Fred': {
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
    
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Fred')).toBeInTheDocument();
  
    const januaryElements = screen.getAllByText('Month January:');
    expect(januaryElements.length).toBe(2); 
  
    expect(screen.getByText('120 points')).toBeInTheDocument();
    expect(screen.getByText('200 points')).toBeInTheDocument();
  
    const totalPointsElements = screen.getAllByText('Total Points:');
    expect(totalPointsElements.length).toBe(2); 
    totalPointsElements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  
    expect(screen.getByText('370 points')).toBeInTheDocument(); 
    expect(screen.getByText('600 points')).toBeInTheDocument(); 
  });
  
});
