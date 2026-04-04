import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "@/utils/axios";

//  GET ALL PRODUCTS
export const getAllProducts = createAsyncThunk(
  "product/list",
  async () => {
    const res = await axiosInstance.getAllProducts();
    return res.data.products;
  }
);

//  GET SINGLE PRODUCT
export const getSingleProduct = createAsyncThunk(
  "product/getOne",
  async (id) => {
    const res = await axiosInstance.getSingleProduct(id);
    return res.data.data;
  }
);

//  ADD PRODUCT (admin)
export const addProduct = createAsyncThunk(
  "product/add",
  async (data) => {
    const res = await axiosInstance.addProduct(data);
    return res.data;
  }
);

//  UPDATE PRODUCT
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, data }) => {
    const res = await axiosInstance.updateProduct(id, data);
    return res.data.data;
  }
);

//  DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id) => {
    await axiosInstance.deleteProduct(id);
    return id;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    singleProduct: null,
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      //  GET ALL
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      //  GET SINGLE
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })

      //  ADD
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload.data);
      })

      //  UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;
