import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import necessary components from react-router-dom
import DataHandler from './DataHandler';
const App = () => {
 
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
