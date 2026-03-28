import OrderCard from "@/components/orders/OrderCard";
import SearchFilter from "@/components/orders/SearchFilter";

export default function OrdersPage() {
  return (
    <main className="w-full max-w-4xl mx-auto bg-surface text-on-surface">
      {/* Header */}
      <section className="mb-12">
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-4">
          Order History
        </h2>

        <p className="text-on-surface-variant max-w-xl">
          Relive your literary journeys. Access your previous acquisitions,
          download digital copies, and track ongoing shipments.
        </p>
      </section>

      {/* Search */}
      <SearchFilter />

      {/* Orders */}
      <div className="space-y-8 mt-10">
        <OrderCard type="stack" status="completed" />
        <OrderCard type="single" status="processing" />
        <OrderCard type="single" status="completed" />
      </div>

      {/* Load More */}
      <div className="mt-16 text-center">
        <button className="group text-on-surface-variant hover:text-primary font-bold text-sm uppercase tracking-widest cursor-pointer">
          Load Older Orders ↓
        </button>
      </div>
    </main>
  );
}
