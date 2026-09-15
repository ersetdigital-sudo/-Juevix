"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { useToast } from "@/components/admin/Toast";

interface Nominal {
  id: number;
  game_slug: string;
  label: string;
  price: number;
  badge: string | null;
  badge_type: string | null;
  original_price: number | null;
  sort_order: number;
}

interface Game {
  slug: string;
  name: string;
}

const empty: Omit<Nominal, "id"> = {
  game_slug: "",
  label: "",
  price: 0,
  badge: "",
  badge_type: null,
  original_price: null,
  sort_order: 0,
};

export default function AdminNominals() {
  const { showToast } = useToast();
  const [nominals, setNominals] = useState<Nominal[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Omit<Nominal, "id">>(empty);
  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Nominal | null>(null);
  const [dragId, setDragId] = useState<number | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const load = () => {
    Promise.all([
      fetch("/api/admin/nominals").then((r) => r.json()),
      fetch("/api/admin/games").then((r) => r.json()),
    ]).then(([n, g]) => {
      setNominals(n);
      setGames(g);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = filter ? nominals.filter((n) => n.game_slug === filter) : nominals;

  const showGameCol = !filter;

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const url = editId ? `/api/admin/nominals/${editId}` : "/api/admin/nominals";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Gagal");
      showToast("success", editId ? "Perubahan berhasil disimpan" : "Nominal berhasil ditambahkan");
      setForm(empty);
      setEditId(null);
      setShowForm(false);
      load();
    } catch {
      showToast("error", "Gagal menyimpan nominal");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/nominals/${deleteTarget.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal");
      showToast("success", "Nominal berhasil dihapus");
      load();
    } catch {
      showToast("error", "Gagal menghapus nominal");
    }
    setDeleteTarget(null);
  };

  const handleEdit = (n: Nominal) => {
    setForm({
      game_slug: n.game_slug, label: n.label, price: n.price,
      badge: n.badge || "", badge_type: n.badge_type,
      original_price: n.original_price, sort_order: n.sort_order,
    });
    setEditId(n.id);
    setShowForm(true);
  };

  const handleDragStart = useCallback((idx: number) => {
    dragItem.current = idx;
    setDragId(filtered[idx].id);
  }, [filtered]);

  const handleDragEnter = useCallback((idx: number) => {
    dragOverItem.current = idx;
  }, []);

  const handleDragEnd = useCallback(async () => {
    if (dragItem.current === null || dragOverItem.current === null) {
      setDragId(null);
      return;
    }

    const items = [...filtered];
    const [dragged] = items.splice(dragItem.current, 1);
    items.splice(dragOverItem.current, 0, dragged);

    dragItem.current = null;
    dragOverItem.current = null;
    setDragId(null);

    const updates = items.map((item, idx) => ({ id: item.id, sort_order: idx }));
    setNominals((prev) => {
      const next = [...prev];
      for (const u of updates) {
        const idx = next.findIndex((n) => n.id === u.id);
        if (idx !== -1) next[idx] = { ...next[idx], sort_order: u.sort_order };
      }
      return next;
    });

    try {
      await fetch("/api/admin/nominals/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
      showToast("success", "Urutan nominal diperbarui");
    } catch {
      showToast("error", "Gagal memperbarui urutan");
      load();
    }
  }, [filtered, showToast]);

  const fmt = (n: number) => "Rp" + n.toLocaleString("id-ID");

  return (
    <div className="space-y-6">
      <ConfirmModal
        open={!!deleteTarget}
        title="Hapus Nominal?"
        description={`"${deleteTarget?.label}" akan dihapus permanen dan tidak bisa dikembalikan.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-display text-2xl font-extrabold">Nominals</h2>
          <p className="text-[14px] text-gray-500 mt-1">Kelola harga top up per game.</p>
        </div>
        <button
          onClick={() => { setForm({ ...empty, game_slug: filter || "" }); setEditId(null); setShowForm(true); }}
          className="jx-btn jx-btn-primary text-[13px]"
        >
          + Tambah Nominal
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setFilter("")}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-bold border transition ${!filter ? "bg-[#04251a] text-white border-[#04251a]" : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"}`}>
          Semua
        </button>
        {games.map((g) => (
          <button key={g.slug} onClick={() => setFilter(g.slug)}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-bold border transition ${filter === g.slug ? "bg-[#04251a] text-white border-[#04251a]" : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"}`}>
            {g.name}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 className="font-display font-extrabold text-[15px]">
            {editId ? "Edit Nominal" : "Tambah Nominal Baru"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-bold mb-1">Game</label>
              <select className="jx-input" value={form.game_slug} onChange={(e) => setForm({ ...form, game_slug: e.target.value })}>
                <option value="">Pilih Game</option>
                {games.map((g) => (
                  <option key={g.slug} value={g.slug}>{g.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Label</label>
              <input className="jx-input" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="500 Diamond" />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Harga (Rp)</label>
              <input type="number" className="jx-input" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) })} />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Harga Coret (Opsional)</label>
              <input type="number" className="jx-input" value={form.original_price || ""} onChange={(e) => setForm({ ...form, original_price: e.target.value ? parseInt(e.target.value) : null })} />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Badge</label>
              <input className="jx-input" value={form.badge || ""} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Promo / Bonus" />
            </div>
            <div>
              <label className="block text-[12px] font-bold mb-1">Badge Type</label>
              <select className="jx-input" value={form.badge_type || ""} onChange={(e) => setForm({ ...form, badge_type: e.target.value || null })}>
                <option value="">Tanpa Badge</option>
                <option value="ok">OK (Hijau)</option>
                <option value="wait">Promo (Kuning)</option>
              </select>
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
              <th className="w-10"></th>
              {showGameCol && <th className="px-5 py-3">Game</th>}
              <th className="px-5 py-3">Label</th>
              <th className="px-5 py-3">Harga</th>
              <th className="px-5 py-3">Badge</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((n, idx) => (
              <tr
                key={n.id}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragEnter={() => handleDragEnter(idx)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={`border-b border-gray-50 transition-colors ${
                  dragId === n.id
                    ? "bg-blue-50 opacity-50"
                    : "hover:bg-gray-50/50"
                }`}
              >
                <td className="px-2 py-3 text-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" className="mx-auto cursor-grab active:cursor-grabbing">
                    <circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
                    <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
                    <circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
                  </svg>
                </td>
                {showGameCol && <td className="px-5 py-3 font-bold">{n.game_slug}</td>}
                <td className="px-5 py-3">{n.label}</td>
                <td className="px-5 py-3 font-bold text-[#00b96b]">{fmt(n.price)}</td>
                <td className="px-5 py-3">
                  {n.badge && (
                    <span className={`jx-badge ${n.badge_type === "ok" ? "jx-ok" : "jx-wait"}`}>
                      {n.badge}
                    </span>
                  )}
                </td>
                <td className="px-5 py-3 text-right space-x-2">
                  <button onClick={() => handleEdit(n)} className="text-blue-600 hover:underline font-semibold">Edit</button>
                  <button onClick={() => setDeleteTarget(n)} className="text-red-500 hover:underline font-semibold">Hapus</button>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={showGameCol ? 5 : 4} className="px-5 py-10 text-center text-gray-400">Belum ada nominal.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
        </svg>
        Geser baris untuk mengurutkan nominal. Urutan tersimpan otomatis.
      </p>
    </div>
  );
}
