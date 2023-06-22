import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, userRole }) {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn && userRole === 'AdminRole' && (
          <li>
            <Link to="/admin">Admin Panel</Link>
          </li>
        )}
      </ul>
      <ul>
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
