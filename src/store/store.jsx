import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./productslice.jsx";
import cartReducer from "./cartSlice.jsx";
import authReducer from "./authSlice.jsx";
import wishlistReducer from "./wishlistSlice.jsx";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
});

export default store;