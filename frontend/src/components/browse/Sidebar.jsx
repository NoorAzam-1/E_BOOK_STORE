import { Search, IndianRupee, X } from "lucide-react";

export default function Sidebar({
  open,
  setOpen,
  search,
  setSearch,
  selectedGenre,
  setSelectedGenre,
  maxPrice,
  setMaxPrice,
}) {
  const genres = [
    "Classic Literature",
    "Philosophical",
    "Modern Art",
    "Poetry",
    "History",
  ];

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`w-80 p-4 space-y-6 bg-surface-container z-10 fixed top-0 left-0 h-full transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:sticky md:top-16 md:h-fit
  `}
      >
        {/* CLOSE BUTTON */}
        <button onClick={() => setOpen(false)} className="md:hidden mb-4">
          <X />
        </button>

        {/* 🔍 SEARCH */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-outline-variant" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your next great read..."
            className="w-full bg-surface-container-low border-b border-outline-variant pl-10 py-3 text-sm focus:border-primary outline-none"
          />
        </div>

        {/* 🎯 GENRES */}
        <section>
          <h3 className="text-xs font-headline text-primary tracking-[0.1rem] uppercase mb-3">
            Genres
          </h3>

          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(selectedGenre === g ? "" : g)}
                className={`px-4 py-1.5 rounded-full text-xs transition ${
                  selectedGenre === g
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-highest text-on-surface-variant hover:bg-primary hover:text-on-primary"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </section>

        {/* 💰 PRICE */}
        <section>
          <div className="flex justify-between text-xs mb-3">
            <h3 className="text-primary uppercase tracking-[0.1rem]">
              Price Range
            </h3>
            <span className="flex items-center">
              <IndianRupee size={12} />
              100 — <IndianRupee size={12} />
              {maxPrice}
            </span>
          </div>

          <input
            type="range"
            min="100"
            max="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </section>

        <section>
          <h3 className="text-primary text-xs uppercase mb-3">
            Curator Rating
          </h3>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" />
            ⭐⭐⭐⭐⭐ Masterpiece
          </label>

          <label className="flex items-center gap-2 text-sm mt-2">
            <input type="checkbox" />
            ⭐⭐⭐⭐ Highly Recommended
          </label>
        </section>
      </aside>
    </>
  );
}
