"use client";

import { motion } from "framer-motion";
import { getRevealedWord } from "@/src/lib/game";

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
  gameOver: boolean;
}

export default function WordDisplay({
  word,
  guessedLetters,
  gameOver,
}: WordDisplayProps) {
  const revealed = getRevealedWord(word, guessedLetters);

  return (
    <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
      {word.split("").map((letter, index) => {
        const isRevealed = revealed[index] !== "_";
        const showMissed = gameOver && !isRevealed;

        return (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <motion.span
              className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider ${
                showMissed
                  ? "text-red-400"
                  : isRevealed
                  ? "text-white"
                  : "text-transparent"
              }`}
              initial={isRevealed ? { scale: 1.4, color: "#22c55e" } : {}}
              animate={isRevealed ? { scale: 1, color: "#ffffff" } : {}}
              transition={{ duration: 0.3 }}
            >
              {isRevealed || showMissed ? letter : "\u00A0"}
            </motion.span>
            <div className="w-8 sm:w-10 md:w-12 h-1 bg-white/40 rounded mt-1" />
          </motion.div>
        );
      })}
    </div>
  );
}
