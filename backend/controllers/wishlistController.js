import wishlistModel from "../models/wishlistModel.js";

// CREATE
const addWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bookId } = req.body;

    const exists = await wishlistModel.findOne({ userId, bookId });

    if (exists) {
      return res.json({ success: false, message: "Already in wishlist" });
    }

    const newItem = await wishlistModel.create({ userId, bookId });

    // populate after create
    const populatedItem = await newItem.populate("bookId");

    res.json({ success: true, data: populatedItem });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// READ ALL
const getAllWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const items = await wishlistModel
      .find({ userId })
      .populate("bookId")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: items });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// READ SINGLE
const getSingleWishlist = async (req, res) => {
  try {

    const { id } = req.params;

    const item = await wishlistModel.findById(id);

    if (!item) {
      return res.json({ success: false, message: "Item not found" });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// UPDATE
const updateWishlist = async (req, res) => {
  try {

    const { id } = req.params;
    const { title, image, author, price, } = req.body;

    const updated = await wishlistModel.findByIdAndUpdate(
      id,
      { title, image, author, price },
      { new: true }
    );

    if (!updated) {
      return res.json({ success: false, message: "Item not updated" });
    }

    res.json({
      success: true,
      message: "Wishlist updated",
      data: updated,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// DELETE
const deleteWishlist = async (req, res) => {
  try {

    const { id } = req.params;

    const deleted = await wishlistModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.json({ success: false, message: "Item not found" });
    }

    res.json({
      success: true,
      message: "Wishlist deleted",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  addWishlist,
  getAllWishlist,
  getSingleWishlist,
  updateWishlist,
  deleteWishlist,
};