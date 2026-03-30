"use client";

import { useState } from "react";
import Sidebar from "@/components/browse/Sidebar";
import BookGrid from "@/components/browse/BookGrid";
import { Menu } from "lucide-react";

const books = [
  {
    title: "The Celestial Voyage",
    author: "Evelyn Thorne",
    price: 634.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXVSuAT1ZKOBB7itMX_SVZD_y_mABZlU2Vy2txjKf4kmdQazC1UqKnxX3a2uUCeoBzAi_yv9iLXC1kB4674Y41nOuVzVuvn4orktMfXh3grrMSHIztDme8NOpb1KYD0qbl6GgolXgPniYxXHuaEhcfyHUXLnguZXPHmR0g5SERz-MOx55_kvoAhDLkK3ISkE7qPeITlXP_KAPdLfbGoe1clAXkMFcuFV6N_pENP0swn17dTZSBaqLwy-FThpQEP2illey4rpaTLIY",
  },
  {
    title: "Ethereal Fragments",
    author: "Marcus Vane",
    price: 842.5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyFXbg6wI9X0zMy_w-mwaCZdIRgJueMzG7XVP_0aev14fExCgmEtonUQdKAG1LNAgJsxYcNWmC38zoBjGo6c45BK33ONKIVG7WuB-tpHy0bTg1L0kXcxI7g0xS4C_MfVIsMhJH3jBANQjo-x62zMAyM9YnAr4zo62sujmRutGDiqVcDowkDbShDB0zFNpgiVd05lb3-ZmcjSrXjM7K8AnfKL0Eq3yHwT-oIDcdFkp_dJyXRYNcUVEuP9CuGuCaxDGYiOf9FQPtvp8",
  },
  {
    title: "Architect of Silence",
    author: "Julianna S. Aris",
    price: 428.9,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCUs7eimUoSlqzOGN0P_yO2UCSTkwpQXJL5F4AmpdR7eraQa30uCGB_g4tChgT1rWcj1OSQAQ0EgsPh-Wwce03as1RFYNsIw1Q3GLYSM9w2254x9AB59Wx0O47XEOPnYwnLyq28BHSiovnjAF5F2O0zFGXDzJC1Vu5gSxq_cmvcxMV6F9_zqX6V_zo5-dsGb3rDf62Yl9UnHEUT_4u6Rp6EWEsAyhhGazykpwA1PYm-zB96s-karqJbwLQIzn3Mv8IdGEFn3lmoK8",
  },
  {
    title: "The Golden Hour",
    author: "Liora Vance",
    price: 919.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDszH3oUprztVh-gGAtUG9MJxzc3UgDXeX0oe2QGXAQOauyQHFXlJN8VnN5nGdzyIqGIJ-O23i53TAfAAN1G3IbpCtTxoPSmmVAuy2KNajXf5b1bgxx2V8OLAzrohxxXEw1L6DaARsTOLsDM9v5OsF5TCSeHN2Dw60SvsDF6Cae24yCOzdvW0aPweqixbAs4YHfr6o8N96-fbykY__ZuezWmV9H7V4FjaheguPQxmm1O6UirA1C_sEOTyCbnpK2ZSA-LQ04gcyvpuk",
  },
  {
    title: "Echoes of Versailles",
    author: "Count de Merlo",
    price: 2255.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5Um8SFeLczRIoSIxCsKTOGkVvMePaThZhECUQZT9W9CXnjoYUloRSs-jQxp6Ht9xKmTG4492cTchKJKrIv_32wGa-DTMleA4mtV3nKgycN5PdvFsrB3ZI9D6uqxQWklU_kL_n-JoZPuKwIKpXFprs8wRqBdy3sFS7nWYGixH43seZtKZXWCbUA6EA2ErN--SQhJs8zIxqaOPPcFVRBOl9Fz3vsW1k8sbIrpVn2zHpOZIwiFa8WEp0djBkS56DWOOAu1caaXXCSgE",
  },
  {
    title: "The Velocity of Thought",
    author: "Dr. Simon K. Wells",
    price: 1112.99,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwhZgkVrKuwu0Bol3E1TiPzQLXR6i811ED0O8FwELur3VcTZh3B6tHKV2oOP4xH4RD_j2U1ufKpB_NullSUl_Sc8Qz52uUH8R4bw32y5hPpzdUZ8uMxexZEoRVmtE7Qkfz3oY_mNja7jH3qO3H2JB1s05QMX2n2vIo2XUTFERtsQqATRrGWUUdkUsWIop9UZzJiJ_yYrcjxX-8-bm-K8KJ-IvfYB8Ou8MQ-L_ljqhWAQ4UhseZyd_zV_NYyPwBj4kH79wVRP-7QoM",
  },
];


export default function BrowsePage() {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedGenre ? book.genre === selectedGenre : true) &&
      book.price <= maxPrice
    );
  });

  return (
    <main className="w-full mx-auto flex gap-12 bg-surface text-on-surface relative">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-18 left-4 z-50 bg-surface-container p-2 rounded-lg"
      >
        <Menu />
      </button>

      {/* SIDEBAR */}
      <Sidebar
        open={open}
        setOpen={setOpen}
        search={search}
        setSearch={setSearch}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      {/* MAIN */}
      <div className="flex-1 mt-14 md:mt-0">
        <header className="mb-12">
          <p className="text-xs tracking-[0.3em] text-primary uppercase opacity-80">
            Collection
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Find Your Next Read
          </h2>
        </header>

        <BookGrid books={filteredBooks} />
      </div>
    </main>
  );
}