import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "user",required: true,},
    items: [
      { productId: String,title: String,price: Number,quantity: Number, },
    ],
    totalAmount: Number,
    address: String,
    paymentMethod: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;

