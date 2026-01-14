"use client";

export default function RandomGenerator({ onRandomSelect, totalPokemon }) {
  const handleRandom = () => {
    const randomId = Math.floor(Math.random() * totalPokemon) + 1;
    onRandomSelect(randomId);
  };

  return (
    <button
      onClick={handleRandom}
      className="retro-button px-6 py-3 bg-yellow-400 text-black font-bold uppercase hover:bg-yellow-300 flex items-center gap-2"
      aria-label="Get random Pokémon"
    >
      <span className="text-xl">🎲</span>
      Surprise Me!
    </button>
  );
}
