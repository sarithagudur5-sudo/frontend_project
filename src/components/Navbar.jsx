import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Home,
  ShoppingBag,
  Package,
  Search,
  ShoppingCart,
  Heart,
  User,
  LogOut,
  X,
  Sparkles,
} from "lucide-react";

import { logout } from "../store/authSlice.jsx";

import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || []
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearch = () => {
    const value = searchText.trim();

    if (value) {
      navigate(`/products?search=${encodeURIComponent(value)}`);
    } else {
      navigate("/products");
    }

    setSearchOpen(false);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div
        className="navbar-logo"
        onClick={() => navigate("/")}
      >
        <ShoppingBag size={25} />
        <span>Daily Needs</span>
      </div>

      {/* NAVIGATION */}
      <div className="navbar-links">

        {/* HOME */}
        <button
          type="button"
          onClick={() => navigate("/")}
        >
          <Home size={19} />
          <span>Home</span>
        </button>

        {/* PRODUCTS */}
        <button
          type="button"
          onClick={() => navigate("/products")}
        >
          <ShoppingBag size={19} />
          <span>Products</span>
        </button>

        {/* ORDERS */}
        <button
          type="button"
          onClick={() => navigate("/orders")}
        >
          <Package size={19} />
          <span>Orders</span>
        </button>
        <button
          type="button"
          onClick={() => navigate("/cleaning-assistant")}>
         <Sparkles size={19} />
         <span>Cleaning Assistant</span>
        </button>

        {/* SEARCH */}
        {searchOpen ? (
          <div className="navbar-search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              autoFocus
            />

            <button
              type="button"
              className="navbar-search-submit"
              onClick={handleSearch}
              title="Search"
            >
              <Search size={18} />
            </button>

            <button
              type="button"
              className="navbar-search-close"
              onClick={() => {
                setSearchOpen(false);
                setSearchText("");
              }}
              title="Close"
            >
              <X size={17} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={20} />
            <span>Search</span>
          </button>
        )}

        {/* CART */}
        <button
          type="button"
          className="navbar-icon-button"
          onClick={() => navigate("/cart")}
          title="Cart"
        >
          <ShoppingCart size={22} />

          {cartItems.length > 0 && (
            <span className="navbar-badge">
              {cartItems.length}
            </span>
          )}
        </button>

        {/* WISHLIST */}
        <button
          type="button"
          className="navbar-icon-button wishlist-nav-button"
          onClick={() => navigate("/wishlist")}
          title="Wishlist"
        >
          <Heart
            size={22}
            fill={
              wishlistItems.length > 0
                ? "currentColor"
                : "none"
            }
          />

          {wishlistItems.length > 0 && (
            <span className="navbar-badge wishlist-badge">
              {wishlistItems.length}
            </span>
          )}
        </button>

        {/* PROFILE */}
        <button
          type="button"
          onClick={() => navigate("/profile")}
        >
          <User size={19} />
          <span>Profile</span>
        </button>

        {/* LOGOUT */}
        <button
          type="button"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;