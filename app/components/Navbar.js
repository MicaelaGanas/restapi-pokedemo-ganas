"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("bgMusicMuted") === "true";
    setMusicMuted(stored);
  }, []);

  const toggleMusic = () => {
    const next = !musicMuted;
    setMusicMuted(next);
    window.dispatchEvent(new CustomEvent("bg-music-toggle", { detail: { muted: next } }));
  };

  const isActive = (path) => pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/favorites", label: "❤️ Faves" },
    { href: "/compare", label: "⚔️ VS" },
    { href: "/quiz", label: "🎮 Quiz" },
    { href: "/about", label: "ℹ️ Info" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-red-600 border-b-8 border-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            <div className="relative text-4xl md:text-5xl animate-pixelBounce">
              ⚡
            </div>
            <div className="pixel-font text-lg md:text-2xl text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
              POKEDEX
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`retro-button px-4 lg:px-6 py-2 lg:py-3 font-bold uppercase tracking-wide text-sm lg:text-base ${
                  isActive(link.href) 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-white text-black hover:bg-yellow-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleMusic}
              className={`retro-button px-4 lg:px-5 py-2 lg:py-3 font-bold uppercase tracking-wide text-sm lg:text-base ${
                musicMuted ? 'bg-gray-300 text-black' : 'bg-green-400 text-black'
              }`}
              aria-label={musicMuted ? "Turn music on" : "Turn music off"}
            >
              {musicMuted ? "🔇 Music" : "🔊 Music"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden retro-button px-4 py-2 bg-yellow-400 text-black font-bold text-xl"
            aria-label="Toggle menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation Links */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t-4 border-black bg-red-500">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block retro-button w-full text-left px-4 py-3 font-bold uppercase text-sm mb-2 ${
                  isActive(link.href) 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-white text-black hover:bg-yellow-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleMusic}
              className={`block w-full retro-button text-left px-4 py-3 font-bold uppercase text-sm ${
                musicMuted ? 'bg-gray-300 text-black' : 'bg-green-400 text-black'
              }`}
              aria-label={musicMuted ? "Turn music on" : "Turn music off"}
            >
              {musicMuted ? "🔇 Music Off" : "🔊 Music On"}
            </button>
          </div>
        )}
      </div>
      
      {/* Yellow stripe - classic Pokemon style */}
      <div className="h-3 bg-yellow-400 border-t-4 border-black"></div>
    </nav>
  );
}