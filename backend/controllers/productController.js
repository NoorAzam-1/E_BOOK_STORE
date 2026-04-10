import prodctModel from "../models/productModel.js";
import { uploadFiles } from "../config/cloudinary.js";

const addMultipleProducts = async (req, res) => {
  try {
    const productsData = req.body;

    if (!Array.isArray(productsData)) {
      return res.status(400).json({
        success: false,
        message: "Expected an array of products",
      });
    }

    const formattedProducts = [];

    for (const item of productsData) {
      let uploadedImages = [];

      // Upload images to Cloudinary if provided
      if (item.images && Array.isArray(item.images) && item.images.length > 0) {
        try {
          const cloudImages = await uploadFiles(item.images, "products");
          uploadedImages = cloudImages.map((img) => ({
            url: img.url,
            public_id: img.public_id,
            alt: item.title || "",
          }));
        } catch (uploadError) {
          console.error(`Image upload failed for ${item.title}:`, uploadError);
        }
      }

      formattedProducts.push({
        title: item.title,
        author: item.author,
        description: item.description,
        price: Number(item.price) || 0,
        format: item.format || "EPUB",
        category: Array.isArray(item.category)
          ? item.category
          : item.category
            ? [item.category]
            : [],
        tags: Array.isArray(item.tags) ? item.tags : [],
        bestseller: item.bestseller === "true" || item.bestseller === true,
        available: item.available !== "false" && item.available !== false,
        images: uploadedImages, // Will be empty array [] if no images provided
        averageRating: Number(item.averageRating) || 0,
        numReviews: Number(item.numReviews) || 0,
      });
    }

    const products = await prodctModel.insertMany(formattedProducts);

    res.json({
      success: true,
      message: "Bulk E-books Added",
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to add single product
const addProduct = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      format,
      price,
      category,
      tags,
      bestseller,
      available,
    } = req.body;

    let uploadedImages = [];
    const files = req.files; // 👈 yahi main fix hai
    if (files && files.length > 0) {
      const cloudImages = await uploadFiles(files, "products");

      uploadedImages = cloudImages.map((img) => ({
        url: img.url,
        public_id: img.public_id,
        alt: title || "",
      }));
    }

    const productData = {
      title,
      author,
      description,
      price: Number(price) || 0,
      format: format || "EPUB",
      category: Array.isArray(category) ? category : [category],
      tags: Array.isArray(tags) ? tags : [],
      bestseller: bestseller === "true" || bestseller === true,
      available: available !== "false",
      images: uploadedImages, // Empty array if no images added
    };

    const product = new prodctModel(productData);
    await product.save();

    res.json({ success: true, message: "E-book Added", data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for list products
const listProduct = async (req, res) => {
  try {
    // Added sort to show newest e-books first
    const products = await prodctModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for removing product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("🗑️ Deleting:", id);

    await prodctModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    console.log("❌ Delete error:", error);
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const product = await prodctModel.findById(req.params.id);
    res.json({ success: true, data: product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await prodctModel.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "E-book not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for updating product
const updateProduct = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      format,
      price,
      category,
      tags,
      bestseller,
      available,
    } = req.body;

    const product = await prodctModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "E-book not found",
      });
    }

    // Basic fields update
    product.title = title || product.title;
    product.author = author || product.author;
    product.description = description || product.description;

    // Direct E-book fields update (No more variants array)
    product.price = price ? Number(price) : product.price;
    product.format = format || product.format;

    // Array fields update
    product.category = category
      ? Array.isArray(category)
        ? category
        : [category]
      : product.category;

    product.tags = tags ? (Array.isArray(tags) ? tags : [tags]) : product.tags;

    // Boolean fields update
    product.bestseller =
      bestseller !== undefined
        ? bestseller === "true" || bestseller === true
        : product.bestseller;

    product.available =
      available !== undefined ? available !== "false" : product.available;

    // Images update (optional)
    // Note: If using multer, change req.body.images to req.files
    const images = req.body.images;

    if (images && images.length > 0) {
      const uploadedImages = await uploadFiles(images, "products");

      product.images = uploadedImages.map((img) => ({
        url: img.url,
        public_id: img.public_id,
        alt: product.title || "",
      }));
    }

    const updatedProduct = await product.save();
    res.json({
      success: true,
      message: "E-book Updated",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
  updateProduct,
  addMultipleProducts,
  getSingleProduct,
};
