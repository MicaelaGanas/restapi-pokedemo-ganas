import Image from "next/image";
import Link from "next/link";
import StatsChart from "@/app/components/StatsChart";
import TypeEffectiveness from "@/app/components/TypeEffectiveness";
import FavoritesManager from "@/app/components/FavoritesManager";

export const dynamic = "force-dynamic";

async function fetchPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    cache: "no-store"
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch Pokémon");
  }
  
  return res.json();
}

async function fetchSpecies(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, {
      cache: "no-store"
    });
    
    if (res.ok) {
      return res.json();
    }
  } catch (error) {
    console.error("Failed to fetch species:", error);
  }
  return null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const pokemon = await fetchPokemon(id);
  return {
    title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} | Pokémon Details`,
    description: `Detailed information about ${pokemon.name}`,
  };
}

export default async function PokemonDetailPage({ params }) {
  const { id } = await params;
  const pokemon = await fetchPokemon(id);
  const species = await fetchSpecies(id);

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
  const totalStats = pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);
  
  // Get English flavor text
  const flavorText = species?.flavor_text_entries
    ?.find(entry => entry.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ");

  // Get genus (e.g., "Seed Pokémon")
  const genus = species?.genera
    ?.find(g => g.language.name === "en")
    ?.genus;

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 retro-button px-6 py-3 bg-blue-500 text-white pixel-font text-xs uppercase hover:bg-blue-600 mb-6"
        >
          <span>←</span> Back to List
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Main Info */}
          <div>
            {/* Main Card */}
            <div className="bg-white border-8 border-black pixel-shadow mb-6">
              {/* Header */}
              <div className={`${headerColor} border-b-5 border-black p-7 relative`}>
                <FavoritesManager pokemonId={pokemon.id} pokemonName={pokemon.name} />
                
                {/* ID Badge */}
                <div className="absolute top-4 left-4">
                  <span className="pixel-font text-xs bg-black text-white px-3 py-2 border-4 border-white">
                    #{pokemon.id.toString().padStart(3, '0')}
                  </span>
                </div>
              </div>

              {/* Pokémon Image */}
              <div className="relative bg-gray-100 border-b-4 border-black p-12">
                <div className="relative h-64 w-64 mx-auto">
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
                <h1 className="text-3xl pixel-font capitalize text-center mb-2 text-gray-900">
                  {pokemon.name}
                </h1>

                {/* Genus */}
                {genus && (
                  <p className="text-center text-gray-600 pixel-font mb-4 uppercase text-xs">
                    {genus}
                  </p>
                )}

                {/* Types */}
                <div className="flex gap-2 justify-center mb-6">
                  {pokemon.types.map(({type}) => (
                    <span 
                      key={type.name}
                      className={`${getTypeBgColor(type.name)} text-white px-6 py-3 pixel-font uppercase text-sm border-4 border-black pixel-shadow`}
                    >
                      {type.name}
                    </span>
                  ))}
                </div>

                {/* Description */}
                {flavorText && (
                  <div className="border-4 border-black bg-yellow-50 p-4 mb-6">
                    <p className="text-xs pixel-font text-gray-800 leading-loose">
                      {flavorText}
                    </p>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="border-4 border-black p-4 bg-yellow-100 text-center">
                    <div className="pixel-font text-gray-700 text-xs uppercase leading-tight mb-2">Height</div>
                    <div className="text-lg pixel-font text-gray-900">{pokemon.height / 10}m</div>
                  </div>
                  <div className="border-4 border-black p-4 bg-blue-100 text-center">
                    <div className="pixel-font text-gray-700 text-xs uppercase leading-tight mb-2">Weight</div>
                    <div className="text-lg pixel-font text-gray-900">{pokemon.weight / 10}kg</div>
                  </div>
                  <div className="border-4 border-black p-4 bg-red-100 text-center">
                    <div className="pixel-font text-gray-700 text-xs uppercase leading-tight mb-2">Total</div>
                    <div className="text-lg pixel-font text-gray-900">{totalStats}</div>
                  </div>
                </div>

                {/* Abilities */}
                <div className="border-4 border-black bg-gray-50 p-4">
                  <div className="text-xs pixel-font text-gray-600 uppercase mb-3">⭐ Abilities</div>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map(({ability, is_hidden}) => (
                      <span 
                        key={ability.name}
                        className={`${is_hidden ? 'bg-purple-400' : 'bg-yellow-400'} text-black px-4 py-2 text-xs pixel-font border-3 border-black capitalize`}
                      >
                        {ability.name.replace('-', ' ')}
                        {is_hidden && " (Hidden)"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Type Effectiveness */}
            <div className="border-8 border-black bg-white pixel-shadow">
              <div className="bg-gray-800 border-b-4 border-black p-4">
                <h2 className="pixel-font text-lg text-white">TYPE EFFECTIVENESS</h2>
              </div>
              <div className="p-6">
                <TypeEffectiveness types={pokemon.types.map(t => t.type.name)} />
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Chart */}
          <div>
            {/* Stats Chart */}
            <div className="mb-6">
              <StatsChart pokemon={pokemon} />
            </div>

            {/* Detailed Stats */}
            <div className="border-8 border-black bg-white pixel-shadow mb-6">
              <div className="bg-red-500 border-b-4 border-black p-4">
                <h2 className="pixel-font text-lg text-white">BASE STATS</h2>
              </div>
              <div className="p-6 space-y-4">
                {pokemon.stats.map((stat) => {
                  const percentage = (stat.base_stat / 255) * 100;
                  return (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between mb-2">
                        <span className="pixel-font text-xs uppercase text-gray-700">
                          {stat.stat.name.replace('-', ' ')}
                        </span>
                        <span className="pixel-font text-sm text-gray-900">{stat.base_stat}</span>
                      </div>
                      <div className="h-6 bg-white border-3 border-black">
                        <div 
                          className={`h-full ${getStatColor(stat.stat.name)} border-r-3 border-black transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
                <div className="pt-4 border-t-4 border-dashed border-gray-300">
                  <div className="flex justify-between">
                    <span className="pixel-font text-xs uppercase text-gray-700">Total Stats</span>
                    <span className="pixel-font text-lg text-red-600">{totalStats}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sprite Gallery */}
            <div className="border-8 border-black bg-white pixel-shadow">
              <div className="bg-purple-500 border-b-4 border-black p-4">
                <h2 className="pixel-font text-lg text-white">SPRITE GALLERY</h2>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                {pokemon.sprites.front_default && (
                  <div className="border-4 border-black bg-gray-100 p-4">
                    <p className="text-xs pixel-font text-center mb-2 uppercase">Front</p>
                    <div className="relative h-32 w-32 mx-auto">
                      <Image 
                        src={pokemon.sprites.front_default}
                        alt="Front"
                        fill
                        className="object-contain pixelated"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
                {pokemon.sprites.back_default && (
                  <div className="border-4 border-black bg-gray-100 p-4">
                    <p className="text-xs pixel-font text-center mb-2 uppercase">Back</p>
                    <div className="relative h-32 w-32 mx-auto">
                      <Image 
                        src={pokemon.sprites.back_default}
                        alt="Back"
                        fill
                        className="object-contain pixelated"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
                {pokemon.sprites.front_shiny && (
                  <div className="border-4 border-black bg-yellow-100 p-4">
                    <p className="text-xs pixel-font text-center mb-2 uppercase">Shiny ✨</p>
                    <div className="relative h-32 w-32 mx-auto">
                      <Image 
                        src={pokemon.sprites.front_shiny}
                        alt="Shiny"
                        fill
                        className="object-contain pixelated"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
                {pokemon.sprites.back_shiny && (
                  <div className="border-4 border-black bg-yellow-100 p-4">
                    <p className="text-xs pixel-font text-center mb-2 uppercase">Shiny Back ✨</p>
                    <div className="relative h-32 w-32 mx-auto">
                      <Image 
                        src={pokemon.sprites.back_shiny}
                        alt="Shiny Back"
                        fill
                        className="object-contain pixelated"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
