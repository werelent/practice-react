import React, { useState } from 'react';

const LoginForm = ({ setIsLoggedIn, setUserRole }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Client-side validation
    if (formData.email.trim() === '' || formData.password.trim() === '') {
      setErrorMessage('Please enter both email and password.');
      setSuccessMessage('');
    } else {
      fetch('https://localhost:7157/api/users/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Invalid email or password. Please try again.');
          }
        })
        .then((data) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userRole', data.role);
          localStorage.setItem('userId', data.id);
          localStorage.setItem('userEmail', data.email);

          setSuccessMessage('Login successful!');
          setErrorMessage('');

          setIsLoggedIn(true);
          setUserRole(data.role);
        })
        .catch((error) => {
          setSuccessMessage('');
          setErrorMessage(error.message || 'An error occurred. Please try again.');
        });
    }
  };

  return (
    <div className='registration-form'>
      <h2>Login Form</h2>
      {successMessage && <div className='success-message'>{successMessage}</div>}
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;