import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Shop } from "./Shop";
import { useContext } from "react";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import CartScreen from "./components/screens/CartScreen";
import LoginScreen from "./components/screens/LoginScreen";

function App() {
  const { state } = useContext(Shop);
  const { cart } = state;
  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <header>
          <Navbar bg='primary' variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>ChungStore</Navbar.Brand>
              </LinkContainer>
              <Nav className='me-auto'>
                <Link to='/cart' className='nav-link'>
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg='danger'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:display' element={<ProductScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/' element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
    /* <div className="page">
      <LoginForm />
    </div> */
  );
}
export default App;
