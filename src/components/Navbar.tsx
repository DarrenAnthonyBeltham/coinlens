import Link from "next/link";
import Search from "./Search";

export default function Navbar() {
  return (
    <header className="p-4 sm:p-6 lg:p-8">
      <nav className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            CoinLens
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/news" className="text-sm text-slate-300 hover:text-white transition-colors">
              News
            </Link>
            <Link href="/converter" className="text-sm text-slate-300 hover:text-white transition-colors">
              Converter
            </Link>
            <Link href="/glossary" className="text-sm text-slate-300 hover:text-white transition-colors">
              Glossary
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Search />
        </div>
      </nav>
    </header>
  );
}