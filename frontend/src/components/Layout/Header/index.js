import React, { useContext, useState } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { BiHistory, BiSearch } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { BsCartPlus } from 'react-icons/bs';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Shop } from '~/Shop';
import { GoSignOut, GoSignIn } from 'react-icons/go';
import { TbBuildingStore } from 'react-icons/tb';
import SideBar from '../SideBar';
import { FiMenu } from 'react-icons/fi';

const cx = classNames.bind(styles);

export default function Header() {
    const [showSideBar, setShowSideBar] = useState(false);
    const { state, dispatch: ctxDispatch } = useContext(Shop);
    const { cart, userInfo } = state;
    const navigate = useNavigate();
    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingAddress');
        window.location.href = '/';
    };
    return (
        <>
        <div
                        // style={{ position: 'absolute', width: '100%', height: '15%', right: '0', top: '0', left: '0' }}
                    >
            <header className={cx('main-header')} >
                <div className={cx('header-content')}>
                    <ul className={cx('left')}>
                        <li>
                            <FiMenu color="white" fontSize="0.5em" onClick={() => setShowSideBar(true)} />
                        </li>
                        <li onClick={() => navigate('/')}>ChungStore</li>
                    </ul>
                    <div className={cx('center')}></div>
                    <div className={cx('right')}>
                        <Link style={{ color: 'white' }} to="/search">
                            <BiSearch />
                        </Link>
                        <span className={cx('cart-icon')}>
                            <Link style={{ color: 'white' }} to="/cart">
                                <BsCartPlus />
                                {cart.cartItems.length > 0 && (
                                    <Badge pill bg="danger">
                                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                    </Badge>
                                )}
                            </Link>
                        </span>
                        {userInfo ? (
                            <NavDropdown title={<CgProfile />} id="basic-nav-dropdown">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>
                                        <CgProfile color="black" fontSize="1.5em" /> User Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/orderhistory">
                                    <NavDropdown.Item>
                                        <BiHistory color="black" fontSize="1.5em" paddingLeft="1rem" />
                                        Order History
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <Link className="dropdown-item" to="/" onClick={signoutHandler}>
                                    <GoSignOut color="black" fontSize="1.5em" /> Sign Out
                                </Link>
                            </NavDropdown>
                        ) : (
                            <Link className="nav-link" to="/login">
                                <GoSignIn color="white" fontSize="1.5em" />
                            </Link>
                        )}

                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title={<TbBuildingStore />} id="admin-nav-dropdown">
                                <LinkContainer to="/admin/dashboard">
                                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/productlist">
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/orderlist">
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/admin/userlist">
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </div>
                </div>
            </header>
            {showSideBar && <SideBar setShowSideBar={setShowSideBar} />}
            </div>
        </>
    );
}
