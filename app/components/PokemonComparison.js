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
      <div className="mb-4">
        <div className="font-bold mb-1 capitalize text-gray-900 uppercase text-sm">
          {name.replace("-", " ")}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-12 text-right text-sm font-bold text-blue-600">
            {stat1}
          </span>
          <div className="flex-1 flex gap-0 h-6 border-2 border-black">
            <div
              className="bg-blue-500 transition-all"
              style={{ width: `${percentage1}%` }}
            ></div>
            <div
              className="bg-red-500 transition-all"
              style={{ width: `${percentage2}%` }}
            ></div>
          </div>
          <span className="w-12 text-left text-sm font-bold text-red-600">
            {stat2}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border-8 border-black pixel-shadow p-4 md:p-8">
      <h2 className="pixel-font text-2xl sm:text-3xl md:text-4xl mb-4 md:mb-8 text-gray-900 text-center md:text-left leading-tight break-words">
        ⚔️ POKEMON VS
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-bold mb-2 text-gray-900 uppercase">
            Pokémon 1
          </label>
          <input
            type="text"
            value={pokemon1Id}
            onChange={(e) => setPokemon1Id(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && fetchPokemon(pokemon1Id, setPokemon1)}
            placeholder="e.g., pikachu"
            className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold"
          />
        </div>
        <div>
          <label className="block font-bold mb-2 text-gray-900 uppercase">
            Pokémon 2
          </label>
          <input
            type="text"
            value={pokemon2Id}
            onChange={(e) => setPokemon2Id(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && fetchPokemon(pokemon2Id, setPokemon2)}
            placeholder="e.g., charizard"
            className="w-full px-4 py-3 border-4 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 font-bold"
          />
        </div>
      </div>

      <button
        onClick={() => {
          fetchPokemon(pokemon1Id, setPokemon1);
          fetchPokemon(pokemon2Id, setPokemon2);
        }}
        disabled={!pokemon1Id || !pokemon2Id || loading}
        className="retro-button w-full mb-6 px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold uppercase"
      >
        {loading ? "Loading..." : "⚔️ COMPARE"}
      </button>

      {pokemon1 && pokemon2 && (
        <div>
          <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b-4 border-black">
            <div className="text-center border-4 border-black p-4 bg-yellow-50">
              <div className="relative h-32 w-32 mx-auto mb-2">
                <Image
                  src={pokemon1.sprites.front_default}
                  alt={pokemon1.name}
                  fill
                  className="object-contain pixelated"
                  unoptimized
                />
              </div>
              <h3 className="text-xl font-bold uppercase text-gray-900">
                {pokemon1.name}
              </h3>
              <p className="font-bold text-gray-700">#{pokemon1.id.toString().padStart(3, '0')}</p>
            </div>
            <div className="text-center border-4 border-black p-4 bg-blue-50">
              <div className="relative h-32 w-32 mx-auto mb-2">
                <Image
                  src={pokemon2.sprites.front_default}
                  alt={pokemon2.name}
                  fill
                  className="object-contain pixelated"
                  unoptimized
                />
              </div>
              <h3 className="text-xl font-bold uppercase text-gray-900">
                {pokemon2.name}
              </h3>
              <p className="font-bold text-gray-700">#{pokemon2.id.toString().padStart(3, '0')}</p>
            </div>
          </div>

          <div className="space-y-2 mb-8">
            {pokemon1.stats.map((stat, i) => (
              <StatComparison
                key={stat.stat.name}
                stat1={stat.base_stat}
                stat2={pokemon2.stats[i].base_stat}
                name={stat.stat.name}
              />
            ))}
          </div>

          <div className="border-4 border-black bg-yellow-50 p-4">
            <h4 className="pixel-font text-lg mb-4 text-gray-900">SUMMARY</h4>
            <div className="grid grid-cols-2 gap-4 text-sm font-bold">
              <div className="border-2 border-black p-3">
                <p className="text-gray-900 mb-1">
                  Total: {pokemon1.stats.reduce((sum, s) => sum + s.base_stat, 0)}
                </p>
                <p className="text-gray-900 mb-1">
                  Height: {(pokemon1.height / 10).toFixed(1)}m
                </p>
                <p className="text-gray-900">
                  Weight: {(pokemon1.weight / 10).toFixed(1)}kg
                </p>
              </div>
              <div className="border-2 border-black p-3">
                <p className="text-gray-900 mb-1">
                  Total: {pokemon2.stats.reduce((sum, s) => sum + s.base_stat, 0)}
                </p>
                <p className="text-gray-900 mb-1">
                  Height: {(pokemon2.height / 10).toFixed(1)}m
                </p>
                <p className="text-gray-900">
                  Weight: {(pokemon2.weight / 10).toFixed(1)}kg
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
