export  const backend_url = ""
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// ✅ REGISTER
axiosInstance.register = (data) => {
  return axiosInstance.post("/api/user/register", data);
};

// ✅ LOGIN
axiosInstance.login = (data) => {
  return axiosInstance.post("/api/user/login", data);
};

// ✅ PROFILE
axiosInstance.getProfile = () => {
  return axiosInstance.get("/api/user/profile");
};

// ✅ FORGOT PASSWORD
axiosInstance.forgotPassword = (email) => {
  
  return axiosInstance.post("/api/user/forgot_password", { email });
};

// ✅ RESET PASSWORD
axiosInstance.resetPassword = (data) => {
  console.log("resetPassword",data)
  return axiosInstance.post("/api/user/reset_password", data);
};

export default axiosInstance;