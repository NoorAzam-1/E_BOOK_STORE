import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?.url?.includes("/logout")) {
      return Promise.reject(error);
    }

    if (error?.response?.status === 401) {
      store.dispatch(logoutUserAsync());
    }

    return Promise.reject(error);
  },
);

// AUTH
axiosInstance.register = (data) =>
  axiosInstance.post("/api/user/register", data);

axiosInstance.login = (data) => axiosInstance.post("/api/user/login", data);

axiosInstance.logout = () => axiosInstance.post("/api/user/logout");

axiosInstance.forgotPassword = (email) =>
  axiosInstance.post("/api/user/forgot-password", { email });

axiosInstance.resetPassword = (data) =>
  axiosInstance.post("/api/user/reset-password", data);

axiosInstance.getProfile = () => axiosInstance.get("/api/user/profile");

axiosInstance.adminLogin = (data) =>
  axiosInstance.post("/api/user/admin-login", data);

// ADMIN USERS
axiosInstance.getAllUsers = () => axiosInstance.get("/api/user/users");

axiosInstance.deleteUser = (id) =>
  axiosInstance.delete(`/api/user/users/${id}`);

axiosInstance.getSellers = () => axiosInstance.get("/api/user/users/sellers");

//feedback
axiosInstance.addFeedback = (data) =>
  axiosInstance.post("/api/feedback/add", data);

axiosInstance.getAllFeedback = () => axiosInstance.get("/api/feedback/all");

axiosInstance.getSingleFeedback = (id) =>
  axiosInstance.get(`/api/feedback/${id}`);

axiosInstance.updateFeedback = (id, data) =>
  axiosInstance.put(`/api/feedback/update/${id}`, data);

axiosInstance.deleteFeedback = (id) =>
  axiosInstance.delete(`/api/feedback/delete/${id}`);

//  PRODUCT APIs
axiosInstance.getAllProducts = () => axiosInstance.get("/api/product/list");

axiosInstance.getSingleProduct = (id) =>
  axiosInstance.get(`/api/product/${id}`);

axiosInstance.addProduct = (data) =>
  axiosInstance.post("/api/product/add", data);

axiosInstance.updateProduct = (id, data) =>
  axiosInstance.put(`/api/product/update/${id}`, data);

axiosInstance.deleteProduct = (id) =>
  axiosInstance.delete(`/api/product/delete/${id}`);

// WISHLIST APIs
axiosInstance.addWishlist = (data) =>
  axiosInstance.post("/api/wishlist/add", data);

axiosInstance.getWishlist = () => axiosInstance.get("/api/wishlist/all");

axiosInstance.getSingleWishlist = (id) =>
  axiosInstance.get(`/api/wishlist/${id}`);

axiosInstance.deleteWishlist = (id) =>
  axiosInstance.delete(`/api/wishlist/delete/${id}`);

//  CART APIs
axiosInstance.addToCart = (data) => axiosInstance.post("/api/cart/add", data);

axiosInstance.getCart = () => axiosInstance.get("/api/cart");

axiosInstance.updateCart = (data) =>
  axiosInstance.put("/api/cart/update", data);

axiosInstance.removeFromCart = (productId) =>
  axiosInstance.delete(`/api/cart/remove/${productId}`);

// ORDER APIs
axiosInstance.placeOrder = (data) =>
  axiosInstance.post("/api/order/place", data);

axiosInstance.getMyOrders = () => axiosInstance.get("/api/order/my");

axiosInstance.getSingleOrder = (id) => axiosInstance.get(`/api/order/${id}`);

axiosInstance.updateOrderStatus = (id, data) =>
  axiosInstance.put(`/api/order/update/${id}`, data);

axiosInstance.deleteOrder = (id) =>
  axiosInstance.delete(`/api/order/delete/${id}`);
