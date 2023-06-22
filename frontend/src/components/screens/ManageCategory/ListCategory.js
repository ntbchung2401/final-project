import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
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
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };
        case 'DELETE_REQUEST':
            return { ...state, loadingDelete: true, successDelete: false };
        case 'DELETE_SUCCESS':
            return {
                ...state,
                loadingDelete: false,
                successDelete: true,
            };
        case 'DELETE_FAIL':
            return { ...state, loadingDelete: false, successDelete: false };

        case 'DELETE_RESET':
            return { ...state, loadingDelete: false, successDelete: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default function ManageCategory() {
    const [{ loading, error, categories, loadingCreate, loadingDelete, successDelete }, dispatch] = useReducer(
        reducer,
        {
            loading: true,
            error: '',
        },
    );

    const navigate = useNavigate();
    const { state } = useContext(Shop);
    const { userInfo } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/categories`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });

                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {}
        };
        if (successDelete) {
            dispatch({ type: 'DELETE_RESET' });
        } else {
            fetchData();
        }
    }, [ userInfo, successDelete]);

    const deleteHandler = async (category) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                await axios.delete(`/api/categories/${category._id}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                toast.success('Category deleted successfully');
                dispatch({ type: 'DELETE_SUCCESS' });
            } catch (err) {
                toast.error(getError(error));
                dispatch({
                    type: 'DELETE_FAIL',
                });
            }
        }
    };
    return (
        <div>
            <Row>
                <Col>
                    <h1>List of Categories</h1>
                </Col>
                <Col className="col text-end">
                    <div>
                        <Link to="/admin/createCategory">
                            <Button>Create Category</Button>
                        </Link>
                    </div>
                </Col>
            </Row>

            {loadingCreate && <LoadingSpinner></LoadingSpinner>}
            {loadingDelete && <LoadingSpinner></LoadingSpinner>}
            {loading ? (
                <LoadingSpinner></LoadingSpinner>
            ) : error ? (
                <ErrorMessage variant="danger">{error}</ErrorMessage>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category._id}>
                                    <td>{category._id}</td>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        <Button
                                            type="button"
                                            variant="success"
                                            onClick={() => navigate(`/admin/categories/${category._id}`)}
                                        >
                                            Edit
                                        </Button>
                                        &nbsp;
                                        <Button type="button" variant="danger" onClick={() => deleteHandler(category)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}
