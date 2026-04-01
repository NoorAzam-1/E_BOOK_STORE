import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios.js";
import toast from "react-hot-toast";

// 🔐 REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.register(data);

      if (!res.data.success) {
        toast.error(res.data.message);
        return rejectWithValue(res.data.message);
      }

      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Registration failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

// 🔐 LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.login(data);

      if (!res.data.success) {
        return rejectWithValue(res.data.message);
      }

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  },
);

// 👤 PROFILE
export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.getProfile();
      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  },
);

// 🔐 FORGOT PASSWORD
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.forgotPassword(email);

      if (!res.data.success) {
        toast.error(res.data.message);
        return rejectWithValue(res.data.message);
      }

      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to send reset link";

      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

// 🔐 RESET PASSWORD
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.resetPassword({
        token,
        newPassword,
      });

      if (!res.data.success) {
        toast.error(res.data.message);
        return rejectWithValue(res.data.message);
      }

      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Reset Password Failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const logoutUserAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.logout(); // 🔥 cookie delete
      return true;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUserAsync.rejected, (state) => {
        state.loading = false;
      })

      // PROFILE
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
