import React from 'react';
import classNames from 'classnames/bind';
import styles from './Category.module.scss';

const cx = classNames.bind(styles);
export default function Category() {
    return (
        <div className={cx('shop-by-category')}>
            <div className={cx('categoriesList')}>
                <div className={cx('eachCategory')}>
                    <img src="https://res.cloudinary.com/dshdorhq9/image/upload/v1679260599/caps_2_ptbnko.jpg" alt="" />
                    <button className={cx('btnShop')}>Jeans</button>
                </div>
                <div className={cx('eachCategory')}>
                    <img
                        src="https://res.cloudinary.com/dshdorhq9/image/upload/v1678821247/uyyswcxgmei6lzgkmg0l.jpg"
                        alt=""
                    />
                    <button className={cx('btnShop')}>Jacket</button>
                </div>
                <div className={cx('eachCategory')}>
                    <img
                        src="https://res.cloudinary.com/dshdorhq9/image/upload/v1679259755/336159867_1139905727406412_4418065257545517045_n_kgj0pi.png"
                        alt=""
                    />
                    <button className={cx('btnShop')}>Hoodies</button>
                </div>
                <div className={cx('eachCategory')}>
                    <img
                        src="https://res.cloudinary.com/dshdorhq9/image/upload/v1679260219/jacket-men_aeedjl.webp"
                        alt=""
                    />
                    <button className={cx('btnShop')}>Pants</button>
                </div>
            </div>
        </div>
    );
}
