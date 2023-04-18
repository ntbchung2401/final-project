import React, { useContext, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';

import { toast } from 'react-toastify';
import { Shop } from '~/Shop';
import { getError } from '~/getError';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner';

const reducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_REQUEST':
            // return console.log(state, "state");
            return { ...state, loadingCreate: true, errorUpload: '' };
        case 'CREATE_SUCCESS':
            return {
                ...state,
                loadingCreate: false,
                errorUpload: '',
            };
        case 'CREATE_FAIL':
            return { ...state, loadingCreate: false, errorUpload: action.payload };
        case 'UPLOAD_REQUEST':
            return { ...state, loadingUpload: true, errorUpload: '' };
        case 'UPLOAD_SUCCESS':
            return {
                ...state,
                loadingUpload: false,
                errorUpload: '',
            };
        case 'UPLOAD_FAIL':
            return { ...state, loadingUpload: false, errorUpload: action.payload };
        default:
            return state;
    }
};
export default function CreateCategoryScreen() {
    const navigate = useNavigate();
    const params = useParams(); // /product/:id
    const { _id: productId } = params;
    const { state } = useContext(Shop);
    const { userInfo } = state;
    const [{ error, loadingCreate }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const createHandler = async (e) => {
        try {
            e.preventDefault();
            dispatch({ type: 'CREATE_REQUEST' });
            const { data } = await axios.post(
                '/api/categories/create',
                {
                    name,
                    description,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                },
            );
            toast.success('Category created successfully');
            dispatch({ type: 'CREATE_SUCCESS' });
            navigate(`/admin/manageCategory`);
        } catch (err) {
            toast.error(getError(error));
            dispatch({
                type: 'CREATE_FAIL',
                payload: getError(err),
            });
        }
    };

    return (
        <Container className="small-container">
            <Helmet>
                <title>Create New Category</title>
            </Helmet>
            <h1>Create New Category</h1>
            <Form onSubmit={createHandler}>
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} required />
                </Form.Group>
                <div className="mb-3">
                    <Button
                        disabled={loadingCreate}
                        type="submit"
                        // onClick={createHandler}
                    >
                        Create
                    </Button>
                    {loadingCreate && <LoadingSpinner></LoadingSpinner>}
                </div>
            </Form>
        </Container>
    );
}
