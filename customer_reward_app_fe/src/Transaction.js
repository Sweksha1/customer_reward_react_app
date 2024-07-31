// import React, { useState, useEffect } from 'react';
// import { fetchTransactionData } from './api';
// import { calculateRewardPoints } from './utils';
// import Modal from './Modal';

// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [rewards, setRewards] = useState({});
//   const [calculatedMonths, setCalculatedMonths] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedCustomerId, setSelectedCustomerId] = useState(null);
//   const [selectedMonth, setSelectedMonth] = useState(null);
//   const [selectedPoints, setSelectedPoints] = useState(0);
//   const [error, setError] = useState(null); // State for error handling

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchTransactionData();
//         setTransactions(data);

//         const rewardsByCustomer = data.reduce((acc, transaction) => {
//           const { customerId, amount, date } = transaction;
//           const month = new Date(date).getMonth() + 1;
//           const points = calculateRewardPoints(amount);
//           if (!acc[customerId]) acc[customerId] = { total: 0, monthly: {} };
//           acc[customerId].total += points;
//           if (!acc[customerId].monthly[month]) acc[customerId].monthly[month] = 0;
//           acc[customerId].monthly[month] += points;
//           return acc;
//         }, {});

//         setRewards(rewardsByCustomer);

//         setCalculatedMonths(Object.keys(rewardsByCustomer).reduce((acc, customerId) => {
//           acc[customerId] = Object.keys(rewardsByCustomer[customerId].monthly).reduce((monthlyAcc, month) => {
//             monthlyAcc[month] = false; // false means not calculated yet
//             return monthlyAcc;
//           }, {});
//           return acc;
//         }, {}));
//       } catch (err) {
//         setError('Failed to fetch transaction data. Please try again later.');
//         console.error('Error in fetchData:', err);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleOpenModal = (customerId, month, points) => {
//     setSelectedCustomerId(customerId);
//     setSelectedMonth(month);
//     setSelectedPoints(points);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setCalculatedMonths(prev => ({
//       ...prev,
//       [selectedCustomerId]: {
//         ...prev[selectedCustomerId],
//         [selectedMonth]: true
//       }
//     }));
//   };

//   return (
//     <div>
//       <h1>Transactions</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>} 
//       {Object.keys(rewards).map(customerId => (
//         <div key={customerId}>
//           <h2>Customer {customerId}</h2>
//           <ul>
//             {Object.keys(rewards[customerId].monthly).map(month => (
//               <li key={month}>
//                 Month {month}: 
//                 {calculatedMonths[customerId]?.[month] ? (
//                   <span className='monthlyPoints'>{rewards[customerId].monthly[month]} points</span>
//                 ) : (
//                   <button className='calculateRewardButton'
//                     onClick={() => handleOpenModal(customerId, month, rewards[customerId].monthly[month])}
//                     disabled={calculatedMonths[customerId]?.[month]}
//                   >
//                     Calculate Reward Points
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//           {Object.keys(calculatedMonths[customerId] || {}).every(month => calculatedMonths[customerId][month]) && (
//             <p className='totalPoints'>Total Points: {rewards[customerId].total}</p>
//           )}
//         </div>
//       ))}
//       <Modal isOpen={modalOpen} onClose={handleCloseModal} points={selectedPoints} />
//     </div>
//   );
// };

// export default Transactions;

import React, { useState, useEffect } from 'react';
import { fetchTransactionData } from './api';
import { calculateRewardPoints } from './utils';
import Modal from './Modal';
import './App.css'; 

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [rewards, setRewards] = useState({});
  const [calculatedMonths, setCalculatedMonths] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedPoints, setSelectedPoints] = useState(0);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTransactionData();
        setTransactions(data);

        const rewardsByCustomer = data.reduce((acc, transaction) => {
          const { customerId, amount, date } = transaction;
          const month = new Date(date).getMonth() + 1;
          const points = calculateRewardPoints(amount);
          if (!acc[customerId]) acc[customerId] = { total: 0, monthly: {} };
          acc[customerId].total += points;
          if (!acc[customerId].monthly[month]) acc[customerId].monthly[month] = 0;
          acc[customerId].monthly[month] += points;
          return acc;
        }, {});

        setRewards(rewardsByCustomer);

        setCalculatedMonths(Object.keys(rewardsByCustomer).reduce((acc, customerId) => {
          acc[customerId] = Object.keys(rewardsByCustomer[customerId].monthly).reduce((monthlyAcc, month) => {
            monthlyAcc[month] = false; // false means not calculated yet
            return monthlyAcc;
          }, {});
          return acc;
        }, {}));
      } catch (err) {
        setError('Failed to fetch transaction data. Please try again later.');
        console.error('Error in fetchData:', err);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (customerId, month, points) => {
    setSelectedCustomerId(customerId);
    setSelectedMonth(month);
    setSelectedPoints(points);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCalculatedMonths(prev => ({
      ...prev,
      [selectedCustomerId]: {
        ...prev[selectedCustomerId],
        [selectedMonth]: true
      }
    }));
  };

  return (
    <div className='transactions'>
      <h1>Transactions</h1>
      {error && <p className='error'>{error}</p>}
      <div className='cards-container'>
        {Object.keys(rewards).map(customerId => (
          <div className='card' key={customerId}>
            <h2>Customer {customerId}</h2>
            <div className='months'>
              {Object.keys(rewards[customerId].monthly).map(month => (
                <div className='month-item' key={month}>
                  <p>Month {month}:</p>
                  {calculatedMonths[customerId]?.[month] ? (
                    <span className='monthlyPoints'>{rewards[customerId].monthly[month]} points</span>
                  ) : (
                    <button
                      className='calculateRewardButton'
                      onClick={() => handleOpenModal(customerId, month, rewards[customerId].monthly[month])}
                      disabled={calculatedMonths[customerId]?.[month]}
                    >
                      Calculate Reward Points
                    </button>
                  )}
                </div>
              ))}
            </div>
            {Object.keys(calculatedMonths[customerId] || {}).every(month => calculatedMonths[customerId][month]) && (
              <p className='totalPoints'>Total Points: {rewards[customerId].total}</p>
            )}
          </div>
        ))}
      </div>
      <Modal isOpen={modalOpen} onClose={handleCloseModal} points={selectedPoints} />
    </div>
  );
};

export default Transactions;
