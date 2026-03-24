"use client";

import Link from "next/link";
import {
  Menu,
  ShoppingCart,
  X,
  Home,
  Compass,
  Library,
  LogIn,
} from "lucide-react";
import { site } from "@/data/site";
import { useState } from "react";

export default function Header() {
  const [active, setActive] = useState("/");
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Browse", href: "/browse", icon: Compass },
    { name: "Library", href: "/library", icon: Library },
    { name: "Login", href: "/login", icon: LogIn },
  ];

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 z-40 w-full border-b border-outline-variant/20 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="text-primary md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link
              href="/"
              onClick={() => setActive("/")}
              className="font-headline text-xl font-black uppercase text-primary"
            >
              {site.brand}
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`transition ${
                  active === link.href
                    ? "text-primary"
                    : "text-on-surface hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CART */}
          <button className="relative text-primary">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -right-2 -top-2 bg-primary text-black text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              3
            </span>
          </button>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-background shadow-2xl border-r border-outline-variant/20 transform transition-transform duration-300 z-[60]
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-outline-variant/20">
          <span className="text-primary font-bold text-lg">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col p-4 gap-3">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActive(link.href);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-md transition ${
                  active === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-on-surface hover:bg-white/5"
                }`}
              >
                {/* ICON */}
                <Icon size={18} />

                {/* TEXT */}
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
