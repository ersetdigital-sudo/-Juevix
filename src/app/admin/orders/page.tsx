"use client";

import { useEffect, useState } from "react";

interface Order {
  id: number;
  invoice: string;
  game_name: string;
  game_slug: string;
  user_id: string;
  server_id: string;
  nickname: string | null;
  product_label: string;
  price: number;
  admin_fee: number;
  total: number;
  payment_method: string;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  failed: "bg-red-100 text-red-700",
  expired: "bg-gray-100 text-gray-500",
};

const statusLabels: Record<string, string> = {
  pending: "Menunggu",
  processing: "Diproses",
  completed: "Berhasil",
  failed: "Gagal",
  expired: "Kedaluwarsa",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  const fmt = (n: number) => "Rp" + n.toLocaleString("id-ID");

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold">Orders</h2>
        <p className="text-[14px] text-gray-500 mt-1">Kelola pesanan masuk dari customer.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500 font-semibold">
                <th className="px-5 py-3">Invoice</th>
                <th className="px-5 py-3">Game</th>
                <th className="px-5 py-3">User ID</th>
                <th className="px-5 py-3">Produk</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Pembayaran</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-5 py-3 font-bold font-mono text-[12px]">{o.invoice}</td>
                  <td className="px-5 py-3 font-bold">{o.game_name}</td>
                  <td className="px-5 py-3">{o.user_id} ({o.server_id})</td>
                  <td className="px-5 py-3">{o.product_label}</td>
                  <td className="px-5 py-3 font-bold text-[#00b96b]">{fmt(o.total)}</td>
                  <td className="px-5 py-3">{o.payment_method}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-lg text-[11px] font-bold ${statusColors[o.status] || ""}`}>
                      {statusLabels[o.status] || o.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500 text-[12px]">
                    {new Date(o.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="text-[12px] border border-gray-200 rounded-lg px-2 py-1 font-semibold bg-white cursor-pointer"
                    >
                      <option value="pending">Menunggu</option>
                      <option value="processing">Diproses</option>
                      <option value="completed">Berhasil</option>
                      <option value="failed">Gagal</option>
                      <option value="expired">Kedaluwarsa</option>
                    </select>
                  </td>
                </tr>
              ))}
              {!loading && orders.length === 0 && (
                <tr><td colSpan={9} className="px-5 py-10 text-center text-gray-400">Belum ada pesanan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
