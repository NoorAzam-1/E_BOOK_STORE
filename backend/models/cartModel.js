import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    title: String,
    image: String,
    price: Number,
    quantity: { type: Number, default: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;