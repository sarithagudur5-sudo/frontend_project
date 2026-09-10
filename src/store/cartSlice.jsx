import { createSlice } from "@reduxjs/toolkit";

const savedCart =
  JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: savedCart,
  },

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.items.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity =
          (existingProduct.quantity || 1) + 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(state.items)
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (product) => product.id === action.payload
      );

      if (item) {
        item.quantity =
          (item.quantity || 1) + 1;
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(state.items)
      );
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (product) => product.id === action.payload
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (product) =>
              product.id !== action.payload
          );
        }
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(state.items)
      );
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (product) =>
          product.id !== action.payload
      );

      localStorage.setItem(
        "cart",
        JSON.stringify(state.items)
      );
    },

    clearCart: (state) => {
      state.items = [];

      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;