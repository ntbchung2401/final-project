import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Shop } from '~/Shop';
import { getError } from '~/getError';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '~/components/ErrorMessage/ErrorMessage';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };
        default:
            return state;
    }
};

export default function EditCategory() {
    const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const { state } = useContext(Shop);
    const { userInfo } = state;

    const params = useParams();
    const { id: categoryId } = params;
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/categories/${categoryId}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                setName(data.name);
                setDescription(data.description);
                dispatch({ type: 'FETCH_SUCCESS' });
            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(err),
                });
            }
        };
        fetchData();
    }, [categoryId, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: 'UPDATE_REQUEST' });
            await axios.put(
                `/api/categories/${categoryId}`,
                { _id: categoryId, name, description },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                },
            );
            dispatch({
                type: 'UPDATE_SUCCESS',
            });
            toast.success('User updated successfully');
            navigate('/admin/manageCategory');
        } catch (error) {
            toast.error(getError(error));
            dispatch({ type: 'UPDATE_FAIL' });
        }
    };
    return (
        <Container className="small-container">
            <Helmet>
                <title>Edit Category: {name}</title>
            </Helmet>
            <h1>Edit Category: {name}</h1>

            {loading ? (
                <LoadingSpinner></LoadingSpinner>
            ) : error ? (
                <ErrorMessage variant="danger">{error}</ErrorMessage>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Category name</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </Form.Group>
                    <div className="mb-3">
                        <Button disabled={loadingUpdate} type="submit">
                            Update
                        </Button>
                        {loadingUpdate && <LoadingSpinner></LoadingSpinner>}
                    </div>
                </Form>
            )}
        </Container>
    );
}
