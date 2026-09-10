import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../store/cartSlice";

import "../styles/Cart.css";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items || []
  );

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <ShoppingBag size={55} />

          <h1>Your Cart is Empty</h1>

          <p>
            Add some products to your cart and come back here.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="continue-shopping-btn"
          >
            Explore Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <div className="cart-container">

        <div className="cart-header">
          <h1>Shopping Cart</h1>

          <p>
            Review your items before checkout.
          </p>
        </div>

        <div className="cart-layout">

          {/* CART ITEMS */}

          <div className="cart-items">

            {cartItems.map((item) => {

              const quantity =
                Number(item.quantity) || 1;

              const itemTotal =
                Number(item.price || 0) * quantity;

              return (
                <div
                  className="cart-item"
                  key={item.id}
                >

                  <div className="cart-product-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  </div>

                  <div className="cart-product-info">

                    <h3>{item.name}</h3>

                    <p>
                      {item.category || "Daily Needs"}
                    </p>

                    <strong>
                      ₹{Number(item.price || 0).toFixed(2)}
                    </strong>

                  </div>

                  <div className="cart-quantity">

                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQuantity(item.id)
                        )
                      }
                    >
                      <Minus size={16} />
                    </button>

                    <span>{quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(
                          increaseQuantity(item.id)
                        )
                      }
                    >
                      <Plus size={16} />
                    </button>

                  </div>

                  <div className="cart-item-total">
                    ₹{itemTotal.toFixed(2)}
                  </div>

                  <button
                    className="remove-cart-btn"
                    onClick={() =>
                      dispatch(
                        removeFromCart(item.id)
                      )
                    }
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              );
            })}

          </div>

          {/* SUMMARY */}

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>

              <span>
                {cartItems.reduce(
                  (sum, item) =>
                    sum +
                    (Number(item.quantity) || 1),
                  0
                )}
              </span>
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

            <div className="summary-total">
              <span>Total</span>

              <strong>
                ₹{total.toFixed(2)}
              </strong>
            </div>

            <button
              className="checkout-btn"
              onClick={() =>
                navigate("/checkout")
              }
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>

            <button
              className="continue-shopping"
              onClick={() =>
                navigate("/products")
              }
            >
              Continue Shopping
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;