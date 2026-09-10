import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Trash2,
  Plus,
  Pencil,
  X,
  Save,
} from "lucide-react";

import "../styles/AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  // ADD FORM
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");

  // EDIT
  const [editingId, setEditingId] = useState(null);

  // ================= FETCH PRODUCTS =================

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/products"
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= CLEAR FORM =================

  const clearForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setOldPrice("");
    setRating("");
    setImage("");
    setEditingId(null);
  };

  // ================= ADD PRODUCT =================

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!name || !category || !price || !image) {
      alert("Please fill Product Name, Category, Price and Image URL");
      return;
    }

    try {
      const newProduct = {
        name: name,
        category: category,
        price: Number(price),
        oldPrice: Number(oldPrice || price),
        rating: Number(rating || 4),
        image: image,
      };

      await axios.post(
        "http://localhost:5000/products",
        newProduct
      );

      alert("Product added successfully!");

      clearForm();
      fetchProducts();

    } catch (error) {
      console.error("Add product error:", error);
      alert("Failed to add product");
    }
  };

  // ================= START EDIT =================

  const handleEdit = (product) => {
    setEditingId(product.id);

    setName(product.name || "");
    setCategory(product.category || "");
    setPrice(product.price || "");
    setOldPrice(product.oldPrice || "");
    setRating(product.rating || "");
    setImage(product.image || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ================= UPDATE PRODUCT =================

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (!name || !category || !price || !image) {
      alert("Please fill Product Name, Category, Price and Image URL");
      return;
    }

    try {
      const updatedProduct = {
        name: name,
        category: category,
        price: Number(price),
        oldPrice: Number(oldPrice || price),
        rating: Number(rating || 4),
        image: image,
      };

      await axios.put(
        `http://localhost:5000/products/${editingId}`,
        updatedProduct
      );

      alert("Product updated successfully!");

      clearForm();
      fetchProducts();

    } catch (error) {
      console.error("Update product error:", error);
      alert("Failed to update product");
    }
  };

  // ================= DELETE PRODUCT =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/products/${id}`
      );

      alert("Product deleted successfully!");

      fetchProducts();

    } catch (error) {
      console.error("Delete product error:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="admin-products-page">

      <div className="admin-products-container">

        {/* ================= HEADER ================= */}

        <div className="admin-products-header">

          <h1>Product Management</h1>

          <p>
            Add and manage DailyNeeds products
          </p>

        </div>

        {/* ================= ADD / EDIT FORM ================= */}

        <div className="add-product-card">

          <h2>

            {editingId ? (
              <>
                <Pencil size={20} />
                Edit Product
              </>
            ) : (
              <>
                <Plus size={20} />
                Add New Product
              </>
            )}

          </h2>

          <form
            onSubmit={
              editingId
                ? handleUpdateProduct
                : handleAddProduct
            }
          >

            <div className="form-grid">

              {/* NAME */}

              <input
                type="text"
                placeholder="Product name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              {/* CATEGORY */}

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              />

              {/* PRICE */}

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
              />

              {/* OLD PRICE */}

              <input
                type="number"
                placeholder="Old Price"
                value={oldPrice}
                onChange={(e) =>
                  setOldPrice(e.target.value)
                }
              />

              {/* RATING */}

              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Rating"
                value={rating}
                onChange={(e) =>
                  setRating(e.target.value)
                }
              />

              {/* IMAGE */}

              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) =>
                  setImage(e.target.value)
                }
              />

            </div>

            {/* BUTTONS */}

            <div className="product-form-buttons">

              <button
                type="submit"
                className="add-product-btn"
              >

                {editingId ? (
                  <>
                    <Save size={18} />
                    Update Product
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Add Product
                  </>
                )}

              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-edit-btn"
                  onClick={clearForm}
                >
                  <X size={18} />
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

        {/* ================= ALL PRODUCTS ================= */}

        <div className="manage-products">

          <h2>All Products</h2>

          <div className="admin-product-list">

            {products.length === 0 ? (

              <div className="no-products">
                No products found.
              </div>

            ) : (

              products.map((product) => (

                <div
                  className="admin-product-item"
                  key={product.id}
                >

                  {/* IMAGE */}

                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />

                  {/* INFO */}

                  <div className="admin-product-info">

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      {product.category}
                    </p>

                    <strong>
                      ₹{product.price}
                    </strong>

                  </div>

                  {/* ACTIONS */}

                  <div className="admin-product-actions">

                    <button
                      type="button"
                      className="edit-product-btn"
                      onClick={() =>
                        handleEdit(product)
                      }
                    >
                      <Pencil size={17} />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-product-btn"
                      onClick={() =>
                        handleDelete(product.id)
                      }
                    >
                      <Trash2 size={17} />
                      Delete
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminProducts;