"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "@/features/productSlice";
import Image from "next/image";
import { Star, StarHalf } from "lucide-react";

function RatingStars({ rating }) {
  const safeRating = rating && rating > 0 ? rating : 3; // minimum 3
  const full = Math.floor(safeRating);
  const half = safeRating % 1 !== 0;

  return (
    <div className="flex text-primary">
      {[...Array(full)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
      {half && <StarHalf className="h-4 w-4 fill-current" />}
    </div>
  );
}

export default function BookDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleProduct: book, loading } = useSelector(
    (state) => state.product,
  );
  console.log("Book Details:", book);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!book) return <p className="p-10">Product not found</p>;

  // 🔥 Fake MRP (5% to 40% higher)
  const increasePercent = Math.floor(Math.random() * 36) + 5;
  const fakePrice = Math.round(
    book.price + (book.price * increasePercent) / 100,
  );

  return (
    <div className="bg-background text-on-surface">
      <main className="px-4 md:px-6 max-w-7xl mx-auto">
        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* IMAGE */}
          <div className="lg:col-span-5 flex justify-center">
            <Image
              src={book.images?.[0]?.url || "/placeholder-book.png"}
              alt={book.title}
              width={320}
              height={450}
              className="rounded-lg shadow-2xl -rotate-2 hover:rotate-0 hover:scale-105 transition"
            />
          </div>

          {/* CONTENT */}
          <div className="lg:col-span-7 space-y-6">
            {/* TAGS */}
            <div>
              {book.category?.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 mr-2 text-xs bg-surface-variant text-primary rounded-full"
                >
                  {cat}
                </span>
              ))}

              <h1 className="text-3xl md:text-5xl font-bold mt-4">
                {book.title}
              </h1>

              <p className="text-on-surface-variant italic mt-2">
                by {book.author}
              </p>

              <div className="flex items-center gap-3 mt-2">
                <RatingStars rating={book.averageRating} />
                <span>{book.averageRating || 3}</span>
              </div>
            </div>

            {/* PRICE */}
            <div className="p-6 rounded-xl bg-surface-container-low border">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center gap-3">
                  {/* Real Price */}
                  <div className="text-3xl font-bold text-primary mt-1">
                    ₹{book.price}
                  </div>

                  {/* Fake Price */}
                  <span className="text-lg line-through text-gray-400">
                    ₹{fakePrice}
                  </span>

                  {/* Discount Badge */}
                  <span className="text-sm text-green-600 font-semibold">
                    {increasePercent}% OFF
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-primary text-on-primary py-3 rounded-lg">
                  Buy Now
                </button>
              </div>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="p-3 bg-surface-container rounded-lg">
                <span className="text-primary">Format</span>
                <p>{book.format}</p>
              </div>

              <div className="p-3 bg-surface-container rounded-lg">
                <span className="text-primary">Language</span>
                <p>{book.language || "English"}</p>
              </div>

              <div className="p-3 bg-surface-container rounded-lg">
                <span className="text-primary">Pages</span>
                <p>{book.pages || 300}</p>
              </div>

              <div className="p-3 bg-surface-container rounded-lg">
                <span className="text-primary">Release</span>
                <p>
                  {book.createdAt
                    ? new Date(book.createdAt).getFullYear()
                    : "2026"}
                </p>{" "}
              </div>
            </div>
          </div>
        </section>

        <div className="flex gap-4">
          {/* ABOUT */}
          <section className="mb-20 p-6 rounded-xl bg-surface-container">
            <h2 className="text-2xl font-bold text-primary mb-4">
              About the Book
            </h2>
            <p className="text-on-surface-variant">
              {book.description ||
                "This book offers an engaging journey through compelling ideas, rich storytelling, and valuable insights. Perfect for readers who love immersive and thought-provoking content."}
            </p>
          </section>

          {/* AUTHOR SPOTLIGHT */}
          <section className="mb-20 p-6 rounded-xl bg-surface-container">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Author Spotlight
            </h2>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
                {book.author?.charAt(0) || "A"}
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {book.author || "Unknown Author"}
                </h3>

                <p className="text-sm text-on-surface-variant">
                  A passionate storyteller known for creating engaging and
                  memorable reading experiences.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
