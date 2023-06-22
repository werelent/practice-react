import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user');

  return (
    <div className='App'>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} userRole={userRole} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
          <Route path='/register' element={<RegistrationForm />} />
          {isLoggedIn && userRole === 'AdminRole' && (
            <Route path='/admin' element={<AdminPanel />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
