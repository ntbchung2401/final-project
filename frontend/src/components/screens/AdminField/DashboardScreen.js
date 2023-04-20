import React, { useContext, useEffect, useReducer } from 'react';
import Chart from 'react-google-charts';
import axios from 'axios';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { Shop } from '../../../Shop';
import { getError } from '../../../getError';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                summary: action.payload,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
export default function DashboardScreen() {
    const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });
    const { state } = useContext(Shop);
    const { userInfo } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/orders/summary', {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(err),
                });
            }
        };
        fetchData();
    }, [userInfo]);

    return (
        <div>
            <h1>Dashboard</h1>
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <ErrorMessage variant="danger">{error}</ErrorMessage>
            ) : (
                <>
                    <Row>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        {summary.users && summary.users[0] ? summary.users[0].numUsers : 0}
                                    </Card.Title>
                                    <Card.Text> Users</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        {summary.orders && summary.users[0] ? summary.orders[0].numOrders : 0}
                                    </Card.Title>
                                    <Card.Text> Orders</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        $
                                        {summary.orders && summary.users[0]
                                            ? summary.orders[0].totalSales.toFixed(2)
                                            : 0}
                                    </Card.Title>
                                    <Card.Text> Orders</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <div className="my-3">
                        <h2>Total Sales</h2>
                        {summary.dailyOrders.length === 0 ? (
                            <ErrorMessage>No Sale</ErrorMessage>
                        ) : (
                            <Chart
                                width="100%"
                                height="400px"
                                chartType="AreaChart"
                                loader={<div>Loading Chart...</div>}
                                data={[['Date', 'Sales'], ...summary.dailyOrders.map((x) => [x._id, x.sales])]}
                            ></Chart>
                        )}
                    </div>
                    <div className="my-3">
                        <h2>30 Day Recent Sales</h2>
                        {summary.monthsOrders.length === 0 ? (
                            <ErrorMessage>No Sale</ErrorMessage>
                        ) : (
                            <Chart
                                width="100%"
                                height="400px"
                                chartType="AreaChart"
                                loader={<div>Loading Chart...</div>}
                                data={[['Date', 'Sales'], ...summary.monthsOrders.map((x) => [x._id, x.sales])]}
                            ></Chart>
                        )}
                    </div>
                    <div className="my-3">
                        <h2>Categories</h2>
                        {summary.productCategories.length === 0 ? (
                            <ErrorMessage>No Category</ErrorMessage>
                        ) : (
                            <Chart
                                width="100%"
                                height="400px"
                                chartType="PieChart"
                                loader={<div>Loading Chart...</div>}
                                data={[
                                    ['Category', 'Products'],
                                    ...summary.productCategories.map((x) => [x._id, x.count]),
                                ]}
                            ></Chart>
                        )}
                    </div>
                    <div className="my-3">
                        <h2>Brands</h2>
                        {summary.productBrands.length === 0 ? (
                            <ErrorMessage>No Brand</ErrorMessage>
                        ) : (
                            <Chart
                                width="100%"
                                height="400px"
                                chartType="PieChart"
                                loader={<div>Loading Chart...</div>}
                                data={[['Brand', 'Products'], ...summary.productBrands.map((x) => [x._id, x.count])]}
                            ></Chart>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
