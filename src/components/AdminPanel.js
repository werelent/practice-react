import React, { useEffect, useState } from 'react';

function AdminPanel() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from storage
        console.log('Token:', token);

        if (!token) {
          setMessage('Token is missing. Please log in again.'); // Token not found in storage
          return;
        }

        const response = await fetch('https://localhost:7157/api/users/admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message); // Display any response message from the server
        } else if (response.status === 401) {
          setMessage('You are not authorized to perform this action.'); // Unauthorized access
        } else {
          setMessage('An error occurred while performing the action.'); // Other error
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setMessage('An error occurred while performing the action.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <p>{message}</p>
    </div>
  );  
}

export default AdminPanel;
