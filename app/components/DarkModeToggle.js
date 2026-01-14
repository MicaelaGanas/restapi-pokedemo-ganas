"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage or system preference
    const isDark = localStorage.getItem("darkMode") === "true" ||
      (!localStorage.getItem("darkMode") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="group relative px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-white/30 overflow-hidden"
      aria-label="Toggle dark mode"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-purple-300/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <span className="relative flex items-center gap-2 font-bold text-sm">
        <span className="text-xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 inline-block">
          {darkMode ? "🌙" : "☀️"}
        </span>
        {darkMode ? "Dark" : "Light"}
      </span>
    </button>
  );
}
