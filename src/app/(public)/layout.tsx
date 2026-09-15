import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { SettingsProvider } from "@/components/SettingsContext";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      <Header />
      {children}
      <Footer />
      <BottomNav />
    </SettingsProvider>
  );
}
