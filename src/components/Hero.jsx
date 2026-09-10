import React from "react";
import { Link } from "react-router-dom";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">

        {/* LEFT CONTENT */}
        <div className="hero-content">

          <p className="hero-small-title">
            WELCOME TO CLEANCART
          </p>

          <h1>
            Everything You Need
            <br />
            For a <span>Cleaner Home</span>
          </h1>

          <p className="hero-description">
            Shop quality cleaning, kitchen, laundry and
            personal care essentials at affordable prices.
          </p>

          <div className="hero-buttons">
            <Link
              to="/products"
              className="hero-shop-button"
            >
              Shop Now
            </Link>

            <Link
              to="/products"
              className="hero-explore-button"
            >
              Explore Products
            </Link>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="hero-visual">

          <div className="hero-circle"></div>

          <div className="hero-box hero-box-one">
            🧴
          </div>

          <div className="hero-box hero-box-two">
            🧹
          </div>

          <div className="hero-box hero-box-three">
            🧼
          </div>

          <div className="hero-main-icon">
            🏠
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;