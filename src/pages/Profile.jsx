import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, Mail, Shield, LogOut } from "lucide-react";

import { logout } from "../store/authSlice.jsx";

import "../styles/Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    alert("Logged out successfully");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <h1>Please Login</h1>
          <p>You need to login to view your profile.</p>

          <button
            onClick={() => navigate("/login")}
            className="profile-login-btn"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          <User size={45} />
        </div>

        <h1>{user.name}</h1>

        <p className="profile-role">
          {user.role === "admin"
            ? "Administrator"
            : "DailyNeeds Customer"}
        </p>

        <div className="profile-details">

          <div className="profile-row">
            <User size={20} />
            <div>
              <span>Name</span>
              <strong>{user.name}</strong>
            </div>
          </div>

          <div className="profile-row">
            <Mail size={20} />
            <div>
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>
          </div>

          <div className="profile-row">
            <Shield size={20} />
            <div>
              <span>Account Type</span>
              <strong>
                {user.role || "user"}
              </strong>
            </div>
          </div>

        </div>

        <button
          className="logout-profile-btn"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;