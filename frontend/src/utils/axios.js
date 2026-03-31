import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// ✅ REQUEST INTERCEPTOR (Role-Based Token)
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const activeRole = localStorage.getItem("active_role");
      let token = null;

      if (activeRole === "admin" || activeRole === "superadmin") {
        token = localStorage.getItem("admin_token");
      } else if (activeRole === "user") {
        token = localStorage.getItem("user_token");
      } else if (activeRole === "seller") {
        token = localStorage.getItem("seller_token");
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      // ✅ LAZY IMPORT: Only import store when a 401 actually happens
      // This breaks the circular dependency loop!
      const store = (await import("@/app/store.js")).default;
      const { logoutUser } = await import("@/features/authSlice.js");

      store.dispatch(logoutUser());

      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

// ✅ API METHODS
axiosInstance.register = (data) =>
  axiosInstance.post("/api/user/register", data);
axiosInstance.login = (data) => axiosInstance.post("/api/user/login", data);
axiosInstance.getProfile = () => axiosInstance.get("/api/user/profile");
axiosInstance.forgotPassword = (email) =>
  axiosInstance.post("/api/user/forgot_password", { email });
axiosInstance.resetPassword = (data) =>
  axiosInstance.post("/api/user/reset_password", data); // Removed console.log

// ✅ FEEDBACK APIs
axiosInstance.addFeedback = (data) =>
  axiosInstance.post("/api/feedback/add", data);
axiosInstance.getAllFeedback = () => axiosInstance.get("/api/feedback/all");
axiosInstance.getSingleFeedback = (id) =>
  axiosInstance.get(`/api/feedback/${id}`);
axiosInstance.updateFeedback = (id, data) =>
  axiosInstance.put(`/api/feedback/update/${id}`, data);
axiosInstance.deleteFeedback = (id) =>
  axiosInstance.delete(`/api/feedback/delete/${id}`);
export default axiosInstance;
