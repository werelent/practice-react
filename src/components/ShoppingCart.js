import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingCart = ({ cartItems, onRemoveFromCart }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="shopping-cart">
        <h2>Shopping Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {Object.values(cartItems).map((item) => (
        <div className="cart-item" key={item.id}>
          <div className="cart-item-details">
            <p>{item.title}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <button className="remove-button" onClick={() => onRemoveFromCart(item)}>
            Remove
          </button>
        </div>
      ))}
      <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
      <Link
        to={{ pathname: '/checkout', state: { totalPrice } }}
        className={`checkout-link ${cartItems.length === 0 ? 'disabled' : ''}`}
        onClick={(e) => {
          if (cartItems.length === 0) {
            e.preventDefault();
            alert('Your cart is empty. Please add items to proceed.');
          }
        }}
      >
        Proceed to Checkout
      </Link>
    </div>
  );
};

export default ShoppingCart;
