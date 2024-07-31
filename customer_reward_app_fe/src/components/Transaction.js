import React, { useState, useEffect } from 'react';
import { fetchTransactionData } from '../api'; // Import API function to fetch transaction data
import { calculateRewardPoints } from '../utils'; // Import utility function to calculate reward points
import Modal from './Modal'; // Import Modal component for displaying reward points details
import '../styles/App.css'; 

const Transactions = () => {
  const [transactions, setTransactions] = useState([]); // Stores transaction data
  const [rewards, setRewards] = useState({}); // Stores calculated reward points per customer and month
  const [calculatedMonths, setCalculatedMonths] = useState({}); // Keeps track of whether reward points for each month have been calculated
  const [modalOpen, setModalOpen] = useState(false); // Controls the visibility of the modal
  const [selectedcustomerName, setSelectedcustomerName] = useState(null); // Stores the customer name for which modal is opened
  const [selectedMonth, setSelectedMonth] = useState(null); // Stores the month for which modal is opened
  const [selectedPoints, setSelectedPoints] = useState(0); // Stores the reward points to be displayed in the modal
  const [error, setError] = useState(null); // Holds any error message if fetching data fails
  const [loading, setLoading] = useState(true); // Indicates whether the data is still being loaded

  // useEffect hook to fetch transaction data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true while fetching data
      try {
        const data = await fetchTransactionData(); // Fetch transaction data from API
        setTransactions(data); 
  
        // Calculate rewards by customer and month
        const rewardsByCustomer = data.reduce((acc, transaction) => {
          const { customerName, amount, date } = transaction;
          const month = new Date(date).getMonth() + 1; 
          const points = calculateRewardPoints(amount); 
  
          // Initialize customer data if not already present
          if (!acc[customerName]) acc[customerName] = { total: 0, monthly: {} };
          acc[customerName].total += points; 
  
          // Initialize monthly data if not already present
          if (!acc[customerName].monthly[month]) acc[customerName].monthly[month] = 0;
          acc[customerName].monthly[month] += points; 
  
          return acc;
        }, {});
  
        setRewards(rewardsByCustomer); 
  
        // Initialize calculatedMonths state to track which months have been calculated
        setCalculatedMonths(Object.keys(rewardsByCustomer).reduce((acc, customerName) => {
          acc[customerName] = Object.keys(rewardsByCustomer[customerName].monthly).reduce((monthlyAcc, month) => {
            monthlyAcc[month] = false; 
            return monthlyAcc;
          }, {});
          return acc;
        }, {}));
      } catch (err) {
        setError('Failed to fetch transaction data. Please try again later.'); 
        console.error('Error in fetchData:', err); // Log error to console
      } finally {
        setLoading(false); // Set loading state to false after fetching is complete
      }
    };
  
    fetchData(); 
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Function to handle opening the modal with details for a specific customer and month
  const handleOpenModal = (customerName, month, points) => {
    setSelectedcustomerName(customerName); 
    setSelectedMonth(month); 
    setSelectedPoints(points); 
    setModalOpen(true); 
  };
  
  // Function to handle closing the modal and marking the month as calculated
  const handleCloseModal = () => {
    setModalOpen(false); 
    if (selectedcustomerName && selectedMonth) {
      setCalculatedMonths(prev => ({
        ...prev,
        [selectedcustomerName]: {
          ...prev[selectedcustomerName],
          [selectedMonth]: true 
        }
      }));
    }
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
            {Object.keys(rewards).map(customerName => (
              <div className='card' key={customerName}>
                <h2>{customerName}</h2>
                <div className='months'>
                  {Object.keys(rewards[customerName].monthly).map(month => (
                    <div className='month-item' key={month}>
                      <p>Month {month}:</p>
                      {calculatedMonths[customerName]?.[month] ? (
                        <span className='monthlyPoints'>{rewards[customerName].monthly[month]} points</span> // Display points if calculated
                      ) : (
                        <button
                          className='calculateRewardButton'
                          onClick={() => handleOpenModal(customerName, month, rewards[customerName].monthly[month])}
                          disabled={calculatedMonths[customerName]?.[month]} // Disable button if points are already calculated
                        >
                          Calculate Reward Points
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {Object.keys(calculatedMonths[customerName] || {}).every(month => calculatedMonths[customerName][month]) && (
                  <p className='totalPoints'>Total Points: {rewards[customerName].total}</p> // Display total points if all months are calculated
                )}
              </div>
            ))}
          </div>
          <Modal isOpen={modalOpen} onClose={handleCloseModal} points={selectedPoints} /> {/* Modal for showing detailed points */}
        </>
      )}
    </div>
  );
};

export default Transactions;
