"use client";

import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="p-4 bg-red-600 dark:bg-red-800 text-white shadow-lg transition-colors">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-xl font-bold">⚡ Pokémon Dashboard</h1>
        <div className="flex items-center flex-wrap gap-4">
          <Link
            href="/"
            className="hover:underline transition-all hover:text-yellow-300"
          >
            Home
          </Link>

          <Link
            href="/favorites"
            className="hover:underline transition-all hover:text-yellow-300"
          >
            ❤️ Favorites
          </Link>

          <Link
            href="/compare"
            className="hover:underline transition-all hover:text-yellow-300"
          >
            ⚔️ Compare
          </Link>

          <Link
            href="/quiz"
            className="hover:underline transition-all hover:text-yellow-300"
          >
            🎮 Quiz
          </Link>

          <Link
            href="/about"
            className="hover:underline transition-all hover:text-yellow-300"
          >
            About
          </Link>
          
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}