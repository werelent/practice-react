import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your order. Your order has been placed successfully.</p>
      <Link to="/" className="home-link">Go to Home</Link>
    </div>
  );
};

export default OrderSuccess;
