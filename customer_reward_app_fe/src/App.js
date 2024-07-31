import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import necessary components from react-router-dom
import Home from './components/Home'; 
import Transactions from './components/Transaction'; 
const App = () => {
  // useEffect hook to handle redirection if the URL path is '/transactions'
  useEffect(() => {
    const path = window.location.pathname; // Get the current URL path
    if (path === '/transactions') {
      window.location.replace('/'); // Redirect to the home page if the path is '/transactions'
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <Router> {/* Wrap the application in Router to enable routing */}
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li> {/* Link to the Home page */}
            <li><Link to="/transactions">Transactions</Link></li> {/* Link to the Transactions page */}
          </ul>
        </nav>
        
        {/* Define routes for the application */}
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/transactions" element={<Transactions />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App; 
