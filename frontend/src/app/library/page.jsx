import FeaturedBook from "@/components/library/FeaturedBook";
import RecentBook from "@/components/library/RecentBook";
import BookCard from "@/components/library/BookCard";
import WishlistCard from "@/components/library/WishlistCard";
import ToggleTabs from "@/components/library/ToggleTabs";

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <main className="w-full mx-auto">
        {/* Title + Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Your Collection
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold mt-2">
              Personal Library
            </h1>
          </div>

          <ToggleTabs />
        </div>

        {/* Recently Opened */}
        <section className="mb-16">
          <div className="flex justify-center items-baseline gap-6 md:gap-12">
            <h2 className="text-xl font-semibold mb-6">Recently Opened</h2>
            <div className="bg-on-surface flex-1 h-px"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <FeaturedBook />
            <RecentBook />
          </div>
        </section>

        {/* Reading Now */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">Reading Now</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            <BookCard
              title="Stoner"
              author="John Williams"
              progress={60}
              image="/images/reading/gr1.webp"
              bg="rgba(255,255,255,0.08)"
            />

            <BookCard
              title="Design of Things"
              author="Don Norman"
              progress={12}
              image="/images/reading/gr2.webp"
              bg="rgba(0,150,136,0.18)"
            />

            <BookCard
              title="Dune Messiah"
              author="Frank Herbert"
              progress={95}
              image="/images/reading/gr3.webp"
              bg="rgba(255,140,0,0.18)"
            />

            <BookCard
              title="Normal People"
              author="Sally Rooney"
              progress={45}
              image="/images/reading/gr4.webp"
              bg="rgba(255,105,180,0.18)"
            />

            <BookCard
              title="Wuthering Heights"
              author="Emily Bronte"
              progress={5}
              image="/images/reading/gr5.webp"
              bg="rgba(100,149,237,0.18)"
            />
          </div>
        </section>

        {/* Wishlist */}
        <section>
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-semibold">Your Wishlist</h2>
            <span className="text-primary text-sm cursor-pointer">
              View All
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto hide-scrollbar">
            <WishlistCard
              title="Midnight Library"
              price="$14.99"
              image="/images/wishlist/w2.webp"
              bg="rgba(255,255,255,0.08)"
            />

            <WishlistCard
              title="Circe"
              price="$12.50"
              image="/images/wishlist/w3.webp"
              bg="rgba(0,150,136,0.20)"
            />

            <WishlistCard
              title="Atomic Habits"
              price="$18.00"
              image="/images/wishlist/w2.webp"
              bg="rgba(255,193,7,0.18)"
            />

            <WishlistCard
              title="Pride & Prejudice"
              price="$9.99"
              image="/images/wishlist/w3.webp"
              bg="rgba(244,143,177,0.18)"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
