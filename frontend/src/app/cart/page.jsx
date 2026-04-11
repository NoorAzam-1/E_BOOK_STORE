"use client";

import { useEffect } from "react";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  updateCart,
  removeFromCart,
} from "@/features/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // UPDATE QTY (CONNECTED TO BACKEND)
  const updateQty = (productId, type) => {
    const item = cart.items.find((i) => i.productId === productId);

    if (!item) return;

    const newQty =
      type === "inc"
        ? item.quantity + 1
        : Math.max(1, item.quantity - 1);

    dispatch(
      updateCart({
        productId,
        quantity: newQty,
      })
    );
  };

  // REMOVE
  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // CALCULATIONS
  const subtotal =
    cart?.items?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) || 0;

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
          {cart?.items?.length || 0} items ready for your library
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT */}
        <div className="lg:col-span-8 space-y-10">
          {cart?.items?.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              updateQty={updateQty}
              removeItem={removeItem}
            />
          ))}
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4">
          <OrderSummary
            subtotal={subtotal}
            tax={tax}
            total={total}
            data={cart?.items}
          />
        </div>
      </div>
    </main>
  );
}
