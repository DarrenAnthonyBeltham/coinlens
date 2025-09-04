import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { WatchlistProvider } from "./context/WatchlistContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoinLens",
  description: "Track your favorite crypto coins.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WatchlistProvider>
          <Navbar />
          {children}
        </WatchlistProvider>
      </body>
    </html>
  );
}