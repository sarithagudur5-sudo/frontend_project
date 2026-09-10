import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
} from "lucide-react";

import { removeFromWishlist } from "../store/wishlistSlice.jsx";
import { addToCart } from "../store/cartSlice.jsx";

import "../styles/Wishlist.css";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || []
  );

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );

    alert(`${product.name} added to cart!`);
  };

  // Empty Wishlist
  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">
            <Heart size={48} />
          </div>

          <h1>Your Wishlist is Empty</h1>

          <p>
            Save your favorite daily needs and cleaning products
            here for later.
          </p>

          <button
            className="wishlist-shop-btn"
            onClick={() => navigate("/products")}
          >
            Explore Products
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">

        {/* Header */}
        <div className="wishlist-header">
          <div>
            <h1>
              <Heart size={30} />
              My Wishlist
            </h1>

            <p>
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1
                ? "product"
                : "products"}{" "}
              saved
            </p>
          </div>

          <button
            className="wishlist-continue-btn"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
            <ArrowRight size={17} />
          </button>
        </div>

        {/* Wishlist Products */}
        <div className="wishlist-grid">
          {wishlistItems.map((product) => (
            <div
              className="wishlist-card"
              key={product.id}
            >
              {/* Product Image */}
              <div className="wishlist-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="wishlist-image"
                />

                {/* Remove Button */}
                <button
                  className="wishlist-remove-btn"
                  onClick={() =>
                    handleRemove(product.id)
                  }
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Product Details */}
              <div className="wishlist-content">

                <span className="wishlist-category">
                  {product.category}
                </span>

                <h2>{product.name}</h2>

                <div className="wishlist-bottom">
                  <span className="wishlist-price">
                    ₹
                    {Number(
                      product.price || 0
                    ).toFixed(2)}
                  </span>

                  <button
                    className="wishlist-cart-btn"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    <ShoppingCart size={17} />
                    Add to Cart
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Wishlist;