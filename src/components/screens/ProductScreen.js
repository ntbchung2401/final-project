import { useParams } from "react-router-dom";

function ProductScreen() {
  const params = useParams();
  const { display } = params;
  return (
    <div>
      <h1>{display}</h1>
    </div>
  );
}
export default ProductScreen;
