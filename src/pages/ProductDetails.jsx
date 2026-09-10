import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }

        return response.json();
      })
      .then((data) => {
        console.log("PRODUCT DETAILS:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert(`${product.name} added to cart`);
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <h2>Loading product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <h2>Product not found</h2>

        <button
          className="back-products-button"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page">

      <button
        className="back-products-button"
        onClick={() => navigate("/products")}
      >
        ← Back to Products
      </button>

      <div className="product-details-card">

        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-details-info">

          <p className="product-details-category">
            {product.category}
          </p>

          <h1 className="product-details-title">
            {product.name}
          </h1>

          <p className="product-details-rating">
            ⭐ {product.rating}
          </p>

          <div className="product-details-price">
            <span>
              ₹{product.price}
            </span>

            <del>
              ₹{product.oldPrice}
            </del>
          </div>

          <p className="product-details-description">
            {product.description}
          </p>

          <p className="product-details-stock">
            In Stock: {product.stock}
          </p>

          <button
            className="details-add-cart-button"
            onClick={addToCart}
          >
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;