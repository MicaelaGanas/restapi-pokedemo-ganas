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
    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm">
      <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Type Effectiveness</h4>
      
      {effectiveness.weak.length > 0 && (
        <div className="mb-2">
          <span className="font-medium text-red-600 dark:text-red-400">Weak to: </span>
          <span className="text-gray-700 dark:text-gray-300 capitalize">
            {effectiveness.weak.join(", ")}
          </span>
        </div>
      )}
      
      {effectiveness.resist.length > 0 && (
        <div className="mb-2">
          <span className="font-medium text-green-600 dark:text-green-400">Resists: </span>
          <span className="text-gray-700 dark:text-gray-300 capitalize">
            {effectiveness.resist.join(", ")}
          </span>
        </div>
      )}
      
      {effectiveness.immune.length > 0 && (
        <div>
          <span className="font-medium text-blue-600 dark:text-blue-400">Immune to: </span>
          <span className="text-gray-700 dark:text-gray-300 capitalize">
            {effectiveness.immune.join(", ")}
          </span>
        </div>
      )}
    </div>
  );
}
