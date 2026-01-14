"use client";

export default function HeroBanner() {
  return (
    <div className="relative bg-blue-600 border-8 border-black pixel-shadow mb-12 overflow-hidden">
      {/* Pokeball pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 gap-8 p-8">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="text-6xl">⚪</div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-16">
        <div className="pixel-font text-4xl md:text-6xl mb-8 text-yellow-400 drop-shadow-[6px_6px_0_rgba(0,0,0,1)] animate-pixelBounce">
          GOTTA CATCH 'EM ALL!
        </div>
        <div className="text-xl md:text-2xl mb-12 text-white font-bold drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          ★ Explore 151 Original Pokémon ★
        </div>
        
        {/* Feature Boxes */}
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="retro-button px-6 py-3 bg-red-500 text-white font-bold uppercase">
            🔍 Search
          </div>
          <div className="retro-button px-6 py-3 bg-yellow-400 text-black font-bold uppercase">
            📊 Stats
          </div>
          <div className="retro-button px-6 py-3 bg-red-500 text-white font-bold uppercase">
            ❤️ Faves
          </div>
          <div className="retro-button px-6 py-3 bg-yellow-400 text-black font-bold uppercase">
            🎮 Quiz
          </div>
        </div>
      </div>

      {/* Bottom stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-yellow-400 border-t-4 border-black"></div>
    </div>
  );
}
