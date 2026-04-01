import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";

// ✅ PLACE ORDER
const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address, paymentMethod } = req.body;

    const cart = await cartModel.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new orderModel({
      userId,
      items: cart.items,
      totalAmount,
      address,
      paymentMethod,
    });

    await order.save();

    // clear cart
    cart.items = [];
    await cart.save();

    res.json({ success: true, message: "Order placed", data: order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// GET USER ORDERS
const getOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await orderModel
      .find({ userId })
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, getOrders };
