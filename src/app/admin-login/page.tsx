"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Email atau password salah!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f3] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl grid place-items-center mb-4" style={{ background: "linear-gradient(135deg,#04251a,#0a5238)" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 4 9l8 13 8-13-8-7Z" fill="#00D97E" />
              <path d="M12 2 4 9h16l-8-7Z" fill="#8bffd2" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-extrabold">Admin Panel</h1>
          <p className="text-[14px] text-gray-500 mt-1">Masuk ke panel administrasi</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] font-semibold rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[12px] font-bold mb-1.5">Email</label>
            <input
              type="email"
              className="jx-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@juevix.net"
              required
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold mb-1.5">Password</label>
            <input
              type="password"
              className="jx-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="jx-btn jx-btn-primary w-full text-[14px]"
            style={{ minHeight: 48 }}
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <p className="text-center text-[12px] text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} Admin Panel.
        </p>
      </div>
    </div>
  );
}
