import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Shop } from '~/Shop';


function Product(props) {
    const { product } = props;
    const { state, dispatch: ctxDispatch } = useContext(Shop);
    const {
        cart: { cartItems },
    } = state;

    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.counInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };
    return (
        <Card>
            <Link to={`/product/${product.display}`}>
                <img src={product.image} className="card-img-top" alt={product.name} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.display}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Card.Text>
                    <strong>${product.price}</strong>
                </Card.Text>
                {product.counInStock === 0 ? (
                    <Button variant="danger" disabled>
                        Sold Out
                    </Button>
                ) : (
                    <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
                )}
            </Card.Body>
        </Card>
    );
}
export default Product;
