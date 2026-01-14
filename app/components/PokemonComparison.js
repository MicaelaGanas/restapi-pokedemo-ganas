"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function PokemonComparison() {
  const [pokemon1Id, setPokemon1Id] = useState("");
  const [pokemon2Id, setPokemon2Id] = useState("");
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async (id, setter) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.toLowerCase()}`);
      const data = await res.json();
      setter(data);
    } catch (error) {
      console.error("Failed to fetch Pokémon:", error);
      setter(null);
    }
    setLoading(false);
  };

  const StatComparison = ({ stat1, stat2, name }) => {
    const max = Math.max(stat1, stat2);
    const percentage1 = (stat1 / max) * 100;
    const percentage2 = (stat2 / max) * 100;

    return (
      <div className="mb-3">
        <div className="text-sm font-medium mb-1 capitalize text-gray-700 dark:text-gray-300">
          {name.replace("-", " ")}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-12 text-right text-sm font-semibold text-blue-600 dark:text-blue-400">
            {stat1}
          </span>
          <div className="flex-1 flex gap-1 h-6">
            <div
              className="bg-blue-500 rounded-l transition-all"
              style={{ width: `${percentage1}%` }}
            ></div>
            <div
              className="bg-red-500 rounded-r transition-all"
              style={{ width: `${percentage2}%` }}
            ></div>
          </div>
          <span className="w-12 text-left text-sm font-semibold text-red-600 dark:text-red-400">
            {stat2}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        ⚔️ Pokémon Comparison
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Pokémon 1 (Name or ID)
          </label>
          <input
            type="text"
            value={pokemon1Id}
            onChange={(e) => setPokemon1Id(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && fetchPokemon(pokemon1Id, setPokemon1)}
            placeholder="e.g., pikachu or 25"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Pokémon 2 (Name or ID)
          </label>
          <input
            type="text"
            value={pokemon2Id}
            onChange={(e) => setPokemon2Id(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && fetchPokemon(pokemon2Id, setPokemon2)}
            placeholder="e.g., charizard or 6"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <button
        onClick={() => {
          fetchPokemon(pokemon1Id, setPokemon1);
          fetchPokemon(pokemon2Id, setPokemon2);
        }}
        disabled={!pokemon1Id || !pokemon2Id || loading}
        className="w-full mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
      >
        {loading ? "Loading..." : "Compare"}
      </button>

      {pokemon1 && pokemon2 && (
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="relative h-32 w-32 mx-auto mb-2">
                <Image
                  src={pokemon1.sprites.front_default}
                  alt={pokemon1.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h3 className="text-xl font-bold capitalize text-gray-800 dark:text-white">
                {pokemon1.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">#{pokemon1.id}</p>
            </div>
            <div className="text-center">
              <div className="relative h-32 w-32 mx-auto mb-2">
                <Image
                  src={pokemon2.sprites.front_default}
                  alt={pokemon2.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h3 className="text-xl font-bold capitalize text-gray-800 dark:text-white">
                {pokemon2.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">#{pokemon2.id}</p>
            </div>
          </div>

          <div className="space-y-2">
            {pokemon1.stats.map((stat, i) => (
              <StatComparison
                key={stat.stat.name}
                stat1={stat.base_stat}
                stat2={pokemon2.stats[i].base_stat}
                name={stat.stat.name}
              />
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Total Stats:</span>{" "}
                  {pokemon1.stats.reduce((sum, s) => sum + s.base_stat, 0)}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Height:</span> {(pokemon1.height / 10).toFixed(1)}m
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Weight:</span> {(pokemon1.weight / 10).toFixed(1)}kg
                </p>
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Total Stats:</span>{" "}
                  {pokemon2.stats.reduce((sum, s) => sum + s.base_stat, 0)}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Height:</span> {(pokemon2.height / 10).toFixed(1)}m
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Weight:</span> {(pokemon2.weight / 10).toFixed(1)}kg
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
