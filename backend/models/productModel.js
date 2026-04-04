import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true }, 
  alt: { type: String } 
}, { _id: false });

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  
  // E-book specific fields
  price: { type: Number, required: true }, // Single price for the digital book
  format: { type: String, default: "EPUB" }, // Simple string, e.g., "EPUB", "PDF", "EPUB/PDF"
  
  category: [{ type: String, required: true }], 
  tags: [String], 
  images: [imageSchema],
  
  bestseller: { type: Boolean, default: false },
  // 'available' can now just mean "is this book listed/purchasable?"
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