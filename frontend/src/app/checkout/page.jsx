import ProgressSteps from "@/components/checkout/ProgressSteps";
import OrderSummary from "@/components/checkout/OrderSummary";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethod from "@/components/checkout/PaymentMethod";

export default function CheckoutPage() {
  return (
    <main className="max-w-xl py-4 md:py-0 mx-auto bg-surface text-on-surface">
      {/* Progress */}
      <ProgressSteps />

      {/* Order */}
      <OrderSummary />

      {/* Shipping */}
      <ShippingForm />

      {/* Payment */}
      <PaymentMethod />

      <div className="bottom-0 left-0 w-full p-6 bg-surface/90 backdrop-blur-xl border-t border-white/5">
        <div className="max-w-lg mx-auto">
          <button className="w-full bg-linear-to-r from-primary to-primary-container py-5 rounded-xl font-bold uppercase tracking-widest text-on-primary active:scale-95 transition">
            Complete Purchase
          </button>
        </div>
      </div>
    </main>
  );
}