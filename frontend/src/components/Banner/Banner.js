import React from "react";
import bannerImg from "../assets/images/bannerImg.png";

export default function Banner() {
  return (
    <div className='hero-banner'>
      <div className='content'>
        <div className='text-content'>
          <h1>Sales</h1>
          <p>
            Something new is showing in the future, please keep in touch with us
            to see any new item, new product that have a good quality, any kind
            of product are showing are in stock
          </p>
          <div className='contact'>
            <div className='banner-contact'>Read More</div>
            <div className='banner-contact-v2'>Shop Now</div>
          </div>
        </div>
        <img className='banner-img' src={bannerImg} alt='' />
      </div>
    </div>
  );
}
