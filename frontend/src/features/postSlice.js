import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axios";

// 🔥 API call using Redux thunk
export const fetchPost = createAsyncThunk(
  "post/fetchPost",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/post");
      return response.data.data; // backend se data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
