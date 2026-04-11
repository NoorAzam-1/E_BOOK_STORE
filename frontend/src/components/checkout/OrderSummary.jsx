"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OrderSummary() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("checkoutData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setItems(parsed);
    }
  }, []);

  if (items.length === 0) return <p className="p-10 text-center">Please add book to cart</p>;
  if (!items.length) return <p className="p-10 text-center">Loading...</p>;


  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold uppercase mb-6">Order Summary</h2>

      <div className="space-y-6">
        {/* ITEMS */}
        {items.map((i) => {
          const { productId, title, image, price, quantity } = i;

          return (
            <div
              key={productId}
              className="bg-surface-container-low p-6 rounded-xl space-y-4"
            >
              <div className="flex gap-4">
                <Image
                  alt="image"
                  src={image || "/fallback.png"}
                  height={500}
                  width={300}
                  className="w-20 h-28 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-bold">{title}</h3>

                  <p className="text-sm text-on-surface-variant">
                    Qty: {quantity}
                  </p>

                  <p className="text-primary font-bold mt-2">
                    ₹{price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* TOTAL SECTION */}
        <div className="border-t border-outline-variant pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-primary">Free</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span className="text-primary">₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
