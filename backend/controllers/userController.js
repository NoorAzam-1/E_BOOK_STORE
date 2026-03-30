import userModel from "../models/userModel.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { sendEmail } from "../utils/emailSender.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Forgot password request
const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Email not found" });
    }

    // create reset token (expires in 15 mins)
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Create the reset link
    // const resetLink = `${process.env.FRONTEND_URL}/reset_password?token=${resetToken}`;
       const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Send email using Nodemailer
    const message = `
      <h2>Password Reset Request</h2>
      <p>Hello ${user.name},</p>
      <p>You requested to reset your password. Click the link below to reset it (valid for 15 minutes):</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you did not request this, ignore this email.</p>
    `;

    await sendEmail(user.email, "Password Reset - Ebook Store", message);

    res.json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("FORGOT PASSWORD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Reset password route

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    console.log(req.body);

    // Find user by token and check expiry
    const user = await userModel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({ success: false, message: "Invalid or expired token" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    // Clear token fields
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

// Route for user login
const loginUser = async (req, res) => {
  console.log("loginUser running")
  try {
    const { email, password } = req.body;

    const normalisedMail = email.toLowerCase();

    const findUser = await userModel.findOne({ email: normalisedMail });

    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "Email is Incorrect!",
      });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password is Incorrect!",
      });
    }

    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };
    const user = await userModel
      .findById(findUser._id)
      .select("-password -__v");

    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Login Successfully!",
      accessToken: token,
      tokenType: "Bearer",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, address, contact } = req.body;
    console.log("req.body", req.body);

    // checking user already exists or not
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //validating email format & strong password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = new userModel({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      address: address || "", // optional
      contact: contact || "", // optional
    });
    // console.log("newuser",newuser)

    const user = await newuser.save();
    res.json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userProfile = async (req, res) => {
  console.log("req.user", req.user);

  const { _id } = req.user;

  if (!_id) {
    return res.status(400).json({
      message: "error user No id",
    });
  }

  try {
    const findUser = await userModel.findById(_id).select("-password -__v");

    console.log("findUser", findUser);

    res.status(200).json({
      success: true,
      user: findUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  forgotPassword,
  resetPassword,
  userProfile,
};
