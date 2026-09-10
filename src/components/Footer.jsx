import React from "react";
import { Link } from "react-router-dom";

import {
  Home,
  Package,
  ShoppingCart,
  ClipboardList,
  LogIn,
  UserPlus,
} from "lucide-react";

import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}

        <div className="footer-column footer-brand">

          <h2>Daily Needs</h2>

          <p>
            Your trusted store for everyday home and
            personal care essentials.
          </p>

        </div>

        {/* QUICK LINKS */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <Link to="/">
            <Home size={16} />
            Home
          </Link>

          <Link to="/products">
            <Package size={16} />
            Products
          </Link>

          <Link to="/cart">
            <ShoppingCart size={16} />
            Cart
          </Link>

          <Link to="/orders">
            <ClipboardList size={16} />
            Orders
          </Link>

        </div>

        {/* ACCOUNT */}

        <div className="footer-column">

          <h3>Account</h3>

          <Link to="/login">
            <LogIn size={16} />
            Login
          </Link>

          <Link to="/register">
            <UserPlus size={16} />
            Register
          </Link>

        </div>

      </div>

      {/* COPYRIGHT */}

      <div className="footer-bottom">

        <p>
          © 2026 Daily Needs. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;