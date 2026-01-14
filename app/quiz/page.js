import PokemonQuiz from "../components/PokemonQuiz";

export const metadata = {
  title: "Quiz | Pokémon Dashboard",
  description: "Test your Pokémon knowledge with the Who's That Pokémon quiz!",
};

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-2xl">
        <PokemonQuiz />
      </div>
    </div>
  );
}
