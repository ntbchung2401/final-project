import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../../CheckoutSteps/CheckoutSteps';
import { Shop } from '../../../Shop';

export default function AddressScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Shop);
    const {
        userInfo,
        cart: { shippingAddress },
    } = state;
    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [phoneNum, setPhoneNum] = useState(shippingAddress.phoneNum || '');
    const [street, setStreet] = useState(shippingAddress.street || '');
    const [city, setCity] = useState(shippingAddress.city || '');

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=/address');
        }
    }, [userInfo, navigate]);
    const [country, setCountry] = useState(shippingAddress.country || '');
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                phoneNum,
                street,
                city,
                country,
            },
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                phoneNum,
                street,
                city,
                country,
            }),
        );
        navigate('/payment');
    };
    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>

            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className="container small-container">
                <h1 className="my-3">Your Shipping Address</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Receiver Name</Form.Label>
                        <Form.Control value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phoneNum">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="street">
                        <Form.Label>Street</Form.Label>
                        <Form.Control value={street} onChange={(e) => setStreet(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city} onChange={(e) => setCity(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={country} onChange={(e) => setCountry(e.target.value)} required />
                    </Form.Group>
                    <div className="mb-3">
                        <Button variant="primary" type="submit">
                            Continue
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
