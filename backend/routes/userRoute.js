import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  forgotPassword,
  resetPassword,
  userProfile,
  logoutUser,
  getAllUsers,
  deleteUser,
  getSellers,
} from "../controllers/userController.js";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

// AUTH
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin-login", adminLogin);
userRouter.post("/logout", logoutUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password", resetPassword);

// USER
userRouter.get("/profile", userAuth, userProfile);

// ADMIN
userRouter.get("/users", adminAuth, getAllUsers);
userRouter.get("/users/sellers", adminAuth, getSellers);
userRouter.delete("/users/:id", adminAuth, deleteUser);

export default userRouter;
