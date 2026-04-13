"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Invalid password");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
    } catch {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-brand-champagne via-white to-brand-nude/40 flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blush/20 rounded-full blur-[100px] z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-cocoa/10 rounded-full blur-[100px] z-0"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-4xl font-serif text-brand-espresso tracking-wide font-bold">
              Mua<span className="text-brand-blush">Chii</span>
            </span>
            <Sparkles size={20} className="text-brand-gold" />
          </div>
          <h1 className="text-3xl font-serif text-brand-espresso mb-2">Admin Access</h1>
          <p className="text-brand-espresso/60 font-medium">Securely manage your brand</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 shadow-xl shadow-brand-blush/20 border border-white/70">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-extrabold uppercase tracking-widest text-brand-espresso mb-3">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-5 py-4 rounded-2xl bg-brand-champagne/50 border-2 border-brand-nude/30 text-brand-espresso placeholder-brand-espresso/40 focus:outline-none focus:border-brand-blush focus:ring-2 focus:ring-brand-blush/20 transition-all font-medium"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-50/80 border border-red-200">
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-4 px-6 bg-gradient-to-r from-brand-cocoa to-brand-blush text-white font-extrabold uppercase tracking-widest rounded-full hover:shadow-xl hover:shadow-brand-blush/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-cocoa/30"
            >
              {loading ? "Verifying..." : "Access Admin Panel ✨"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-brand-nude/20">
            <p className="text-xs text-brand-espresso/50 text-center font-medium">
              Password protected admin area. Authorized personnel only.
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-brand-espresso/40 mt-8">
          MuaChii Admin Dashboard
        </p>
      </div>
    </div>
  );
}
