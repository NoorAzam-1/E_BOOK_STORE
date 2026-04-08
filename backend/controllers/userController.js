// import userModel from "../models/userModel.js";
// import crypto from "crypto";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import validator from "validator";
// import { sendEmail } from "../utils/emailSender.js";

// //Forgot password request
// const forgotPassword = async (req, res) => {
//   try {
//     const email = req.body.email?.toLowerCase();

//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Email not found",
//       });
//     }

//     const resetToken = crypto.randomBytes(20).toString("hex");
//     const resetTokenExpiry = Date.now() + 15 * 60 * 1000;

//     user.resetToken = resetToken;
//     user.resetTokenExpiry = resetTokenExpiry;
//     await user.save();

//     // ✅ FIXED LINK
//     const resetLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${resetToken}`;

//     const message = `
//       <h2>Password Reset Request</h2>
//       <p>Hello ${user.name},</p>
//       <p>Click below to reset your password:</p>
//       <a href="${resetLink}">Reset Password</a>
//       <p>Valid for 15 minutes</p>
//     `;

//     await sendEmail(user.email, "Reset Password", message);

//     res.json({
//       success: true,
//       message: "Reset link sent to email",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// //Reset password route
// const resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;

//     // Find user by token and check expiry
//     const user = await userModel.findOne({
//       resetToken: token,
//       resetTokenExpiry: { $gt: Date.now() },
//     });

//     if (!user) {
//       return res.json({ success: false, message: "Invalid or expired token" });
//     }

//     // Hash the new password
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     // Clear token fields
//     user.resetToken = undefined;
//     user.resetTokenExpiry = undefined;

//     await user.save();

//     res.json({
//       success: true,
//       message: "Password has been reset successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Route for user login
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const normalisedMail = email.toLowerCase();

//     const findUser = await userModel.findOne({ email: normalisedMail });

//     if (!findUser) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is Incorrect!",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, findUser.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Password is Incorrect!",
//       });
//     }

//     const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     const options = {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       path: "/",
//       expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     };
//     const user = await userModel
//       .findById(findUser._id)
//       .select("-password -__v");

//     res.status(200).cookie("token", token, options).json({
//       success: true,
//       message: "Login Successfully!",
//       accessToken: token,
//       tokenType: "Bearer",
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// //Route for user register
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role, address, contact } = req.body;

//     // checking user already exists or not
//     const exists = await userModel.findOne({ email });

//     if (exists) {
//       return res.json({ success: false, message: "User already exists" });
//     }

//     if (!validator.isEmail(email)) {
//       return res.json({
//         success: false,
//         message: "Please enter a valid email",
//       });
//     }
//     if (password.length < 8) {
//       return res.json({
//         success: false,
//         message: "Please enter a strong password",
//       });
//     }

//     //hashing user password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newuser = new userModel({
//       name,
//       email: email.toLowerCase(),
//       password: hashedPassword,
//       role: role || "user",
//       address: address || "",
//       contact: contact || "",
//     });

//     const user = await newuser.save();
//     res.json({
//       success: true,
//       message: "User registered successfully",
//       user,
//     });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// //admin login
// const adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await userModel.findOne({ email });

//   if (!user || user.role !== "admin") {
//     return res.json({ success: false, message: "Not admin" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);

//   if (!isMatch) {
//     return res.json({ success: false });
//   }

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//   res
//     .cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//     })
//     .json({
//       success: true,
//       user,
//     });
// };

// // All User
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await userModel.find().select("-password");
//     res.json({ success: true, users });
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };

// // Delete user
// const deleteUser = async (req, res) => {
//   const user = await userModel.findById(req.params.id);

//   if (!user) {
//     return res.json({ message: "User not found" });
//   }

//   if (user.role === "admin") {
//     return res.json({ message: "Cannot delete admin" });
//   }

//   await userModel.findByIdAndDelete(req.params.id); // 🔥 MISSING LINE

//   res.json({ success: true });
// };

// // Sellers
// const getSellers = async (req, res) => {
//   try {
//     const sellers = await userModel.find({ role: "seller" });
//     res.json({ success: true, sellers });
//   } catch (error) {
//     res.status(500).json({ success: false });
//   }
// };

// const userProfile = async (req, res) => {
//   try {
//     const findUser = await userModel
//       .findById(req.user.id)
//       .select("-password -__v");
//     if (!findUser) {
//       return res.status(404).json({
//         success: false,
//       });
//     }
//     res.status(200).json({
//       success: true,
//       user: findUser,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// const logoutUser = async (req, res) => {
//   try {
//     res.cookie("token", "", {
//       httpOnly: true,
//       expires: new Date(0),
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//     });

//     res.status(200).json({
//       success: true,
//       message: "Logged out successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Logout failed",
//     });
//   }
// };

// export {
//   loginUser,
//   registerUser,
//   adminLogin,
//   forgotPassword,
//   resetPassword,
//   userProfile,
//   logoutUser,
//   getAllUsers,
//   deleteUser,
//   getSellers,
// };




import userModel from "../models/userModel.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { sendEmail } from "../utils/emailSender.js";


// ================= FORGOT PASSWORD =================
const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase();

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not found",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset-password?token=${resetToken}`;

    const message = `
      <h2>Password Reset Request</h2>
      <p>Hello ${user.name},</p>
      <a href="${resetLink}">Reset Password</a>
    `;

    await sendEmail(user.email, "Reset Password", message);

    res.json({
      success: true,
      message: "Reset link sent",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ================= RESET PASSWORD =================
const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await userModel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ================= LOGIN =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel
      .findOne({ email: email.toLowerCase() })
      .select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    const { password: _, ...safeUser } = user.toObject();

    res
      .cookie("token", token, options)
      .cookie("role", user.role, options) 
      .json({
        success: true,
        user: safeUser,
      });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= REGISTER =================
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, address, contact } = req.body;

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password too short",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "user",
      address: address || "",
      contact: contact || "",
    });

    res.json({
      success: true,
      message: "Registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ================= ADMIN LOGIN =================
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user || user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: "Not admin",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ================= GET ALL USERS =================
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};


// ================= DELETE USER =================
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ message: "Cannot delete admin" });
    }

    await userModel.findByIdAndDelete(req.params.id);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};


// ================= GET SELLERS =================
const getSellers = async (req, res) => {
  try {
    const sellers = await userModel.find({ role: "seller" });
    res.json({ success: true, sellers });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};


// ================= PROFILE =================
const userProfile = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password -__v");

    if (!user) {
      return res.status(404).json({ success: false });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};


// ================= LOGOUT =================
const logoutUser = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };

    res.clearCookie("token", options);
    res.clearCookie("role", options);

    res.json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export {
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
};
