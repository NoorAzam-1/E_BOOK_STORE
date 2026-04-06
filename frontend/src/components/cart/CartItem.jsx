"use client";

import Image from "next/image";

export default function CartItem({ item, updateQty, removeItem }) {
  return (
    <div className="group flex flex-col md:flex-row gap-6 pb-10 border-b border-white/5">
      {/* Image */}
      <div className="relative md:w-40 h-60 overflow-hidden shadow-xl rounded transition-transform duration-500 group-hover:-translate-y-4">
        <Image
          src={item.image}
          alt={item.title}
          height={400}
          width={250}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between">
            <div>
              <h3 className="text-2xl font-bold hover:text-primary">
                {item.title}
              </h3>
              <p className="text-on-surface-variant mt-1">
                {item.author}
              </p>
            </div>

            <p className="text-xl font-bold text-primary">
              ₹{item.price.toFixed(2)}
            </p>
          </div>

          <div className="mt-3 text-primary text-sm cursor-pointer">
            View Details →
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-6">
          <div className="flex items-center justify-center bg-surface-container-low rounded-lg p-2">
            <button
              onClick={() => updateQty(item.productId, "dec")}
              className="px-3 cursor-pointer"
            >
              -
            </button>

            <span className="px-4 font-bold">
              {item.quantity}
            </span>

            <button
              onClick={() => updateQty(item.productId, "inc")}
              className="px-3 cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.productId)}
            className="text-red-400 text-sm cursor-pointer hover:text-on-surface hover:font-semibold hover:bg-error-container hover:p-2 rounded-lg transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}