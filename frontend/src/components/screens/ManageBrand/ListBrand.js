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
                brands: action.payload,
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

export default function ManageBrand() {
    const [{ loading, error, brands, loadingCreate, loadingDelete, successDelete }, dispatch] = useReducer(
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
                const { data } = await axios.get(`/api/brands`, {
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

    const deleteHandler = async (brand) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                await axios.delete(`/api/brands/${brand._id}`, {
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
                    <h1>List of Brands</h1>
                </Col>
                <Col className="col text-end">
                    <div>
                        <Link to="/admin/createBrand">
                            <Button>Create Brand</Button>
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
                                <th>Brand</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.map((brand) => (
                                <tr key={brand._id}>
                                    <td>{brand._id}</td>
                                    <td>{brand.brand}</td>
                                    <td>{brand.description}</td>
                                    <td>
                                        <Button
                                            type="button"
                                            variant="success"
                                            onClick={() => navigate(`/admin/brands/${brand._id}`)}
                                        >
                                            Edit
                                        </Button>
                                        &nbsp;
                                        <Button type="button" variant="danger" onClick={() => deleteHandler(brand)}>
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
