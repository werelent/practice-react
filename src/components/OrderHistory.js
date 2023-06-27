import React, { useState, useEffect } from 'react';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = () => {
    const userEmail = localStorage.getItem('userEmail');
    console.log(userEmail);
    fetch(`https://localhost:7157/api/orders/history?email=${userEmail}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch order history');
        }
        return response.json();
      })
      .then((data) => {
        setOrderHistory(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <p>Loading order history...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orderHistory.length === 0 ? (
        <p>No order history available.</p>
      ) : (
        <ul className="order-list">
          {orderHistory.map((order) => (
            <li key={order.id} className="order-item">
              <div className="order-info">
                <div>Order Date: {order.orderDate}</div>
                <div>Total Price: {order.totalPrice}</div>
                <div>Address: {order.address}</div>
                {Object.keys(order.bookInfo).length > 0 ? (
                  <div>
                    Books:
                    <ul className="book-list">
                      {Object.keys(order.bookInfo).map((bookTitle) => (
                        <li key={bookTitle} className="book-item">
                          {bookTitle} (Quantity: {order.bookInfo[bookTitle]})
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>Books information not available for this order.</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
