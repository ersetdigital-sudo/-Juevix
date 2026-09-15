"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/components/admin/Toast";

interface Payment {
  id: number;
  category: string;
  type: string;
  name: string;
  label: string;
  code: string;
  color: string;
  account_number: string | null;
  account_name: string | null;
  qris_image: string | null;
  is_active: boolean;
  icon: string | null;
  sort_order: number;
}

function autoCode(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6);
}

function autoColor(type: string): string {
  return type === "qris" ? "#00b96b" : "#3b82f6";
}

function autoCategory(type: string): string {
  return type === "qris" ? "qris" : "ewallet";
}

export default function AdminPayments() {
  const { showToast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [formType, setFormType] = useState("transfer");
  const [formName, setFormName] = useState("");
  const [formActive, setFormActive] = useState(true);
  const [formAccountNumber, setFormAccountNumber] = useState("");
  const [formAccountName, setFormAccountName] = useState("");
  const [formQrisImage, setFormQrisImage] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
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

  const handleUpload = async (file: File) => {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.url) {
      setFormQrisImage(data.url);
    } else {
      showToast("error", data.error || "Upload gagal");
    }
  };

  const handleSubmit = async () => {
    if (!formName.trim()) { showToast("error", "Nama metode wajib diisi"); return; }
    if (formType === "transfer" && !formAccountNumber.trim()) { showToast("error", "Nomor rekening wajib diisi"); return; }

    setSaving(true);
    const payload = {
      name: formName.trim(),
      label: formName.trim(),
      type: formType,
      category: autoCategory(formType),
      code: autoCode(formName),
      color: autoColor(formType),
      is_active: formActive,
      account_number: formType === "transfer" ? formAccountNumber || null : null,
      account_name: formType === "transfer" ? formAccountName || null : null,
      qris_image: formType === "qris" ? formQrisImage || null : null,
      icon: null,
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
    setFormType("transfer");
    setFormName("");
    setFormActive(true);
    setFormAccountNumber("");
    setFormAccountName("");
    setFormQrisImage("");
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
    setFormType(p.type);
    setFormName(p.name);
    setFormActive(p.is_active);
    setFormAccountNumber(p.account_number || "");
    setFormAccountName(p.account_name || "");
    setFormQrisImage(p.qris_image || "");
    setEditId(p.id);
    setShowForm(true);
  };

  const toggleActive = async (p: Payment) => {
    await fetch(`/api/admin/payments/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !p.is_active }),
    });
    load();
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
              <label className="block text-[12px] font-bold mb-1">Tipe</label>
              <select className="jx-input" value={formType} onChange={(e) => setFormType(e.target.value)}>
                <option value="transfer">Transfer / E-Wallet</option>
                <option value="qris">QRIS (Upload Gambar)</option>
              </select>
            </div>
          </div>

          {formType === "qris" ? (
            <div className="space-y-3">
              <label className="block text-[12px] font-bold">Gambar QRIS</label>
              <input ref={fileRef} type="file" accept=".png,.jpg,.jpeg" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
              {formQrisImage ? (
                <div className="relative inline-block">
                  <img src={formQrisImage} alt="QRIS" className="w-[200px] h-[200px] object-cover rounded-xl border border-gray-200" />
                  <button onClick={() => setFormQrisImage("")}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-[12px] grid place-items-center hover:bg-red-600">✕</button>
                </div>
              ) : (
                <button onClick={() => fileRef.current?.click()} disabled={uploading}
                  className="w-[200px] h-[200px] rounded-xl border-2 border-dashed border-gray-300 grid place-items-center text-center hover:border-[#00D97E] transition-colors">
                  {uploading ? <span className="text-[13px] text-gray-400">Uploading...</span> : (
                    <>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" className="mx-auto">
                        <path d="M12 3v12M7 11l5 5 5-5M4 21h16" />
                      </svg>
                      <span className="text-[12px] text-gray-400 mt-2 block">Klik untuk upload QRIS<br/>.png / .jpg (maks 2MB)</span>
                    </>
                  )}
                </button>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-bold mb-1">Nomor Rekening / E-Wallet *</label>
                <input className="jx-input" value={formAccountNumber} onChange={(e) => setFormAccountNumber(e.target.value)} placeholder="1234567890" />
              </div>
              <div>
                <label className="block text-[12px] font-bold mb-1">Nama Pemilik</label>
                <input className="jx-input" value={formAccountName} onChange={(e) => setFormAccountName(e.target.value)} placeholder="JUEVIX DIGITAL" />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <label className="text-[12px] font-bold">Status:</label>
            <button type="button" onClick={() => setFormActive(!formActive)}
              className={`relative w-11 h-6 rounded-full transition-colors ${formActive ? "bg-[#00D97E]" : "bg-gray-300"}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${formActive ? "translate-x-5" : ""}`} />
            </button>
            <span className="text-[12px] font-semibold">{formActive ? "Aktif" : "Nonaktif"}</span>
          </div>

          <div className="flex gap-2">
            <button onClick={handleSubmit} disabled={saving || uploading} className="jx-btn jx-btn-primary text-[13px]">
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
            {methods.map((m, idx) => (
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
                {m.type === "qris" && m.qris_image ? (
                  <img src={m.qris_image} alt={m.name} className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0" />
                ) : (
                  <span className="w-12 h-12 rounded-lg grid place-items-center text-[11px] font-extrabold text-white shrink-0" style={{ background: m.color }}>
                    {m.code}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[13px]">{m.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {m.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                    {m.type === "qris" && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">QRIS</span>
                    )}
                  </div>
                  <p className="text-[12px] text-gray-500 mt-0.5">
                    {m.type === "qris"
                      ? m.qris_image ? "Gambar QRIS tersedia" : "Belum upload QRIS"
                      : m.account_number ? `${m.account_number} • ${m.account_name || "-"}` : "Belum ada nomor rekening"
                    }
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggleActive(m)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${m.is_active ? "bg-[#00D97E]" : "bg-gray-300"}`}>
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${m.is_active ? "translate-x-5" : ""}`} />
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
