import React, { useEffect, useState } from 'react';

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updatedOrder, setUpdatedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://localhost:7157/api/orders');
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.log('Error fetching orders:', response.status);
                }
            } catch (error) {
                console.log('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleSelectOrder = (order) => {
        setSelectedOrder(order);
        setUpdatedOrder({ ...order });
    };

    const handleChange = (e) => {
        setUpdatedOrder({ ...updatedOrder, [e.target.name]: e.target.value });
    };

    const handleUpdateOrder = async () => {
        try {
            const response = await fetch(
                `https://localhost:7157/api/orders/${updatedOrder.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedOrder),
                }
            );
            console.log('Response status:', response.status);
            if (response.ok || response.status === 204) {
                setOrders(
                    orders.map((order) =>
                        order.id === updatedOrder.id ? updatedOrder : order
                    )
                );
                setSelectedOrder(null);
                setUpdatedOrder(null);
            } else {
                console.log('Error updating order:', response.status);
            }
        } catch (error) {
            console.log('Error updating order:', error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            const response = await fetch(
                `https://localhost:7157/api/orders/${orderId}`,
                {
                    method: 'DELETE',
                }
            );
            console.log('Response status:', response.status);
            if (response.ok || response.status === 204) {
                setOrders(orders.filter((order) => order.id !== orderId));
            } else {
                console.log('Error deleting order:', response.status);
            }
        } catch (error) {
            console.log('Error deleting order:', error);
        }
    };

    return (
        <div className='order-management'>
            <h2>Order Management</h2>
            <div>
                {selectedOrder && (
                    <div className='edit-order'>
                        <h3>Edit Order</h3>
                        <form>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={updatedOrder.name}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="text"
                                    name="email"
                                    value={updatedOrder.email}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Status:
                                <input
                                    type="text"
                                    name="status"
                                    value={updatedOrder.status}
                                    onChange={handleChange}
                                />
                            </label>
                            <button type="button" onClick={handleUpdateOrder}>
                                Apply Changes
                            </button>
                        </form>
                    </div>
                )}
            </div>
            {orders.length === 0 ? (
                <p>No orders available.</p>
            ) : (
                <table className='order-list'>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.name}</td>
                                <td>{order.email}</td>
                                <td>{order.status}</td>
                                <td>
                                    <button onClick={() => handleSelectOrder(order)}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteOrder(order.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OrderManagement;
