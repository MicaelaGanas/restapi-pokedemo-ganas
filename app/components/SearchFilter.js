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
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6 space-y-4">
      {/* Search Bar */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Search Pokémon
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name or ID..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Filter by Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white capitalize"
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
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Min Total Stats
          </label>
          <input
            type="number"
            value={minStat}
            onChange={(e) => handleStatsChange(e.target.value)}
            placeholder="e.g., 400"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
