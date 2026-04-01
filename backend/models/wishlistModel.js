import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId,ref: "user",required: true,},
    title: { type: String, required: true },
    image: { type: String },
    author: { type: String },
    price: { type: Number },
  },
  { timestamps: true }
);

const wishlistModel = mongoose.model("wishlist", wishlistSchema);
export default wishlistModel;