"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-red-600 border-b-8 border-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-4">
            <div className="relative text-5xl animate-pixelBounce">
              ⚡
            </div>
            <div className="pixel-font text-2xl text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
              POKEDEX
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-3">
            <Link 
              href="/" 
              className={`retro-button px-6 py-3 font-bold uppercase tracking-wide ${
                isActive('/') 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-white text-black hover:bg-yellow-200'
              }`}
            >
              Home
            </Link>

            <Link 
              href="/favorites" 
              className={`retro-button px-6 py-3 font-bold uppercase tracking-wide ${
                isActive('/favorites') 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-white text-black hover:bg-yellow-200'
              }`}
            >
              ❤️ Faves
            </Link>
            <Link 
              href="/compare" 
              className={`retro-button px-6 py-3 font-bold uppercase tracking-wide ${
                isActive('/compare') 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-white text-black hover:bg-yellow-200'
              }`}
            >
              ⚔️ VS
            </Link>
            <Link 
              href="/quiz" 
              className={`retro-button px-6 py-3 font-bold uppercase tracking-wide ${
                isActive('/quiz') 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-white text-black hover:bg-yellow-200'
              }`}
            >
              🎮 Quiz
            </Link>
            <Link 
              href="/about" 
              className={`retro-button px-6 py-3 font-bold uppercase tracking-wide ${
                isActive('/about') 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-white text-black hover:bg-yellow-200'
              }`}
            >
              ℹ️ Info
            </Link>
          </div>
        </div>
      </div>
      
      {/* Yellow stripe - classic Pokemon style */}
      <div className="h-3 bg-yellow-400 border-t-4 border-black"></div>
    </nav>
  );
}