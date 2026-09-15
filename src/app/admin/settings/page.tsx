"use client";

import { useEffect, useState } from "react";

interface Settings {
  id?: number;
  whatsapp: string;
  email: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  site_name: string;
  tagline: string;
  primary_color: string;
}

export default function AdminSettings() {
  const [form, setForm] = useState<Settings>({
    whatsapp: "",
    email: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    site_name: "",
    tagline: "",
    primary_color: "#00D97E",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d && !d.error) setForm(d);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="font-display text-2xl font-extrabold">Pengaturan Site</h2>
        <p className="text-[14px] text-gray-500 mt-1">Atur informasi kontak dan branding Juevix.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h3 className="font-display font-extrabold text-[15px] flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          Branding
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-bold mb-1">Nama Site</label>
            <input className="jx-input" value={form.site_name} onChange={(e) => setForm({ ...form, site_name: e.target.value })} />
          </div>
          <div>
            <label className="block text-[12px] font-bold mb-1">Tagline</label>
            <input className="jx-input" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
          </div>
          <div>
            <label className="block text-[12px] font-bold mb-1">Warna Utama</label>
            <div className="flex gap-2">
              <input type="color" value={form.primary_color} onChange={(e) => setForm({ ...form, primary_color: e.target.value })} className="w-10 h-[46px] rounded-lg border border-gray-200 cursor-pointer" />
              <input className="jx-input flex-1" value={form.primary_color} onChange={(e) => setForm({ ...form, primary_color: e.target.value })} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h3 className="font-display font-extrabold text-[15px] flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72" />
          </svg>
          Kontak
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-bold mb-1">WhatsApp (tanpa +)</label>
            <input className="jx-input" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="6281234567890" />
          </div>
          <div>
            <label className="block text-[12px] font-bold mb-1">Email</label>
            <input type="email" className="jx-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h3 className="font-display font-extrabold text-[15px] flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" />
          </svg>
          Social Media
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-bold mb-1">Instagram</label>
            <input className="jx-input" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} placeholder="@juevix" />
          </div>
          <div>
            <label className="block text-[12px] font-bold mb-1">TikTok</label>
            <input className="jx-input" value={form.tiktok} onChange={(e) => setForm({ ...form, tiktok: e.target.value })} placeholder="@juevix" />
          </div>
          <div>
            <label className="block text-[12px] font-bold mb-1">YouTube</label>
            <input className="jx-input" value={form.youtube} onChange={(e) => setForm({ ...form, youtube: e.target.value })} placeholder="@juevix" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={handleSave} disabled={saving} className="jx-btn jx-btn-primary text-[13px]">
          {saving ? "Menyimpan..." : "Simpan Pengaturan"}
        </button>
        {saved && (
          <span className="text-[13px] font-bold text-emerald-600 flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Tersimpan!
          </span>
        )}
      </div>
    </div>
  );
}
