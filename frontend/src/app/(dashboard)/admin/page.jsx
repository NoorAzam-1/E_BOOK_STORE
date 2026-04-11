"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, User, Book, IndianRupee, Calendar } from "lucide-react";
import Image from "next/image";

import { getAllProducts, deleteProduct } from "@/features/productSlice";
import { getAllUsers, deleteUser } from "@/features/adminSlice";
import { getAllFeedback, deleteFeedback } from "@/features/feedbackSlice";
import OrderCard from "@/components/orders/OrderCard";

export default function AdminPage() {
  const dispatch = useDispatch();

  const { products = [] } = useSelector((state) => state.product);
  const { users = [] } = useSelector((state) => state.admin);
  const { feedbacks = [] } = useSelector((state) => state.feedback);
  console.log("🚀 ~ file: page.jsx:17 ~ AdminPage ~ feedbacks:", feedbacks);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllUsers());
    dispatch(getAllFeedback());
  }, [dispatch]);

  const now = new Date();

  // USERS
  const thisMonthUsers = users.filter((u) => {
    const d = new Date(u.createdAt);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });

  const lastMonthUsers = users.filter((u) => {
    const d = new Date(u.createdAt);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    return (
      d.getMonth() === lastMonth.getMonth() &&
      d.getFullYear() === lastMonth.getFullYear()
    );
  });

  const userGrowth =
    lastMonthUsers.length === 0
      ? 100
      : ((thisMonthUsers.length - lastMonthUsers.length) /
          lastMonthUsers.length) *
        100;

  // BOOKS
  const thisMonthBooks = products.filter((p) => {
    const d = new Date(p.createdAt);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });

  const lastMonthBooks = products.filter((p) => {
    const d = new Date(p.createdAt);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    return (
      d.getMonth() === lastMonth.getMonth() &&
      d.getFullYear() === lastMonth.getFullYear()
    );
  });

  const bookGrowth =
    lastMonthBooks.length === 0
      ? 100
      : ((thisMonthBooks.length - lastMonthBooks.length) /
          lastMonthBooks.length) *
        100;

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleDeleteFeedback = (id) => {
    dispatch(deleteFeedback(id));
  };

  return (
    <div className="p-2 sm:p-3 md:p-6 space-y-4 md:space-y-6 lg:space-y-12">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-extrabold text-primary">
          Admin Dashboard
        </h1>
        <p className="text-on-surface-variant text-sm">Manage your platform</p>
      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* TOTAL BOOKS */}
        <div className="glass-card p-5 rounded-xl border border-outline-variant relative overflow-hidden">
          <span className="absolute right-3 bottom-2 opacity-10 text-primary text-6xl">
            📚
          </span>
          <p className="text-sm text-on-surface-variant">Total Books</p>
          <h2 className="text-2xl font-bold">{products.length}</h2>
        </div>

        {/* BOOKS THIS MONTH */}
        <div className="glass-card p-5 rounded-xl border border-outline-variant relative overflow-hidden hover:scale-[1.02] transition">
          <span className="absolute right-3 bottom-2 opacity-10 text-primary text-6xl animate-pulse">
            📈
          </span>

          <p className="text-sm text-on-surface-variant">Books Added</p>
          <h2 className="text-2xl font-bold text-primary">
            {thisMonthBooks.length}
          </h2>

          <p
            className={`text-xs font-semibold mt-1 ${bookGrowth >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {bookGrowth >= 0 ? "▲" : "▼"} {Math.abs(bookGrowth).toFixed(1)}%
          </p>

          <p className="text-[10px] text-on-surface-variant">vs last month</p>
        </div>

        {/* TOTAL USERS */}
        <div className="glass-card p-5 rounded-xl border border-outline-variant relative overflow-hidden">
          <span className="absolute right-3 bottom-2 opacity-10 text-primary text-6xl">
            👤
          </span>
          <p className="text-sm text-on-surface-variant">Total Users</p>
          <h2 className="text-2xl font-bold">{users.length}</h2>
        </div>

        {/* USERS THIS MONTH */}
        <div className="glass-card p-5 rounded-xl border border-outline-variant relative overflow-hidden hover:scale-[1.02] transition">
          <span className="absolute right-3 bottom-2 opacity-10 text-primary text-6xl animate-pulse">
            🚀
          </span>

          <p className="text-sm text-on-surface-variant">New Users</p>
          <h2 className="text-2xl font-bold text-primary">
            {thisMonthUsers.length}
          </h2>

          <p
            className={`text-xs font-semibold mt-1 ${userGrowth >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {userGrowth >= 0 ? "▲" : "▼"} {Math.abs(userGrowth).toFixed(1)}%
          </p>

          <p className="text-[10px] text-on-surface-variant">vs last month</p>
        </div>
      </div>

      {/* 👤 USERS */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          👤 Users
        </h2>

        <div className="space-y-4">
          {users
            .filter((u) => u.role !== "admin")
            .map((u) => {
              const joinedDate = new Date(u.createdAt).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                },
              );

              return (
                <div
                  key={u._id}
                  className="relative glass-card p-5 rounded-xl border border-outline-variant flex flex-col md:flex-row justify-between gap-4 hover:scale-[1.01] transition"
                >
                  {/* BG ICON */}
                  <span className="absolute z-10 right-3 bottom-2 opacity-10 text-primary text-7xl">
                    👤
                  </span>

                  {/* LEFT */}
                  <div>
                    <h3 className="text-lg font-semibold">{u.name}</h3>
                    <p className="text-sm text-on-surface-variant">{u.email}</p>

                    <p className="text-xs text-on-surface-variant">
                      📅 Joined: {joinedDate}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex z-20 flex-col items-end gap-2">
                    {/* ROLE */}
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        u.role === "seller"
                          ? "bg-tertiary text-on-tertiary"
                          : "bg-surface-container-high text-on-surface"
                      }`}
                    >
                      {u.role || "user"}
                    </span>

                    {/* DELETE */}
                    <button
                      onClick={() => dispatch(deleteUser(u._id))}
                      className="flex items-center gap-2 text-error cursor-pointer hover:text-red-600 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* 📚 BOOKS */}
      <section>
        <h2 className="text-2xl font-bold mb-3 md:mb-6 flex items-center gap-2">
          <Book className="text-primary" /> Books
        </h2>

        <div className="space-y-3 md:space-y-6">
          {products.map((p) => {
            const image =
              p.image?.url || p.image || p.images?.[0]?.url || "/fallback.png";

            return (
              <div
                key={p._id}
                className="relative glass-card flex flex-col md:flex-row gap-3 mdLgap-6 p-3 md:p-5 rounded-2xl border border-outline-variant hover:scale-[1.01] transition"
              >
                {/* BACKGROUND ICON */}
                <Book
                  size={90}
                  className="absolute right-4 bottom-14 md:bottom-2 text-primary opacity-10 animate-pulse"
                />

                {/* IMAGE */}
                <div className="relative w-full md:w-40 h-52 rounded-xl overflow-hidden">
                  <Image
                    src={image}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Book size={18} /> {p.title}
                  </h3>

                  <p className="flex items-center gap-2 text-on-surface-variant">
                    <User size={14} /> {p.author || "Unknown"}
                  </p>

                  <p className="flex items-center gap-2 text-primary font-semibold">
                    <IndianRupee size={14} /> {p.price}
                  </p>

                  <p className="flex items-center gap-2 text-xs text-on-surface-variant">
                    <Calendar size={14} />
                    {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => handleDeleteProduct(p._id)}
                  className="h-fit px-4 py-2 bg-error text-on-error rounded-lg flex items-center gap-2 cursor-pointer active:scale-95 hover:opacity-80 transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 📦 ORDERS */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        <div className="space-y-6 mt-6">
          <OrderCard type="stack" status="completed" />
          <OrderCard type="single" status="processing" />
        </div>
      </section>

      {/* 💬 FEEDBACK */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Feedback</h2>

        <div className="space-y-4">
          {feedbacks.map((f) => {
            const date = new Date(f.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return (
              <div
                key={f._id}
                className="relative glass-card p-4 sm:p-5 rounded-xl border border-outline-variant flex flex-col sm:flex-row justify-between gap-4 hover:scale-[1.01] transition"
              >
                {/* BG ICON */}
                <span className="absolute right-3 bottom-2 opacity-10 z-10 text-primary text-6xl">
                  💬
                </span>

                {/* LEFT CONTENT */}
                <div className="flex-1 space-y-2">
                  {/* MESSAGE */}
                  <p className="text-sm sm:text-base font-medium">
                    {f.feedback}
                  </p>

                  {/* USER INFO */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-on-surface-variant">
                    <span className="flex items-center gap-1">👤 {f.name}</span>

                    <span className="hidden sm:block">•</span>

                    <span className="flex items-center gap-1">
                      📧 {f.email}
                    </span>
                    {/* DATE */}
                    <p className="text-[11px] text-on-surface-variant flex items-center gap-1">
                      📅 {date}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center justify-end sm:justify-center ">
                  <button
                    onClick={() => handleDeleteFeedback(f._id)}
                    className="flex items-center gap-2 text-error cursor-pointer active:scale-95 hover:opacity-80 z-20 transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
