import styles from './SideBar.module.scss';
import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import { FaHome, FaUserAlt, FaRegChartBar, FaShoppingBag, FaThList } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Shop } from '~/Shop';
import { GoSignOut, GoSignIn } from 'react-icons/go';

const cx = classNames.bind(styles);

export default function SideBar({ setShowSideBar }) {
    const { state, dispatch: ctxDispatch } = useContext(Shop);
    const { userInfo } = state;
    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingAddress');
        window.location.href = '/';
    };

    const menuItemAdmin = [
        {
            path: '/',
            name: 'HomePage',
            icon: <FaHome />,
        },
        {
            path: '/admin/dashboard',
            name: 'Dashboard',
            icon: <FaRegChartBar />,
        },
        {
            path: '/admin/userlist',
            name: 'Manage Account',
            icon: <FaUserAlt />,
        },
        {
            path: '/admin/manageCategory',
            name: 'Manage Category',
            icon: <FaThList />,
        },
        {
            path: '/admin/manageBrand',
            name: 'Manage Brand',
            icon: <FaThList />,
        },
        {
            path: '/admin/orderlist',
            name: 'Manage Order',
            icon: <FaShoppingBag />,
        },
        {
            path: '/admin/productlist',
            name: 'Manage Product',
            icon: <FaThList />,
        },
    ];
    const menuItemUser = [
        {
            path: '/',
            name: 'HomePage',
            icon: <FaHome />,
        },

        {
            path: '/profile',
            name: 'Edit Profile',
            icon: <FaUserAlt />,
        },
        {
            path: '/orderhistory',
            name: 'Order History',
            icon: <FaShoppingBag />,
        },
        {
            path: '/search',
            name: 'Search Screen',
            icon: <FaThList />,
        },
    ];
    return (
        <div className={cx('sidebar-panel')}>
            <div className={cx('opac-layer')}>
                <div className={cx('sidebar-content')}>
                    <div className={cx('logo')}>
                        <span className={cx('heading')}>ChungStore</span>
                        <span className={cx('close-btn')} onClick={() => setShowSideBar(false)}>
                            <MdClose />
                            <span className={cx('text')}>Close</span>
                        </span>
                    </div>
                    {userInfo && userInfo.isAdmin ? (
                        <div className={cx('sidebar-item')}>
                            {menuItemAdmin.map((item, index) => (
                                <NavLink to={item.path} key={index} className={cx('link')}>
                                    <div className={cx('icon')}>{item.icon}</div>
                                    <div className={cx('link-text')}>{item.name}</div>
                                </NavLink>
                            ))}
                            <NavLink onClick={signoutHandler} className={cx('link')}>
                                <div className={cx('icon')}>
                                    <GoSignOut />
                                </div>
                                <div className={cx('link-text')}>Sign Out</div>
                            </NavLink>
                        </div>
                    ) : (
                        <div className={cx('sidebar-item')}>
                            {menuItemUser.map((item, index) => (
                                <NavLink to={item.path} key={index} className={cx('link')}>
                                    <div className={cx('icon')}>{item.icon}</div>
                                    <div className={cx('link-text')}>{item.name}</div>
                                </NavLink>
                            ))}
                            {userInfo ? (
                                <NavLink onClick={signoutHandler} className={cx('link')}>
                                    <div className={cx('icon')}>
                                        <GoSignOut />
                                    </div>
                                    <div className={cx('link-text')}>Sign Out</div>
                                </NavLink>
                            ) : (
                                <NavLink to="/login" className={cx('link')}>
                                    <div className={cx('icon')}>
                                        <GoSignIn />
                                    </div>
                                    <div className={cx('link-text')}>Sign In</div>
                                </NavLink>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
