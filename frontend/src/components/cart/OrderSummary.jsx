
export default function OrderSummary({ subtotal, tax, total, data }) {
  const handleCheckout = () => {
    localStorage.setItem("checkoutData", JSON.stringify(data));
    window.location.href = "/checkout";
  };

  return (
    <div className="glass-card flex flex-col p-4 md:p-8 rounded-xl border border-white/5 sticky top-24">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-2  md:space-y-4 mb-6 text-on-surface-variant">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-on-surface font-semibold">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Tax</span>
          <span className="text-on-surface font-semibold">
            ₹{tax.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Digital Delivery</span>
          <span className="text-primary font-semibold">Free</span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 mb-6">
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span className="text-primary">₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Promo */}
      <div className="relative mb-4">
        <input
          placeholder="Promo Code"
          className="w-full bg-surface-container-lowest border-b border-outline-variant py-3 outline-none"
        />
        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary font-bold text-sm cursor-pointer">
          APPLY
        </button>
      </div>

      {/* Button */}
      <button
        onClick={handleCheckout}
        className="w-full bg-primary text-on-primary py-3 px-4 rounded-lg font-bold hover:scale-[1.02] transition cursor-pointer"
      >
        Proceed to Checkout →
      </button>

      {/* Note */}
      <div className="mt-6 text-xs text-on-surface-variant flex gap-2">
        🔒 Secure digital delivery guaranteed.
      </div>
    </div>
  );
}
