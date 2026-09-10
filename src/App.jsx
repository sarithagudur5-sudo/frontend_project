import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

import Admin from "./pages/Admin";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";

import Wishlist from "./pages/Wishlist.jsx";
import CleaningAssistant from "./pages/CleaningAssistant.jsx";

function App() {
  const user = useSelector((state) => state.auth?.user);

  return (
    <>
      {/* Navbar only after login */}
      {user && <Navbar />}

      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================= */}

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <Login />
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            user ? <Navigate to="/" replace /> : <Register />
          }
        />


        {/* =========================
            PROTECTED ROUTES
        ========================= */}

        {/* HOME */}
        <Route
          path="/"
          element={
            user ? <Home /> : <Navigate to="/login" replace />
          }
        />

        {/* PRODUCTS */}
        <Route
          path="/products"
          element={
            user ? (
              <Products />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/products/:id"
          element={
            user ? (
              <ProductDetails />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            user ? (
              <Cart />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={
            user ? (
              <Checkout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ORDERS */}
        <Route
          path="/orders"
          element={
            user ? (
              <Orders />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* SEARCH */}
        <Route
          path="/search"
          element={
            user ? (
              <Search />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={
            user ? (
              <Profile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* WISHLIST */}
        <Route
          path="/wishlist"
          element={
            user ? (
              <Wishlist />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* CLEANING ASSISTANT */}
        <Route
          path="/cleaning-assistant"
          element={
            user ? (
              <CleaningAssistant />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />


        {/* =========================
            ADMIN ROUTES
        ========================= */}

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            user ? (
              <Admin />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ADMIN PRODUCTS */}
        <Route
          path="/admin/products"
          element={
            user ? (
              <AdminProducts />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ADMIN ORDERS */}
        <Route
          path="/admin/orders"
          element={
            user ? (
              <AdminOrders />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />


        {/* =========================
            404
        ========================= */}

        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h1>404</h1>
              <p>Page not found</p>
            </div>
          }
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;