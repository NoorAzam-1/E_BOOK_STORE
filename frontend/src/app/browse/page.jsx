import Sidebar from "@/components/browse/Sidebar";
import BookGrid from "@/components/browse/BookGrid";

export default function BrowsePage() {
  return (
    <main className="w-full mx-auto flex gap-12 bg-surface text-on-surface">
      
      {/* Sidebar */}
      <div className="w-full max-w-72">
      <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <p className="text-xs font-headline tracking-[0.3em] text-primary uppercase opacity-80">
              Collection
            </p>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">
                Find Your Next Read
            </h2>
          </div>

        </header>

        {/* Books */}
        <div className="min-h-screen">
        <BookGrid />
        </div>

        {/* Pagination */}
        <div className="mt-24 flex flex-col items-center gap-6">
          <p className="text-xs font-headline tracking-widest text-outline uppercase">
            Showing 6 of 124 Titles
          </p>
          <button className="px-12 py-4 border border-primary/30 text-primary font-bold uppercase text-xs rounded hover:bg-primary/10 transition cursor-pointer">
            View More Curations
          </button>
        </div>
      </div>
    </main>
  );
}