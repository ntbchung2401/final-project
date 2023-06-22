import React from 'react';
import classNames from 'classnames/bind';
import styles from './Brand.module.scss';

const cx = classNames.bind(styles);
export default function Brand() {
    return (
        <div className={cx('shop-by-brand')}>
            <div className={cx('brandList')}>
                <div className={cx('eachBrand')}>
                    <img src="https://www.celeb.vn/wp-content/uploads/2021/08/5theway.jpg" alt="" />
                    <button className={cx('btnShop')}>5TheWay</button>
                </div>
                
                <div className={cx('eachBrand')}>
                    <img
                        src="https://employer.jobsgo.vn/uploads/media/img/201805/pictures_library_van-thuc_9247_180502094537_6369.png"
                        alt=""
                    />
                    <button className={cx('btnShop')}>K300</button>
                </div>
                <div className={cx('eachBrand')}>
                    <img
                        src="https://bizweb.dktcdn.net/100/318/614/products/wuntitled-14-04-2.jpg?v=1609153887910"
                        alt=""
                    />
                    <button className={cx('btnShop')}>Now Saigon</button>
                </div>
                <div className={cx('eachBrand')}>
                    <img
                        src="https://localbrand.vn/wp-content/uploads/2020/04/Logo-HADES.jpg"
                        alt=""
                    />
                    <button className={cx('btnShop')}>Hades Studio</button>
                </div>
            </div>
        </div>
    );
}
