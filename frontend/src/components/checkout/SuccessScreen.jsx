import Link from "next/link";

export default function SuccessScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">

      {/* ICON */}
      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-3xl animate-bounce">
        ✔
      </div>

      <h2 className="text-2xl font-bold">
        Payment Successful 🎉
      </h2>

      <p className="text-on-surface-variant text-sm max-w-sm">
        Your order has been placed successfully.  
        A confirmation email has been sent.
      </p>

      <Link href="/browse" className="px-6 py-3 bg-primary text-on-primary rounded-xl cursor-pointer active:scale-95">
        Continue Shopping
      </Link>

    </div>
  );
}