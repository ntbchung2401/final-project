import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import { Shop } from '~/Shop';
import { getError } from '~/getError';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '~/components/ErrorMessage/ErrorMessage';
import { toast } from 'react-toastify';
import { Col, ListGroup, Row } from 'react-bootstrap';

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
export default function CreateProductScreen() {
    const navigate = useNavigate();
    const params = useParams(); // /product/:id
    const { _id: productId } = params;
    const { state } = useContext(Shop);
    const { userInfo } = state;
    const [{ error, loadingCreate, loadingUpload }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const [name, setName] = useState('');
    const [display, setDisplay] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [inStock, setInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [brands, setBrands] = useState([]);
    const [cate, setCate] = useState([]);

    useEffect(() => {
        axios
            .get('/api/brands')
            .then((response) => {
                setBrands(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get('/api/categories')
            .then((response) => {
                setCate(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const createHandler = async (e) => {
        try {
            e.preventDefault();
            dispatch({ type: 'CREATE_REQUEST' });
            const { data } = await axios.post(
                '/api/products',
                {
                    name,
                    display,
                    price,
                    image,
                    category,
                    brand,
                    description,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                },
            );
            toast.success('product created successfully');
            dispatch({ type: 'CREATE_SUCCESS' });
            navigate(`/product/${data.display}`);
        } catch (err) {
            toast.error(getError(error));
            dispatch({
                type: 'CREATE_FAIL',
                payload: getError(err),
            });
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        try {
            dispatch({ type: 'UPLOAD_REQUEST' });
            const { data } = await axios.post('/api/upload', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `Bearer ${userInfo.token}`,
                },
            });
            dispatch({ type: 'UPLOAD_SUCCESS' });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Image uploaded successfully');
            setImage(data.secure_url);
        } catch (err) {
            toast.error(getError(err));
            dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
        }
    };

    return (
        <Container className="small-container">
            <Helmet>
                <title>Create New Product</title>
            </Helmet>
            <h1>Create New Product</h1>
            <Row>
            <Col md={8}>
            <Form onSubmit={createHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="display">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control value={display} onChange={(e) => setDisplay(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Select value={category} required onChange={(e) => setCategory(e.target.value)}>
                            <option value="">-----Select a Category------</option>
                            {cate.map((cate, index) => {
                                return (
                                    <option key={index} value={cate._id}>
                                        {cate.name}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Select value={brand} required onChange={(e) => setBrand(e.target.value)}>
                            <option value="">-----Select a Brand------</option>
                            {brands.map((brands, index) => {
                                return (
                                    <option key={index} value={brands._id}>
                                        {brands.brand}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="imageFile">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control type="file" onChange={uploadFileHandler} />
                        {loadingUpload && <LoadingSpinner></LoadingSpinner>}
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
            </Col>
            <Col className="col-4">
                        <ListGroup.Item>
                            <Row className="avatar-display">
                                <Col
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderRadius: '50%',
                                        justifyContent: 'center',
                                        marginTop: '50%',
                                    }}
                                >
                                    <div></div>
                                    <img
                                        src={image}
                                        alt={image}
                                        className="img-fluid rounded mx-auto d-block img-thumbnails"
                                    ></img>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </Col>
                    
                    </Row>
        </Container>
    );
}
