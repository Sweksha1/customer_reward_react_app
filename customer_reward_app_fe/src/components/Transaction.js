import React from 'react';
import '../styles/App.css';

const Transactions = ({rewards, loading, error}) => {

  return (
    <div className='transactions'>
      <h1>Transactions</h1>
      {loading ? (
        <p className='loading'>Loading...</p> // Display loading message while data is being fetched
      ) : (
        <>
          {error && <p className='error'>{error}</p>}
          <div className='cards-container'>
            {Object.keys(rewards).map(customerName => (
              <div className='card' key={customerName}>
                <h2>{customerName}</h2>
                <div className='months'>
                  {Object.keys(rewards[customerName].monthly).map(month => (
                    <div className='month-item' key={month}>
                      <p>Month {month}:</p>
                        <span className='monthlyPoints'>{rewards[customerName].monthly[month]} points</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;