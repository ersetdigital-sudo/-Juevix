"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/components/admin/Toast";

interface Payment {
  id: number;
  category: string;
  name: string;
  label: string;
  code: string;
  color: string;
  sort_order: number;
}

function autoCode(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6);
}

export default function AdminPayments() {
  const { showToast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("ewallet");
  const [formColor, setFormColor] = useState("#666666");
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Payment | null>(null);
  const [dragId, setDragId] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const load = () => {
    fetch("/api/admin/payments")
      .then((r) => r.json())
      .then(setPayments)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    if (!formName.trim()) { showToast("error", "Nama metode wajib diisi"); return; }
    setSaving(true);
    const payload = {
      name: formName.trim(),
      label: formName.trim(),
      category: formCategory,
      code: autoCode(formName),
      color: formColor,
    };
    try {
      const url = editId ? `/api/admin/payments/${editId}` : "/api/admin/payments";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Gagal");
      showToast("success", editId ? "Perubahan berhasil disimpan" : "Metode pembayaran berhasil ditambahkan");
      resetForm();
      load();
    } catch {
      showToast("error", "Gagal menyimpan metode pembayaran");
    }
    setSaving(false);
  };

  const resetForm = () => {
    setFormName("");
    setFormCategory("ewallet");
    setFormColor("#666666");
    setEditId(null);
    setShowForm(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/payments/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal");
      showToast("success", "Metode pembayaran berhasil dihapus");
      load();
    } catch {
      showToast("error", "Gagal menghapus metode pembayaran");
    }
    setDeleteTarget(null);
  };

  const handleEdit = (p: Payment) => {
    setFormName(p.name);
    setFormCategory(p.category);
    setFormColor(p.color);
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

  const handleDragStart = useCallback((idx: number) => { dragItem.current = idx; setDragId(payments[idx].id); }, [payments]);
  const handleDragEnter = useCallback((idx: number) => { dragOverItem.current = idx; }, []);

  const handleDragEnd = useCallback(async () => {
    if (dragItem.current === null || dragOverItem.current === null) { setDragId(null); return; }
    const items = [...payments];
    const [dragged] = items.splice(dragItem.current, 1);
    items.splice(dragOverItem.current, 0, dragged);
    dragItem.current = null;
    dragOverItem.current = null;
    setDragId(null);
    const updates = items.map((item, idx) => ({ id: item.id, sort_order: idx }));
    setPayments(items.map((item, idx) => ({ ...item, sort_order: idx })));
    try {
      await fetch("/api/admin/payments/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
      showToast("success", "Urutan pembayaran diperbarui");
    } catch {
      showToast("error", "Gagal memperbarui urutan");
      load();
    }
  }, [payments, showToast]);

  return (
    <div className="space-y-6">
      <ConfirmModal
        open={!!deleteTarget}
        title="Hapus Metode Pembayaran?"
        description={`"${deleteTarget?.name}" akan dihapus permanen dan tidak bisa dikembalikan.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold">Payments</h2>
          <p className="text-[14px] text-gray-500 mt-1">Kelola metode pembayaran customer.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
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
              <label className="block text-[12px] font-bold mb-1">Nama Metode *</label>
              <input className="jx-input" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="BCA / Dana / QRIS" />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Kategori</label>
              <select className="jx-input" value={formCategory} onChange={(e) => setFormCategory(e.target.value)}>
                <option value="qris">QRIS</option>
                <option value="ewallet">E-Wallet</option>
                <option value="va">Virtual Account</option>
                <option value="minimarket">Minimarket</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Warna</label>
              <div className="flex gap-2">
                <input type="color" value={formColor} onChange={(e) => setFormColor(e.target.value)} className="w-10 h-[46px] rounded-lg border border-gray-200 cursor-pointer" />
                <input className="jx-input flex-1" value={formColor} onChange={(e) => setFormColor(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSubmit} disabled={saving} className="jx-btn jx-btn-primary text-[13px]">
              {saving ? "Menyimpan..." : editId ? "Update" : "Simpan"}
            </button>
            <button onClick={resetForm} className="jx-btn jx-btn-ghost text-[13px] border-gray-200">
              Batal
            </button>
          </div>
        </div>
      )}

      <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
        </svg>
        Geser baris untuk mengurutkan. Urutan tersimpan otomatis.
      </p>

      {Object.entries(grouped).map(([cat, methods]) => (
        <div key={cat} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
            <span className="text-[12px] font-extrabold tracking-wider text-gray-500">
              {catLabel[cat] || cat}
            </span>
          </div>
          <div className="divide-y divide-gray-50">
            {methods.map((m) => (
              <div
                key={m.id}
                draggable
                onDragStart={() => handleDragStart(payments.indexOf(m))}
                onDragEnter={() => handleDragEnter(payments.indexOf(m))}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={`px-5 py-4 flex items-center gap-4 transition-colors ${
                  dragId === m.id ? "bg-blue-50 opacity-50" : "hover:bg-gray-50/50"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" className="shrink-0 cursor-grab active:cursor-grabbing">
                  <circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
                  <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
                  <circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
                </svg>
                <span className="w-12 h-12 rounded-lg grid place-items-center text-[11px] font-extrabold text-white shrink-0" style={{ background: m.color }}>
                  {m.code}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[13px]">{m.name}</span>
                  <p className="text-[12px] text-gray-500 mt-0.5">Kategori: {catLabel[m.category] || m.category}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => handleEdit(m)} className="text-blue-600 hover:underline font-semibold text-[12px]">Edit</button>
                  <button onClick={() => setDeleteTarget(m)} className="text-red-500 hover:underline font-semibold text-[12px]">Hapus</button>
                </div>
              </div>
            ))}
          </div>
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
