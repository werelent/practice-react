import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AdminPanel() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        if (!token) {
          setMessage('Token is missing. Please log in again.');
          return;
        }

        const response = await fetch('https://localhost:7157/api/users/admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
        } else if (response.status === 401) {
          setMessage('You are not authorized to perform this action.');
        } else {
          setMessage('An error occurred while performing the action.');
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
      <div>
        <h2>Operations:</h2>
        <ul>
          <li>
            <Link to="/admin/books">Manage Books</Link>
          </li>
          <li>
            <Link to="/admin/orders">Manage Orders</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;
