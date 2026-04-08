import Image from "next/image";
import { Star, StarHalf } from "lucide-react";
import { site } from "@/data/site";
import Link from "next/link";

function RatingStars({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex text-primary">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-current" />
      ))}
      {hasHalf && <StarHalf className="h-4 w-4 fill-current" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4" />
      ))}
    </div>
  );
}

export default function NewArrivals() {
  return (
    <section className="mx-auto my-5 md:my-8 px-3">
      <h2 className="mb-6 md:mb-10 font-headline text-3xl font-bold">New Arrivals</h2>

      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {site.arrivals.map((book) => (
          <Link href="/browse" key={book.title} className="group">
            <div className="relative mb-4 aspect-3/4 overflow-hidden rounded-xl shadow-xl">
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute right-3 top-3 rounded bg-surfaceContainer/90 px-2 py-1 text-xs font-bold text-primary backdrop-blur-md">
                NEW
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="truncate font-headline text-lg font-bold transition-colors group-hover:text-primary">
                {book.title}
              </h3>
              <p className="text-sm text-on-surface-variant">{book.author}</p>

              <div className="flex items-center gap-2 pt-1">
                <RatingStars rating={book.rating} />
                <span className="text-xs text-on-surface-variant">({book.reviews})</span>
              </div>

              <p className="mt-2 text-lg font-bold text-primary">₹{book.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}