// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "@/features/cartSlice";
// import { addWishlist, deleteWishlist } from "@/features/wishlistSlice";
// import { useState } from "react";

// export default function BookCard({ book }) {
//   const { loading } = useSelector((state) => state.cart);
//   const { wishlist = [] } = useSelector((state) => state.wishlist);

//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [animate, setAnimate] = useState(false);
//   const [toast, setToast] = useState("");

//   const {
//     _id,
//     title,
//     author,
//     price,
//     images,
//     format,
//     bestseller,
//     averageRating,
//   } = book;

//   const randomRating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
//   const displayRating = averageRating > 0 ? averageRating : randomRating;

//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const hasHalf = rating % 1 >= 0.5;
//     const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

//     return (
//       <>
//         {"⭐".repeat(fullStars)}
//         {hasHalf && "⭐"}
//         {"☆".repeat(emptyStars)}
//       </>
//     );
//   };

//   const coverImage = images?.[0]?.url || "/placeholder-book.png";
//   const isInWishlist = wishlist.some(
//     (item) => item?.bookId?._id?.toString() === _id?.toString(),
//   );

//   // ✅ Add to Cart
//   const handleCart = (e) => {
//     e.stopPropagation();
//     if (loading) return;

//     dispatch(addToCart({ productId: _id, quantity: 1 }));
//     setToast("Added to cart 🛒");
//     setTimeout(() => setToast(""), 500);
//   };

//   // ✅ Wishlist Toggle
//   const handleWishlist = (e) => {
//     e.stopPropagation();

//     setAnimate(true);
//     setTimeout(() => setAnimate(false), 300);

//     if (isInWishlist) {
//       const item = wishlist.find(
//         (w) => w?.bookId?._id?.toString() === _id?.toString(),
//       );

//       if (item?._id) {
//         dispatch(deleteWishlist(item._id));
//         setToast("Removed from wishlist");
//       }
//     } else {
//       dispatch(addWishlist({ bookId: _id }));
//       setToast("Added to wishlist 💖");
//     }

//     setTimeout(() => setToast(""), 2000);
//   };

//   const handleCardClick = () => {
//     router.push(`/browse/books/${_id}`);
//   };

//   return (
//     <>
//       <article className="group flex flex-col" onClick={handleCardClick}>
//         <div className="relative aspect-3/4 overflow-hidden rounded-md bg-surface-container-low shadow-2xl transition group-hover:-translate-y-4">
//           {/* ✅ IMAGE */}
//           <Image
//             src={coverImage}
//             alt={title}
//             width={300}
//             height={400}
//             className="w-full h-full object-cover"
//           />

//           <div className="absolute bottom-0 md:bottom-3 left-0 w-full md:px-2">
//             <div className="flex items-center gap-2 rounded-xl shadow-md px-2">
//               {/* 🛒 Add to Cart */}
//               <button
//                 onClick={handleCart}
//                 disabled={loading}
//                 className="flex-1 py-1 md:py-2 text-xs md:text-sm font-semibold uppercase rounded-lg bg-primary text-black hover:bg-primary/80 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {loading ? "Adding..." : "Add to Cart"}
//               </button>

//               {/* ❤️ Wishlist Button */}
//               <button
//                 onClick={handleWishlist}
//                 className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-xl rounded-full transition-all duration-200 cursor-pointer ${animate ? "scale-125" : "scale-100"} ${isInWishlist ? "bg-red-100" : "bg-gray-100 hover:bg-gray-300"}`}
//               >
//                 {isInWishlist ? "❤️" : "🤍"}
//               </button>
//             </div>
//           </div>

//           {/* Bestseller */}
//           {bestseller && (
//             <span className="absolute top-1 left-1 bg-primary text-black text-[10px] px-3 py-1 rounded-full">
//               Bestseller
//             </span>
//           )}

//           {/* Format */}
//           <span className="absolute top-1 right-1 bg-white/80 text-black text-[10px] px-2 py-1 rounded-full">
//             {format}
//           </span>
//         </div>

//         {/* TEXT */}
//         <div className="mt-4">
//           <h3 className="text-lg">{title}</h3>
//           <p className="text-sm text-gray-500">{author}</p>

//           <div className="flex gap-3 mt-2 items-center">
//             <p className="font-bold">₹{price}</p>

//             <span className="flex items-center gap-1 text-sm">
//               {renderStars(displayRating)}
//               <span className="text-gray-500">({displayRating})</span>
//             </span>
//           </div>
//         </div>
//       </article>

//       {/* ✅ TOAST */}
//       {toast && (
//         <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
//           {toast}
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/cartSlice";
import { addWishlist, deleteWishlist } from "@/features/wishlistSlice";
import { useState, useMemo } from "react";
import { Star, StarHalf } from "lucide-react";
import Link from "next/link";

export default function BookCard({ book }) {
  const { loading } = useSelector((state) => state.cart);
  const { wishlist = [] } = useSelector((state) => state.wishlist);

  const router = useRouter();
  const dispatch = useDispatch();
  const [loadingId, setLoadingId] = useState(null);
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

  // ✅ SAME RANDOM LOGIC (IMPORTANT)
  const displayRating = useMemo(() => {
    if (averageRating && averageRating > 0) return averageRating;

    const hash = _id
      ?.split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return ((hash % 15) / 10 + 3.5).toFixed(1);
  }, [_id, averageRating]);

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(full)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}

        {hasHalf && (
          <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        )}

        {[...Array(empty)].map((_, i) => (
          <Star key={`e-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
      </div>
    );
  };

  const coverImage = images?.[0]?.url || "/placeholder-book.png";

  const isInWishlist = wishlist.some(
    (item) => item?.bookId?._id?.toString() === _id?.toString(),
  );

  const handleCart = async (e) => {
    e.stopPropagation();
    if (loadingId === _id) return;
    setLoadingId(_id);
    try {
      await dispatch(addToCart({ productId: _id, quantity: 1 }));
      setToast("Added to cart 🛒");
    } finally {
      setLoadingId(null);
      setTimeout(() => setToast(""), 2000);
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
    if (isInWishlist) {
      const item = wishlist.find(
        (w) => w?.bookId?._id?.toString() === _id?.toString(),
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

  // const handleCardClick = () => {
  //   router.push(`/browse/books/${_id}`);
  // };

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/browse/books/${_id}`}
        className="relative aspect-3/4 overflow-hidden rounded-md bg-surface-container-low shadow-2xl transition group-hover:-translate-y-4"
      >
        <Image
          src={coverImage}
          alt={title}
          width={300}
          height={400}
          className="w-full h-full object-cover"
        />

        {bestseller && (
          <span className="absolute top-1 left-1 bg-primary text-black text-[10px] px-3 py-1 rounded-full">
            Bestseller
          </span>
        )}

        <span className="absolute top-1 right-1 bg-white/80 text-black text-[10px] px-2 py-1 rounded-full">
          {format}
        </span>
      </Link>

      <div className="mt-4">
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm text-gray-500">{author}</p>

        <div className="flex gap-3 mt-2 items-center">
          <p className="font-bold">₹{price}</p>

          <div className="flex items-center gap-1 text-sm">
            {renderStars(displayRating)}
            <span className="text-gray-500">({displayRating})</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 sm:bottom-28 md:bottom-32 xl:bottom-26 left-0 w-full md:px-2 transition group-hover:-translate-y-4">
        <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2">
          <button
            onClick={handleCart}
            disabled={loadingId === _id}
            className="flex-1 py-2 text-[12px] sm:text-sm font-semibold rounded-lg bg-primary text-black  cursor-pointer"
          >
            {loadingId === _id ? "Adding..." : "Add to Cart"}
          </button>

          <button
            onClick={handleWishlist}
            className={`w-10 h-10 text-xl rounded-full  cursor-pointer ${
              animate ? "scale-125" : ""
            } ${isInWishlist ? "bg-red-100" : "bg-gray-100"}`}
          >
            {isInWishlist ? "❤️" : "🤍"}
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-lg">
          {toast}
        </div>
      )}
    </article>
  );
}
