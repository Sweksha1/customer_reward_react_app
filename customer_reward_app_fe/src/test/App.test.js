import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import DataHandler from '../DataHandler';

jest.mock('../DataHandler', () => () => <div>Mocked DataHandler</div>);

test('renders DataHandler component', () => {
  const { getByText } = render(<App />);
  expect(getByText('Mocked DataHandler')).toBeInTheDocument();
});
