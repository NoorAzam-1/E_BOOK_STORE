"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cartSlice";
import { deleteWishlist } from "@/features/wishlistSlice";
import { useState } from "react";

export default function WishlistItem({
  id,
  bookId,
  title,
  author,
  price,
  tag,
  image,
}) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.cart);

  const [toast, setToast] = useState("");

  // ✅ Move to Cart
  const handleMoveToCart = () => {
    if (loading) return;

    dispatch(addToCart({ productId: bookId, quantity: 1 }));
    dispatch(deleteWishlist(id));

    setToast("Moved to cart 🛒");
  };

  // ✅ Delete from wishlist
  const handleDelete = () => {
    dispatch(deleteWishlist(id));
    setToast("Removed from wishlist ❌");
  };

  return (
    <>
      <div className="group relative flex flex-col md:flex-row gap-6 p-4 rounded-xl border border-white/5 bg-surface-container-low backdrop-blur-lg hover:border-primary/20 transition">
        
        {/* Image */}
        <div className="relative w-full md:w-40 aspect-2/3 overflow-hidden rounded-lg shadow-xl shrink-0">
          <Image
            alt="Image"
            src={image}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 py-2">
          
          {/* Top */}
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl md:text-2xl font-headline font-bold group-hover:text-primary">
                {title}
              </h3>
              <p className="text-sm text-on-surface-variant">{author}</p>
            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={handleDelete}
              className="text-on-surface-variant hover:text-red-400"
            >
              ✕
            </button>
          </div>

          {/* Bottom */}
          <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-primary text-xl font-bold">
                ₹{price?.toFixed(2)}
              </p>
              <p className="text-xs uppercase text-on-surface-variant">
                {tag || "Wishlist Item"}
              </p>
            </div>

            {/* 🛒 MOVE TO CART */}
            <button
              onClick={handleMoveToCart}
              disabled={loading}
              className="bg-linear-to-r from-primary to-primary-container text-on-primary px-6 py-3 rounded-md font-bold flex items-center gap-2 hover:scale-[1.03] active:scale-95 transition"
            >
              {loading ? "Moving..." : "🛒 Move to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </>
  );
}