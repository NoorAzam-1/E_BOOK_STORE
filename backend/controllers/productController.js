import prodctModel from '../models/productModel.js'
import { uploadFiles } from '../config/cloudinary.js';

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
      return res.status(400).json({ success: false, message: "Images are required" });
    }

    // Upload to Cloudinary using the SERVICE
    const uploadedImages = await uploadFiles(images, 'products');

    // Format data for the Dynamic Database Schema
    const productData = {
      title,
      author,
      description,
      category: Array.isArray(category) ? category : [category], 
      bestseller: bestseller === 'true' || bestseller === true,
      available: available !== 'false', 
      images: uploadedImages.map((img) => ({
        url: img.url,
        public_id: img.public_id,
      })),

      variants: [{
        format: format || 'Standard', 
        price: Number(price),
        stock: 0, 
      }],
    };

    // 4. Save to Database
    const product = new prodctModel(productData);
    await product.save();
    // console.log(product)

    res.json({ success: true, message: "Product Added", product });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listProduct = async (req,res)=> {

}

//function for removing product
const removeProduct = async (req,res) => {

}

//function for single product info 
const singleProduct = async (req,res) => {

}

export {addProduct,listProduct,removeProduct, singleProduct}