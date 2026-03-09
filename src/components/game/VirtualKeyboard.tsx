"use client";

import { motion } from "framer-motion";
import { normalizeChar, validateLetter } from "@/src/lib/game";

interface VirtualKeyboardProps {
  word: string;
  guessedLetters: string[];
  disabled: boolean;
  onGuess: (letter: string) => void;
}

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export default function VirtualKeyboard({
  word,
  guessedLetters,
  disabled,
  onGuess,
}: VirtualKeyboardProps) {
  const normalizedGuessed = guessedLetters.map(normalizeChar);

  function getKeyState(letter: string): "unused" | "correct" | "incorrect" {
    const normalized = normalizeChar(letter);
    if (!normalizedGuessed.includes(normalized)) return "unused";
    return validateLetter(word, letter) ? "correct" : "incorrect";
  }

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 sm:gap-1.5">
          {row.map((letter) => {
            const state = getKeyState(letter);
            const isUsed = state !== "unused";

            return (
              <motion.button
                key={letter}
                onClick={() => onGuess(letter)}
                disabled={disabled || isUsed}
                whileHover={!isUsed && !disabled ? { scale: 1.1 } : {}}
                whileTap={!isUsed && !disabled ? { scale: 0.9 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rowIndex * 0.05 }}
                className={`
                  w-8 h-10 sm:w-10 sm:h-12 md:w-11 md:h-13
                  rounded-lg font-bold text-sm sm:text-base
                  transition-colors duration-200
                  flex items-center justify-center
                  ${
                    state === "correct"
                      ? "bg-green-500 text-white cursor-default"
                      : state === "incorrect"
                      ? "bg-red-500/70 text-white/60 cursor-default"
                      : "bg-indigo-200 dark:bg-white/20 text-gray-900 dark:text-white hover:bg-indigo-300 dark:hover:bg-white/30 cursor-pointer"
                  }
                  ${disabled && !isUsed ? "opacity-50 cursor-default" : ""}
                `}
              >
                {letter}
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
