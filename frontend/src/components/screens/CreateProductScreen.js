import React, { useContext, useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import { getError } from "../../getError";
import { Shop } from "../../Shop";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};
export default function CreateProductScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = useParams(); // /product/:id
  const { id: productId } = params;
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/admin/createproduct";
  const { state } = useContext(Shop);
  const { userInfo } = state;
  const [{ loading, error, loadingCreate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const [name, setName] = useState("");
  const [display, setDisplay] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [counInStock, setcounInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  const createHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        "/api/products/createproduct",

        {
          productId,
          name,
          display,
          price,
          image,
          brand,
          counInStock,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success("product created successfully");
      dispatch({ type: "CREATE_SUCCESS" });
      navigate(`/admin/product/${data.product._id}`);
    } catch (err) {
      toast.error(getError(error));
      dispatch({
        type: "CREATE_FAIL",
      });
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("/api/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });

      toast.success("Image uploaded successfully");
      setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };
  return (
    <Container className='small-container'>
      <Helmet>
        <title>Create New Product</title>
      </Helmet>
      <h1>Create New Product</h1>

      {loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <Form onSubmit={createHandler}>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='display'>
            <Form.Label>Display</Form.Label>
            <Form.Control
              value={display}
              onChange={(e) => setDisplay(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='imageFile'>
            <Form.Label>Upload File</Form.Label>
            <Form.Control type='file' onChange={uploadFileHandler} />
            {loadingUpload && <LoadingSpinner></LoadingSpinner>}
          </Form.Group>
          <Form.Group className='mb-3' controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='counInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              value={counInStock}
              onChange={(e) => setcounInStock(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <div className='mb-3'>
            <Button disabled={loadingCreate} type='submit'>
              Create
            </Button>
            {loadingCreate && <LoadingSpinner></LoadingSpinner>}
          </div>
        </Form>
      )}
    </Container>
  );
}
