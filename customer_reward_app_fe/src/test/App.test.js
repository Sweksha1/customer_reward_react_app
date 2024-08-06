import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import DataHandler from '../DataHandler';

// Mock the DataHandler component
jest.mock('../DataHandler', () => () => <div>Mocked DataHandler</div>);

test('renders DataHandler component', () => {
  const { getByText } = render(<App />);

  // Check if the mocked DataHandler component is rendered
  expect(getByText('Mocked DataHandler')).toBeInTheDocument();
});
