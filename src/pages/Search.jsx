import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Search as SearchIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";

import "../styles/Search.css";

function Search() {
  const [searchText, setSearchText] = useState("");

  const products = useSelector(
    (state) => state.products.products
  );

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <div className="search-page">

      <div className="search-container">

        <div className="search-header">
          <h1>Search Products</h1>
          <p>
            Find your favourite DailyNeeds products
          </p>
        </div>

        <div className="search-box">

          <SearchIcon size={22} />

          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
            autoFocus
          />

        </div>

        {searchText && (
          <p className="search-result-text">
            {filteredProducts.length} product
            {filteredProducts.length !== 1
              ? "s"
              : ""}{" "}
            found
          </p>
        )}

        {searchText &&
        filteredProducts.length === 0 ? (

          <div className="no-search-results">

            <SearchIcon size={50} />

            <h2>No Products Found</h2>

            <p>
              Try another product name or category.
            </p>

          </div>

        ) : (

          searchText && (
            <div className="search-products-grid">

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>
          )

        )}

      </div>

    </div>
  );
}

export default Search;