"use client";
import Link from "next/link";
import {
  Menu,
  ShoppingCart,
  X,
  Home,
  Compass,
  Library,
  User,
  LogIn,
} from "lucide-react";
import { site } from "@/data/site";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync, getProfile } from "@/features/authSlice";
import { getCart } from "@/features/cartSlice";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const profileRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  //  Redux user
  const { user } = useSelector((state) => state.auth);
  const { cartCount } = useSelector((state) => state.cart);
  const isLoggedIn = !!user;

  //  Fetch profile on refresh (important)
  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
      dispatch(getCart());
    }
  }, [dispatch, user, cartCount]);

  const handleMouseEnter = () => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom - 4,
        left: rect.left - 60 + rect.width,
      });
      setProfileOpen(true);
    }
  };

  const logout = async () => {
    setProfileOpen(false);
    dispatch(logoutUserAsync());
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Browse", href: "/browse", icon: Compass },
    { name: "Library", href: "/library", icon: Library },
  ];

  return (
    <>
      <header className="fixed top-0 z-[999] w-full border-b border-outline-variant/80 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 md:px-6 py-4">
          <div className="flex items-center gap-1 md:gap-4">
            <button
              onClick={() => setOpen(true)}
              className="text-primary md:hidden cursor-pointer hover:text-tertiary"
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

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* LOGIN / PROFILE */}
            {isLoggedIn ? (
              <button
                ref={profileRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setProfileOpen(false)}
              >
                <User className="h-6 w-6 text-primary cursor-pointer" />
              </button>
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
                <span className="absolute -right-2 -top-2 bg-primary text-black text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {cartCount || 0}
                </span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* DROPDOWN */}
      {profileOpen && isLoggedIn && (
        <div
          style={{
            position: "fixed",
            top: dropdownPos.top,
            left: dropdownPos.left,
          }}
          onMouseEnter={() => setProfileOpen(true)}
          onMouseLeave={() => setProfileOpen(false)}
          className="w-56 bg-background border border-outline-variant/20 rounded-lg shadow-xl py-2 z-50"
        >
          <Link href="/profile" className="block px-4 py-2 hover:bg-white/5">
            My Profile
          </Link>

          <Link href="/orders" className="block px-4 py-2 hover:bg-white/5">
            Orders
          </Link>

          <Link href="/wishlist" className="block px-4 py-2 hover:bg-white/5">
            Wishlist
          </Link>

          <p
            onClick={logout}
            className="px-4 py-2 cursor-pointer hover:bg-red-500/10 text-red-500"
          >
            Logout
          </p>
        </div>
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-65 bg-background shadow-2xl border-r border-outline-variant/20 transform transition-transform duration-300 z-60 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-outline-variant/20  ">
          <span className="text-primary font-bold text-lg">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer hover:text-red-600"
          >
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
                onClick={() => {
                  setOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-mdtext-on-surface hover:bg-white/5"
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
          className="fixed inset-0 bg-black/60 z-50"
        />
      )}
    </>
  );
}
