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
  type: string;
  account_number: string | null;
  account_name: string | null;
  qris_image: string | null;
  is_active: boolean;
  icon: string | null;
}

function autoCode(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6);
}

const catLabel: Record<string, string> = {
  qris: "QRIS",
  ewallet: "E-Wallet",
  va: "Virtual Account",
  minimarket: "Minimarket",
};

export default function AdminPayments() {
  const { showToast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState("transfer");
  const [formAccountNumber, setFormAccountNumber] = useState("");
  const [formAccountName, setFormAccountName] = useState("");
  const [formQrisImage, setFormQrisImage] = useState("");
  const [formActive, setFormActive] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Payment | null>(null);
  const [uploading, setUploading] = useState(false);
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

  const handleUpload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.url) {
      setFormQrisImage(data.url);
      showToast("success", "Gambar QRIS berhasil diunggah");
    } else {
      showToast("error", data.error || "Upload gagal");
    }
  };

  const handleSubmit = async () => {
    if (!formName.trim()) { showToast("error", "Nama metode wajib diisi"); return; }
    if (formType === "transfer" && !formAccountNumber.trim()) { showToast("error", "Nomor rekening wajib diisi"); return; }

    setSaving(true);
    const payload: Record<string, unknown> = {
      name: formName.trim(),
      label: formName.trim(),
      type: formType,
      category: formType === "qris" ? "qris" : formType === "va" ? "va" : formType === "minimarket" ? "minimarket" : "ewallet",
      code: autoCode(formName),
      color: formType === "qris" ? "#000" : formType === "va" ? "#1a56db" : formType === "minimarket" ? "#16a34a" : "#6366f1",
      is_active: formActive,
      account_number: formType === "transfer" ? formAccountNumber || null : null,
      account_name: formType === "transfer" ? formAccountName || null : null,
      qris_image: formType === "qris" ? formQrisImage || null : null,
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
    setFormType("transfer");
    setFormAccountNumber("");
    setFormAccountName("");
    setFormQrisImage("");
    setFormActive(true);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (p: Payment) => {
    setFormName(p.name);
    setFormType(p.type || "transfer");
    setFormAccountNumber(p.account_number || "");
    setFormAccountName(p.account_name || "");
    setFormQrisImage(p.qris_image || "");
    setFormActive(p.is_active);
    setEditId(p.id);
    setShowForm(true);
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

  const toggleActive = async (p: Payment) => {
    try {
      await fetch(`/api/admin/payments/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !p.is_active }),
      });
      setPayments((prev) =>
        prev.map((m) => (m.id === p.id ? { ...m, is_active: !m.is_active } : m))
      );
      showToast("success", p.is_active ? "Metode dinonaktifkan" : "Metode diaktifkan");
    } catch {
      showToast("error", "Gagal mengubah status");
    }
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

  const grouped = payments.reduce<Record<string, Payment[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

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
        <button onClick={() => { resetForm(); setShowForm(true); }} className="jx-btn jx-btn-primary text-[13px]">
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
              <label className="block text-[12px] font-bold mb-1">Tipe</label>
              <select className="jx-input" value={formType} onChange={(e) => setFormType(e.target.value)}>
                <option value="transfer">Transfer / E-Wallet</option>
                <option value="qris">QRIS</option>
                <option value="va">Virtual Account</option>
                <option value="minimarket">Minimarket</option>
              </select>
            </div>
          </div>

          {formType === "qris" && (
            <div>
              <label className="block text-[12px] font-bold mb-1">Gambar QRIS</label>
              <div className="flex items-center gap-3">
                <label className="jx-btn jx-btn-ghost text-[12px] border border-gray-200 cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleUpload(e.target.files[0]); }} />
                  {uploading ? "Mengunggah..." : "Pilih Gambar"}
                </label>
                {formQrisImage && (
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formQrisImage} alt="QRIS" className="w-16 h-16 rounded-lg object-cover border" />
                    <button type="button" onClick={() => setFormQrisImage("")} className="text-red-500 text-[12px] font-semibold">Hapus</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {formType === "transfer" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold mb-1">Nomor Rekening / ID</label>
                <input className="jx-input" value={formAccountNumber} onChange={(e) => setFormAccountNumber(e.target.value)} placeholder="1234567890" />
              </div>
              <div>
                <label className="block text-[12px] font-bold mb-1">Nama Pemilik</label>
                <input className="jx-input" value={formAccountName} onChange={(e) => setFormAccountName(e.target.value)} placeholder="John Doe" />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <label className="block text-[12px] font-bold">Status:</label>
            <button
              type="button"
              onClick={() => setFormActive(!formActive)}
              className={`relative w-11 h-6 rounded-full transition-colors ${formActive ? "bg-emerald-600" : "bg-gray-300"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${formActive ? "translate-x-5" : ""}`} />
            </button>
            <span className="text-[12px] font-semibold">{formActive ? "Aktif" : "Nonaktif"}</span>
          </div>

          <div className="flex gap-2">
            <button onClick={handleSubmit} disabled={saving} className="jx-btn jx-btn-primary text-[13px]">
              {saving ? "Menyimpan..." : editId ? "Update" : "Simpan"}
            </button>
            <button onClick={resetForm} className="jx-btn jx-btn-ghost text-[13px] border-gray-200">Batal</button>
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
            <span className="text-[12px] font-extrabold tracking-wider text-gray-500">{catLabel[cat] || cat}</span>
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
                } ${!m.is_active ? "opacity-50" : ""}`}
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
                  <p className="text-[12px] text-gray-500 mt-0.5">
                    {catLabel[m.category] || m.category}
                    {m.type === "qris" && m.qris_image && " · QRIS"}
                    {m.account_number && ` · ${m.account_number}`}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggleActive(m)} className={`text-[12px] font-semibold px-2 py-1 rounded ${m.is_active ? "text-emerald-600 hover:bg-emerald-50" : "text-gray-400 hover:bg-gray-100"}`}>
                    {m.is_active ? "Aktif" : "Nonaktif"}
                  </button>
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
