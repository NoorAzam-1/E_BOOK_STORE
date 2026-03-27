import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true }, 
  alt: { type: String } 
}, { _id: false });


const variantSchema = new mongoose.Schema({
  format: { type: String, required: true }, 
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  sku: { type: String } 
}, { _id: false });

const bookSchema = new mongoose.Schema({

  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  
 
  category: [{ type: String, required: true }], 
  tags: [String], 
  images: [imageSchema],

  variants: [variantSchema],
  bestseller: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
  
  averageRating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },

}, { 
  timestamps: true,
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true }
});


bookSchema.index({ title: 'text', author: 'text', description: 'text' });

const bookModel = mongoose.model("book", bookSchema);

export default bookModel;