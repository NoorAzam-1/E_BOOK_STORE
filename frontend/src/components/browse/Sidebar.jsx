"use client";

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
  selectedFormat,
  setSelectedFormat,
}) {
  const genres = [
    "Classic Literature",
    "Philosophical",
    "Modern Art",
    "Poetry",
    "History",
    "Self-Help",
    "Fiction",
    "Non-Fiction",
  ];

  const formats = ["EPUB", "PDF", "EPUB/PDF"];

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`w-64 sm:w-72 md:w-60 lg:w-80 p-3 sm:p-4 md:p-3 lg:p-4 space-y-6 bg-surface-container z-40
        fixed top-0 left-0 h-full overflow-y-auto transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:sticky md:top-16 md:h-fit`}>
        {/* CLOSE BUTTON */}
        <button onClick={() => setOpen(false)} className="md:hidden text-primary">
          <X />
        </button>

        {/* 🔍 SEARCH */}
        <div className="relative">
          <Search className="absolute top-1/2 ml-1 -translate-y-1/2 text-outline-variant" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, author..."
            className="w-full bg-surface-container-low border-b border-outline-variant pl-10 py-2 sm:py-3 text-xs sm:text-sm focus:border-primary outline-none"
          />
        </div>

        {/* 📖 FORMAT */}
        <section>
          <h3 className="text-[10px] sm:text-xs md:text-[11px] font-headline text-primary tracking-[0.1rem] uppercase mb-3">
            Format
          </h3>
          <div className="flex flex-wrap gap-2">
            {formats.map((f) => (
              <button
                key={f}
                onClick={() =>
                  setSelectedFormat(selectedFormat === f ? "" : f)
                }
                className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs transition ${
                  selectedFormat === f
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-highest text-on-surface-variant hover:bg-primary hover:text-on-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* 🎯 GENRES */}
        <section>
          <h3 className="text-[10px] sm:text-xs md:text-[11px] font-headline text-primary tracking-[0.1rem] uppercase mb-3">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(selectedGenre === g ? "" : g)}
                className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs transition ${
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
          <div className="flex justify-between text-[10px] sm:text-xs mb-3">
            <h3 className="text-primary uppercase tracking-[0.1rem]">
              Price Range
            </h3>
            <span className="flex items-center">
              <IndianRupee size={10} />
              0 — <IndianRupee size={10} />
              {maxPrice}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </section>

        {/* ⭐ RATING */}
        <section>
          <h3 className="text-primary text-[10px] sm:text-xs uppercase mb-3">
            Average Rating
          </h3>

          <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer">
            <input type="checkbox" />
            ⭐⭐⭐⭐⭐ 4.5+
          </label>

          <label className="flex items-center gap-2 text-xs sm:text-sm mt-2 cursor-pointer">
            <input type="checkbox" />
            ⭐⭐⭐⭐ 4.0+
          </label>
        </section>
      </aside>
    </>
  );
}