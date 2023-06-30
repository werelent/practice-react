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

        const order = {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            paymentMethod: formData.paymentMethod,
            bookQuantities: cartItems.reduce((quantities, item) => {
                quantities[item.id] = item.quantity;
                return quantities;
            }, {}),
            totalPrice: totalPrice.toFixed(2),
            status: "Pending",
        };

        fetch('https://localhost:7157/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
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
