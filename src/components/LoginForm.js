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

        // Make a POST request to authenticate the user
        fetch('https://localhost:7157/api/users/login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Login successful
                    return response.json();
                } else {
                    // Login failed
                    throw new Error('Invalid email or password. Please try again.');
                }
            })
            .then((data) => {
                // Store the token in local storage
                localStorage.setItem('token', data.token);
                setSuccessMessage('Login successful!');
                setErrorMessage('');

                // Set the user's authentication status and role
                setIsLoggedIn(true);
                setUserRole(data.role); // Assuming the response contains the user's role
                console.log(data);
            })
            .catch((error) => {
                // Handle login errors
                setSuccessMessage('');
                setErrorMessage(error.message || 'An error occurred. Please try again.');
            });
    };

    return (
        <div className="login-form">
            <h2 className="form-title">Login Form</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
