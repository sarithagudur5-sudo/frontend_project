import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../store/authSlice.jsx";

import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      await dispatch(
        loginUser({
          email: email.trim(),
          password,
        })
      ).unwrap();

      alert("Login Successful!");

      navigate("/");
    } catch (error) {
      alert(error || "Invalid email or password");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">
          <h1>Welcome Back</h1>

          <p>
            Login to your DailyNeeds account
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="login-form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="login-form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}

            <Link to="/register">
              Register
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
}

export default Login;