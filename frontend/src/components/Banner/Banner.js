import React from 'react';
import bannerImg from '../assets/images/bannerImg.png';
import styles from './Banner.module.scss';

export default function Banner() {
    return (
        <div className={styles.heroBanner}>
            <div className={styles.content}>
                <div className={styles.textContent}>
                    <h1>Sales</h1>
                    <p>
                        Something new is showing in the future, please keep in touch with us to see any new item, new
                        product that have a good quality, any kind of product are showing are in stock
                    </p>
                    <div className={styles.contact}>
                        <div className={styles.bannerContact}>Read More</div>
                        <div className={styles.bannerContact2}>Shop Now</div>
                    </div>
                </div>
                <img className={styles.bannerImg} src={bannerImg} alt="" />
            </div>
        </div>
    );
}
