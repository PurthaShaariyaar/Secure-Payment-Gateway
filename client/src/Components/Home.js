import React from "react";

import { FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          {/* Insert IMAGE HERE */}
          {/* <img src={BannerBackground} alt="" /> */}
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Secure Payment Gateway
          </h1>
          <p className="primary-text">
            You can buy stuff securely.
          </p>
          <Link to="/products" className="secondary-button">
            Shop Now <FiArrowRight />{" "}
          </Link>
        </div>
        <div className="home-image-section">
          {/* Insert IMAGE HERE */}
          {/* <img src={BannerImage} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
