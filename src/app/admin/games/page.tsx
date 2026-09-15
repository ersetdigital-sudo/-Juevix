"use client";

import { useEffect, useState, useRef } from "react";

interface Game {
  id: number;
  slug: string;
  name: string;
  category: string;
  rating: number;
  reviews: string;
  developer: string | null;
  image: string | null;
  gradient: string | null;
  label: string | null;
  is_featured: boolean;
  sort_order: number;
}

const empty: Omit<Game, "id"> = {
  slug: "",
  name: "",
  category: "Moba Game",
  rating: 4.5,
  reviews: "0",
  developer: "",
  image: "",
  gradient: "",
  label: "",
  is_featured: false,
  sort_order: 0,
};

export default function AdminGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Game, "id">>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => {
    fetch("/api/admin/games")
      .then((r) => r.json())
      .then(setGames)
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
    const payload = {
      ...form,
      image: form.image || null,
      gradient: form.gradient || null,
      label: form.label || null,
      developer: form.developer || null,
    };
    if (editId) {
      await fetch(`/api/admin/games/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/admin/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setForm(empty);
    setEditId(null);
    setShowForm(false);
    load();
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus game ini?")) return;
    await fetch(`/api/admin/games/${id}`, { method: "DELETE" });
    load();
  };

  const handleEdit = (g: Game) => {
    setForm({
      slug: g.slug,
      name: g.name,
      category: g.category,
      rating: g.rating,
      reviews: g.reviews,
      developer: g.developer || "",
      image: g.image || "",
      gradient: g.gradient || "",
      label: g.label || "",
      is_featured: g.is_featured,
      sort_order: g.sort_order,
    });
    setEditId(g.id);
    setShowForm(true);
  };

  const autoSlug = (name: string) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-extrabold">Games</h2>
          <p className="text-[14px] text-gray-500 mt-1">Kelola daftar game yang tersedia.</p>
        </div>
        <button
          onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }}
          className="jx-btn jx-btn-primary text-[13px]"
        >
          + Tambah Game
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-[12px] text-blue-700 font-semibold">
        Rekomendasi ukuran gambar game: <b>600 x 300 px</b> (rasio 2:1). Format JPG/PNG, maks 2MB.
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 className="font-display font-extrabold text-[15px]">
            {editId ? "Edit Game" : "Tambah Game Baru"}
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

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold mb-1">Nama Game</label>
              <input className="jx-input" value={form.name} onChange={(e) => {
                const name = e.target.value;
                setForm({ ...form, name, slug: editId ? form.slug : autoSlug(name) });
              }} placeholder="Mobile Legends" />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Slug</label>
              <input className="jx-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="mobile-legends" />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Kategori</label>
              <select className="jx-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option>Moba Game</option>
                <option>RPG</option>
                <option>Casual Game</option>
                <option>Strategy</option>
                <option>Simulator</option>
                <option>Sports Game</option>
                <option>Adventure</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Developer</label>
              <input className="jx-input" value={form.developer || ""} onChange={(e) => setForm({ ...form, developer: e.target.value })} placeholder="Moonton" />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Rating</label>
              <input type="number" step="0.1" min="0" max="5" className="jx-input" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })} />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Reviews</label>
              <input className="jx-input" value={form.reviews} onChange={(e) => setForm({ ...form, reviews: e.target.value })} placeholder="12k" />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Sort Order</label>
              <input type="number" className="jx-input" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })} />
            </div>
            <div className="flex items-end gap-3">
              <label className="text-[12px] font-bold">Featured:</label>
              <button
                type="button"
                onClick={() => setForm({ ...form, is_featured: !form.is_featured })}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.is_featured ? "bg-[#00D97E]" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.is_featured ? "translate-x-5" : ""}`} />
              </button>
              <span className="text-[12px] font-semibold">{form.is_featured ? "Ya" : "Tidak"}</span>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-[12px] font-bold">Gambar Game</label>
            <p className="text-[11px] text-gray-400">Upload gambar atau gunakan gradient + label sebagai fallback</p>
            {form.image ? (
              <div className="relative inline-block">
                <img src={form.image} alt="Preview" className="w-[200px] h-[100px] object-cover rounded-xl border border-gray-200" />
                <button
                  onClick={() => setForm({ ...form, image: "" })}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-[12px] grid place-items-center hover:bg-red-600"
                >
                  ✕
                </button>
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white px-2 py-1 rounded-lg hover:bg-black/80"
                >
                  Ganti
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="w-[200px] h-[100px] rounded-xl border-2 border-dashed border-gray-300 grid place-items-center text-center hover:border-blue-400 transition-colors"
              >
                {uploading ? (
                  <span className="text-[12px] text-gray-400">Uploading...</span>
                ) : (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" className="mx-auto">
                      <path d="M12 3v12M7 11l5 5 5-5M4 21h16" />
                    </svg>
                    <span className="text-[11px] text-gray-400 mt-1 block">Upload gambar<br />600 x 300 px</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Gradient Fallback */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold mb-1">Gradient (CSS) — fallback jika tidak ada gambar</label>
              <input className="jx-input" value={form.gradient || ""} onChange={(e) => setForm({ ...form, gradient: e.target.value })} placeholder="linear-gradient(140deg,#0a3d33,#12796a)" />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Label — teks di atas gradient</label>
              <input className="jx-input" value={form.label || ""} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="ARENA of&#10;VALOR" />
            </div>
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

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-500 font-semibold">
              <th className="px-5 py-3">Game</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Rating</th>
              <th className="px-5 py-3">Featured</th>
              <th className="px-5 py-3">Sort</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {games.map((g) => (
              <tr key={g.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {g.image ? (
                      <img src={g.image} alt={g.name} className="w-10 h-10 rounded-lg object-cover" />
                    ) : g.gradient ? (
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-[8px] font-bold" style={{ background: g.gradient }}>
                        {g.label?.split("\n")[0]}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 grid place-items-center text-gray-400">?</div>
                    )}
                    <span className="font-bold">{g.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-500">{g.category}</td>
                <td className="px-5 py-3">{g.rating}</td>
                <td className="px-5 py-3">
                  {g.is_featured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Featured</span>
                  )}
                </td>
                <td className="px-5 py-3 text-gray-500">{g.sort_order}</td>
                <td className="px-5 py-3 text-right space-x-2">
                  <button onClick={() => handleEdit(g)} className="text-blue-600 hover:underline font-semibold">Edit</button>
                  <button onClick={() => handleDelete(g.id)} className="text-red-500 hover:underline font-semibold">Hapus</button>
                </td>
              </tr>
            ))}
            {!loading && games.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-400">Belum ada game.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
