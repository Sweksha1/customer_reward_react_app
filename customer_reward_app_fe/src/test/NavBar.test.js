import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../../src/components/NavBar';

describe('NavBar', () => {
  test('renders NavBar component', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    // Check if the component renders without crashing
  });

  test('renders Home and Transactions links', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    // Check if the Home link is present
    expect(screen.getByText('Home')).toBeInTheDocument();
    // Check if the Transactions link is present
    expect(screen.getByText('Transactions')).toBeInTheDocument();
  });

  test('highlights the active link', () => {
    render(
      <MemoryRouter initialEntries={['/transactions']}>
        <NavBar />
      </MemoryRouter>
    );
    // Check if the Transactions link has the active class
    expect(screen.getByText('Transactions')).toHaveClass('active');
  });
});
