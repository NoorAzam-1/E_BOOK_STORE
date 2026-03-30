import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, please login",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ FIX 1: Changed .select("password") to .select("-password")
    // "-" means EXCLUDE. Without "-", you were fetching ONLY the password.
    const user = await userModel.findById(decoded.id).select("-password -__v");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Attach full user (minus password)
    req.user = user;
    
    next();
  } catch (error) {
    // ✅ FIX 2: Removed token logging for security
    res.status(401).json({
      success: false,
      message: "Invalid token, please login again",
    });
  }
};

export default userAuth;