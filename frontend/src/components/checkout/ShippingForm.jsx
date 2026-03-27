export default function ShippingForm() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold uppercase mb-6">
        Shipping Details
      </h2>

      <form className="space-y-6">
        <input
          placeholder="Full Name"
          className="w-full border-b bg-transparent py-3 focus:border-primary outline-none"
        />

        <input
          placeholder="Street Address"
          className="w-full border-b bg-transparent py-3 focus:border-primary outline-none"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="City"
            className="border-b bg-transparent py-3 outline-none"
          />
          <input
            placeholder="ZIP Code"
            className="border-b bg-transparent py-3 outline-none"
          />
        </div>
      </form>
    </section>
  );
}