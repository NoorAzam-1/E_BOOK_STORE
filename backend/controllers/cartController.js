import cartModel from "../models/cartModel.js";
import bookModel from "../models/productModel.js"; // 👈 product model

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.json({ success: false, message: "Product ID is required", });
    }

    // get product details from DB
    const product = await bookModel.findById(productId);

    if (!product) {
      return res.json({ success: false, message: "Product not found", });
    }
    const price = product.variants[0]?.price || 0;

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = new cartModel({ userId, items: [] });
    }

    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index > -1) {
      cart.items[index].quantity += quantity || 1;
    } else {
      cart.items.push({
        productId,
        title: product.title,
        image: product.images[0]?.url || "",
        price,
        quantity: quantity || 1,
      });
    }

    await cart.save();

    res.json({ success: true, message: "Added to cart", data: cart, });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  GET CART
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = { items: [] };
    }

    res.json({ success: true, data: cart });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// UPDATE QUANTITY
const updateCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.json({ success: false, message: "Item not found" });
    }

    item.quantity = quantity;

    await cart.save();

    res.json({ success: true, message: "Cart updated", data: cart });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  REMOVE ITEM
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.json({
      success: true,
      message: "Item removed",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, getCart, updateCart, removeFromCart };