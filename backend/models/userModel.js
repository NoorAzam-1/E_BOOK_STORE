import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "user" },
  password: { type: String, required: true }, 
  address:{type: String },
  contact:{type: Number },
  resetToken: { type: String },
  resetTokenExpiry: { type: Number }
});

const userModel = mongoose.model('user', userSchema);
export default userModel;