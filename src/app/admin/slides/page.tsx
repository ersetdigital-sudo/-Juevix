"use client";

import { useEffect, useState, useRef } from "react";

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
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => {
    fetch("/api/admin/slides")
      .then((r) => r.json())
      .then(setSlides)
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
      setForm({ ...form, image: data.url });
    } else {
      alert(data.error || "Upload gagal");
    }
  };

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

  const toggleActive = async (s: Slide) => {
    await fetch(`/api/admin/slides/${s.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !s.is_active }),
    });
    load();
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

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-[12px] text-blue-700 font-semibold">
        Rekomendasi ukuran banner: <b>1200 x 400 px</b> (rasio 3:1). Format JPG/PNG, maks 2MB.
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 className="font-display font-extrabold text-[15px]">
            {editId ? "Edit Slide" : "Tambah Slide Baru"}
          </h3>

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

          {form.image ? (
            <div className="space-y-2">
              <label className="block text-[12px] font-bold">Preview Banner</label>
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <img src={form.image} alt="Preview" className="w-full h-auto max-h-[200px] object-cover" />
                <button
                  onClick={() => setForm({ ...form, image: "" })}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full text-[12px] grid place-items-center hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="text-[12px] text-blue-600 hover:underline font-semibold"
              >
                Ganti gambar
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full h-[160px] rounded-xl border-2 border-dashed border-gray-300 grid place-items-center text-center hover:border-blue-400 transition-colors"
            >
              {uploading ? (
                <span className="text-[13px] text-gray-400">Uploading...</span>
              ) : (
                <>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" className="mx-auto">
                    <path d="M12 3v12M7 11l5 5 5-5M4 21h16" />
                  </svg>
                  <span className="text-[12px] text-gray-400 mt-2 block">
                    Klik untuk upload gambar banner<br />
                    Rekomendasi: 1200 x 400 px • JPG/PNG • Maks 2MB
                  </span>
                </>
              )}
            </button>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[12px] font-bold mb-1">Alt Text (judul banner)</label>
              <input className="jx-input" value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} placeholder="Top Up Game Favorit Kamu" />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Link URL</label>
              <input className="jx-input" value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} placeholder="/game/mobile-legends" />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Sort Order</label>
              <input type="number" className="jx-input" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })} />
            </div>
          </div>

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
            <button onClick={handleSubmit} disabled={saving || uploading || !form.image || !form.alt} className="jx-btn jx-btn-primary text-[13px]">
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
            <div className="w-[160px] h-[60px] rounded-xl overflow-hidden bg-gray-100 shrink-0">
              {s.image && <img src={s.image} alt={s.alt} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[13px] truncate">{s.alt}</p>
              <p className="text-[12px] text-gray-500 mt-0.5">{s.href}</p>
            </div>
            <button
              onClick={() => toggleActive(s)}
              className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${s.is_active ? "bg-[#00D97E]" : "bg-gray-300"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${s.is_active ? "translate-x-5" : ""}`} />
            </button>
            <span className="text-[12px] text-gray-400 font-semibold shrink-0">#{s.sort_order}</span>
            <div className="flex gap-2 shrink-0">
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
