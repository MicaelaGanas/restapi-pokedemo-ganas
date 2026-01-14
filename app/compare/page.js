import PokemonComparison from "../components/PokemonComparison";

export const metadata = {
  title: "Compare Pokémon | Pokémon Dashboard",
  description: "Compare stats between two Pokémon side-by-side",
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-4xl">
        <PokemonComparison />
      </div>
    </div>
  );
}
