"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { initializeGame, guessLetter } from "@/src/lib/game";
import type { GameState } from "@/src/types/game";
import HangmanFigure from "./HangmanFigure";
import WordDisplay from "./WordDisplay";
import VirtualKeyboard from "./VirtualKeyboard";
import GameStatus from "./GameStatus";

export default function HangmanGame() {
  const [game, setGame] = useState<GameState>(initializeGame);

  const handleGuess = useCallback(
    (letter: string) => {
      if (game.status !== "playing") return;
      setGame((prev) => guessLetter(prev, letter));
    },
    [game.status]
  );

  const handleRestart = useCallback(() => {
    setGame(initializeGame());
  }, []);

  // Keyboard support
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (game.status !== "playing") return;
      const key = e.key.toUpperCase();
      if (/^[A-ZÑ]$/.test(key)) {
        handleGuess(key);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [game.status, handleGuess]);

  const isGameOver = game.status !== "playing";

  return (
    <motion.div
      className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-2xl mx-auto px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Título */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 dark:text-slate-100">
        Ahorcado
      </h1>

      {/* Figura del ahorcado */}
      <HangmanFigure errors={game.errors} gameOver={isGameOver} />

      {/* Palabra */}
      <WordDisplay
        word={game.word}
        guessedLetters={game.guessedLetters}
        gameOver={isGameOver}
      />

      {/* Estado del juego */}
      <GameStatus
        status={game.status}
        errors={game.errors}
        maxAttempts={game.maxAttempts}
        word={game.word}
        onRestart={handleRestart}
      />

      {/* Teclado virtual */}
      <VirtualKeyboard
        word={game.word}
        guessedLetters={game.guessedLetters}
        disabled={isGameOver}
        onGuess={handleGuess}
      />
    </motion.div>
  );
}
