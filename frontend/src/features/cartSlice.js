import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axios";

// ✅ ADD TO CART
export const addToCart = createAsyncThunk("cart/add", async (data) => {
  const res = await axiosInstance.addToCart(data);
  console.log("res ", res);
  return res.data;
});

// ✅ GET CART
export const getCart = createAsyncThunk("cart/get", async () => {
  const res = await axiosInstance.getCart();
  return res.data.data;
});

// ✅ UPDATE CART
export const updateCart = createAsyncThunk("cart/update", async (data) => {
  const res = await axiosInstance.updateCart(data);
  return res.data.data;
});

// ✅ REMOVE ITEM
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId) => {
    await axiosInstance.removeFromCart(productId);
    return productId;
  },
);

// ✅ CLEAR CART
export const clearCart = createAsyncThunk("cart/clear", async () => {
  await axiosInstance.clearCart();
  return true;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    cartCount: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ✅ GET CART
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        // console.log("getCart action.payload",action.payload.items.length)
        state.cartCount= action.payload.items.length
      })

      // ✅ ADD
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload.data;
      })

      // ✅ UPDATE
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      // ✅ REMOVE
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.items = state.cart.items.filter(
            (item) => item.productId !== action.payload,
          );
        }
      })

      // ✅ CLEAR
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = null;
      });
  },
});

export default cartSlice.reducer;
