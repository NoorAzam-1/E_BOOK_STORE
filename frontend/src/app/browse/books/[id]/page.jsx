"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "@/features/productSlice";
import Image from "next/image";
import { Star, StarHalf } from "lucide-react";

const bookDescriptions = [
  "is a captivating journey filled with imagination and deep insights.",
  "explores powerful themes that leave a lasting impression on readers.",
  "takes you through an unforgettable story packed with emotions and meaning.",
  "offers a unique blend of storytelling and thought-provoking ideas.",
  "is a must-read for anyone who enjoys rich and immersive narratives.",
];

const authorDescriptions = [
  "is known for crafting compelling stories that resonate with readers.",
  "has a unique storytelling style that keeps audiences engaged.",
  "is celebrated for delivering impactful and memorable books.",
  "brings creativity and depth into every piece of writing.",
  "continues to inspire readers with meaningful and engaging content.",
];

function RatingStars({ rating }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <div className="flex text-yellow-400">
      {[...Array(full)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-current" />
      ))}

      {hasHalf && <StarHalf className="h-5 w-5 fill-current" />}

      {[...Array(empty)].map((_, i) => (
        <Star key={`e-${i}`} className="h-5 w-5 text-gray-300" />
      ))}
    </div>
  );
}

export default function BookDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const { singleProduct: book, loading } = useSelector(
    (state) => state.product,
  );

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  const displayRating = useMemo(() => {
    if (book?.averageRating && book.averageRating > 0)
      return book.averageRating;

    const hash = book?._id
      ?.split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return ((hash % 15) / 10 + 3.5).toFixed(1);
  }, [book]);

  const generatedContent = useMemo(() => {
    if (!book?._id) return {};

    const hash = book._id
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const bookDesc =
      book.title + " " + bookDescriptions[hash % bookDescriptions.length];

    const authorDesc =
      book.author + " " + authorDescriptions[hash % authorDescriptions.length];

    return { bookDesc, authorDesc };
  }, [book]);

  const handleBuyNow = () => {
    const item = {
      productId: book._id,
      title: book.title,
      price: book.price,
      image: book.images?.[0]?.url,
      qty: 1,
    };
    localStorage.setItem("checkoutData", JSON.stringify([item]));
    router.push("/checkout");
  };

  if (loading) return <p className="p-10">Loading...</p>;
  if (!book) return <p className="p-10">Product not found</p>;

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
          <div className="lg:col-span-4 flex justify-center w-full">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm aspect-[9/10] sm:aspect-[3/4]">
              <Image
                src={book.images?.[0]?.url || "/placeholder-book.png"}
                alt={book.title}
                fill
                className="object-cover rounded-lg shadow-2xl -rotate-2 hover:rotate-0 hover:scale-105 transition duration-300"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="lg:col-span-8 space-y-6">
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
                <RatingStars rating={displayRating} />
                <span>{displayRating}</span>
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
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-primary text-on-primary text-center py-3 rounded-lg hover:bg-primary-hover hover:scale-105 transition cursor-pointer"
                >
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

        <div className="flex flex-col gap-4 sm:flex-row  md:gap-4 py-4 md:py-6">
          {/* ABOUT */}
          <section className="p-6 rounded-xl bg-surface-container">
            <h2 className="text-2xl font-bold text-primary mb-4">
              About the Book
            </h2>
            <p className="text-on-surface-variant">
              {book.description || generatedContent.bookDesc}
            </p>
          </section>

          {/* AUTHOR SPOTLIGHT */}
          <section className="p-6 rounded-xl bg-surface-container">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Author Spotlight
            </h2>

            <div className="flex items-center justify-center gap-4">
              <div className="min-w-8 min-h-8 w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
                {book.author?.charAt(0) || "A"}
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {book.author || "Unknown Author"}
                </h3>

                <p className="text-sm text-on-surface-variant">
                  {generatedContent.authorDesc}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
