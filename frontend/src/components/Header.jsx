"use client";
import Link from "next/link";
import {
  User,
  LogIn,
  Heart,
  UserRoundCog,
  LogOut,
  X,
  ShoppingCart,
  Menu,
  Home,
  Library,
  ShoppingBag,
  Search,
} from "lucide-react";

import { site } from "@/data/site";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync, getProfile } from "@/features/authSlice";
import { getCart } from "@/features/cartSlice";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  // Redux
  const { user } = useSelector((state) => state.auth);
  const { cartCount } = useSelector((state) => state.cart);
  const { wishlist = [] } = useSelector((state) => state.wishlist);
  const isLoggedIn = !!user;
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!user && !isLoggingOut) {
      dispatch(getProfile());
      dispatch(getCart());
    }
  }, [dispatch, user, isLoggingOut]);

  const logout = async () => {
    setIsLoggingOut(true);
    setProfileOpen(false);
    dispatch(logoutUserAsync());
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Browse", href: "/browse", icon: Search },
    { name: "Library", href: "/library", icon: Library },
  ];

  return (
    <>
      <header className="fixed top-0 z-40 w-full border-b border-outline-variant/80 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 md:px-6 py-4">
          {/* LEFT */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setOpen(true)}
              className="text-primary md:hidden hover:text-tertiary"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link
              href="/"
              className="font-headline text-xl font-black uppercase text-primary hover:text-tertiary"
            >
              {site.brand}
            </Link>
          </div>

          {/* CENTER */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition text-on-surface hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-4 relative">
            {/* PROFILE / LOGIN */}
            {isLoggedIn ? (
              <div
                className="relative"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() =>
                  setTimeout(() => setProfileOpen(false), 150)
                }
              >
                <UserRoundCog className="h-6 w-6 text-primary cursor-pointer" />

                {/* DROPDOWN */}
                {profileOpen && (
                  <div className="absolute -right-6 md:-right-10 lg:-right-12 xl:-right-20 top-6 w-48 bg-background border border-outline-variant/30 rounded-xl shadow-2xl z-50 backdrop-blur-xl">
                    {/* LINKS */}
                    <div className="py-2 text-sm">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition"
                      >
                        <User size={16} />
                        My Profile
                      </Link>

                      <Link
                        href="/orders"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition"
                      >
                        <ShoppingBag size={16} />
                        Orders
                      </Link>

                      <Link
                        href="/wishlist"
                        className="flex items-center justify-between px-4 py-2 hover:bg-white/5 transition"
                      >
                        <div className="flex items-center gap-3">
                          <Heart size={16} />
                          Wishlist
                        </div>

                        {wishlist.length > 0 && (
                          <span className="text-xs bg-primary text-black px-2 py-0.5 rounded-full font-bold">
                            {wishlist.length}
                          </span>
                        )}
                      </Link>
                    </div>

                    {/* LOGOUT */}
                    <div className="border-t border-outline-variant/20 mt-2 pt-2">
                      <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-2 w-full text-red-500 hover:bg-red-500/10 transition"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 text-sm font-semibold hover:text-primary"
              >
                <LogIn size={16} />
                Login
              </Link>
            )}

            {/* CART */}
            {isLoggedIn && (
              <Link href="/cart" className="relative text-primary">
                <ShoppingCart className="h-6 w-6" />

                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 bg-primary text-black text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-background shadow-2xl border-r border-outline-variant/20 transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-outline-variant/20">
          <span className="text-primary font-bold text-lg">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="flex flex-col p-4 gap-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-3 rounded-md hover:bg-white/5"
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}
    </>
  );
}
