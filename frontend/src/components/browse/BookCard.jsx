"use client";
// frontend\src\components\browse\BookCard.jsx

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BookCard({ book }) {
  const router = useRouter();

  const { _id, title, author, price, images, format, bestseller, averageRating } = book;

  // Get first image from images array
  const coverImage = images?.[0]?.url || "/placeholder-book.png";
  const altText = images?.[0]?.alt || title;

  const handleCartClick = (e) => {
    e.stopPropagation();
    router.push("/cart");
  };

  const handleCardClick = () => {
    router.push(`/books/${_id}`);
  };

  return (
<<<<<<< Updated upstream
    <article className="group flex flex-col cursor-pointer" onClick={handleCardClick}>
      <div className="relative aspect-3/4 overflow-hidden rounded-md bg-surface-container-low shadow-2xl transition group-hover:-translate-y-4">
        <Image
          alt={altText}
          src={coverImage}
          height={600}
          width={300}
          className="w-full h-full object-cover"
        />
=======
    <>
      <article
        className="group flex flex-col "
        onClick={handleCardClick}
      >
        <div className="relative aspect-3/4 overflow-hidden rounded-md bg-surface-container-low shadow-2xl transition group-hover:-translate-y-4">
>>>>>>> Stashed changes

        {/* Bestseller Badge */}
        {bestseller && (
          <span className="absolute top-3 left-3 bg-primary text-on-primary text-[10px] uppercase tracking-wider px-3 py-1 rounded-full font-semibold">
            Bestseller
          </span>
        )}

        {/* Format Badge */}
        <span className="absolute top-3 right-3 bg-surface-container/90 text-on-surface text-[10px] uppercase tracking-wider px-2 py-1 rounded-full">
          {format}
        </span>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent opacity-0 group-hover:opacity-100 flex items-end p-6">
          <button
<<<<<<< Updated upstream
            onClick={handleCartClick}
            className="w-full py-3 bg-linear-to-r from-primary to-primary-container text-on-primary text-xs uppercase rounded cursor-pointer"
=======
            onClick={handleWishlist}
            className={`absolute top-3 right-3 text-xl z-10 transition transform cursor-pointer ${
              animate ? "scale-125" : "scale-100"
            }`}
>>>>>>> Stashed changes
          >
            Quick Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-headline text-lg group-hover:text-primary">
          {title}
        </h3>
        <p className="text-sm text-on-surface-variant">{author}</p>
        <div className="flex items-center gap-3 mt-2">
          <p className="text-primary font-bold">₹{price.toFixed(0)}</p>
          {averageRating > 0 && (
            <span className="text-xs text-on-surface-variant">
              ⭐ {averageRating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}