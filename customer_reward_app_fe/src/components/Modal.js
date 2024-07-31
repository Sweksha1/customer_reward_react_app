import React from 'react';
import '../styles/App.css';

const Modal = ({ isOpen, onClose, points }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className={`modal-content ${isOpen ? 'open' : ''}`}>
        <h1>Thank You for choosing Us!!</h1>
        <h2 className=''>Your Reward</h2>
        <p className='points'>{points} points</p>
        <button className='closeButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;