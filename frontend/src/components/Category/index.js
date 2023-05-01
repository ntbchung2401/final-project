import React from 'react';
import classNames from 'classnames/bind';
import styles from './Category.module.scss';

const cx = classNames.bind(styles);
export default function Category() {
    return (
        <div className={cx('shop-by-category')}>
            <div className={cx('categoriesList')}>
                <div className={cx('eachCategory')}>
                    <img src="https://bizweb.dktcdn.net/100/438/408/products/qjm5033-xah3.jpg?v=1677141996487" alt="" />
                    <button className={cx('btnShop')}>Jeans</button>
                </div>
                <div className={cx('eachCategory')}>
                    <img
                        src="https://bizweb.dktcdn.net/100/438/408/products/akm4027-xah-qjm3077-xde-4.jpg?v=1660188596320"
                        alt=""
                    />
                    <button className={cx('btnShop')}>Jacket</button>
                </div>
                <div className={cx('eachCategory')}>
                    <img
                        src="https://bizweb.dktcdn.net/100/438/408/products/atm5095-cba-7.jpg?v=1668563064037"
                        alt=""
                    />
                    <button className={cx('btnShop')}>Sweater</button>
                </div>
                <div className={cx('eachCategory')}>
                    <img
                        src="https://bizweb.dktcdn.net/100/438/408/products/qkm5027-den-20.jpg?v=1675498036550"
                        alt=""
                    />
                    <button className={cx('btnShop')}>Pants</button>
                </div>
            </div>
        </div>
    );
}
