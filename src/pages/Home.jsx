import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Products Error:", error);
        setLoading(false);
      });
  }, []);

  const featuredProducts = products.slice(0, 8);

  return (
    <div className="home-page">

      {/* =========================
          HERO SECTION
      ========================== */}

      <section className="home-hero">
        <div className="home-hero-container">

          <div className="home-hero-content">

            <p className="hero-label">
              WELCOME TO DAILY NEEDS
            </p>

            <h1>
              Everything You Need
              <br />
              For Your <span>Daily Needs</span>
            </h1>

            <p className="hero-text">
              Shop everyday essentials for your home,
              kitchen, cleaning, laundry and personal care.
              Quality products at affordable prices.
            </p>

            <div className="hero-buttons">

              <Link
                to="/products"
                className="hero-primary-button"
              >
                Shop Now
              </Link>

              <Link
                to="/products"
                className="hero-secondary-button"
              >
                View Products
              </Link>

            </div>

          </div>

          <div className="home-hero-visual">

            <div className="hero-background-circle"></div>

            <div className="hero-product-card hero-card-one">
              <span>🧴</span>
              <p>Cleaning</p>
            </div>

            <div className="hero-product-card hero-card-two">
              <span>🧼</span>
              <p>Personal Care</p>
            </div>

            <div className="hero-product-card hero-card-three">
              <span>🧹</span>
              <p>Home Care</p>
            </div>

            <div className="hero-home-icon">
              🏠
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          FEATURES
      ========================== */}

      <section className="home-features">

        <div className="feature-box">
          <div className="feature-icon">🚚</div>

          <div>
            <h3>Easy Shopping</h3>
            <p>
              Shop your daily essentials easily.
            </p>
          </div>
        </div>

        <div className="feature-box">
          <div className="feature-icon">💰</div>

          <div>
            <h3>Affordable Prices</h3>
            <p>
              Great products at reasonable prices.
            </p>
          </div>
        </div>

        <div className="feature-box">
          <div className="feature-icon">⭐</div>

          <div>
            <h3>Quality Products</h3>
            <p>
              Carefully selected everyday products.
            </p>
          </div>
        </div>

        <div className="feature-box">
          <div className="feature-icon">🔒</div>

          <div>
            <h3>Secure Shopping</h3>
            <p>
              Simple and secure checkout experience.
            </p>
          </div>
        </div>

      </section>


      {/* =========================
          CATEGORIES
      ========================== */}

      <section className="categories-section">

        <div className="section-heading">
          <p>SHOP BY CATEGORY</p>

          <h2>
            Everything For Your Home
          </h2>

          <span>
            Find the essentials you need every day.
          </span>
        </div>

        <div className="categories-grid">

          <Link
            to="/products?category=Kitchen"
            className="category-card"
          >
            <div className="category-icon">
              🍳
            </div>

            <h3>Kitchen</h3>

            <p>
              Kitchen essentials
            </p>
          </Link>

          <Link
            to="/products?category=Cleaning"
            className="category-card"
          >
            <div className="category-icon">
              🧹
            </div>

            <h3>Cleaning</h3>

            <p>
              Cleaning essentials
            </p>
          </Link>

          <Link
            to="/products?category=Laundry"
            className="category-card"
          >
            <div className="category-icon">
              🧺
            </div>

            <h3>Laundry</h3>

            <p>
              Laundry essentials
            </p>
          </Link>

          <Link
            to="/products?category=Personal Care"
            className="category-card"
          >
            <div className="category-icon">
              🧴
            </div>

            <h3>Personal Care</h3>

            <p>
              Everyday personal care
            </p>
          </Link>

          <Link
            to="/products?category=Home Essentials"
            className="category-card"
          >
            <div className="category-icon">
              🏠
            </div>

            <h3>Home Essentials</h3>

            <p>
              Essentials for every home
            </p>
          </Link>

        </div>

      </section>


      {/* =========================
          FEATURED PRODUCTS
      ========================== */}

      <section className="featured-section">

        <div className="section-heading">

          <p>FEATURED PRODUCTS</p>

          <h2>
            Popular Daily Essentials
          </h2>

          <span>
            Some of our popular products for your everyday needs.
          </span>

        </div>

        {loading ? (
          <div className="home-loading">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="home-empty">
            <h3>No products available</h3>
            <p>
              Please make sure your server is running on port 5000.
            </p>
          </div>
        ) : (
          <div className="featured-products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        <div className="view-all-products">
          <Link to="/products">
            View All Products →
          </Link>
        </div>

      </section>


      {/* =========================
          OFFER SECTION
      ========================== */}

      <section className="home-offer">

        <div className="offer-content">

          <p>
            DAILY NEEDS SPECIAL
          </p>

          <h2>
            Make Everyday Shopping
            <br />
            Simple & Convenient
          </h2>

          <span>
            From cleaning supplies to personal care,
            find your everyday essentials in one place.
          </span>

          <Link
            to="/products"
            className="offer-button"
          >
            Start Shopping
          </Link>

        </div>

        <div className="offer-visual">
          🛒
        </div>

      </section>


      {/* =========================
          FINAL CTA
      ========================== */}

      <section className="home-cta">

        <h2>
          Ready to Shop Your Daily Needs?
        </h2>

        <p>
          Explore our collection and find everything
          you need for your everyday life.
        </p>

        <Link
          to="/products"
          className="cta-button"
        >
          Explore Products
        </Link>

      </section>

    </div>
  );
}

export default Home;