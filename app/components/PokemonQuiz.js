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
      <div className="bg-white border-8 border-black pixel-shadow p-8 text-center">
        <h2 className="pixel-font text-4xl mb-6 text-gray-900">
          🎮 WHO'S THAT
        </h2>
        <h2 className="pixel-font text-4xl mb-8 text-red-600">
          POKEMON?
        </h2>
        <p className="font-bold text-lg text-gray-700 mb-8">
          Test your Pokémon knowledge! Guess from the silhouette.
        </p>
        <button
          onClick={startGame}
          className="retro-button px-8 py-4 bg-red-500 text-white font-bold text-2xl uppercase hover:bg-red-600"
        >
          🎲 Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border-8 border-black pixel-shadow p-8">
      <div className="flex justify-between items-center mb-8 pb-4 border-b-4 border-black">
        <h2 className="pixel-font text-3xl text-gray-900">
          🎮 QUIZ
        </h2>
        <div className="text-center">
          <div className="pixel-font text-3xl text-red-600">
            {score} / {total}
          </div>
          <div className="font-bold text-gray-700 mt-1">
            {total > 0 ? `${Math.round((score / total) * 100)}% CORRECT` : "SCORE"}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="pixel-font text-2xl text-gray-900">LOADING...</div>
        </div>
      ) : currentPokemon ? (
        <>
          <div className="mb-8 bg-blue-500 border-8 border-black pixel-shadow p-8 flex justify-center items-center min-h-[320px]">
            <div className="relative h-48 w-48">
              <Image
                src={currentPokemon.sprites.front_default}
                alt="Mystery Pokémon"
                fill
                className={`object-contain pixelated transition-all duration-300 ${
                  isRevealed ? "" : "brightness-0"
                }`}
                unoptimized
              />
            </div>
          </div>

          {feedback && (
            <div
              className={`mb-6 p-4 border-4 border-black font-bold text-lg text-center pixel-font text-xl ${
                feedback.startsWith("✅")
                  ? "bg-green-300 text-green-900"
                  : "bg-red-300 text-red-900"
              }`}
            >
              {feedback}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            {options.map((pokemon) => (
              <button
                key={pokemon.id}
                onClick={() => handleAnswer(pokemon)}
                disabled={isRevealed}
                className={`retro-button p-4 font-bold uppercase capitalize transition-all text-lg ${
                  isRevealed && pokemon.id === currentPokemon.id
                    ? "bg-green-400 text-black"
                    : isRevealed
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-yellow-400 text-black hover:bg-yellow-300"
                }`}
              >
                {pokemon.name}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={generateQuiz}
              disabled={isRevealed}
              className="retro-button flex-1 px-4 py-3 bg-purple-500 text-white font-bold uppercase hover:bg-purple-600 disabled:bg-gray-400"
            >
              ⏭️ Skip
            </button>
            <button
              onClick={resetGame}
              className="retro-button flex-1 px-4 py-3 bg-red-500 text-white font-bold uppercase hover:bg-red-600"
            >
              ❌ End Game
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
