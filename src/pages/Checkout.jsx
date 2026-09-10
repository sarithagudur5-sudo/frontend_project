import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  MapPin,
  Phone,
  User,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import { clearCart } from "../store/cartSlice";
import "../styles/Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items || []
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 1),
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !pincode.trim()
    ) {
      alert("Please fill all delivery details");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      navigate("/products");
      return;
    }

    try {
      const order = {
        userId: user?.id || null,

        customer: {
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          city: city.trim(),
          pincode: pincode.trim(),
        },

        items: cartItems,

        totalAmount: total,

        status: "Pending",

        createdAt: new Date().toISOString(),
      };

      await axios.post(
        "http://localhost:5000/orders",
        order
      );

      dispatch(clearCart());

      alert("Order placed successfully!");

      navigate("/orders");
    } catch (error) {
      console.error(
        "Order placement failed:",
        error
      );

      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        {/* HEADER */}

        <div className="checkout-header">
          <div>
            <h1>Checkout</h1>

            <p>
              Enter your delivery details to place your order.
            </p>
          </div>
        </div>

        {/* MAIN LAYOUT */}

        <div className="checkout-layout">

          {/* LEFT - DELIVERY FORM */}

          <div className="checkout-form-card">

            <div className="checkout-section-title">
              <div className="checkout-title-icon">
                <MapPin size={21} />
              </div>

              <div>
                <h2>Delivery Details</h2>
                <p>Where should we deliver your order?</p>
              </div>
            </div>

            <form onSubmit={handlePlaceOrder}>

              {/* NAME */}

              <div className="checkout-field">

                <label>
                  <User size={15} />
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>

              {/* PHONE */}

              <div className="checkout-field">

                <label>
                  <Phone size={15} />
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                />

              </div>

              {/* ADDRESS */}

              <div className="checkout-field">

                <label>
                  <MapPin size={15} />
                  Delivery Address
                </label>

                <textarea
                  placeholder="House no, street, area"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                />

              </div>

              {/* CITY + PINCODE */}

              <div className="checkout-two-inputs">

                <div className="checkout-field">

                  <label>City</label>

                  <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                  />

                </div>

                <div className="checkout-field">

                  <label>Pincode</label>

                  <input
                    type="text"
                    placeholder="Enter pincode"
                    value={pincode}
                    onChange={(e) =>
                      setPincode(e.target.value)
                    }
                  />

                </div>

              </div>

              {/* PLACE ORDER */}

              <button
                type="submit"
                className="place-order-btn"
              >
                <span>Place Order</span>
                <ArrowRight size={19} />
              </button>

            </form>

          </div>

          {/* RIGHT - ORDER SUMMARY */}

          <div className="checkout-summary">

            <div className="summary-heading">

              <div className="summary-icon">
                <ShoppingBag size={21} />
              </div>

              <div>
                <h2>Order Summary</h2>
                <p>
                  {totalItems} item
                  {totalItems !== 1 ? "s" : ""}
                </p>
              </div>

            </div>

            {cartItems.length === 0 ? (

              <div className="empty-checkout">
                <ShoppingBag size={45} />

                <p>
                  Your cart is empty.
                </p>

                <button
                  onClick={() =>
                    navigate("/products")
                  }
                >
                  Browse Products
                </button>
              </div>

            ) : (

              <>

                <div className="checkout-items">

                  {cartItems.map((item) => {

                    const quantity =
                      Number(item.quantity) || 1;

                    const itemTotal =
                      Number(item.price || 0) *
                      quantity;

                    return (
                      <div
                        className="checkout-item"
                        key={item.id}
                      >

                        <div className="checkout-product">

                          <div className="checkout-product-image">

                            <img
                              src={item.image}
                              alt={item.name}
                            />

                          </div>

                          <div className="checkout-product-info">

                            <strong>
                              {item.name}
                            </strong>

                            <span>
                              ₹
                              {Number(
                                item.price || 0
                              ).toFixed(2)}
                              {" "}×{" "}
                              {quantity}
                            </span>

                          </div>

                        </div>

                        <strong className="checkout-item-price">
                          ₹{itemTotal.toFixed(2)}
                        </strong>

                      </div>
                    );
                  })}

                </div>

                <div className="summary-calculation">

                  <div className="summary-row">
                    <span>Items</span>
                    <span>{totalItems}</span>
                  </div>

                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>
                      ₹{total.toFixed(2)}
                    </span>
                  </div>

                  <div className="summary-row">
                    <span>Delivery</span>
                    <span className="free">
                      FREE
                    </span>
                  </div>

                </div>

                <div className="checkout-total">

                  <span>Total</span>

                  <strong>
                    ₹{total.toFixed(2)}
                  </strong>

                </div>

              </>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;