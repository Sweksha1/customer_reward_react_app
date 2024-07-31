import React from 'react';
import './App.css';

const Modal = ({ isOpen, onClose, points }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className={`modal-content ${isOpen ? 'open' : ''}`}>
        <h2>Reward Points</h2>
        <p className='points'>{points} points</p>
        <button className='closeButton' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;