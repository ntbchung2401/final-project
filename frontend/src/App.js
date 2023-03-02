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
import NavDropdown from "react-bootstrap/NavDropdown";
import CartScreen from "./components/screens/CartScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddressScreen from "./components/screens/AddressScreen";
import PaymentScreen from "./components/screens/PaymentScreen";
import OrderScreen from "./components/screens/OrderScreen";
import PreviewOrderScreen from "./components/screens/PreviewOrderScreen";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Shop);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
  };
  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <ToastContainer position='bottom-center' limit={1} />
        <header>
          <Navbar expand='sm' bg='black' variant='dark'>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>ChungStore</Navbar.Brand>
              </LinkContainer>
              <Nav className='justify-content-end flex-row'>
                <Link to='/cart' className='nav-link'>
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg='danger'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/orderhistory'>
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className='dropdown-item'
                      to='/'
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className='nav-link' to='/login'>
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path='/product/:display' element={<ProductScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/cart' element={<CartScreen />} />
              <Route path='/address' element={<AddressScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/previeworder' element={<PreviewOrderScreen />} />
              <Route path='/order/:id' element={<OrderScreen />}></Route>
              <Route path='/' element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <MDBFooter className='bg-dark text-center text-white'>
            <MDBContainer className='p-4 pb-0'>
              <section className='mb-4'>
                <MDBBtn
                  outline
                  color='light'
                  floating
                  className='m-1'
                  href='#!'
                  role='button'
                >
                  <MDBIcon fab icon='facebook-f' />
                </MDBBtn>

                <MDBBtn
                  outline
                  color='light'
                  floating
                  className='m-1'
                  href='#!'
                  role='button'
                >
                  <MDBIcon fab icon='twitter' />
                </MDBBtn>

                <MDBBtn
                  outline
                  color='light'
                  floating
                  className='m-1'
                  href='#!'
                  role='button'
                >
                  <MDBIcon fab icon='google' />
                </MDBBtn>
                <MDBBtn
                  outline
                  color='light'
                  floating
                  className='m-1'
                  href='#!'
                  role='button'
                >
                  <MDBIcon fab icon='instagram' />
                </MDBBtn>

                <MDBBtn
                  outline
                  color='light'
                  floating
                  className='m-1'
                  href='#!'
                  role='button'
                >
                  <MDBIcon fab icon='linkedin-in' />
                </MDBBtn>

                <MDBBtn
                  outline
                  color='light'
                  floating
                  className='m-1'
                  href='#!'
                  role='button'
                >
                  <MDBIcon fab icon='github' />
                </MDBBtn>
              </section>
            </MDBContainer>

            <div
              className='text-center p-3'
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              © 2020 Copyright:
              <a className='text-white' href='https://mdbootstrap.com/'>
                MDBootstrap.com
              </a>
            </div>
          </MDBFooter>
        </footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
