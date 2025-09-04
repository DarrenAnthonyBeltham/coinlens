"use client";

import { useState } from "react";
import Link from "next/link";
import Search from "./Search";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkStyle = "px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-full transition-colors duration-200";

  return (
    <header className="sticky top-0 z-50 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            CoinLens
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/news" className={navLinkStyle}>
              News
            </Link>
            <Link href="/converter" className={navLinkStyle}>
              Converter
            </Link>
            <Link href="/glossary" className={navLinkStyle}>
              Glossary
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Search />
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/news" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors duration-200">
            News
          </Link>
          <Link href="/converter" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors duration-200">
            Converter
          </Link>
          <Link href="/glossary" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors duration-200">
            Glossary
          </Link>
        </div>
      )}
    </header>
  );
}