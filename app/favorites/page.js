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
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          ❤️ My Favorite Pokémon
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {favorites.length === 0
            ? "You haven't added any favorites yet. Click the heart icon on any Pokémon card to add them!"
            : `You have ${favorites.length} favorite Pokémon`}
        </p>
      </div>

      {loading ? (
        <LoadingSkeleton count={favorites.length} />
      ) : pokemonData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pokemonData.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            Your favorites list is empty
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Explore Pokémon
          </a>
        </div>
      )}
    </div>
  );
}
