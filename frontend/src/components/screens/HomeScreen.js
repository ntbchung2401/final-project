import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/products");
      setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Features Product</h1>
      <div className='products'>
        {products.map((product) => (
          <div className='product' key={product.display}>
            <Link to={`/product/${product.display}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className='product-info'>
              <Link to={`/product/${product.display}`}>
                <p>{product.name}</p>
              </Link>
              <p>
                <strong>${product.price}</strong>
              </p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      <div className='products'>
        {products.map((product) => (
          <div className='product' key={product.display}>
            <Link to={`/product/${product.display}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className='product-info'>
              <Link to={`/product/${product.display}`}>
                <p>{product.name}</p>
              </Link>
              <p>
                <strong>${product.price}</strong>
              </p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomeScreen;
