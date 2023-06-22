import React, { useState } from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
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
    
        // Make a POST request to register the user
        fetch('https://localhost:7157/api/users/register', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Registration successful
                    setSuccessMessage('Registration successful!');
                    setErrorMessage('');
                } else {
                    // Registration failed
                    if (response.status === 500) {
                        setErrorMessage('An internal server error occurred. Please try again.');
                    } else {
                        response.json().then((data) => {
                            setErrorMessage(data.message || 'Registration failed. Please try again.');
                        });
                    }
                    setSuccessMessage('');
                }
            })
            .catch((error) => {
                // Handle network or other errors
                setSuccessMessage('');
                setErrorMessage('An error occurred. Please try again.');
            });
    };
    

    return (
        <div className='registration-form'>
            <h2>Registration Form</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
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
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
