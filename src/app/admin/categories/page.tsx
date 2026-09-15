"use client";

import { useEffect, useState } from "react";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/components/admin/Toast";

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
  const { showToast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Category, "id">>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const load = () => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then(setCategories)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const url = editId ? `/api/admin/categories/${editId}` : "/api/admin/categories";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Gagal");
      showToast("success", editId ? "Perubahan berhasil disimpan" : "Kategori berhasil ditambahkan");
      setForm(empty);
      setEditId(null);
      setShowForm(false);
      load();
    } catch {
      showToast("error", "Gagal menyimpan kategori");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/categories/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal");
      showToast("success", "Kategori berhasil dihapus");
      load();
    } catch {
      showToast("error", "Gagal menghapus kategori");
    }
    setDeleteTarget(null);
  };

  const handleEdit = (c: Category) => {
    setForm({ name: c.name, slug: c.slug, icon: c.icon, sort_order: c.sort_order });
    setEditId(c.id);
    setShowForm(true);
  };

  const autoSlug = (name: string) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <div className="space-y-6">
      <ConfirmModal
        open={!!deleteTarget}
        title="Hapus Kategori?"
        description={`"${deleteTarget?.name}" akan dihapus permanen dan tidak bisa dikembalikan.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

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
                  <button onClick={() => setDeleteTarget(c)} className="text-red-500 hover:underline font-semibold">Hapus</button>
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
