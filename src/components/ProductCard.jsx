import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart } from "lucide-react";

import { addToCart } from "../store/cartSlice.jsx";
import { toggleWishlist } from "../store/wishlistSlice.jsx";

import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || []
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    alert(`${product.name} added to cart`);
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="product-card">

      {/* PRODUCT IMAGE */}
      <div className="product-image-box">

        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />

        {/* WISHLIST BUTTON */}
        <button
          type="button"
          className={`wishlist-heart-button ${
            isWishlisted ? "active" : ""
          }`}
          onClick={handleWishlist}
          title={
            isWishlisted
              ? "Remove from Wishlist"
              : "Add to Wishlist"
          }
        >
          <Heart
            size={21}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

      </div>

      {/* PRODUCT INFORMATION */}
      <div className="product-card-content">

        <h2 className="product-card-title">
          {product.name}
        </h2>

        <p className="product-card-category">
          {product.category}
        </p>

        <p className="product-card-rating">
          ⭐ {product.rating}
        </p>

        {/* PRICE */}
        <div className="product-card-price">

          <span className="product-current-price">
            ₹{product.price}
          </span>

          {product.oldPrice && (
            <span className="product-old-price">
              ₹{product.oldPrice}
            </span>
          )}

        </div>

        {/* BUTTONS */}
        <div className="product-card-buttons">

          {/* VIEW DETAILS */}
          <button
            type="button"
            className="view-details-button"
            onClick={() =>
              navigate(`/products/${product.id}`)
            }
          >
            View Details
          </button>

          {/* ADD TO CART */}
          <button
            type="button"
            className="add-cart-button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;