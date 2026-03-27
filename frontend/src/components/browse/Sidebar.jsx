import { Search } from 'lucide-react';
import { IndianRupee } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="fixed hidden lg:flex flex-col w-72 shrink-0 space-y-6">

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-outline-variant">
          <Search size={24} />
        </span>
        <input
          placeholder="Search your next great read..."
          className="w-full bg-surface-container-low border-b border-outline-variant pl-11 py-3 text-sm focus:border-primary outline-none"
        />
      </div>

      {/* Genres */}
      <section>
        <h3 className="text-xs font-headline text-primary tracking-[0.1rem] uppercase mb-3">
          Genres
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Classic Literature", "Philosophical", "Modern Art", "Poetry", "History"].map((g, i) => (
            <button
              key={i}
              className={`px-4 py-1.5 rounded-full text-xs ${
                g === "Philosophical"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-highest text-on-surface-variant hover:bg-primary hover:text-on-primary"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      {/* Price */}
      <section>
        <div className="flex justify-between text-xs mb-3">
          <h3 className="text-primary uppercase tracking-[0.1rem]">Price Range</h3>
          <span className='flex justify-center items-center'><IndianRupee size={12} />100 — <IndianRupee size={12} />5000</span>
        </div>
        <div className="h-1 bg-surface-container-highest rounded-full relative">
          <div className="absolute h-full w-2/3 bg-linear-to-r from-primary to-primary-container left-4 rounded-full"></div>
        </div>
      </section>

      {/* Rating */}
      <section>
        <h3 className="text-primary text-xs uppercase mb-3">
          Curator Rating
        </h3>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" defaultChecked />
          ⭐⭐⭐⭐⭐ Masterpiece
        </label>

        <label className="flex items-center gap-2 text-sm mt-2">
          <input type="checkbox" />
          ⭐⭐⭐⭐ Highly Recommended
        </label>
      </section>
    </aside>
  );
}