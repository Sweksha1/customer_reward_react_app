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
            
            // Array of month names
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
            // Calculate rewards by customer and month
            const rewardsByCustomer = data.reduce((acc, transaction) => {
                const { customerName, amount, date } = transaction;
                const month = new Date(date).getMonth(); // Get month number (0-11)
                const points = calculateRewardPoints(amount);
    
                // Initialize customer data if not already present
                if (!acc[customerName]) acc[customerName] = { total: 0, monthly: {} };
                acc[customerName].total += points;
    
                // Initialize monthly data if not already present
                const monthName = monthNames[month]; // Get month name
                if (!acc[customerName].monthly[monthName]) acc[customerName].monthly[monthName] = 0;
                acc[customerName].monthly[monthName] += points;
    
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
    }, []);
     // Empty dependency array ensures this effect runs only once on component mount
     
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