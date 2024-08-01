import React, { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Transactions from './components/Transaction'
import { fetchTransactionData } from './api.js'; // Import API function to fetch transaction data
import { calculateRewardPoints } from './utils.js';


const DataHandler = () => {
    const [rewards, setRewards] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchData = async () => {
        setLoading(true); // Set loading state to true while fetching data
        try {
            const data = await fetchTransactionData(); // Fetch transaction data from API
            
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
        } catch (err) {
            setError('Failed to fetch transaction data. Please try again later.');
        } finally {
            setLoading(false); // Set loading state to false after fetching is complete
        }
    };
    
    // useEffect hook to fetch transaction data when component mounts
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures this effect runs only once on component mount
    return (
        <div>
            <NavBar />
            {/* Define routes for the application */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/transactions" element={
                    <Transactions
                        rewards={rewards}
                        error={error}
                        loading={loading}
                    />
                } />
            </Routes>
        </div>
    )
}

export default DataHandler