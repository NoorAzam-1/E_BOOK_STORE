import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "user" },
  password: { type: String, required: true }, 
  
  resetToken: { type: String },
  resetTokenExpiry: { type: Number }
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;