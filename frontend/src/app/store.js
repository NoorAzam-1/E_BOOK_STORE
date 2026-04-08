import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import feedbackReducer from "../features/feedbackSlice"
import wishlistReducer from "@/features/wishlistSlice.js"
import orderReducer from "../features/orderSlice";
import cartReducer from "../features/cartSlice.js";
import productReducer from "../features/productSlice.js";
import adminReducer from "../features/adminSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    feedback: feedbackReducer,
    wishlist: wishlistReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    admin: adminReducer,
  },
});