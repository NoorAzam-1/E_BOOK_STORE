import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axios";

// ADD
export const addToCart = createAsyncThunk("cart/add", async (data) => {
  const res = await axiosInstance.addToCart(data);
  console.log("res",res)
  return res.data.data;
});

// GET
export const getCart = createAsyncThunk("cart/get", async () => {
  const res = await axiosInstance.getCart();
  return res.data.data;
});

// UPDATE
export const updateCart = createAsyncThunk("cart/update", async (data) => {
  const res = await axiosInstance.updateCart(data);
  return res.data.data;
});

// REMOVE
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId) => {
    const res = await axiosInstance.removeFromCart(productId);
    return res.data.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: { items: [] },
    loading: false,
    cartCount: 0,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload || { items: [] };
        state.cartCount = action.payload?.items?.length || 0;
      })

      // ADD
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload || { items: [] };
        state.cartCount = action.payload?.items?.length || 0;
      })

      // UPDATE
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = action.payload || { items: [] };
        state.cartCount = action.payload?.items?.length || 0;
      })

      // REMOVE
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload || { items: [] };
        state.cartCount = action.payload?.items?.length || 0;
      });
  },
});

export default cartSlice.reducer;