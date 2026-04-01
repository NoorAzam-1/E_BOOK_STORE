import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?.url?.includes("/logout")) {
      return Promise.reject(error);
    }

    if (error?.response?.status === 401) {
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

axiosInstance.logout = () => axiosInstance.post("/api/user/logout");

axiosInstance.forgotPassword = (email) =>
  axiosInstance.post("/api/user/forgot_password", { email });

axiosInstance.resetPassword = (data) =>
  axiosInstance.post("/api/user/reset_password", data);

axiosInstance.getProfile = () => axiosInstance.get("/api/user/profile");

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
