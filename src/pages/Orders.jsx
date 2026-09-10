import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
} from "lucide-react";

import "../styles/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector(
    (state) => state.auth.user
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/orders"
        );

        let data = response.data;

        if (user?.id) {
          data = data.filter(
            (order) =>
              String(order.userId) ===
              String(user.id)
          );
        }

        setOrders(data.reverse());
      } catch (error) {
        console.error(
          "Failed to load orders:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusIcon = (status) => {
    if (status === "Delivered") {
      return <CheckCircle size={17} />;
    }

    if (status === "Shipped") {
      return <Truck size={17} />;
    }

    return <Clock size={17} />;
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">
          Loading your orders...
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">

      <div className="orders-container">

        <div className="orders-header">
          <h1>My Orders</h1>

          <p>
            Track your recent purchases and delivery status.
          </p>
        </div>

        {orders.length === 0 ? (

          <div className="orders-empty">

            <Package size={55} />

            <h2>No Orders Yet</h2>

            <p>
              Your placed orders will appear here.
            </p>

          </div>

        ) : (

          <div className="orders-list">

            {orders.map((order) => {

              const status =
                order.status || "Pending";

              return (
                <div
                  className="customer-order-card"
                  key={order.id}
                >

                  <div className="customer-order-top">

                    <div>
                      <h3>
                        Order #{order.id}
                      </h3>

                      <span>
                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleDateString()
                          : "Recent Order"}
                      </span>
                    </div>

                    <div
                      className={`customer-order-status ${status.toLowerCase()}`}
                    >
                      {getStatusIcon(status)}
                      {status}
                    </div>

                  </div>

                  <div className="customer-order-items">

                    {order.items?.map(
                      (item, index) => (
                        <div
                          className="customer-order-item"
                          key={
                            item.id ||
                            `${order.id}-${index}`
                          }
                        >

                          <div>
                            <strong>
                              {item.name}
                            </strong>

                            <span>
                              Qty:{" "}
                              {item.quantity || 1}
                            </span>
                          </div>

                          <strong>
                            ₹
                            {(
                              Number(
                                item.price || 0
                              ) *
                              Number(
                                item.quantity || 1
                              )
                            ).toFixed(2)}
                          </strong>

                        </div>
                      )
                    )}

                  </div>

                  <div className="customer-order-bottom">

                    <span>
                      Total Amount
                    </span>

                    <strong>
                      ₹
                      {Number(
                        order.totalAmount ||
                          order.total ||
                          0
                      ).toFixed(2)}
                    </strong>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>

    </div>
  );
}

export default Orders;