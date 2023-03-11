import { useEffect, useReducer } from "react";
import logger from "use-reducer-logger";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../Product";
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";
import { Helmet } from "react-helmet-async";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
      //setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>ChungStore</title>
      </Helmet>
      <h1>Hot Product</h1>
      <div>
        <MDBCarousel showControls fade>
          <MDBCarouselItem
            className='d-block h-100'
            itemId={1}
            src='../images/anh1.jpg'
            width={480}
            height={640}
            alt='...'
          />
          <MDBCarouselItem
            className='d-block h-100'
            itemId={2}
            src='../images/anh2.jpg'
            width={480}
            height={640}
            alt='...'
          />
          <MDBCarouselItem
            className='d-block h-100'
            itemId={3}
            src='../images/anh3.jpg'
            width={480}
            height={640}
            alt='...'
          />
        </MDBCarousel>
      </div>
      <h1>Features Product</h1>
      <div className='products'>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage variant='danger'>{error}</ErrorMessage>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.display} sm={6} md={4} lg={3} className='mb-3'>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
