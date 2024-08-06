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
  });

  test('renders Home and Transactions links', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
  });

  test('highlights the active link', () => {
    render(
      <MemoryRouter initialEntries={['/transactions']}>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText('Transactions')).toHaveClass('active');
  });
});