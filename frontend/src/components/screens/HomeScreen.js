import { useEffect, useReducer } from "react";
import logger from "use-reducer-logger";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../Product";
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import { Link, useLocation } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;
  const [{ loading, error, pages, products }, dispatch] = useReducer(
    logger(reducer),
    {
      products: [],
      loading: true,
      error: "",
    }
  );
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
      <div>
        <Banner />
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
      <div>
        {[...Array(pages).keys()].map((x) => (
          <Link
            className={x + 1 === Number(page) ? "btn text-bold" : "btn"}
            key={x + 1}
            to={`/?page=${x + 1}`}
          >
            {x + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
export default HomeScreen;
