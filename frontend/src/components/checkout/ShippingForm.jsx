export default function ShippingForm({ data, setData, errors }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">
        Shipping Details
      </h2>

      <div className="space-y-5">

        {/* FULL NAME */}
        <div>
          <input
            placeholder="Full Name"
            value={data.name}
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
            className="input-no-icon"
          />
          {errors.name && (
            <p className="text-error text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={data.email || ""}
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
            className="input-no-icon"
          />
          {errors.email && (
            <p className="text-error text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            value={data.phone || ""}
            onChange={(e) =>
              setData({ ...data, phone: e.target.value })
            }
            className="input-no-icon"
          />
          {errors.phone && (
            <p className="text-error text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* ADDRESS */}
        <div>
          <input
            placeholder="Street Address"
            value={data.address}
            onChange={(e) =>
              setData({ ...data, address: e.target.value })
            }
            className="input-no-icon"
          />
          {errors.address && (
            <p className="text-error text-xs mt-1">{errors.address}</p>
          )}
        </div>

        {/* CITY + STATE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <input
              placeholder="City"
              value={data.city}
              onChange={(e) =>
                setData({ ...data, city: e.target.value })
              }
              className="input-no-icon"
            />
            {errors.city && (
              <p className="text-error text-xs mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <input
              placeholder="State"
              value={data.state || ""}
              onChange={(e) =>
                setData({ ...data, state: e.target.value })
              }
              className="input-no-icon"
            />
            {errors.state && (
              <p className="text-error text-xs mt-1">{errors.state}</p>
            )}
          </div>

        </div>

        {/* ZIP */}
        <div>
          <input
            placeholder="ZIP Code"
            value={data.zip}
            onChange={(e) =>
              setData({ ...data, zip: e.target.value })
            }
            className="input-no-icon"
          />
          {errors.zip && (
            <p className="text-error text-xs mt-1">{errors.zip}</p>
          )}
        </div>

      </div>
    </section>
  );
}