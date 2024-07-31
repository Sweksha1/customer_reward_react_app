import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

test('renders modal content when isOpen is true', () => {
  render(<Modal isOpen={true} onClose={() => {}} points={50} />);
  expect(screen.getByText('Reward Points')).toBeInTheDocument();
  expect(screen.getByText('50 points')).toBeInTheDocument();
});

test('does not render modal content when isOpen is false', () => {
  render(<Modal isOpen={false} onClose={() => {}} points={50} />);
  expect(screen.queryByText('Reward Points')).not.toBeInTheDocument();
});

test('calls onClose when close button is clicked', () => {
  const onClose = jest.fn();
  render(<Modal isOpen={true} onClose={onClose} points={50} />);
  fireEvent.click(screen.getByText('Close'));
  expect(onClose).toHaveBeenCalledTimes(1);
});