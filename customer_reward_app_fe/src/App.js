import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import necessary components from react-router-dom
import DataHandler from './DataHandler';
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
        {/* Center component to handle business logic and hold other components  */}
        <DataHandler />
      </div>
    </Router>
  );
};

export default App; 
