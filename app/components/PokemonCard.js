"use client";
import { useState } from "react";
import FavoritesManager from "./FavoritesManager";
import TypeEffectiveness from "./TypeEffectiveness";
import Image from "next/image";

export default function PokemonCard({ pokemon }) {
  const [showStats, setShowStats] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);

  const getTypeColor = (type) => {
    const colors = {
      fire: "bg-red-500",
      water: "bg-blue-500",
      grass: "bg-green-500",
      electric: "bg-yellow-500",
      ice: "bg-cyan-400",
      fighting: "bg-orange-700",
      poison: "bg-purple-500",
      ground: "bg-yellow-700",
      flying: "bg-indigo-400",
      psychic: "bg-pink-500",
      bug: "bg-lime-500",
      rock: "bg-yellow-800",
      ghost: "bg-purple-700",
      dragon: "bg-indigo-700",
      dark: "bg-gray-800",
      steel: "bg-gray-500",
      fairy: "bg-pink-300",
      normal: "bg-gray-400"
    };
    return colors[type] || "bg-gray-400";
  };

  return (
    <div className="relative border rounded-lg shadow-lg p-4 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:scale-105">
      <FavoritesManager pokemonId={pokemon.id} pokemonName={pokemon.name} />
      
      <div className="relative h-24 w-24 mx-auto mb-2">
        <Image 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      
      <div className="text-center mb-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">#{pokemon.id}</span>
        <h3 className="text-lg font-semibold capitalize text-gray-800 dark:text-white">
          {pokemon.name}
        </h3>
      </div>
      
      <div className="flex justify-center gap-2 mb-3 flex-wrap">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className={`px-3 py-1 rounded-full text-white text-xs font-semibold capitalize ${getTypeColor(t.type.name)}`}
          >
            {t.type.name}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        <button
          onClick={() => setShowStats(!showStats)}
          className="w-full px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          aria-label={showStats ? "Hide stats" : "Show stats"}
        >
          {showStats ? "Hide Stats" : "Show Stats"}
        </button>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
          aria-label={showDetails ? "Hide details" : "Show details"}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {showStats && (
        <div className="mt-3 text-sm space-y-1">
          {pokemon.stats.map((s) => (
            <div key={s.stat.name} className="flex justify-between items-center">
              <span className="capitalize text-gray-700 dark:text-gray-300">
                {s.stat.name.replace("-", " ")}:
              </span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${Math.min((s.base_stat / 255) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="font-semibold text-gray-800 dark:text-white w-8 text-right">
                  {s.base_stat}
                </span>
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-gray-300 dark:border-gray-600 font-semibold text-gray-800 dark:text-white">
            Total: {totalStats}
          </div>
        </div>
      )}

      {showDetails && (
        <div className="mt-3">
          <div className="text-sm mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Abilities: </span>
            <span className="text-gray-600 dark:text-gray-400 capitalize">
              {pokemon.abilities.map(a => a.ability.name).join(", ")}
            </span>
          </div>
          <div className="text-sm mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Height: </span>
            <span className="text-gray-600 dark:text-gray-400">
              {(pokemon.height / 10).toFixed(1)}m
            </span>
          </div>
          <div className="text-sm mb-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Weight: </span>
            <span className="text-gray-600 dark:text-gray-400">
              {(pokemon.weight / 10).toFixed(1)}kg
            </span>
          </div>
          
          <TypeEffectiveness types={pokemon.types} />
        </div>
      )}
    </div>
  );
}