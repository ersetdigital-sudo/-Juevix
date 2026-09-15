"use client";

import { useEffect, useState, useRef } from "react";
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

const empty: Omit<Payment, "id"> = {
  category: "ewallet",
  type: "transfer",
  name: "",
  label: "",
  code: "",
  color: "#666666",
  account_number: "",
  account_name: "",
  qris_image: "",
  is_active: true,
  icon: "",
  sort_order: 0,
};

export default function AdminPayments() {
  const { showToast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Payment, "id">>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [deleteTarget, setDeleteTarget] = useState<Payment | null>(null);

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
      setForm({ ...form, qris_image: data.url });
    } else {
      showToast("error", data.error || "Upload gagal");
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    const payload = {
      ...form,
      account_number: form.account_number || null,
      account_name: form.account_name || null,
      qris_image: form.qris_image || null,
      icon: form.icon || null,
    };
    try {
      const url = editId ? `/api/admin/payments/${editId}` : "/api/admin/payments";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
      showToast("success", editId ? "Perubahan berhasil disimpan" : "Metode pembayaran berhasil ditambahkan");
      setForm(empty);
      setEditId(null);
      setShowForm(false);
      load();
    } catch {
      showToast("error", "Gagal menyimpan metode pembayaran");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/payments/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus");
      showToast("success", "Metode pembayaran berhasil dihapus");
      load();
    } catch {
      showToast("error", "Gagal menghapus metode pembayaran");
    }
    setDeleteTarget(null);
  };

  const handleEdit = (p: Payment) => {
    setForm({
      category: p.category,
      type: p.type,
      name: p.name,
      label: p.label,
      code: p.code,
      color: p.color,
      account_number: p.account_number || "",
      account_name: p.account_name || "",
      qris_image: p.qris_image || "",
      is_active: p.is_active,
      icon: p.icon || "",
      sort_order: p.sort_order,
    });
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
              <label className="block text-[12px] font-bold mb-1">Nama Metode</label>
              <input className="jx-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="QRIS / Transfer BCA / Dana" />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Label Tampil</label>
              <input className="jx-input" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="QRIS / BCA / DANA" />
            </div>
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
              <label className="block text-[12px] font-bold mb-1">Tipe</label>
              <select className="jx-input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="qris">QRIS (Upload Gambar)</option>
                <option value="transfer">Transfer / E-Wallet</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Code</label>
              <input className="jx-input" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="BCA / DANA / QR" />
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

          {form.type === "qris" ? (
            <div className="space-y-3">
              <label className="block text-[12px] font-bold">Gambar QRIS</label>
              <input
                ref={fileRef}
                type="file"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleUpload(f);
                }}
              />
              {form.qris_image ? (
                <div className="relative inline-block">
                  <img src={form.qris_image} alt="QRIS" className="w-[200px] h-[200px] object-cover rounded-xl border border-gray-200" />
                  <button
                    onClick={() => setForm({ ...form, qris_image: "" })}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-[12px] grid place-items-center hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="w-[200px] h-[200px] rounded-xl border-2 border-dashed border-gray-300 grid place-items-center text-center hover:border-[#00D97E] transition-colors"
                >
                  {uploading ? (
                    <span className="text-[13px] text-gray-400">Uploading...</span>
                  ) : (
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
                <label className="block text-[12px] font-bold mb-1">Nomor Rekening / E-Wallet</label>
                <input className="jx-input" value={form.account_number || ""} onChange={(e) => setForm({ ...form, account_number: e.target.value })} placeholder="1234567890" />
              </div>
              <div>
                <label className="block text-[12px] font-bold mb-1">Nama Pemilik</label>
                <input className="jx-input" value={form.account_name || ""} onChange={(e) => setForm({ ...form, account_name: e.target.value })} placeholder="JUEVIX DIGITAL" />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <label className="text-[12px] font-bold">Status:</label>
            <button
              type="button"
              onClick={() => setForm({ ...form, is_active: !form.is_active })}
              className={`relative w-11 h-6 rounded-full transition-colors ${form.is_active ? "bg-[#00D97E]" : "bg-gray-300"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.is_active ? "translate-x-5" : ""}`} />
            </button>
            <span className="text-[12px] font-semibold">{form.is_active ? "Aktif" : "Nonaktif"}</span>
          </div>

          <div className="flex gap-2">
            <button onClick={handleSubmit} disabled={saving || uploading} className="jx-btn jx-btn-primary text-[13px]">
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
          <div className="divide-y divide-gray-50">
            {methods.map((m) => (
              <div key={m.id} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50/50">
                {m.type === "qris" && m.qris_image ? (
                  <img src={m.qris_image} alt={m.name} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
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
                  <button
                    onClick={() => toggleActive(m)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${m.is_active ? "bg-[#00D97E]" : "bg-gray-300"}`}
                  >
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
