import React from 'react';
import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
export default function Category() {
    return (
        <div className={cx('shop-by-category')}>
            <div className={cx('categoriesList')}>
                <div className={cx('eachCategory')}>
                    <Link
                        to={`/search?category=644bf886c97cf5861b849027&query=all&price=all&rating=all&order=newest&page=1`}
                    >
                        <img
                            src="https://product.hstatic.net/1000306633/product/loner_club_4d161e2ded184099b7363016d141746c.jpg"
                            alt=""
                        />
                        <button className={cx('btnShop')}>Hoodies</button>
                    </Link>
                </div>

                <div className={cx('eachCategory')}>
                    <Link
                        to={`/search?category=643e512fc3ae87a8a9d98065&query=all&price=all&rating=all&order=newest&page=1`}
                    >
                        <img
                            src="https://product.hstatic.net/1000306633/product/1611_34_eeb946bfbe3e4fd18aefd347c4d8f5c0.jpg"
                            alt=""
                        />
                        <button className={cx('btnShop')}>Jacket</button>
                    </Link>
                </div>
                <div className={cx('eachCategory')}>
                    <Link
                        to={`/search?category=645125fc5af56d1a550ae791&query=all&price=all&rating=all&order=newest&page=1`}
                    >
                        <img
                            src="https://product.hstatic.net/1000306633/product/hades_18.121283_02c4a616f1bf4697afb05f815b3e54d9.jpg"
                            alt=""
                        />
                        <button className={cx('btnShop')}>Shirts</button>
                    </Link>
                </div>
                <div className={cx('eachCategory')}>
                    <Link
                        to={`/search?category=644bf89fc97cf5861b84902f&query=all&price=all&rating=all&order=newest&page=1`}
                    >
                        <img
                            src="https://product.hstatic.net/1000306633/product/hades_20.03.23.3620_5236325f6a044c6ab652afceefc4df3f.jpg"
                            alt=""
                        />
                        <button className={cx('btnShop')}>Pants</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
