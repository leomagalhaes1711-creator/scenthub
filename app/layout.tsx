import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import Navbar from "@/components/site-layout/navbar";
import Footer from "@/components/site-layout/footer";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "ScentHub | Descubra o seu próximo perfume",
  description:
    "Descubra perfumes, explore as suas notas olfativas e partilhe a sua opinião.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body
        className={`${instrument.variable} ${bricolage.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}