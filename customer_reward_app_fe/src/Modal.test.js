import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import '@testing-library/jest-dom'; 

describe('Modal Component', () => {
  test('renders correctly when open', () => {
    render(<Modal isOpen={true} points={100} onClose={() => {}} />);
    
    expect(screen.getByText(/thank you for choosing us/i)).toBeInTheDocument();
    expect(screen.getByText(/your reward/i)).toBeInTheDocument();
    expect(screen.getByText(/100 points/i)).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    const { queryByText } = render(<Modal isOpen={false} points={100} onClose={() => {}} />);
    
    expect(queryByText(/thank you for choosing us/i)).not.toBeInTheDocument();
    expect(queryByText(/your reward/i)).not.toBeInTheDocument();
    expect(queryByText(/100 points/i)).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(<Modal isOpen={true} points={100} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText(/close/i));
    
    expect(mockOnClose).toHaveBeenCalled();
  });
});
