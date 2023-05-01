import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Shop } from '../../../Shop';
import { getError } from '../../../getError';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Button from 'react-bootstrap/esm/Button';
import Footer from '../../Footer/Footer.jsx';
import { Badge } from 'react-bootstrap';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, orders: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default function OrderHistoryScreen() {
    const { state } = useContext(Shop);
    const { userInfo } = state;
    const navigate = useNavigate();

    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const { data } = await axios.get(
                    `/api/orders/mine`,

                    { headers: { Authorization: `Bearer ${userInfo.token}` } },
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (error) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error),
                });
            }
        };
        fetchData();
    }, [userInfo]);
    return (
        <div>
            <Helmet>
                <title>Order History</title>
            </Helmet>

            <h1>Order History of {userInfo.name}</h1>
            {loading ? (
                <LoadingSpinner></LoadingSpinner>
            ) : error ? (
                <ErrorMessage variant="danger">{error}</ErrorMessage>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Order At</th>
                            <th>Paid</th>
                            <th>Delivered to</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>
                                    <table>
                                        <tbody>
                                            {order.orderItems.map((item) => (
                                                <tr key={item._id}>
                                                    <td style={{ padding: '0 5px' }}><strong>{item.quantity}</strong></td>
                                                    <td style={{ padding: '0 5px' }}>{item.name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                                <td>{order.totalPrice.toFixed(2)} $</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                <td>{order.isDelivered ? order.shippingAddress.city : <Badge bg="danger">No</Badge>}</td>
                                <td>
                                    <Button
                                        type="button"
                                        variant="dark"
                                        onClick={() => {
                                            navigate(`/order/${order._id}`);
                                        }}
                                    >
                                        Details
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
