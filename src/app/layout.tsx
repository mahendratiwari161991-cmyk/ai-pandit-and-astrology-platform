import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { UserRoleProvider } from "@/context/UserRoleContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AI Pandit | Vedic Astrology, Kundli, Palmistry, Face Reading & Matchmaking",
  description:
    "Complete modern AI-powered astrology platform integrating traditional Vedic kundli calculations, Ashtakoot marriage matching, AI palmistry, face reading, numerology, and expert pandit consultations.",
  keywords: [
    "AI Pandit",
    "Vedic Astrology",
    "Janma Kundli",
    "Kundli Matching",
    "Ashtakoot Guna Milan",
    "AI Palmistry",
    "Face Reading",
    "Numerology",
    "Horoscope",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-celestial-950 text-slate-100 min-h-screen flex flex-col">
        <LanguageProvider>
          <UserRoleProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </UserRoleProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
