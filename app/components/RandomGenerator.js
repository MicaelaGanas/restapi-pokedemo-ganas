"use client";

export default function RandomGenerator({ onRandomSelect, totalPokemon }) {
  const handleRandom = () => {
    const randomId = Math.floor(Math.random() * totalPokemon) + 1;
    onRandomSelect(randomId);
  };

  return (
    <button
      onClick={handleRandom}
      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-md"
      aria-label="Get random Pokémon"
    >
      🎲 Surprise Me!
    </button>
  );
}
