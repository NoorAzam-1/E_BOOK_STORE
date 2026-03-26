"use client";

import { Lock, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
// export const dynamic = "force-dynamic";

export default function ResetPasswordPage({params}) {
  // const searchParams = useSearchParams();
  const router = useRouter();
  const token = params.token; // get token from URL

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/user/reset_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setSuccess(true);

        // Optional: redirect to login after a delay
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    }

    setLoading(false);
  };

  return (
    <div className="bg-background text-on-surface flex justify-center px-2 py-12">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-center">Reset Password</h2>
        <p className="text-on-surface-variant text-sm text-center mb-6">
          Enter your new password below to reset your account password.
        </p>

        <div className="bg-surface-container/80 backdrop-blur-xl p-6 rounded-xl border border-outline-variant/20">
          {success ? (
            <div className="text-center text-on-surface">
              <p className="mb-4">✅ Password has been reset successfully!</p>
              <p className="text-sm text-on-surface-variant">
                Redirecting to login page...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                icon={<Lock size={18} />}
                label="New Password"
                name="newPassword"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <InputField
                icon={<Lock size={18} />}
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading || !token}
                className="w-full bg-linear-to-r from-primary to-primary-container text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                {loading ? "Resetting..." : "Reset Password"} <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-on-surface-variant mt-6">
          Remembered your password?{" "}
          <a href="/login" className="text-primary font-semibold hover:underline">
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
