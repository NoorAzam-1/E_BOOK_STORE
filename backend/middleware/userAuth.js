import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
  try {

    const token = req.headers.authorization?.split(" ")[1];
    console.log("🔹 Extracted token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, please login",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // fetch user from DB
    const user = await userModel.findById(decoded.id).select("password");
    console.log("🔹 Fetched user from DB:", user);

    if (!user) {
      console.log("❌ User not found in database");
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // attach full user
    req.user = user;
    // console.log("✅ User attached to request:", req.user);

    next();
  } catch (error) {
    console.error("🔥 Auth middleware error:", error.message);
    console.error(error.stack);

    res.status(401).json({
      success: false,
      message: "Invalid token, please login again",
    });
  }
};

export default userAuth;