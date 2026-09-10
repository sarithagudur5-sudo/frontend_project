import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { fetchProducts } from "../store/productslice.jsx";
import ProductCard from "../components/ProductCard";

import "../styles/Product.css";

function Products() {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const searchText =
    searchParams.get("search") || "";

  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const filteredProducts = products.filter((product) =>
    product.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <div className="products-page">

      <div className="products-container">

        {/* HEADING */}
        <div className="products-heading">
          <p>DAILY NEEDS</p>

          <h1>Products</h1>

          <span>
            Find everything you need for your daily life.
          </span>
        </div>

        {/* SEARCH RESULT */}
        {searchText && (
          <div className="search-result">
            Search results for:
            <strong> "{searchText}"</strong>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="products-message">
            Loading products...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="products-message error">
            {error}
          </div>
        )}

        {/* PRODUCTS */}
        {!loading &&
          !error &&
          filteredProducts.length > 0 && (
            <div className="products-grid">

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>
          )}

        {/* NO PRODUCTS */}
        {!loading &&
          !error &&
          filteredProducts.length === 0 && (
            <div className="products-message">

              <h2>No Products Found</h2>

              <p>
                Try searching with a different product name.
              </p>

            </div>
          )}

      </div>

    </div>
  );
}

export default Products;