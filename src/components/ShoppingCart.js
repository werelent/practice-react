import React from 'react';

const ShoppingCart = ({ cartItems, onRemoveFromCart }) => {
    return (
      <div className="shopping-cart">
        <h2>Shopping Cart</h2>
        {Object.values(cartItems).map((item) => (
          <div className="cart-item" key={item.id}>
            <p>{item.title}</p>
            <p>Quantity: {item.quantity}</p> {/* Display the quantity */}
            <button onClick={() => onRemoveFromCart(item)}>Remove</button>
          </div>
        ))}
      </div>
    );
  };

export default ShoppingCart;
