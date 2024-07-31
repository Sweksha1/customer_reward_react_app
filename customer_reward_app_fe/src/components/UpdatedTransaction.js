import React, { useState, useEffect } from 'react';
import { fetchTransactionData } from '../api'; // Import function to fetch transaction data
import { calculateRewardPoints } from '../utils'; // Import function to calculate reward points
import '../styles/Transaction.css'; 
import '../styles/App.css'; 

const UpdatedTransaction = () => {
    // State to hold the list of transactions
    const [transactions, setTransactions] = useState([]);

    // State to hold the calculated rewards for each customer
    const [rewards, setRewards] = useState({});

    // State to handle any errors during data fetching
    const [error, setError] = useState(null);

    // State to manage the loading state of data fetching
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch transaction data and calculate rewards
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching data
            try {
                const data = await fetchTransactionData(); // Fetch transaction data from API
                setTransactions(data); // Save fetched transactions to state

                // Calculate rewards for each customer
                const rewardsByCustomer = data.reduce((acc, transaction) => {
                    const { customerName, amount, date } = transaction; // Destructure transaction details
                    const month = new Date(date).getMonth() + 1; // Get the month from the transaction date
                    const points = calculateRewardPoints(amount); // Calculate reward points for the transaction
                    
                    // Initialize customer data if not already present
                    if (!acc[customerName]) acc[customerName] = { total: 0, monthly: {} };
                    
                    // Update total reward points
                    acc[customerName].total += points;
                    
                    // Initialize monthly points if not already present
                    if (!acc[customerName].monthly[month]) acc[customerName].monthly[month] = 0;
                    
                    // Update monthly reward points
                    acc[customerName].monthly[month] += points;

                    return acc; // Return accumulated rewards data
                }, {});

                setRewards(rewardsByCustomer); // Save calculated rewards to state
            } catch (err) {
                // Handle any errors during data fetching
                setError('Failed to fetch transaction data. Please try again later.'); // Set error message
                console.error('Error in fetchData:', err); // Log error to console
            } finally {
                setLoading(false); // Set loading to false after data fetching is complete
            }
        };

        fetchData(); // Call the fetchData function on component mount
    }, []); // Empty dependency array ensures this effect runs once on mount

    return (
        <div className="transactions">
            <h1>Transactions</h1>
            {loading ? (
                // Display a loading message while data is being fetched
                <p className="loading">Loading...</p>
            ) : (
                <>
                    {error && <p className="error">{error}</p>} {/* Display error message if there's an error */}
                    <div className="cards-container">
                        {/* Render rewards data for each customer */}
                        {Object.keys(rewards).map(customerName => (
                            <div className="card" key={customerName}>
                                <h2 className="card-title">{customerName}</h2> {/* Display customer name */}
                                <p className="card-total-points">Total Points: {rewards[customerName].total}</p> {/* Display total points */}
                                <ul className="card-monthly-points">
                                    {/* Render monthly points for each customer */}
                                    {Object.keys(rewards[customerName].monthly).map(month => (
                                        <li className="month-item" key={month}>
                                            Month {month}: {rewards[customerName].monthly[month]} points
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default UpdatedTransaction;
