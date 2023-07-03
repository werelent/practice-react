import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const CheckoutForm = ({ cartItems, totalPrice, setCartItems }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        paymentMethod: '',
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(storedIsLoggedIn === 'true');

        const storedUserId = localStorage.getItem('userId');

        if (storedIsLoggedIn === 'true' && storedUserId) {
            fetchUserById(storedUserId);
        }
    }, []);

    const fetchUserById = (id) => {
        fetch(`https://localhost:7157/api/users/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    name: data.name,
                    email: data.email,
                    address: data.address,
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create an object with book IDs as keys and quantities as values
        const bookQuantities = cartItems.reduce((quantities, item) => {
            quantities[item.id] = item.quantity;
            return quantities;
        }, {});

        // Update the book quantities on the server
        fetch('https://localhost:7157/api/books/updateQuantities', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookQuantities),
        })
            .then((response) => {
                if (response.ok) {
                    // Quantity update successful, proceed with creating the order
                    return fetch('https://localhost:7157/api/orders', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: formData.name,
                            email: formData.email,
                            address: formData.address,
                            paymentMethod: formData.paymentMethod,
                            bookQuantities: bookQuantities,
                            totalPrice: totalPrice.toFixed(2),
                            status: 'Pending',
                        }),
                    });
                } else {
                    // Quantity update failed, throw an error
                    throw new Error('Failed to update book quantities');
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Order created:', data);
                // Empty the cart after successful checkout
                setCartItems([]);
                localStorage.removeItem('cartItems');
                navigate('/success');
            })
            .catch((error) => {
                console.error('Error creating order:', error);
            });
    };

    return (
        <div className="checkout-form">
            <h2 className="form-title">Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                        disabled={isLoggedIn}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                        disabled={isLoggedIn}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="paymentMethod">Payment Method</label>
                    <div className="select-wrapper">
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        >
                            <option value="">-- Select Payment Method --</option>
                            <option value="creditCard">Credit Card</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="form-button">
                    Place Order
                </button>
            </form>
            <Link to="/cart" className="cart-link">
                Go back to Cart
            </Link>
        </div>
    );
};

export default CheckoutForm;
