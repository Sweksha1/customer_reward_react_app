import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/App.css';
const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/transactions" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Transactions
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default NavBar;