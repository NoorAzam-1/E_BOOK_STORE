"use client";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { backend_url } from "@/utils/axios";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // ✅ LOGIN SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`${backend_url}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Login Successful ✅"); // ✅ toast
        localStorage.setItem("token", data.token);

        // small delay before redirect
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-background text-on-surface flex justify-center px-2 relative overflow-hidden">
      {/* ✅ TOASTER */}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-md z-10">
        {/* HEADING */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-on-surface-variant text-sm">
            Sign in to continue your journey.
          </p>
        </div>

        {/* CARD */}
        <div className="bg-surface-container/80 backdrop-blur-xl p-4 md:p-6 rounded-xl border border-outline-variant/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <InputField
              icon={<Mail size={18} />}
              label="Email Address"
              name="email"
              placeholder="noor@ebookstore.com"
              value={form.email}
              onChange={handleChange}
            />

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

            {/* FORGOT PASSWORD */}
            <div className="text-right text-sm">
              <Link
                href="/forgot_password"
                className="text-primary cursor-pointer hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-primary to-primary-container text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign In"} <ArrowRight size={18} />
            </button>
          </form>
        </div>

        {/* FOOT TEXT */}
        <p className="text-center text-sm text-on-surface-variant mt-6">
          Don’t have an account?{" "}
          <Link href="/register" className="text-primary font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

function InputField({ icon, label, ...props }) {
  return (
    <div className="space-y-2">
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
