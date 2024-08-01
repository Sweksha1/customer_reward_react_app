import React from 'react'
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
      <nav>
          <ul>
              <li><Link to="/">Home</Link></li> {/* Link to the Home page */}
              <li><Link to="/transactions">Transactions</Link></li> {/* Link to the Transactions page */}
          </ul>
      </nav>
  )
}

export default NavBar