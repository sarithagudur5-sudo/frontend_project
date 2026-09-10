import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Package,
  ShoppingCart,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

import "../styles/Admin.css";

function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsRes = await axios.get(
          "http://localhost:5000/products"
        );

        const ordersRes = await axios.get(
          "http://localhost:5000/orders"
        );

        const usersRes = await axios.get(
          "http://localhost:5000/users"
        );

        setProducts(productsRes.data);
        setOrders(ordersRes.data);
        setUsers(usersRes.data);

      } catch (error) {
        console.error(
          "Admin data loading failed:",
          error
        );
      }
    };

    loadData();
  }, []);

  const pendingOrders = orders.filter(
    (order) =>
      !order.status ||
      order.status.toLowerCase() === "pending"
  );

  return (
    <div className="admin-page">

      <div className="admin-container">

        {/* HEADER */}

        <div className="admin-header">

          <p className="admin-label">
            DAILY NEEDS
          </p>

          <h1>Admin Dashboard</h1>

          <p>
            Manage your Daily Needs store.
          </p>

        </div>

        {/* STATS */}

        <div className="admin-stats">

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <Package size={25} />
            </div>

            <div>
              <span>Total Products</span>
              <strong>{products.length}</strong>
            </div>

          </div>

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <ShoppingCart size={25} />
            </div>

            <div>
              <span>Total Orders</span>
              <strong>{orders.length}</strong>
            </div>

          </div>

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <Users size={25} />
            </div>

            <div>
              <span>Total Users</span>
              <strong>{users.length}</strong>
            </div>

          </div>

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              <Clock size={25} />
            </div>

            <div>
              <span>Orders Pending</span>
              <strong>{pendingOrders.length}</strong>
            </div>

          </div>

        </div>

        {/* ADMIN BUTTONS */}

        <div className="admin-actions">

          <Link
            to="/admin/products"
            className="manage-products-btn"
          >
            <Package size={18} />
            Manage Products
          </Link>

          <Link
            to="/admin/orders"
            className="manage-orders-btn"
          >
            <ShoppingCart size={18} />
            Manage Orders
          </Link>

        </div>

        {/* RECENT ORDERS */}

        <div className="admin-orders">

          <div className="admin-section-header">

            <h2>Recent Orders</h2>

            <p>
              Latest customer orders
            </p>

          </div>

          {orders.length === 0 ? (

            <div className="admin-empty">
              <ShoppingCart size={40} />
              <p>No orders available.</p>
            </div>

          ) : (

            <div className="admin-order-list">

              {orders
                .slice(-5)
                .reverse()
                .map((order) => {

                  const status =
                    order.status || "Pending";

                  const delivered =
                    status.toLowerCase() ===
                    "delivered";

                  return (
                    <div
                      className="admin-order"
                      key={order.id}
                    >

                      <div className="admin-order-icon">
                        <ShoppingCart size={20} />
                      </div>

                      <div className="admin-order-info">

                        <strong>
                          Order #{order.id}
                        </strong>

                        <span>
                          {order.customer?.name ||
                            order.user?.name ||
                            "Customer"}
                        </span>

                      </div>

                      <div className="admin-order-amount">

                        ₹
                        {Number(
                          order.totalAmount ||
                            order.total ||
                            0
                        ).toFixed(2)}

                      </div>

                      <div
                        className={`admin-status ${
                          delivered
                            ? "delivered"
                            : "pending"
                        }`}
                      >

                        {delivered ? (
                          <CheckCircle size={15} />
                        ) : (
                          <Clock size={15} />
                        )}

                        {status}

                      </div>

                    </div>
                  );
                })}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Admin;