"use client";

import { useState } from "react";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";

const initialCart = [
  {
    id: 1,
    title: "The Alchemist's Shadow",
    author: "Elena V. Thorne",
    price: 240,
    quantity: 1,
    image: "/images/books/t1Book.webp",
  },
  {
    id: 2,
    title: "Beyond the Horizon",
    author: "Marcus Aurelius Jr.",
    price: 1800,
    quantity: 2,
    image: "/images/books/t2Book.webp",
  },
  {
    id: 3,
    title: "The Digital Nomad",
    author: "Sarah Jenkins",
    price: 320,
    quantity: 1,
    image: "/images/books/t3Book.webp",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const updateQty = (id, type = "inc" | "dec") => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <main className="w-full mx-auto min-h-screen">
      {/* Title */}
      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Your Collection
        </h1>
        <p className="text-sm uppercase text-on-surface-variant mt-2">
          {cart.length} items ready for your library
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT */}
        <div className="lg:col-span-8 space-y-10">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateQty={updateQty}
              removeItem={removeItem}
            />
          ))}
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4">
          <OrderSummary subtotal={subtotal} tax={tax} total={total} />
        </div>
      </div>
    </main>
  );
}
