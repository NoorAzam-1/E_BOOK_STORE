import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance}  from "@/utils/axios";

// PLACE ORDER
export const placeOrder = createAsyncThunk(
  "order/place",
  async (data) => {
    const res = await axiosInstance.placeOrder(data);
    return res.data;
  }
);

// GET MY ORDERS
export const getMyOrders = createAsyncThunk(
  "order/getAll",
  async () => {
    const res = await axiosInstance.getMyOrders();
    return res.data.data;
  }
);

// GET SINGLE ORDER
export const getSingleOrder = createAsyncThunk(
  "order/getOne",
  async (id) => {
    const res = await axiosInstance.getSingleOrder(id);
    return res.data.data;
  }
);

// DELETE ORDER
export const deleteOrder = createAsyncThunk(
  "order/delete",
  async (id) => {
    await axiosInstance.deleteOrder(id);
    return id;
  }
);

// UPDATE ORDER (admin use)
export const updateOrderStatus = createAsyncThunk(
  "order/update",
  async ({ id, data }) => {
    const res = await axiosInstance.updateOrderStatus(id, data);
    return res.data.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    singleOrder: null,
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      //  GET ALL
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      //  GET SINGLE
      .addCase(getSingleOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload;
      })

      // PLACE ORDER
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload.data);
      })

      // DELETE
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (item) => item._id !== action.payload
        );
      })

      //  UPDATE
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      });
  },
});

export default orderSlice.reducer;
