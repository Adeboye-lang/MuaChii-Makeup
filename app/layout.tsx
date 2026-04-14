import type { Metadata } from "next";
import { Quicksand, Dancing_Script } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const scriptFont = Dancing_Script({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MuaChii | Feminine Luxury Beauty",
  description: "Premium feminine makeup artistry in Abuja, Nigeria. Bridal, editorial, and soft glam services.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "MuaChii | Feminine Luxury Beauty",
    description: "Premium feminine makeup artistry in Abuja, Nigeria. Bridal, editorial, and soft glam services.",
    images: [
      {
        url: "/favicon.svg",
        width: 192,
        height: 192,
        alt: "MuaChii Makeup Logo",
      },
    ],
  },
  themeColor: "#FFF5E6",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${scriptFont.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-brand-champagne text-brand-espresso overflow-x-hidden">
        <Navbar />
        <main className="flex-1 flex flex-col pt-20 md:pt-24">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
