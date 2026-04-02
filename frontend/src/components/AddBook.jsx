"use client";
import { useDispatch } from "react-redux";
import { addProduct } from "@/features/productSlice";
import { useState } from "react";
import { Book, User, Tag, IndianRupee, Image as ImgIcon } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function AddBook() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    format: "Paperback",
    price: "",
    category: "",
    bestseller: false,
    available: true,
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];

      if (file) {
        setForm({ ...form, image: file });
        setPreview(URL.createObjectURL(file));
      }
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData();

      data.append("title", form.title);
      data.append("author", form.author);
      data.append("description", form.description);
      data.append("format", form.format);
      data.append("price", form.price);
      data.append("category", form.category);
      data.append("bestseller", form.bestseller);
      data.append("available", form.available);
      data.append("images", form.image);

      await dispatch(addProduct(data)).unwrap();
      toast.success("Product added successfully ✅");

      setForm({
        title: "",
        author: "",
        description: "",
        format: "Paperback",
        price: "",
        category: "",
        bestseller: false,
        available: true,
        image: null,
      });

      setPreview(null);
    } catch (err) {
      toast.error(err || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* HEADER */}
        <div>
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
            Add New Book
          </h3>
          <p className="text-xs text-on-surface-variant">
            Fill details to publish your book
          </p>
        </div>

        {/* IMAGE PREVIEW */}
        {preview && (
          <div className="flex justify-center">
            <img
              src={preview}
              alt="preview"
              className="w-24 h-32 object-cover rounded-md border"
            />
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* TITLE */}
          <InputField
            icon={<Book size={18} />}
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          {/* AUTHOR */}
          <InputField
            icon={<User size={18} />}
            label="Author"
            name="author"
            value={form.author}
            onChange={handleChange}
          />

          {/* CATEGORY */}
          <InputField
            icon={<Tag size={18} />}
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
          />

          {/* PRICE */}
          <InputField
            icon={<IndianRupee size={18} />}
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />

          {/* FORMAT */}
          <div className="space-y-1">
            <label className="label">Format</label>
            <select
              name="format"
              value={form.format}
              onChange={handleChange}
              className="input-no-icon"
            >
              <option>Paperback</option>
              <option>Hardcover</option>
              <option>Ebook</option>
            </select>
          </div>

          {/* IMAGE */}
          <div className="space-y-1">
            <label className="label">Book Image</label>
            <div className="relative group">
              <span className="icon">
                <ImgIcon size={18} />
              </span>
              <input
                type="file"
                multiple
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="input-file"
                required
              />
            </div>
          </div>

          {/* DESCRIPTION FULL WIDTH */}
          <div className="md:col-span-2">
            <label className="label">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="input-no-icon resize-none h-24"
            />
          </div>
        </div>

        <div className="flex justify-between items-center bg-surface-container-lowest p-3 rounded-lg text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="bestseller"
              checked={form.bestseller}
              onChange={handleChange}
              className="accent-primary"
            />
            Bestseller
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
              className="accent-primary"
            />
            Available
          </label>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-linear-to-r from-primary to-primary-container text-black font-bold py-3 rounded-lg hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

function InputField({ icon, label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="label">{label}</label>

      <div className="relative group">
        <span className="icon">{icon}</span>

        <input {...props} className="input" />
      </div>
    </div>
  );
}
