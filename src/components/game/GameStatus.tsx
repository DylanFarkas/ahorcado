"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Skull, RotateCcw } from "lucide-react";
import type { GameStatus as GameStatusType } from "@/src/types/game";

interface GameStatusProps {
  status: GameStatusType;
  errors: number;
  maxAttempts: number;
  word: string;
  onRestart: () => void;
}

export default function GameStatus({
  status,
  errors,
  maxAttempts,
  word,
  onRestart,
}: GameStatusProps) {
  const attemptsLeft = maxAttempts - errors;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Intentos restantes */}
      {status === "playing" && (
        <div className="flex items-center gap-2">
          <span className="text-gray-700 dark:text-white/70 text-sm sm:text-base">
            Intentos restantes:
          </span>
          <div className="flex gap-1">
            {Array.from({ length: maxAttempts }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < attemptsLeft ? "bg-green-400" : "bg-red-500"
                }`}
                initial={i >= attemptsLeft ? { scale: 0 } : {}}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mensaje de victoria/derrota */}
      <AnimatePresence>
        {status !== "playing" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex flex-col items-center gap-3"
          >
            <div
              className={`flex items-center gap-2 text-2xl sm:text-3xl font-bold ${
                status === "won" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {status === "won" ? (
                <>
                  <Trophy className="w-8 h-8" />
                  <span>¡Ganaste!</span>
                </>
              ) : (
                <>
                  <Skull className="w-8 h-8" />
                  <span>¡Perdiste!</span>
                </>
              )}
            </div>

            {status === "lost" && (
              <p className="text-gray-700 dark:text-white/70 text-sm sm:text-base">
                La palabra era:{" "}
                <span className="font-bold text-amber-600 dark:text-yellow-400">{word}</span>
              </p>
            )}

            <motion.button
              onClick={onRestart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 bg-linear-to-r from-purple-500 to-indigo-500 
                text-white font-bold rounded-xl text-base sm:text-lg
                hover:from-purple-600 hover:to-indigo-600
                shadow-lg shadow-purple-500/30 cursor-pointer
                flex items-center gap-2 px-8 py-5"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Nueva Partida</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
