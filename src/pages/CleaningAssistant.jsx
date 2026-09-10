import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Bath,
  Utensils,
  Shirt,
  Home,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";

import { fetchProducts } from "../store/productslice.jsx";
import { addToCart } from "../store/cartSlice.jsx";

import "../styles/CleaningAssistant.css";

function CleaningAssistant() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products = [], loading } = useSelector(
    (state) => state.products
  );

  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const requirements = [
    {
      id: "bathroom",
      title: "Bathroom",
      icon: <Bath size={28} />,
    },
    {
      id: "kitchen",
      title: "Kitchen",
      icon: <Utensils size={28} />,
    },
    {
      id: "laundry",
      title: "Laundry",
      icon: <Shirt size={28} />,
    },
    {
      id: "home",
      title: "Floor / Home",
      icon: <Home size={28} />,
    },
  ];

  const getRecommendations = () => {
    if (!selectedRoom) {
      return [];
    }

    return products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";

      // =========================
      // BATHROOM PRODUCTS
      // =========================
      if (selectedRoom === "bathroom") {
        return (
          name.includes("toilet") ||
          name.includes("hand wash") ||
          name.includes("bath soap") ||
          name.includes("shampoo") ||
          name.includes("toothpaste") ||
          name.includes("toothbrush") ||
          name.includes("facial tissues")
        );
      }

      // =========================
      // KITCHEN PRODUCTS
      // =========================
      if (selectedRoom === "kitchen") {
        return (
          name.includes("dishwashing") ||
          name.includes("kitchen cleaner") ||
          name.includes("cleaning sponge") ||
          name.includes("paper towels") ||
          name.includes("food storage container") ||
          name.includes("water bottle") ||
          name.includes("kitchen storage box")||
          name.includes("premium basmati rice")
        );
      }

      // =========================
      // LAUNDRY PRODUCTS
      // =========================
      if (selectedRoom === "laundry") {
        return (
          name.includes("laundry detergent") ||
          category === "laundry"
        );
      }

      // =========================
      // FLOOR / HOME PRODUCTS
      // =========================
      if (selectedRoom === "home") {
        return (
          name.includes("floor cleaner") ||
          name.includes("floor broom") ||
          name.includes("microfiber mop") ||
          name.includes("dustpan") ||
          name.includes("garbage bags") ||
          name.includes("facial tissues") ||
          name.includes("paper towels")
        );
      }

      return false;
    });
  };

  const recommendedProducts = getRecommendations();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="assistant-page">
      <div className="assistant-container">

        {/* HEADER */}
        <div className="assistant-header">
          <div className="assistant-icon">
            <Sparkles size={30} />
          </div>

          <p>SMART CLEANING</p>

          <h1>Cleaning Assistant</h1>

          <span>
            Tell us what you want to clean and we'll
            recommend suitable products.
          </span>
        </div>

        {/* ROOM SELECTION */}
        <div className="assistant-card">
          <div className="assistant-step">

            <h2>What do you want to clean?</h2>

            <div className="requirement-grid">

              {requirements.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`requirement-option ${
                    selectedRoom === item.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => setSelectedRoom(item.id)}
                >
                  {item.icon}

                  <span>{item.title}</span>
                </button>
              ))}

            </div>

          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="assistant-message">
            Loading recommendations...
          </div>
        )}

        {/* RECOMMENDATIONS */}
        {!loading && selectedRoom && (
          <div className="recommendation-section">

            <div className="recommendation-heading">

              <div>
                <p>OUR SUGGESTION</p>

                <h2>Recommended Products</h2>
              </div>

              <span>
                {recommendedProducts.length}{" "}
                {recommendedProducts.length === 1
                  ? "product"
                  : "products"}
              </span>

            </div>

            {recommendedProducts.length > 0 ? (

              <div className="recommendation-grid">

                {recommendedProducts.map((product) => (
                  <div
                    className="recommendation-card"
                    key={product.id}
                  >

                    {/* PRODUCT IMAGE */}
                    <div className="recommendation-image">

                      <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />

                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="recommendation-content">

                      <span>
                        {product.category}
                      </span>

                      <h3>
                        {product.name}
                      </h3>

                      <div className="recommendation-price">
                        ₹{product.price}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleAddToCart(product)
                        }
                      >
                        <ShoppingCart size={17} />
                        Add to Cart
                      </button>

                    </div>

                  </div>
                ))}

              </div>

            ) : (

              <div className="assistant-message">
                No matching products found.
              </div>

            )}

          </div>
        )}

        {/* BROWSE ALL PRODUCTS */}
        <button
          type="button"
          className="assistant-products-btn"
          onClick={() => navigate("/products")}
        >
          Browse All Products

          <ArrowRight size={18} />
        </button>

      </div>
    </div>
  );
}

export default CleaningAssistant;