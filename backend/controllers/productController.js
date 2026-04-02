import prodctModel from "../models/productModel.js";
import { uploadFiles } from "../config/cloudinary.js";

// Function to add product
const addProduct = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      format,
      price,
      category,
      bestseller,
      available,
    } = req.body;

    const images = req.files;
    if (!images || images.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Images are required" });
    }

    const uploadedImages = await uploadFiles(images, "products");
    const productData = {
      title,
      author,
      description,
      category: Array.isArray(category) ? category : [category],
      bestseller: bestseller === "true" || bestseller === true,
      available: available !== "false",
      images: uploadedImages.map((img) => ({
        url: img.url,
        public_id: img.public_id,
      })),

      variants: [
        {
          format: format || "Standard",
          price: Number(price),
          stock: 0,
        },
      ],
    };

    // 4. Save to Database
    const product = new prodctModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added", data: product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listProduct = async (req, res) => {
  try {
    const products = await prodctModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//function for removing product
const removeProduct = async (req, res) => {
  try {
    await prodctModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await prodctModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function for updating product
const updateProduct = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      format,
      price,
      category,
      bestseller,
      available,
    } = req.body;

    const product = await prodctModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ✅ basic fields update
    product.title = title || product.title;
    product.author = author || product.author;
    product.description = description || product.description;

    product.category = category
      ? Array.isArray(category)
        ? category
        : [category]
      : product.category;

    product.bestseller =
      bestseller !== undefined
        ? bestseller === "true" || bestseller === true
        : product.bestseller;

    product.available =
      available !== undefined ? available !== "false" : product.available;

    // ✅ images update (optional)
    const images = req.files;

    if (images && images.length > 0) {
      const uploadedImages = await uploadFiles(images, "products");

      product.images = uploadedImages.map((img) => ({
        url: img.url,
        public_id: img.public_id,
      }));
    }

    // ✅ variant update
    if (product.variants && product.variants.length > 0) {
      product.variants[0].format = format || product.variants[0].format;
      product.variants[0].price = price
        ? Number(price)
        : product.variants[0].price;
    }

    const updatedProduct = await product.save();
    res.json({
      success: true,
      message: "Product Updated",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct, updateProduct };
