import { useEffect, useReducer, useState } from 'react';
import logger from 'use-reducer-logger';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../CardProduct/Product';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import Pagination from '../Pagination';
import Category from '../Category';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                products: action.payload,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function HomeScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: '',
    });
    const [currentPages, setCurrentPages] = useState(1);
    const [postPerPages, setPostPerPages] = useState(12);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
            //setProducts(result.data);
        };
        fetchData();
    }, []);

    const lastPostIndex = currentPages * postPerPages;
    const firstPostIndex = lastPostIndex - postPerPages;
    const currenPosts = products.slice(firstPostIndex, lastPostIndex);
    return (
        <div>
            <Helmet>
                <title>ChungStore</title>
            </Helmet>
            <Banner />
            <h1>Category:</h1>
            <div className="main-contents">
                <div className="layoutForCate">
                    <Category />
                </div>
            </div>
            <h1>Features Product</h1>
            <div className="products">
                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <ErrorMessage variant="danger">{error}</ErrorMessage>
                ) : (
                    <Row>
                        {currenPosts.map((product) => (
                            <Col key={product.display} sm={6} md={4} lg={3} className="mb-3">
                                <Product product={product}></Product>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
            <div>
                <Pagination
                    totalPosts={products.length}
                    postsPerPages={postPerPages}
                    setCurrentPages={setCurrentPages}
                    currentPages={currentPages}
                />
            </div>
        </div>
    );
}
export default HomeScreen;
