"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Slide {
  id: number;
  image: string;
  alt: string;
  href: string;
  sort_order: number;
  is_active: boolean;
}

const empty: Omit<Slide, "id"> = {
  image: "",
  alt: "",
  href: "/",
  sort_order: 0,
  is_active: true,
};

export default function AdminSlides() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Slide, "id">>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch("/api/admin/slides")
      .then((r) => r.json())
      .then(setSlides)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    setSaving(true);
    if (editId) {
      await fetch(`/api/admin/slides/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/admin/slides", {
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
    if (!confirm("Yakin hapus slide ini?")) return;
    await fetch(`/api/admin/slides/${id}`, { method: "DELETE" });
    load();
  };

  const handleEdit = (s: Slide) => {
    setForm({
      image: s.image,
      alt: s.alt,
      href: s.href,
      sort_order: s.sort_order,
      is_active: s.is_active,
    });
    setEditId(s.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold">Hero Slides</h2>
          <p className="text-[14px] text-gray-500 mt-1">Kelola banner slider di homepage.</p>
        </div>
        <button
          onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }}
          className="jx-btn jx-btn-primary text-[13px]"
        >
          + Tambah Slide
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 className="font-display font-extrabold text-[15px]">
            {editId ? "Edit Slide" : "Tambah Slide Baru"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[12px] font-bold mb-1">Image URL</label>
              <input className="jx-input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/ml-banner.png" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[12px] font-bold mb-1">Alt Text</label>
              <input className="jx-input" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Link URL</label>
              <input className="jx-input" value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Sort Order</label>
              <input type="number" className="jx-input" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })} />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Status</label>
              <select className="jx-input" value={form.is_active ? "1" : "0"} onChange={(e) => setForm({ ...form, is_active: e.target.value === "1" })}>
                <option value="1">Aktif</option>
                <option value="0">Nonaktif</option>
              </select>
            </div>
          </div>
          {form.image && (
            <div className="rounded-xl overflow-hidden border border-gray-100 h-[120px] relative">
              <Image src={form.image} alt="Preview" fill className="object-cover" />
            </div>
          )}
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

      <div className="grid gap-4">
        {slides.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
            <div className="w-[120px] h-[60px] rounded-xl overflow-hidden bg-gray-100 shrink-0 relative">
              {s.image && <Image src={s.image} alt={s.alt} fill className="object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[13px] truncate">{s.alt}</p>
              <p className="text-[12px] text-gray-500 mt-0.5">{s.href}</p>
            </div>
            <span className={`jx-badge ${s.is_active ? "jx-ok" : "jx-fail"}`}>
              {s.is_active ? "Aktif" : "Off"}
            </span>
            <span className="text-[12px] text-gray-400 font-semibold">#{s.sort_order}</span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(s)} className="text-blue-600 hover:underline font-semibold text-[13px]">Edit</button>
              <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:underline font-semibold text-[13px]">Hapus</button>
            </div>
          </div>
        ))}
        {!loading && slides.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 px-5 py-10 text-center text-gray-400">
            Belum ada slide.
          </div>
        )}
      </div>
    </div>
  );
}
