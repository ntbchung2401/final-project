import React from 'react';
import classNames from 'classnames/bind';
import styles from './Brand.module.scss';

const cx = classNames.bind(styles);
export default function Brand() {
    return (
        <div className={cx('shop-by-brand')}>
            <div className={cx('brandList')}>
                <div className={cx('eachBrand')}>
                    <img src="https://res.cloudinary.com/dshdorhq9/image/upload/v1679260599/caps_2_ptbnko.jpg" alt="" />
                    <button className={cx('btnShop')}>5TheWay</button>
                </div>
                <div className={cx('eachBrand')}>
                    <img
                        src="https://res.cloudinary.com/dshdorhq9/image/upload/v1678821247/uyyswcxgmei6lzgkmg0l.jpg"
                        alt=""
                    />
                    <button className={cx('btnShop')}>NowSaiGon</button>
                </div>
                <div className={cx('eachBrand')}>
                    <img
                        src="https://res.cloudinary.com/dshdorhq9/image/upload/v1679259755/336159867_1139905727406412_4418065257545517045_n_kgj0pi.png"
                        alt=""
                    />
                    <button className={cx('btnShop')}>K300</button>
                </div>
                <div className={cx('eachBrand')}>
                    <img
                        src="https://res.cloudinary.com/dshdorhq9/image/upload/v1679260219/jacket-men_aeedjl.webp"
                        alt=""
                    />
                    <button className={cx('btnShop')}>Hades</button>
                </div>
            </div>
        </div>
    );
}
