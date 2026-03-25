"use client";

import { useEffect, useState } from "react";
import { User, History, CreditCard, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const [active, setActive] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch profile data safely
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token", token);

        if (!token) {
          console.log("❌ No token found");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:4000/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
          console.log("❌ Failed to fetch user");
        }
      } catch (error) {
        console.log("🔥 Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-on-surface-variant">
        Loading profile...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* PROFILE HEADER */}
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="w-28 h-28 rounded-full p-[2px] bg-linear-to-tr from-primary to-primary-container">
            <Image
              src="/images/profile.jfif"
              alt="profile"
              height={200}
              width={200}
              className="w-full h-full rounded-full object-cover border-4 border-background"
            />
          </div>

          <h2 className="text-2xl font-bold">
            {user?.name || "No Name"}
          </h2>
        </section>

        {/* STATS */}
        <section className="bg-surface-container p-5 rounded-xl border border-outline-variant/20">
          <h3 className="text-xs uppercase tracking-widest text-on-surface-variant mb-4">
            Library Insights
          </h3>

          <div className="flex justify-between text-center">
            <Stat number="124" label="Books Read" />
            <Divider />
            <Stat number="842" label="Reading Hours" />
            <Divider />
            <Stat number="12" label="Day Streak" />
          </div>
        </section>

        {/* ACCOUNT MENU */}
        <section className="space-y-3">
          <h3 className="text-xs uppercase tracking-widest text-on-surface-variant px-1">
            Account Management
          </h3>

          <div className="bg-surface-container rounded-xl border border-outline-variant/20 overflow-hidden">
            <MenuItem
              icon={<User size={18} />}
              label="Personal Information"
              value="personal"
              active={active}
              onClick={() => setActive("personal")}
            />

            <MenuItem
              icon={<History size={18} />}
              label="Order History"
              value="orders"
              active={active}
              onClick={() => setActive("orders")}
            />

            <MenuItem
              icon={<CreditCard size={18} />}
              label="Payment Methods"
              value="payment"
              active={active}
              onClick={() => setActive("payment")}
            />
          </div>
        </section>

        {/* DYNAMIC CONTENT */}
        <section className="bg-surface-container p-5 rounded-xl border border-outline-variant/20">
          {active === "personal" && <PersonalInfo user={user} />}
          {active === "orders" && <OrderHistory />}
          {active === "payment" && <PaymentMethods />}

          {active === "profile" && (
            <p className="text-sm text-on-surface-variant text-center">
              Select an option to view details
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div className="flex-1">
      <p className="text-2xl font-bold text-primary">{number}</p>
      <p className="text-[10px] uppercase text-on-surface-variant">{label}</p>
    </div>
  );
}

function Divider() {
  return <div className="w-px bg-outline-variant/30 mx-2" />;
}

function MenuItem({ icon, label, onClick, value, active }) {
  const isActive = active === value;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-4 transition group border-b border-outline-variant/10 last:border-none
        ${isActive ? "bg-primary/10" : "hover:bg-white/5"}
      `}
    >
      <div className="flex items-center gap-3">
        <span
          className={`transition ${
            isActive ? "text-primary scale-110" : "text-primary"
          }`}
        >
          {icon}
        </span>

        <span
          className={`text-sm ${isActive ? "text-primary font-semibold" : ""}`}
        >
          {label}
        </span>
      </div>

      {isActive ? (
        <ChevronRight size={18} className="text-primary rotate-90" />
      ) : (
        <ChevronRight size={16} className="text-outline/50" />
      )}
    </button>
  );
}

function PersonalInfo({ user }) {
  return (
    <div className="space-y-3 text-sm">
      <h3 className="font-bold text-primary mb-3">
        Personal Information
      </h3>

      <InfoRow label="Name" value={user?.name || "N/A"} />
      <InfoRow label="Email" value={user?.email || "N/A"} />
    </div>
  );
}

function OrderHistory() {
  const orders = [
    { id: "#ORD123", book: "Atomic Habits", price: "₹299" },
    { id: "#ORD124", book: "Deep Work", price: "₹399" },
  ];

  return (
    <div>
      <h3 className="font-bold text-primary mb-3">Order History</h3>

      <div className="space-y-3">
        {orders.map((o, i) => (
          <div
            key={i}
            className="flex justify-between p-3 bg-surface-container-high rounded-lg"
          >
            <div>
              <p className="text-sm font-medium">{o.book}</p>
              <p className="text-xs text-on-surface-variant">{o.id}</p>
            </div>

            <span className="text-primary font-semibold">
              {o.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentMethods() {
  const cards = [
    { type: "Visa", number: "**** 1234" },
    { type: "MasterCard", number: "**** 5678" },
  ];

  return (
    <div>
      <h3 className="font-bold text-primary mb-3">
        Payment Methods
      </h3>

      <div className="space-y-3">
        {cards.map((card, i) => (
          <div
            key={i}
            className="flex justify-between p-3 bg-surface-container-high rounded-lg"
          >
            <span>{card.type}</span>
            <span className="text-on-surface-variant">
              {card.number}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-outline-variant/10 pb-2">
      <span className="text-on-surface-variant">{label}</span>
      <span>{value}</span>
    </div>
  );
}