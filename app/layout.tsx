import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import ClientProviders from "./providers"; // <-- client wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cyfa Tech Gadgets & Accessories",
  description: "Unlock the future with cutting-edge tech, gadgets & accessories for everyday life."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-full flex-col bg-white">
        <ClientProviders>
          <Navbar />
          <main className="flex container mx-auto px-4 py-8">
            {children}
          </main>
        </ClientProviders>
        <Footer />
      </body>
    </html>
  );
}
