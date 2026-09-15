"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface SiteSettings {
  whatsapp: string;
  email: string;
  site_name: string;
  tagline: string;
  primary_color: string;
  instagram: string;
  tiktok: string;
  youtube: string;
}

const SettingsContext = createContext<SiteSettings>({
  whatsapp: "6281234567890",
  email: "halo@juevix.net",
  site_name: "Juevix",
  tagline: "Top Up Game, Lebih Mudah",
  primary_color: "#00D97E",
  instagram: "@juevix",
  tiktok: "@juevix",
  youtube: "@juevix",
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>({
    whatsapp: "6281234567890",
    email: "halo@juevix.net",
    site_name: "Juevix",
    tagline: "Top Up Game, Lebih Mudah",
    primary_color: "#00D97E",
    instagram: "@juevix",
    tiktok: "@juevix",
    youtube: "@juevix",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) setSettings(data);
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
