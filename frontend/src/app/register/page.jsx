"use client";
import { User, Mail, Lock, ArrowRight, Contact, MapPinHouse } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { registerUser } from "@/features/authSlice.js";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact_no: "",
    address: "",
    role: "user",
    agree: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      toast.error("Please accept Terms & Conditions");
      return;
    }

    setLoading(true);

    try {
      const res = await dispatch(
        registerUser({
          name: form.name,
          email: form.email,
          contact: form.contact_no,
          address: form.address,
          password: form.password,
          role: form.role,
        }),
      ).unwrap();

      if (res.success == true) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error || "Register Failed");
    }

    setLoading(false);
  };

  return (
    <div className="bg-background text-on-surface flex items-center justify-center px-2 py-3 md:py-0 relative overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-md z-10">
        {/* HEADING */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Begin Your Journey
          </h2>
          <p className="text-on-surface-variant text-sm">
            Join our community of digital curators.
          </p>
        </div>

        {/* CARD */}
        <div className="bg-surface-container/80 backdrop-blur-xl p-4 md:p-6 rounded-xl border border-outline-variant/20">
          <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
            {/* FULL NAME */}
            <InputField
              icon={<User size={18} />}
              label="Full Name"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />

            {/* EMAIL */}
            <InputField
              icon={<Mail size={18} />}
              label="Email Address"
              name="email"
              placeholder="abc@gamil.com"
              value={form.email}
              onChange={handleChange}
            />

            <InputField
              icon={<Contact size={18} />}
              label="Contact No"
              name="contact_no"
              placeholder="xxxxxx1234"
              value={form.contact_no}
              onChange={handleChange}
            />

            <InputField
              icon={<MapPinHouse size={18} />}
              label="Address"
              name="address"
              placeholder="123 Main St, City, Country"
              value={form.address}
              onChange={handleChange}
            />

            {/* Seller */}
            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-widest text-primary font-bold ml-1">
                Role
              </label>

              <div className="relative">
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full bg-surface-container-lowest border-b-2 border-outline-variant/30 focus:border-primary outline-none pl-3 pr-3 py-3 text-sm rounded-t-md text-on-surface"
                >
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
            </div>

            {/* PASSWORD */}
            <InputField
              icon={<Lock size={18} />}
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />

            {/* TERMS */}
            <div className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-1 accent-primary"
              />
              <p className="text-on-surface-variant">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-primary font-semibold cursor-pointer"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="privacy_policy"
                  className="text-primary font-semibold cursor-pointer"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-linear-to-r from-primary to-primary-container text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              Create Account <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* FOOT TEXT */}
        <p className="text-center text-sm text-on-surface-variant mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold cursor-pointer"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

function InputField({ icon, label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] uppercase tracking-widest text-primary font-bold ml-1">
        {label}
      </label>

      <div className="relative group">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition">
          {icon}
        </span>

        <input
          {...props}
          className="w-full bg-surface-container-lowest border-b-2 border-outline-variant/30 focus:border-primary outline-none pl-10 pr-3 py-3 text-sm rounded-t-md placeholder:text-on-surface-variant/40"
        />
      </div>
    </div>
  );
}
