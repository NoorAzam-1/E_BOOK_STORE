"use client";
import { useState } from "react";

export default function PaymentMethod() {
  const [method, setMethod] = useState("card");

  return (
    <section className="mb-16">
      <h2 className="text-xl font-bold uppercase mb-6">
        Payment Method
      </h2>

      <div className="space-y-4">

        {/* Card */}
        <div
          onClick={() => setMethod("card")}
          className={`p-5 rounded-xl cursor-pointer border transition ${
            method === "card"
              ? "border-primary bg-surface-container-high"
              : "border-white/5"
          }`}
        >
          Credit/Debit Card
        </div>

        {/* Wallet */}
        <div
          onClick={() => setMethod("upi")}
          className={`p-5 rounded-xl cursor-pointer border transition ${
            method === "upi"
              ? "border-primary bg-surface-container-high"
              : "border-white/5"
          }`}
        >
          UPI
        </div>
      </div>
    </section>
  );
}