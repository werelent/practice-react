import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingCart = ({ cartItems, onRemoveFromCart, onAddToCart }) => {
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
      {Object.values(cartItems).length > 0 ? (
        <table className="order-list">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(cartItems).map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button className="quantity-button minus" onClick={() => onRemoveFromCart(item)}>
                    -
                  </button>
                  <button className="quantity-button plus" onClick={() => onAddToCart(item)}>
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="total-price">
                Total Price: ${totalPrice.toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <p className="empty-cart-message">Your cart is empty. Please add items to proceed.</p>
      )}
      {Object.keys(cartItems).length > 0 && (
        <Link to={{ pathname: '/checkout', state: { totalPrice } }} className="checkout-link">
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
}

export default ShoppingCart;
