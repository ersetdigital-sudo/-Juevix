"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/components/admin/Toast";

interface Slide {
  id: number;
  image: string;
  alt: string;
  href: string;
  sort_order: number;
  is_active: boolean;
}

export default function AdminSlides() {
  const { showToast } = useToast();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [formImage, setFormImage] = useState("");
  const [formActive, setFormActive] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [deleteTarget, setDeleteTarget] = useState<Slide | null>(null);
  const [dragId, setDragId] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

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
      setFormImage(data.url);
    } else {
      showToast("error", data.error || "Upload gagal");
    }
  };

  const handleSubmit = async () => {
    if (!formImage) { showToast("error", "Upload gambar banner terlebih dahulu"); return; }
    setSaving(true);
    const payload = {
      image: formImage,
      alt: "Banner Juevix",
      href: "/",
      is_active: formActive,
    };
    try {
      const url = editId ? `/api/admin/slides/${editId}` : "/api/admin/slides";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Gagal");
      showToast("success", editId ? "Perubahan berhasil disimpan" : "Slide berhasil ditambahkan");
      resetForm();
      load();
    } catch {
      showToast("error", "Gagal menyimpan slide");
    }
    setSaving(false);
  };

  const resetForm = () => {
    setFormImage("");
    setFormActive(true);
    setEditId(null);
    setShowForm(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/slides/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal");
      showToast("success", "Slide berhasil dihapus");
      load();
    } catch {
      showToast("error", "Gagal menghapus slide");
    }
    setDeleteTarget(null);
  };

  const handleEdit = (s: Slide) => {
    setFormImage(s.image);
    setFormActive(s.is_active);
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

  const handleDragStart = useCallback((idx: number) => { dragItem.current = idx; setDragId(slides[idx].id); }, [slides]);
  const handleDragEnter = useCallback((idx: number) => { dragOverItem.current = idx; }, []);

  const handleDragEnd = useCallback(async () => {
    if (dragItem.current === null || dragOverItem.current === null) { setDragId(null); return; }
    const items = [...slides];
    const [dragged] = items.splice(dragItem.current, 1);
    items.splice(dragOverItem.current, 0, dragged);
    dragItem.current = null;
    dragOverItem.current = null;
    setDragId(null);
    const updates = items.map((item, idx) => ({ id: item.id, sort_order: idx }));
    setSlides(items.map((item, idx) => ({ ...item, sort_order: idx })));
    try {
      await fetch("/api/admin/slides/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
      showToast("success", "Urutan slide diperbarui");
    } catch {
      showToast("error", "Gagal memperbarui urutan");
      load();
    }
  }, [slides, showToast]);

  return (
    <div className="space-y-6">
      <ConfirmModal
        open={!!deleteTarget}
        title="Hapus Slide?"
        description="Slide ini akan dihapus permanen dan tidak bisa dikembalikan."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold">Hero Slides</h2>
          <p className="text-[14px] text-gray-500 mt-1">Kelola banner slider di homepage.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
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

          <input ref={fileRef} type="file" accept=".png,.jpg,.jpeg" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />

          {formImage ? (
            <div className="space-y-2">
              <label className="block text-[12px] font-bold">Preview Banner</label>
              <div className="relative rounded-xl overflow-hidden border border-gray-200">
                <img src={formImage} alt="Preview" className="w-full h-auto max-h-[200px] object-cover" />
                <button onClick={() => setFormImage("")}
                  className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full text-[12px] grid place-items-center hover:bg-red-600">✕</button>
              </div>
              <button onClick={() => fileRef.current?.click()} disabled={uploading}
                className="text-[12px] text-blue-600 hover:underline font-semibold">Ganti gambar</button>
            </div>
          ) : (
            <button onClick={() => fileRef.current?.click()} disabled={uploading}
              className="w-full h-[160px] rounded-xl border-2 border-dashed border-gray-300 grid place-items-center text-center hover:border-blue-400 transition-colors">
              {uploading ? <span className="text-[13px] text-gray-400">Uploading...</span> : (
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

          <div className="flex items-center gap-3">
            <label className="text-[12px] font-bold">Status:</label>
            <button type="button" onClick={() => setFormActive(!formActive)}
              className={`relative w-11 h-6 rounded-full transition-colors ${formActive ? "bg-[#00D97E]" : "bg-gray-300"}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${formActive ? "translate-x-5" : ""}`} />
            </button>
            <span className="text-[12px] font-semibold">{formActive ? "Aktif" : "Nonaktif"}</span>
          </div>

          <div className="flex gap-2">
            <button onClick={handleSubmit} disabled={saving || uploading || !formImage} className="jx-btn jx-btn-primary text-[13px]">
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

      <div className="grid gap-4">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragEnter={() => handleDragEnter(idx)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className={`bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 transition-colors ${
              dragId === s.id ? "bg-blue-50 opacity-50" : ""
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" className="shrink-0 cursor-grab active:cursor-grabbing">
              <circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
              <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
              <circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
            </svg>
            <div className="w-[160px] h-[60px] rounded-xl overflow-hidden bg-gray-100 shrink-0">
              {s.image && <img src={s.image} alt="Banner" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[13px] truncate">Banner #{s.sort_order + 1}</p>
              <p className="text-[12px] text-gray-500 mt-0.5">{s.image.split("/").pop()}</p>
            </div>
            <button onClick={() => toggleActive(s)}
              className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${s.is_active ? "bg-[#00D97E]" : "bg-gray-300"}`}>
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${s.is_active ? "translate-x-5" : ""}`} />
            </button>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => handleEdit(s)} className="text-blue-600 hover:underline font-semibold text-[13px]">Edit</button>
              <button onClick={() => setDeleteTarget(s)} className="text-red-500 hover:underline font-semibold text-[13px]">Hapus</button>
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
