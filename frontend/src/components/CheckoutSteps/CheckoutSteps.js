import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CheckoutSteps.css';

export default function CheckoutSteps(props) {
    return (
        <Row className="checkout-steps">
            <Col className={props.step1 ? 'active' : ''}>Cart Action</Col>
            <Col className={props.step2 ? 'active' : ''}>Shipping Address</Col>
            <Col className={props.step3 ? 'active' : ''}>Payment Method</Col>
            <Col className={props.step4 ? 'active' : ''}>Review Order</Col>
        </Row>
    );
}
