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
      const responseData = res.data;
      const role = responseData?.data?.role;
      console.log("Login role:", role);
      const token = responseData?.accessToken;
      console.log("Login token:", token);

      // ✅ STORE TOKEN BASED ON ROLE
      if (role === "admin" || role === "superadmin") {
        localStorage.setItem("admin_token", token);
      } else if (role === "user") {
        localStorage.setItem("user_token", token);
      } else if (role === "seller") {
        localStorage.setItem("seller_token", token);
      }

      localStorage.setItem("active_role", role);

      return responseData;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  },
);

//profile
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

// forgotPassword
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

//reset profile
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;

      // Add this so it cleans up everything:
      if (typeof window !== "undefined") {
        localStorage.removeItem("user_token");
        localStorage.removeItem("admin_token");
        localStorage.removeItem("active_role");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
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

      // PROFILE
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
