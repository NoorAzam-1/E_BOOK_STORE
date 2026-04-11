"use client";

export default function PaymentMethod({ data, setData, errors }) {
  return (
    <section className="mb-12">
      {/* SELECT METHOD */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* CARD */}
        <div
          onClick={() => setData({ ...data, method: "card" })}
          className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
            data.method === "card"
              ? "border-primary bg-surface-container-high"
              : "border-outline-variant"
          }`}
        >
          <span>💳 Card</span>
          {data.method === "card" && <span className="text-primary">✔</span>}
        </div>

        {/* UPI */}
        <div
          onClick={() => setData({ ...data, method: "upi" })}
          className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
            data.method === "upi"
              ? "border-primary bg-surface-container-high"
              : "border-outline-variant"
          }`}
        >
          <span>📱 UPI</span>
          {data.method === "upi" && <span className="text-primary">✔</span>}
        </div>
      </div>

      {/* 💳 CARD FORM */}
      {data.method === "card" && (
        <div className="glass-card p-5 rounded-xl border border-outline-variant space-y-4">
          {/* CARD PREVIEW */}
          <div className="p-4 rounded-xl bg-linear-to-r from-primary to-primary-container text-on-primary">
            <p className="text-sm opacity-80">Card Number</p>
            <p className="text-lg font-bold tracking-widest">
              {data.cardNumber || "**** **** **** 1234"}
            </p>

            <div className="flex justify-between mt-4 text-sm">
              <span>{data.name || "CARD HOLDER"}</span>
              <span>{data.expiry || "MM/YY"}</span>
            </div>
          </div>

          {/* INPUTS */}
          <div className="space-y-4">
            {/* CARD NUMBER */}
            <div>
              <input
                placeholder="Card Number"
                value={data.cardNumber}
                onChange={(e) =>
                  setData({ ...data, cardNumber: e.target.value })
                }
                className="input-no-icon"
              />
              {errors.cardNumber && (
                <p className="text-error text-xs mt-1">{errors.cardNumber}</p>
              )}
            </div>

            {/* NAME */}
            <div>
              <input
                placeholder="Card Holder Name"
                value={data.name || ""}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="input-no-icon"
              />
            </div>

            {/* EXPIRY + CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  placeholder="MM/YY"
                  value={data.expiry}
                  onChange={(e) => setData({ ...data, expiry: e.target.value })}
                  className="input-no-icon"
                />
                {errors.expiry && (
                  <p className="text-error text-xs mt-1">{errors.expiry}</p>
                )}
              </div>

              <div>
                <input
                  placeholder="CVV"
                  value={data.cvv}
                  onChange={(e) => setData({ ...data, cvv: e.target.value })}
                  className="input-no-icon"
                />
                {errors.cvv && (
                  <p className="text-error text-xs mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📱 UPI FORM */}
      {data.method === "upi" && (
        <div className="glass-card p-5 rounded-xl border border-outline-variant space-y-4">
          <div className="text-sm text-on-surface-variant">
            Pay using UPI (Google Pay, PhonePe, Paytm)
          </div>

          <div>
            <input
              placeholder="example@upi"
              value={data.upi}
              onChange={(e) => setData({ ...data, upi: e.target.value })}
              className="input-no-icon"
            />
            {errors.upi && (
              <p className="text-error text-xs mt-1">{errors.upi}</p>
            )}
          </div>

          {/* FAKE APPS */}
          <div className="flex gap-3 text-xs text-on-surface-variant">
            <span className="px-3 py-1 rounded bg-surface-container-high">
              GPay
            </span>
            <span className="px-3 py-1 rounded bg-surface-container-high">
              PhonePe
            </span>
            <span className="px-3 py-1 rounded bg-surface-container-high">
              Paytm
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
