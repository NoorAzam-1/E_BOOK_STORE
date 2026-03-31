import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {  type: String, required: true },
  contactNo: { type: String, required: true},
  feedback: { type: String, required: true },
}, { timestamps: true });

const feedbackModel = mongoose.model("feedback", feedbackSchema);

export default feedbackModel;
