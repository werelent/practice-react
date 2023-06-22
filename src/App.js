import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';

function App() {
  const isLoggedInStored = localStorage.getItem('isLoggedIn');
  const userRoleStored = localStorage.getItem('userRole');

  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInStored === 'true');
  const [userRole, setUserRole] = useState(userRoleStored || 'user');

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    localStorage.setItem('userRole', userRole);
    
    console.log(isLoggedIn)
    console.log(userRole)
  }, [isLoggedIn, userRole]);

  const handleLogout = () => {
    // Clear the stored user session and reset state
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole('user');
  };

  return (
    <div className="App">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} userRole={userRole} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
          <Route path="/register" element={<RegistrationForm />} />
          {isLoggedIn && userRole === 'AdminRole' && (
            <Route path="/admin" element={<AdminPanel />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
