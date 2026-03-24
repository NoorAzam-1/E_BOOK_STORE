import Link from "next/link";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { site } from "@/data/site";

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl shadow-2xl shadow-blue-950/20">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button className="scale-95 text-primary transition-transform active:opacity-80 md:hidden" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="font-headline text-xl font-black uppercase tracking-tighter text-primary">
            {site.brand}
          </Link>
        </div>

        <div className="hidden flex-1 max-w-xl mx-12 md:flex">
          <div className="group relative w-full">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary" />
            <input
              type="text"
              placeholder="Search curated titles..."
              className="w-full rounded-xl border-none bg-surface-container-lowest py-3 pl-12 text-sm text-on-surface outline-none ring-0 transition-all placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-0"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-8 text-sm font-semibold tracking-wide md:flex">
            <Link className="text-primary transition-colors duration-300" href="#">
              Home
            </Link>
            <Link className="text-on-surface transition-colors duration-300 hover:text-primary" href="#">
              Browse
            </Link>
            <Link className="text-on-surface transition-colors duration-300 hover:text-primary" href="#">
              Library
            </Link>
            <Link className="text-on-surface transition-colors duration-300 hover:text-primary" href="#">
              Login
            </Link>
          </nav>

          <button className="relative scale-95 text-primary transition-transform active:opacity-80 cursor-pointer" aria-label="Cart">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -right-2 -top-2 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-on-primary">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}