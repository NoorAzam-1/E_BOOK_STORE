import cartModel from "../models/cartModel.js";
import bookModel from "../models/productModel.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { productId, quantity = 1 } = req.body;
    console.log("userId, productId, qty", userId,productId,quantity)

    if (!productId) {
      return res.json({ success: false, message: "Product ID is required" });
    }

    const product = await bookModel.findById(productId);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    // ✅ FIXED (NO variants)
    const price = product.price || 0;

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({ userId, items: [] });
    }

    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        title: product.title,
        image: product.images?.[0]?.url || "",
        author: product.author || "",
        price,
        quantity,
      });
    }

    await cart.save();

    res.json({
      success: true,
      message: "Added to cart",
      data: cart,
    });
  } catch (error) {
    console.log("ADD ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

// GET CART
export const getCart = async (req, res) => {
  try {
    const userId = req.user?._id;

    let cart = await cartModel.findOne({ userId });

    if (!cart) cart = { items: [] };

    res.json({ success: true, data: cart });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateCart = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { productId, quantity } = req.body;

    const cart = await cartModel.findOne({ userId });

    const item = cart?.items.find(
      (i) => i.productId.toString() === productId
    );

    if (item) {
      item.quantity = quantity;
      await cart.save();
    }

    res.json({ success: true, data: cart });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// REMOVE
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { productId } = req.params;

    const cart = await cartModel.findOne({ userId });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.json({ success: true, data: cart });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};