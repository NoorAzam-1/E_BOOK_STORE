"use client";

import { backend_url } from "@/utils/axios";
import { Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../features/authSlice.js";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

     try {
      // 🔥 Redux thunk call
      const res = await dispatch(forgotPassword(email)).unwrap();

      toast.success("Password reset link sent ✅");
      setSubmitted(true);

    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-background text-on-surface flex justify-center px-2 py-12">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-3 text-center">Forgot Password</h2>
        {submitted ? (
          ""
        ) : (
          <p className="text-on-surface-variant text-sm text-center mb-6">
            Enter your email and we will send you a password reset link.
          </p>
        )}

        <div className="bg-surface-container/80 backdrop-blur-xl p-6 rounded-xl border border-outline-variant/20">
          {submitted ? (
            <div className="text-center text-on-surface">
              <p className="mb-4">
                Check your email for the password reset link. The link is valid
                for 15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                icon={<Mail size={18} />}
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-primary to-primary-container text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                {loading ? "Sending..." : "Send Reset Link"}{" "}
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-on-surface-variant mt-6">
          Remembered your password?{" "}
          <a
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign In
          </a>
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
