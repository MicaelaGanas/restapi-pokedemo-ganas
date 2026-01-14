"use client";

import { useState, useEffect } from "react";

export default function FavoritesManager({ pokemonId, pokemonName }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("pokemonFavorites") || "[]");
    setIsFavorite(favorites.includes(pokemonId));
  }, [pokemonId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("pokemonFavorites") || "[]");
    
    if (isFavorite) {
      const updated = favorites.filter(id => id !== pokemonId);
      localStorage.setItem("pokemonFavorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(pokemonId);
      localStorage.setItem("pokemonFavorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`absolute top-2 right-2 text-2xl transition-transform hover:scale-110 ${
        isFavorite ? "text-red-500" : "text-gray-300"
      }`}
      aria-label={isFavorite ? `Remove ${pokemonName} from favorites` : `Add ${pokemonName} to favorites`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}
