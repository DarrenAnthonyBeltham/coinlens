import Link from "next/link";
import Search from "./Search";

export default function Navbar() {
  return (
    <header className="p-4 sm:p-6 lg:p-8">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          CoinLens
        </Link>
        <Search />
      </nav>
    </header>
  );
}