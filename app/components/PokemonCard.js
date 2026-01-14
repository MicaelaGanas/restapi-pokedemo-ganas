"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FavoritesManager from "./FavoritesManager";
import TypeEffectiveness from "./TypeEffectiveness";
import Image from "next/image";

export default function PokemonCard({ pokemon }) {
  const router = useRouter();
  const [showStats, setShowStats] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);

  const getTypeBgColor = (type) => {
    const colors = {
      fire: "bg-orange-500",
      water: "bg-blue-500",
      grass: "bg-green-500",
      electric: "bg-yellow-400",
      ice: "bg-cyan-400",
      fighting: "bg-red-600",
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
      fairy: "bg-pink-400",
      normal: "bg-gray-400"
    };
    return colors[type] || "bg-gray-400";
  };

  const getStatColor = (statName) => {
    const colors = {
      hp: "bg-green-500",
      attack: "bg-red-500",
      defense: "bg-blue-500",
      "special-attack": "bg-purple-500",
      "special-defense": "bg-yellow-500",
      speed: "bg-pink-500"
    };
    return colors[statName] || "bg-gray-500";
  };

  const mainType = pokemon.types[0]?.type.name || "normal";
  const headerColor = getTypeBgColor(mainType);

  const handleCardClick = (e) => {
    // Don't navigate if clicking on buttons or favorite manager
    if (e.target.closest('button') || e.target.closest('[data-favorites-manager]')) {
      return;
    }
    router.push(`/pokemon/${pokemon.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="relative bg-white border-8 border-black pixel-shadow hover:translate-y-[-4px] transition-transform animate-fadeIn cursor-pointer"
    >
      {/* Header */}
      <div className={`${headerColor} border-b-5 border-black p-7 relative`}>
        <div data-favorites-manager>
          <FavoritesManager pokemonId={pokemon.id} pokemonName={pokemon.name} />
        </div>
        
        {/* ID Badge */}
        <div className="absolute top-4 left-4">
          <span className="pixel-font text-xs bg-black text-white px-3 py-2 border-4 border-white">
            #{pokemon.id.toString().padStart(3, '0')}
          </span>
        </div>
      </div>
      
      {/* Pokémon Image */}
      <div className="relative bg-gray-100 border-b-4 border-black p-8">
        <div className="relative h-40 w-40 mx-auto">
          <Image 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            fill
            className="object-contain pixelated"
            unoptimized
          />
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6 bg-white">
        {/* Name */}
        <h3 className="text-2xl font-black capitalize text-center mb-4 text-gray-900 tracking-wide">
          {pokemon.name}
        </h3>

        {/* Types */}
        <div className="flex gap-2 justify-center mb-6">
          {pokemon.types.map(({type}) => (
            <span 
              key={type.name}
              className={`${getTypeBgColor(type.name)} text-white px-4 py-2 font-bold uppercase text-sm border-4 border-black pixel-shadow`}
            >
              {type.name}
            </span>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="border-3 border-black p-2 bg-yellow-100 text-center">
            <div className="font-bold text-gray-700 text-xs uppercase leading-tight">Height</div>
            <div className="text-sm font-black text-gray-900">{pokemon.height / 10}m</div>
          </div>
          <div className="border-3 border-black p-2 bg-blue-100 text-center">
            <div className="font-bold text-gray-700 text-xs uppercase leading-tight">Weight</div>
            <div className="text-sm font-black text-gray-900">{pokemon.weight / 10}kg</div>
          </div>
          <div className="border-3 border-black p-2 bg-red-100 text-center">
            <div className="font-bold text-gray-700 text-xs uppercase leading-tight">Total</div>
            <div className="text-sm font-black text-gray-900">{totalStats}</div>
          </div>
        </div>

        {/* Stats Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowStats(!showStats);
          }}
          className="retro-button w-full bg-red-500 text-white font-bold py-3 mb-3 uppercase hover:bg-red-600"
        >
          {showStats ? '▲ Hide Stats' : '▼ View Stats'}
        </button>

        {/* Stats Section */}
        {showStats && (
          <div className="border-4 border-black bg-gray-50 p-4 mb-3">
            <div className="space-y-3">
              {pokemon.stats.map((stat) => {
                const percentage = (stat.base_stat / 255) * 100;
                return (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-bold text-xs uppercase text-gray-700">
                        {stat.stat.name.replace('-', ' ')}
                      </span>
                      <span className="font-black text-sm text-gray-900">{stat.base_stat}</span>
                    </div>
                    <div className="h-4 bg-white border-2 border-black">
                      <div 
                        className={`h-full ${getStatColor(stat.stat.name)} border-r-2 border-black transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Details Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDetails(!showDetails);
          }}
          className="retro-button w-full bg-blue-500 text-white font-bold py-3 uppercase hover:bg-blue-600"
        >
          {showDetails ? '▲ Hide Details' : '▼ Type Info'}
        </button>

        {/* Type Effectiveness */}
        {showDetails && (
          <div className="mt-3 border-4 border-black bg-gray-50 p-4">
            <TypeEffectiveness types={pokemon.types.map(t => t.type.name)} />
          </div>
        )}

        {/* Abilities */}
        <div className="mt-4 border-t-4 border-dashed border-gray-300 pt-4">
          <div className="text-xs font-bold text-gray-600 uppercase mb-2">⭐ Abilities</div>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map(({ability}) => (
              <span 
                key={ability.name}
                className="bg-yellow-400 text-black px-3 py-1 text-sm font-bold border-2 border-black capitalize"
              >
                {ability.name.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
