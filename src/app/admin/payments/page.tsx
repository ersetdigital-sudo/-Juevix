"use client";

import { useEffect, useState } from "react";

interface Payment {
  id: number;
  category: string;
  name: string;
  label: string;
  code: string;
  color: string;
  sort_order: number;
}

const empty: Omit<Payment, "id"> = {
  category: "ewallet",
  name: "",
  label: "",
  code: "",
  color: "#666666",
  sort_order: 0,
};

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Payment, "id">>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch("/api/admin/payments")
      .then((r) => r.json())
      .then(setPayments)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    setSaving(true);
    if (editId) {
      await fetch(`/api/admin/payments/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm(empty);
    setEditId(null);
    setShowForm(false);
    load();
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus metode pembayaran ini?")) return;
    await fetch(`/api/admin/payments/${id}`, { method: "DELETE" });
    load();
  };

  const handleEdit = (p: Payment) => {
    setForm({
      category: p.category,
      name: p.name,
      label: p.label,
      code: p.code,
      color: p.color,
      sort_order: p.sort_order,
    });
    setEditId(p.id);
    setShowForm(true);
  };

  const grouped = payments.reduce<Record<string, Payment[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  const catLabel: Record<string, string> = {
    qris: "QRIS",
    ewallet: "E-Wallet",
    va: "Virtual Account",
    minimarket: "Minimarket",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold">Payments</h2>
          <p className="text-[14px] text-gray-500 mt-1">Kelola metode pembayaran.</p>
        </div>
        <button
          onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }}
          className="jx-btn jx-btn-primary text-[13px]"
        >
          + Tambah Pembayaran
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 className="font-display font-extrabold text-[15px]">
            {editId ? "Edit Pembayaran" : "Tambah Pembayaran Baru"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold mb-1">Kategori</label>
              <select className="jx-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="qris">QRIS</option>
                <option value="ewallet">E-Wallet</option>
                <option value="va">Virtual Account</option>
                <option value="minimarket">Minimarket</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Nama</label>
              <input className="jx-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dana" />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Label</label>
              <input className="jx-input" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="DANA" />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Code</label>
              <input className="jx-input" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="DANA" />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Warna</label>
              <div className="flex gap-2">
                <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-10 h-[46px] rounded-lg border border-gray-200 cursor-pointer" />
                <input className="jx-input flex-1" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Sort Order</label>
              <input type="number" className="jx-input" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })} />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSubmit} disabled={saving} className="jx-btn jx-btn-primary text-[13px]">
              {saving ? "Menyimpan..." : editId ? "Update" : "Simpan"}
            </button>
            <button onClick={() => { setShowForm(false); setEditId(null); }} className="jx-btn jx-btn-ghost text-[13px] border-gray-200">
              Batal
            </button>
          </div>
        </div>
      )}

      {Object.entries(grouped).map(([cat, methods]) => (
        <div key={cat} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
            <span className="text-[12px] font-extrabold tracking-wider text-gray-500">
              {catLabel[cat] || cat}
            </span>
          </div>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500 font-semibold">
                <th className="px-5 py-3">Warna</th>
                <th className="px-5 py-3">Code</th>
                <th className="px-5 py-3">Nama</th>
                <th className="px-5 py-3">Label</th>
                <th className="px-5 py-3">Sort</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {methods.map((m) => (
                <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-5 py-3">
                    <span className="w-8 h-8 rounded-lg block" style={{ background: m.color }} />
                  </td>
                  <td className="px-5 py-3 font-bold">{m.code}</td>
                  <td className="px-5 py-3">{m.name}</td>
                  <td className="px-5 py-3">{m.label}</td>
                  <td className="px-5 py-3 text-gray-500">{m.sort_order}</td>
                  <td className="px-5 py-3 text-right space-x-2">
                    <button onClick={() => handleEdit(m)} className="text-blue-600 hover:underline font-semibold">Edit</button>
                    <button onClick={() => handleDelete(m.id)} className="text-red-500 hover:underline font-semibold">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {!loading && payments.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 px-5 py-10 text-center text-gray-400">
          Belum ada metode pembayaran.
        </div>
      )}
    </div>
  );
}
