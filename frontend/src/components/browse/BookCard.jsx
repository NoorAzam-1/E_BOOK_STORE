"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cartSlice";
import { addWishlist, deleteWishlist } from "@/features/wishlistSlice";
import { useState } from "react";

export default function BookCard({ book }) {
  const { loading } = useSelector((state) => state.cart);
  const { wishlist = [] } = useSelector((state) => state.wishlist);

  const router = useRouter();
  const dispatch = useDispatch();

  const [animate, setAnimate] = useState(false);
  const [toast, setToast] = useState("");

  const {
    _id,
    title,
    author,
    price,
    images,
    format,
    bestseller,
    averageRating,
  } = book;

  const coverImage = images?.[0]?.url || "/placeholder-book.png";

  const isInWishlist = wishlist.some(
    (item) => item?.bookId?._id?.toString() === _id?.toString()
  );

  // ✅ Add to Cart
  const handleCart = (e) => {
    e.stopPropagation();
    if (loading) return;

    dispatch(addToCart({ productId: _id, quantity: 1 }));
    setToast("Added to cart 🛒");

    setTimeout(() => setToast(""), 2000);
  };

  // ✅ Wishlist Toggle
  const handleWishlist = (e) => {
    e.stopPropagation();

    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);

    if (isInWishlist) {
      const item = wishlist.find(
        (w) => w?.bookId?._id?.toString() === _id?.toString()
      );

      if (item?._id) {
        dispatch(deleteWishlist(item._id));
        setToast("Removed from wishlist");
      }
    } else {
      dispatch(addWishlist({ bookId: _id }));
      setToast("Added to wishlist 💖");
    }

    setTimeout(() => setToast(""), 2000);
  };

  const handleCardClick = () => {
    router.push(`/browse/books/${_id}`);
  };

  return (
    <>
      <article
        className="group flex flex-col cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative aspect-3/4 overflow-hidden rounded-md bg-surface-container-low shadow-2xl transition group-hover:-translate-y-4">

          {/* ✅ IMAGE */}
          <Image
            src={coverImage}
            alt={title}
            width={300}
            height={400}
            className="w-full h-full object-cover"
          />

          {/* ❤️ Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 text-xl z-10 transition transform ${
              animate ? "scale-125" : "scale-100"
            }`}
          >
            {isInWishlist ? "❤️" : "🤍"}
          </button>

          {/* 🛒 Add to Cart */}
          <button
            onClick={handleCart}
            disabled={loading}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] py-2 bg-primary text-black text-xs uppercase rounded"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>

          {/* Bestseller */}
          {bestseller && (
            <span className="absolute top-1 left-1 bg-primary text-black text-[10px] px-3 py-1 rounded-full">
              Bestseller
            </span>
          )}

          {/* Format */}
          <span className="absolute top-3 right-12 bg-white/80 text-black text-[10px] px-2 py-1 rounded-full">
            {format}
          </span>
        </div>

        {/* TEXT */}
        <div className="mt-4">
          <h3 className="text-lg">{title}</h3>
          <p className="text-sm text-gray-500">{author}</p>

          <div className="flex gap-3 mt-2">
            <p className="font-bold">₹{price}</p>
            {averageRating > 0 && <span>⭐ {averageRating}</span>}
          </div>
        </div>
      </article>

      {/* ✅ TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </>
  );
}