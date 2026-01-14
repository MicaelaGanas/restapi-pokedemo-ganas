"use client";

import { useState } from "react";
import SearchFilter from "./SearchFilter";
import PokemonCard from "./PokemonCard";
import StatsChart from "./StatsChart";
import RandomGenerator from "./RandomGenerator";
import LoadingSkeleton from "./LoadingSkeleton";

export default function ClientWrapper({ data }) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [minStats, setMinStats] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [displayCount, setDisplayCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [allPokemon, setAllPokemon] = useState(data);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Filter function
  const getFilteredPokemon = () => {
    let filtered = allPokemon;

    // Search filter
    if (query) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.id.toString().includes(query)
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((p) =>
        p.types.some((t) => t.type.name === typeFilter)
      );
    }

    // Stats filter
    if (minStats > 0) {
      filtered = filtered.filter((p) => {
        const total = p.stats.reduce((sum, s) => sum + s.base_stat, 0);
        return total >= minStats;
      });
    }

    // Favorites filter
    if (showFavoritesOnly) {
      const favorites = JSON.parse(localStorage.getItem("pokemonFavorites") || "[]");
      filtered = filtered.filter((p) => favorites.includes(p.id));
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "hp":
          return b.stats[0].base_stat - a.stats[0].base_stat;
        case "attack":
          return b.stats[1].base_stat - a.stats[1].base_stat;
        case "defense":
          return b.stats[2].base_stat - a.stats[2].base_stat;
        case "total": {
          const totalA = a.stats.reduce((sum, s) => sum + s.base_stat, 0);
          const totalB = b.stats.reduce((sum, s) => sum + s.base_stat, 0);
          return totalB - totalA;
        }
        case "id":
        default:
          return a.id - b.id;
      }
    });

    return sorted;
  };

  const filtered = getFilteredPokemon();
  const displayed = filtered.slice(0, displayCount);

  const loadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + 12);
      setIsLoadingMore(false);
    }, 300);
  };

  const handleRandomSelect = async (randomId) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const pokemon = await res.json();
      
      // Check if already in list
      if (!allPokemon.find((p) => p.id === pokemon.id)) {
        setAllPokemon((prev) => [...prev, pokemon]);
      }
      
      // Filter to show only this pokemon
      setQuery(pokemon.name);
    } catch (error) {
      console.error("Failed to fetch random Pokémon:", error);
    }
  };

  const clearFilters = () => {
    setQuery("");
    setTypeFilter("all");
    setMinStats(0);
    setSortBy("id");
    setShowFavoritesOnly(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white border-8 border-black pixel-shadow p-4">
        <RandomGenerator onRandomSelect={handleRandomSelect} totalPokemon={898} />
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`retro-button px-6 py-3 font-bold uppercase ${
              showFavoritesOnly
                ? "bg-red-500 text-white"
                : "bg-white text-black hover:bg-yellow-200"
            }`}
          >
            ❤️ Favorites {showFavoritesOnly ? "Only" : ""}
          </button>
          
          <button
            onClick={clearFilters}
            className="retro-button px-6 py-3 bg-white text-black font-bold uppercase hover:bg-gray-200"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <SearchFilter
        onSearch={setQuery}
        onTypeFilter={setTypeFilter}
        onStatsFilter={setMinStats}
        onSort={setSortBy}
      />

      <div className="flex justify-between items-center mb-6">
        <div className="pixel-font text-sm text-black bg-white border-4 border-black px-4 py-2 pixel-shadow">
          Showing <span className="text-red-600">{displayed.length}</span> of <span className="text-blue-600">{filtered.length}</span> Pokémon
          {filtered.length !== allPokemon.length && ` (${allPokemon.length} total)`}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayed.map((p, index) => (
          <div 
            key={p.id} 
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <PokemonCard pokemon={p} />
          </div>
        ))}
      </div>

      {isLoadingMore && <LoadingSkeleton count={3} />}

      {displayed.length < filtered.length && (
        <div className="text-center mt-12">
          <button
            onClick={loadMore}
            className="retro-button px-8 py-4 bg-red-500 text-white font-bold text-lg uppercase hover:bg-red-600"
          >
            <span className="flex items-center gap-2">
              Load More Pokémon
              <span>⬇️</span>
            </span>
          </button>
        </div>
      )}

      {filtered.length === 1 && (
        <div className="bg-white border-8 border-black pixel-shadow p-8 mt-8">
          <h3 className="pixel-font text-xl mb-4 text-gray-900">
            📊 Stats for {filtered[0].name}
          </h3>
          <StatsChart pokemon={filtered[0]} />
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="pixel-font text-xl text-gray-900 mb-4">
            No Pokémon found! 😢
          </p>
          <button
            onClick={clearFilters}
            className="retro-button px-6 py-3 bg-yellow-400 text-black font-bold uppercase hover:bg-yellow-300"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}