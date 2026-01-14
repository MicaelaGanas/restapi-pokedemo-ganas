"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function PokemonQuiz() {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const generateQuiz = async () => {
    setLoading(true);
    setFeedback("");
    setIsRevealed(false);

    try {
      // Generate random Pokémon ID (1-151 for Gen 1)
      const correctId = Math.floor(Math.random() * 151) + 1;
      
      // Fetch correct Pokémon
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${correctId}`);
      const pokemon = await res.json();
      setCurrentPokemon(pokemon);

      // Generate 3 wrong options
      const wrongIds = [];
      while (wrongIds.length < 3) {
        const id = Math.floor(Math.random() * 151) + 1;
        if (id !== correctId && !wrongIds.includes(id)) {
          wrongIds.push(id);
        }
      }

      // Fetch wrong options
      const wrongOptions = await Promise.all(
        wrongIds.map(async (id) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          return res.json();
        })
      );

      // Shuffle options
      const allOptions = [pokemon, ...wrongOptions].sort(() => Math.random() - 0.5);
      setOptions(allOptions);
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      setFeedback("Failed to load quiz. Try again!");
    }
    
    setLoading(false);
  };

  const handleAnswer = (selectedPokemon) => {
    setTotal(total + 1);
    setIsRevealed(true);

    if (selectedPokemon.id === currentPokemon.id) {
      setScore(score + 1);
      setFeedback(`✅ Correct! It's ${currentPokemon.name}!`);
    } else {
      setFeedback(`❌ Wrong! It was ${currentPokemon.name}, not ${selectedPokemon.name}.`);
    }

    // Auto-advance after 2 seconds
    setTimeout(() => {
      generateQuiz();
    }, 2000);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTotal(0);
    generateQuiz();
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentPokemon(null);
    setOptions([]);
    setFeedback("");
  };

  if (!gameStarted) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
          🎮 Who's That Pokémon?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Test your Pokémon knowledge! Guess the name from the silhouette.
        </p>
        <button
          onClick={startGame}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xl transition-colors shadow-lg"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          🎮 Who's That Pokémon?
        </h2>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {score} / {total}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {total > 0 ? `${Math.round((score / total) * 100)}% correct` : "Score"}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading next Pokémon...</p>
        </div>
      ) : currentPokemon ? (
        <>
          <div className="mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg p-8 flex justify-center items-center min-h-[300px]">
            <div className="relative h-48 w-48">
              <Image
                src={currentPokemon.sprites.front_default}
                alt="Mystery Pokémon"
                fill
                className={`object-contain transition-all duration-300 ${
                  isRevealed ? "" : "brightness-0"
                }`}
                unoptimized
              />
            </div>
          </div>

          {feedback && (
            <div
              className={`mb-4 p-4 rounded-lg text-center font-bold text-lg ${
                feedback.startsWith("✅")
                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                  : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
              }`}
            >
              {feedback}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {options.map((pokemon) => (
              <button
                key={pokemon.id}
                onClick={() => handleAnswer(pokemon)}
                disabled={isRevealed}
                className={`p-4 rounded-lg font-semibold capitalize transition-all ${
                  isRevealed && pokemon.id === currentPokemon.id
                    ? "bg-green-500 text-white ring-4 ring-green-300"
                    : isRevealed
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-blue-500 hover:text-white"
                }`}
              >
                {pokemon.name}
              </button>
            ))}
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={generateQuiz}
              disabled={isRevealed}
              className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
            >
              Skip
            </button>
            <button
              onClick={resetGame}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              End Game
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
