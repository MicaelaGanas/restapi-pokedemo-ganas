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
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <RandomGenerator onRandomSelect={handleRandomSelect} totalPokemon={898} />
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              showFavoritesOnly
                ? "bg-red-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            ❤️ Favorites {showFavoritesOnly ? "Only" : ""}
          </button>
          
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
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

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {displayed.length} of {filtered.length} Pokémon
        {filtered.length !== allPokemon.length && ` (${allPokemon.length} total)`}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayed.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>

      {isLoadingMore && <LoadingSkeleton count={3} />}

      {displayed.length < filtered.length && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md"
          >
            Load More Pokémon
          </button>
        </div>
      )}

      {filtered.length === 1 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            📊 Stats Chart for {filtered[0].name}
          </h3>
          <StatsChart pokemon={filtered[0]} />
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No Pokémon found matching your filters 😢
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}