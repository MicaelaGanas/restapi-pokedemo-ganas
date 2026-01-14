"use client";

import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favIds = JSON.parse(localStorage.getItem("pokemonFavorites") || "[]");
    setFavorites(favIds);

    // Fetch favorite Pokémon data
    const fetchFavorites = async () => {
      setLoading(true);
      const data = await Promise.all(
        favIds.map(async (id) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          return res.json();
        })
      );
      setPokemonData(data);
      setLoading(false);
    };

    if (favIds.length > 0) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 bg-red-500 border-8 border-black pixel-shadow p-8 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 gap-8 p-8">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="text-6xl">⚪</div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <h1 className="pixel-font text-4xl md:text-5xl mb-6 text-yellow-400 drop-shadow-[6px_6px_0_rgba(0,0,0,1)] text-center md:text-left leading-tight">
              ❤️ MY FAVORITES
            </h1>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6 text-center md:text-left">
              <p className="text-base md:text-xl font-bold text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] leading-snug">
                {favorites.length === 0
                  ? "No favorites yet! Click the heart icon to add Pokémon."
                  : favorites.length === 1 ? "Favorite Pokémon" : "Favorite Pokémon"}
              </p>
              <div className="self-center md:self-auto bg-white border-4 border-black px-5 md:px-6 py-3 font-bold text-xl md:text-2xl text-red-600">
                {favorites.length}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton count={favorites.length} />
        ) : favorites.length === 0 ? (
          <div className="text-center bg-yellow-400 border-8 border-black pixel-shadow p-16">
            <p className="pixel-font text-4xl text-gray-900 mb-6">❌ NO FAVORITES</p>
            <p className="text-xl font-bold text-gray-900 mb-8">Go back to home and add some Pokémon to your favorites!</p>
            <a href="/" className="retro-button px-8 py-4 bg-red-500 text-white font-bold uppercase text-lg hover:bg-red-600">
              ⬅️ Go Home
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pokemonData.map((p, index) => (
              <div
                key={p.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <PokemonCard pokemon={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
