"use client";

import { useState } from "react";

export default function SearchFilter({ onSearch, onTypeFilter, onStatsFilter, onSort }) {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [minStat, setMinStat] = useState("");
  const [sortBy, setSortBy] = useState("id");

  const pokemonTypes = [
    "all", "normal", "fire", "water", "electric", "grass", "ice",
    "fighting", "poison", "ground", "flying", "psychic", "bug",
    "rock", "ghost", "dragon", "dark", "steel", "fairy"
  ];

  const handleSearch = (value) => {
    setQuery(value);
    onSearch(value);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onTypeFilter(type);
  };

  const handleStatsChange = (value) => {
    setMinStat(value);
    onStatsFilter(value ? parseInt(value) : 0);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSort(value);
  };

  return (
    <div className="bg-white border-8 border-black pixel-shadow p-6 mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-3 text-gray-900 uppercase">
          🔍 Search Pokémon
        </label>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name or ID..."
            className="w-full px-5 py-4 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 text-lg font-bold uppercase"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-bold mb-3 text-gray-900 uppercase">
            <span className="text-xl">⚡</span>
            Filter by Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold uppercase"
          >
            {pokemonTypes.map((type) => (
              <option key={type} value={type} className="capitalize">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Stats Filter */}
        <div>
          <label className="block text-sm font-bold mb-3 text-gray-900 uppercase">
            <span className="text-xl">💪</span>
            Min Total Stats
          </label>
          <input
            type="number"
            value={minStat}
            onChange={(e) => handleStatsChange(e.target.value)}
            placeholder="e.g., 400"
            className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold"
          />
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-bold mb-3 text-gray-900 uppercase">
            <span className="text-xl">📊</span>
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold uppercase"
          >
            <option value="id">ID (Default)</option>
            <option value="name">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="hp">HP (High to Low)</option>
            <option value="attack">Attack (High to Low)</option>
            <option value="defense">Defense (High to Low)</option>
            <option value="total">Total Stats (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
