import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, userRole, handleLogout }) {
  const handleLogoutClick = () => {
    handleLogout();
  };

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
        {isLoggedIn && (
          <li>
            <Link to="/" onClick={handleLogoutClick}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
