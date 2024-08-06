import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Home from '../components/Home';

describe('Home Component', () => {

  test('renders welcome message', () => {
    render(<Home />);
    expect(screen.getByText(/welcome to customer rewards/i)).toBeInTheDocument();
  });

  test('renders navigation instruction', () => {
    render(<Home />);
    expect(screen.getByText(/navigate to the transactions page to view transaction details/i)).toBeInTheDocument();
  });
  
});