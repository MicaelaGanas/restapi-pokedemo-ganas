"use client";

const TYPE_CHART = {
  normal: { weak: ["fighting"], resist: [], immune: ["ghost"] },
  fire: { weak: ["water", "ground", "rock"], resist: ["fire", "grass", "ice", "bug", "steel", "fairy"], immune: [] },
  water: { weak: ["electric", "grass"], resist: ["fire", "water", "ice", "steel"], immune: [] },
  electric: { weak: ["ground"], resist: ["electric", "flying", "steel"], immune: [] },
  grass: { weak: ["fire", "ice", "poison", "flying", "bug"], resist: ["water", "electric", "grass", "ground"], immune: [] },
  ice: { weak: ["fire", "fighting", "rock", "steel"], resist: ["ice"], immune: [] },
  fighting: { weak: ["flying", "psychic", "fairy"], resist: ["bug", "rock", "dark"], immune: [] },
  poison: { weak: ["ground", "psychic"], resist: ["grass", "fighting", "poison", "bug", "fairy"], immune: [] },
  ground: { weak: ["water", "grass", "ice"], resist: ["poison", "rock"], immune: ["electric"] },
  flying: { weak: ["electric", "ice", "rock"], resist: ["grass", "fighting", "bug"], immune: ["ground"] },
  psychic: { weak: ["bug", "ghost", "dark"], resist: ["fighting", "psychic"], immune: [] },
  bug: { weak: ["fire", "flying", "rock"], resist: ["grass", "fighting", "ground"], immune: [] },
  rock: { weak: ["water", "grass", "fighting", "ground", "steel"], resist: ["normal", "fire", "poison", "flying"], immune: [] },
  ghost: { weak: ["ghost", "dark"], resist: ["poison", "bug"], immune: ["normal", "fighting"] },
  dragon: { weak: ["ice", "dragon", "fairy"], resist: ["fire", "water", "electric", "grass"], immune: [] },
  dark: { weak: ["fighting", "bug", "fairy"], resist: ["ghost", "dark"], immune: ["psychic"] },
  steel: { weak: ["fire", "fighting", "ground"], resist: ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy"], immune: ["poison"] },
  fairy: { weak: ["poison", "steel"], resist: ["fighting", "bug", "dark"], immune: ["dragon"] }
};

export default function TypeEffectiveness({ types }) {
  if (!types || types.length === 0) return null;

  // Handle both string arrays and object arrays
  const mainType = typeof types[0] === 'string' ? types[0] : types[0].type.name;
  const effectiveness = TYPE_CHART[mainType] || { weak: [], resist: [], immune: [] };

  return (
    <div className="mt-4 bg-white border-4 border-black pixel-shadow">
      <div className="bg-red-600 border-b-4 border-black p-3">
        <h4 className="pixel-font text-sm text-yellow-400 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">⚡ TYPE MATCHUPS</h4>
      </div>
      
      <div className="p-4 space-y-3">
        {effectiveness.weak.length > 0 && (
          <div className="bg-red-50 p-3">
            <span className="font-black text-red-700 uppercase text-sm block mb-2">⬇️ Weak To:</span>
            <div className="flex flex-wrap gap-2">
              {effectiveness.weak.map(type => (
                <span key={type} className="bg-red-500 text-white px-3 py-1 font-bold text-xs uppercase border-2 border-black">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {effectiveness.resist.length > 0 && (
          <div className="bg-green-50 p-3">
            <span className="font-black text-green-700 uppercase text-sm block mb-2">🛡️ Resists:</span>
            <div className="flex flex-wrap gap-2">
              {effectiveness.resist.map(type => (
                <span key={type} className="bg-green-500 text-white px-3 py-1 font-bold text-xs uppercase border-2 border-black">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {effectiveness.immune.length > 0 && (
          <div className="bg-blue-50 p-3">
            <span className="font-black text-blue-700 uppercase text-sm block mb-2">🛑 Immune To:</span>
            <div className="flex flex-wrap gap-2">
              {effectiveness.immune.map(type => (
                <span key={type} className="bg-blue-500 text-white px-3 py-1 font-bold text-xs uppercase border-2 border-black">
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
