import React from 'react';
import classNames from 'classnames/bind';
import styles from './Category.module.scss';

const cx = classNames.bind(styles);
export default function Category() {
    return (
        <div className={cx('shop-by-category')}>
            <div className={cx('categories')}>
                <div className={cx('category')}>
                    <img src="https://res.cloudinary.com/dshdorhq9/image/upload/v1679260599/caps_2_ptbnko.jpg" alt="" />
                    <span style={{ color: 'white', alignItems: 'center',justifyContent: 'center' }}>Jean</span>{' '}
                </div>
                <div className={cx('category')}>
                    <img
                        src="https://res.cloudinary.com/dshdorhq9/image/upload/v1678821247/uyyswcxgmei6lzgkmg0l.jpg"
                        alt=""
                    />
                </div>
                <div className={cx('category')}>
                    <img
                        src="https://res.cloudinary.com/dshdorhq9/image/upload/v1679259755/336159867_1139905727406412_4418065257545517045_n_kgj0pi.png"
                        alt=""
                    />
                </div>
                <div className={cx('category')}>
                    <img
                        src="https://res.cloudinary.com/dshdorhq9/image/upload/v1679260219/jacket-men_aeedjl.webp"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}
