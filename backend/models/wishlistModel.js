import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book", 
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("wishlist", wishlistSchema);