"use client";

import { useEffect, useState } from "react";

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
  sort_order: 0,
};

export default function AdminGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Game, "id">>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch("/api/admin/games")
      .then((r) => r.json())
      .then(setGames)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    setSaving(true);
    if (editId) {
      await fetch(`/api/admin/games/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/admin/games", {
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
      sort_order: g.sort_order,
    });
    setEditId(g.id);
    setShowForm(true);
  };

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

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 className="font-display font-extrabold text-[15px]">
            {editId ? "Edit Game" : "Tambah Game Baru"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold mb-1">Nama Game</label>
              <input className="jx-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Slug</label>
              <input className="jx-input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
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
              <input className="jx-input" value={form.developer || ""} onChange={(e) => setForm({ ...form, developer: e.target.value })} />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Rating</label>
              <input type="number" step="0.1" min="0" max="5" className="jx-input" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })} />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Reviews</label>
              <input className="jx-input" value={form.reviews} onChange={(e) => setForm({ ...form, reviews: e.target.value })} />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Image URL</label>
              <input className="jx-input" value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Gradient (CSS)</label>
              <input className="jx-input" value={form.gradient || ""} onChange={(e) => setForm({ ...form, gradient: e.target.value })} />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Label (untuk gradient)</label>
              <input className="jx-input" value={form.label || ""} onChange={(e) => setForm({ ...form, label: e.target.value })} />
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

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-100 text-left text-gray-500 font-semibold">
              <th className="px-5 py-3">Game</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Rating</th>
              <th className="px-5 py-3">Sort</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {games.map((g) => (
              <tr key={g.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-5 py-3 font-bold">{g.name}</td>
                <td className="px-5 py-3 text-gray-500">{g.category}</td>
                <td className="px-5 py-3">{g.rating}</td>
                <td className="px-5 py-3 text-gray-500">{g.sort_order}</td>
                <td className="px-5 py-3 text-right space-x-2">
                  <button onClick={() => handleEdit(g)} className="text-blue-600 hover:underline font-semibold">Edit</button>
                  <button onClick={() => handleDelete(g.id)} className="text-red-500 hover:underline font-semibold">Hapus</button>
                </td>
              </tr>
            ))}
            {!loading && games.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-400">Belum ada game.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
