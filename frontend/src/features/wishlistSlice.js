import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../utils/axios.js";

// ADD
export const addWishlist = createAsyncThunk("wishlist/add", async (data) => {
  const res = await axiosInstance.addWishlist(data);
  return res.data;
});

// GET ALL
export const getWishlist = createAsyncThunk("wishlist/getAll", async () => {
  const res = await axiosInstance.getWishlist();
  return res.data.data;
});

// GET SINGLE
export const getSingleWishlist = createAsyncThunk(
  "wishlist/getOne",
  async (id) => {
    const res = await axiosInstance.getSingleWishlist(id);
    return res.data.data;
  },
);

// DELETE
export const deleteWishlist = createAsyncThunk(
  "wishlist/delete",
  async (id) => {
    await axiosInstance.deleteWishlist(id);
    return id;
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    singleWishlist: null, // 👈 important
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET ALL
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })

      // GET SINGLE
      .addCase(getSingleWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.singleWishlist = action.payload;
      })

      // ADD
      .addCase(addWishlist.fulfilled, (state, action) => {
        if (!state.wishlist) {
          state.wishlist = [];
        }

        if (action.payload?.data) {
          state.wishlist.unshift(action.payload.data);
        }
      })

      //  DELETE
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== action.payload,
        );
      });
  },
});

export default wishlistSlice.reducer;
