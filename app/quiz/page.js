import PokemonQuiz from "../components/PokemonQuiz";

export const metadata = {
  title: "Quiz | Pokémon Dashboard",
  description: "Test your Pokémon knowledge with the Who's That Pokémon quiz!",
};

export default function QuizPage() {
  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <PokemonQuiz />
    </div>
  );
}
