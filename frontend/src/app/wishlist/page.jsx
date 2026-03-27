import WishlistList from "@/components/wishlist/WishlistList";

export default function WishlistPage() {
  return (
    <main className="max-w-5xl mx-auto bg-surface text-on-surface">

      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <span className="text-primary text-xs uppercase tracking-[0.2em] font-bold block mb-2">
            Curated Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-headline font-extrabold">
            My Wishlist
          </h2>
        </div>
      </div>

      {/* List */}
      <WishlistList />
    </main>
  );
}