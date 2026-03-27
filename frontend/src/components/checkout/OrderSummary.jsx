import Image from "next/image";

export default function OrderSummary() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold uppercase mb-6">Order Summary</h2>

      <div className="bg-surface-container-low p-6 rounded-xl space-y-6">
        <div className="flex gap-4">
          <Image
            alt="image"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoHV4YccJ_ykphUaInzsIqmj7pjQLkzOf4Xlrj5gZRzeRSiHGdz8PpWfQZ-VzqxPZ3Xg-HeqI_xr-8tICZrtMnM1oq5bLbBcknLLP6QOlXH4zRuBfflbjqsbmj9nFp6RLYq1DuSMnGDdJvfSoM60nMdLkaOcu792eEHyAH7Lt5KfKxSKV6-2GpZ5MrFu0t0MfxOOV161gif3CtKai044RAAEw51VM1tA2rYFRBQC7pFTi4p21w2HdlkkZ5xeKxVcqGVJzecFhTd40"
            height={500}
            width={300}
            className="w-20 h-28 object-cover rounded"
          />

          <div className="flex-1">
            <h3 className="font-bold">The Alchemist&apos;s Shadow</h3>
            <p className="text-sm text-on-surface-variant">Qty: 1</p>
            <p className="text-primary font-bold mt-2">₹42.00</p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹42.00</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-primary">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹3.36</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span className="text-primary">₹45.36</span>
          </div>
        </div>
      </div>
    </section>
  );
}
