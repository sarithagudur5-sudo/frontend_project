import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
} from "lucide-react";

import "../styles/AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/orders"
      );

      setOrders(response.data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/orders/${id}`,
        {
          status: status,
        }
      );

      fetchOrders();
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Failed to update order status");
    }
  };

  const getIcon = (status) => {
    if (status === "Delivered") {
      return <CheckCircle size={16} />;
    }

    if (status === "Shipped") {
      return <Truck size={16} />;
    }

    return <Clock size={16} />;
  };

  return (
    <div className="admin-orders-page">

      <div className="admin-orders-container">

        <div className="admin-orders-header">
          <h1>Order Management</h1>

          <p>
            Manage customer orders and delivery status.
          </p>
        </div>

        <div className="admin-orders-card">

          <div className="admin-orders-title">
            <Package size={22} />

            <h2>All Orders</h2>
          </div>

          {orders.length === 0 ? (

            <div className="admin-orders-empty">
              <Package size={45} />

              <h3>No Orders Found</h3>

              <p>
                Customer orders will appear here.
              </p>
            </div>

          ) : (

            <div className="admin-orders-list">

              {orders.map((order) => {

                const status =
                  order.status || "Pending";

                return (
                  <div
                    className="admin-order-card"
                    key={order.id}
                  >

                    <div className="admin-order-main">

                      <div className="admin-order-number">

                        <strong>
                          Order #{order.id}
                        </strong>

                        <span>
                          {order.customer?.name ||
                            order.user?.name ||
                            "Customer"}
                        </span>

                      </div>

                      <div className="admin-order-total">

                        ₹
                        {Number(
                          order.totalAmount ||
                            order.total ||
                            0
                        ).toFixed(2)}

                      </div>

                    </div>

                    <div className="admin-order-controls">

                      <div
                        className={`order-status-badge ${status.toLowerCase()}`}
                      >
                        {getIcon(status)}
                        {status}
                      </div>

                      <select
                        value={status}
                        onChange={(e) =>
                          updateStatus(
                            order.id,
                            e.target.value
                          )
                        }
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                      </select>

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

export default AdminOrders;