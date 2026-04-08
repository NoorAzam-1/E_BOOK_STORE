import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    address: {
      type: String,
      default: "",
    },

    contact: {
      type: String,
      default: "",
    },

    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true } 
);

const userModel = mongoose.model("user", userSchema);

export default userModel;