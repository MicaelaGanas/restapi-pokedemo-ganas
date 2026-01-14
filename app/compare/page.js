import PokemonComparison from "../components/PokemonComparison";

export const metadata = {
  title: "Compare Pokémon | Pokémon Dashboard",
  description: "Compare stats between two Pokémon side-by-side",
};

export default function ComparePage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <PokemonComparison />
    </div>
  );
}
