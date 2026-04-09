"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/browse/Sidebar";
import BookGrid from "@/components/browse/BookGrid";
import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/features/productSlice";

export default function BrowsePage() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000000000);
  const [selectedFormat, setSelectedFormat] = useState("");

  const bookdata = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const filteredBooks = bookdata.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.description.toLowerCase().includes(search.toLowerCase());

    const matchesGenre = selectedGenre
      ? book.category.includes(selectedGenre)
      : true;

    const matchesPrice = book.price <= maxPrice;

    const matchesFormat = selectedFormat
      ? book.format.includes(selectedFormat)
      : true;

    const isAvailable = book.available !== false;

    return (
      matchesSearch &&
      matchesGenre &&
      matchesPrice &&
      matchesFormat &&
      isAvailable
    );
  });


  return (
    <main className="w-full mx-auto flex gap-12 bg-surface text-on-surface relative">
      {/* MOBILE MENU BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="md:hidden fixed top-16 left-3 z-50 bg-surface-container p-2 rounded-lg shadow-md"
        >
          <Menu size={20} />
        </button>
      )}

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
        selectedFormat={selectedFormat}
        setSelectedFormat={setSelectedFormat}
      />

      {/* MAIN */}
      <div className="flex-1 mt-14 md:mt-0">
        <header className="mb-12">
          <p className="text-xs tracking-[0.3em] text-primary uppercase opacity-80">
            E-Book Collection
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
