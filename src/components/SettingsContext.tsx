"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface SiteSettings {
  whatsapp: string;
  email: string;
  site_name: string;
  tagline: string;
  primary_color: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  admin_fee: number;
  company_name: string;
  invoice_prefix: string;
  site_description: string;
  promo_title: string;
  promo_desc: string;
  tos_url: string;
  privacy_url: string;
  cs_text: string;
}

const defaults: SiteSettings = {
  whatsapp: "",
  email: "",
  site_name: "",
  tagline: "",
  primary_color: "#00D97E",
  instagram: "",
  tiktok: "",
  youtube: "",
  admin_fee: 1000,
  company_name: "JUEVIX DIGITAL INDONESIA",
  invoice_prefix: "JVX",
  site_description: "",
  promo_title: "",
  promo_desc: "",
  tos_url: "",
  privacy_url: "",
  cs_text: "",
};

const SettingsContext = createContext<SiteSettings>(defaults);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaults);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) setSettings({ ...defaults, ...data });
      })
      .catch(() => {});
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
