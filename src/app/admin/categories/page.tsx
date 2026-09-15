"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  sort_order: number;
}

const iconOptions = [
  { value: "home", label: "Home" },
  { value: "gamepad", label: "Gamepad" },
  { value: "sword", label: "Sword" },
  { value: "smile", label: "Smile" },
  { value: "building", label: "Building" },
  { value: "clock", label: "Clock" },
  { value: "globe", label: "Globe" },
  { value: "layers", label: "Layers" },
];

const empty: Omit<Category, "id"> = {
  name: "",
  slug: "",
  icon: "gamepad",
  sort_order: 0,
};

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Category, "id">>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = () => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then(setCategories)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    setSaving(true);
    if (editId) {
      await fetch(`/api/admin/categories/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/admin/categories", {
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
    if (!confirm("Yakin hapus kategori ini?")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    load();
  };

  const handleEdit = (c: Category) => {
    setForm({
      name: c.name,
      slug: c.slug,
      icon: c.icon,
      sort_order: c.sort_order,
    });
    setEditId(c.id);
    setShowForm(true);
  };

  const autoSlug = (name: string) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-extrabold">Kategori</h2>
          <p className="text-[14px] text-gray-500 mt-1">Kelola kategori game di homepage.</p>
        </div>
        <button
          onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }}
          className="jx-btn jx-btn-primary text-[13px]"
        >
          + Tambah Kategori
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 className="font-display font-extrabold text-[15px]">
            {editId ? "Edit Kategori" : "Tambah Kategori Baru"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold mb-1">Nama</label>
              <input
                className="jx-input"
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setForm({ ...form, name, slug: editId ? form.slug : autoSlug(name) });
                }}
                placeholder="RPG"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Slug</label>
              <input
                className="jx-input"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="rpg"
              />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Icon</label>
              <select
                className="jx-input"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
              >
                {iconOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Sort Order</label>
              <input
                type="number"
                className="jx-input"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })}
              />
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
              <th className="px-5 py-3">Nama</th>
              <th className="px-5 py-3">Slug</th>
              <th className="px-5 py-3">Icon</th>
              <th className="px-5 py-3">Sort</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-5 py-3 font-bold">{c.name}</td>
                <td className="px-5 py-3 text-gray-500">{c.slug}</td>
                <td className="px-5 py-3">{c.icon}</td>
                <td className="px-5 py-3 text-gray-500">{c.sort_order}</td>
                <td className="px-5 py-3 text-right space-x-2">
                  <button onClick={() => handleEdit(c)} className="text-blue-600 hover:underline font-semibold">Edit</button>
                  <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:underline font-semibold">Hapus</button>
                </td>
              </tr>
            ))}
            {!loading && categories.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-gray-400">Belum ada kategori.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
