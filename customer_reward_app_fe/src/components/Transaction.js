import React from 'react';
import '../styles/App.css';
const Transactions = ({ rewards, loading, error }) => {
  // Helper function to calculate total points for a customer
  const calculateTotalPoints = (monthlyPoints) => {
    return Object.values(monthlyPoints).reduce((total, points) => total + points, 0);
  };

  return (
    <div className='transactions'>
      <h1>Transactions</h1>
      {loading ? (
        <p className='loading'>Loading...</p> // Display loading message while data is being fetched
      ) : (
        <>
          {error && <p className='error'>{error}</p>}
          <div className='cards-container'>
            {Object.keys(rewards).map(customerName => {
              const monthlyPoints = rewards[customerName].monthly;
              const totalPoints = calculateTotalPoints(monthlyPoints);

              return (
                <div className='card' key={customerName}>
                  <h2>{customerName}</h2>
                  <div className='months'>
                    {Object.keys(monthlyPoints).map(month => (
                      <div className='month-item' key={month}>
                        <p>Month {month}:</p>
                        <span className='monthlyPoints'>{monthlyPoints[month]} points</span>
                      </div>
                    ))}
                  </div>
                  <div className='month-item'>
                  <p>Total Points:</p>
                    <span className='totalPoints'>{totalPoints} points</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
