import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const savedUser =
  JSON.parse(localStorage.getItem("currentUser")) || null;

/* =========================
   LOGIN API
========================= */

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users?email=${encodeURIComponent(email)}`
      );

      const users = response.data;

      if (users.length === 0) {
        return rejectWithValue("Invalid email or password");
      }

      const user = users.find(
        (item) => item.password === password
      );

      if (!user) {
        return rejectWithValue("Invalid email or password");
      }

      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      return user;
    } catch (error) {
      return rejectWithValue(
        "Server error. Please start json-server."
      );
    }
  }
);

/* =========================
   AUTH SLICE
========================= */

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: savedUser,
    isLoggedIn: !!savedUser,
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;

      localStorage.removeItem("currentUser");
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isLoggedIn = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;