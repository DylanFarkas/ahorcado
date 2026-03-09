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
        <div className="flex items-center gap-3">
          <span className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Intentos restantes:
          </span>
          <div className="flex gap-1.5">
            {Array.from({ length: maxAttempts }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < attemptsLeft
                    ? "bg-emerald-500 dark:bg-emerald-400"
                    : "bg-red-500 dark:bg-red-400"
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
            className="flex flex-col items-center gap-4"
          >
            <div
              className={`flex items-center gap-2 text-2xl sm:text-3xl font-bold ${
                status === "won"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-red-400"
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
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                La palabra era:{" "}
                <span className="font-bold text-amber-600 dark:text-amber-400">{word}</span>
              </p>
            )}

            <motion.button
              onClick={onRestart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400
                text-white font-bold rounded-xl text-base sm:text-lg
                shadow-md cursor-pointer transition-colors
                flex items-center gap-2 px-8 py-4"
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
