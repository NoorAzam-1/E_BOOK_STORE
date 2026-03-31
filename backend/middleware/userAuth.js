import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
  try {
    console.log("Checking user authentication...",req.headers.authorization);
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token from header", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, please login",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password -__v");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token, please login again",
    });
  }
};

export default userAuth;