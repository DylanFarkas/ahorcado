"use client";

import { motion, type Variants } from "framer-motion";

interface HangmanFigureProps {
  errors: number;
}

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" as const },
  },
};

const circleDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" as const },
  },
};

export default function HangmanFigure({ errors }: HangmanFigureProps) {
  return (
    <svg
      viewBox="0 0 200 250"
      className="w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80"
    >
      {/* Base */}
      <line
        x1="20"
        y1="230"
        x2="180"
        y2="230"
        stroke="currentColor"
        strokeWidth="3"
        className="text-gray-600 dark:text-gray-400"
      />
      {/* Poste vertical */}
      <line
        x1="60"
        y1="230"
        x2="60"
        y2="20"
        stroke="currentColor"
        strokeWidth="3"
        className="text-gray-600 dark:text-gray-400"
      />
      {/* Viga horizontal */}
      <line
        x1="60"
        y1="20"
        x2="140"
        y2="20"
        stroke="currentColor"
        strokeWidth="3"
        className="text-gray-600 dark:text-gray-400"
      />
      {/* Cuerda */}
      <line
        x1="140"
        y1="20"
        x2="140"
        y2="50"
        stroke="currentColor"
        strokeWidth="3"
        className="text-gray-600 dark:text-gray-400"
      />

      {/* Cabeza */}
      {errors >= 1 && (
        <motion.circle
          cx="140"
          cy="70"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-amber-600 dark:text-yellow-400"
          variants={circleDraw}
          initial="hidden"
          animate="visible"
        />
      )}

      {/* Cuerpo */}
      {errors >= 2 && (
        <motion.line
          x1="140"
          y1="90"
          x2="140"
          y2="150"
          stroke="currentColor"
          strokeWidth="3"
          className="text-amber-600 dark:text-yellow-400"
          variants={draw}
          initial="hidden"
          animate="visible"
        />
      )}

      {/* Brazo izquierdo */}
      {errors >= 3 && (
        <motion.line
          x1="140"
          y1="110"
          x2="110"
          y2="140"
          stroke="currentColor"
          strokeWidth="3"
          className="text-amber-600 dark:text-yellow-400"
          variants={draw}
          initial="hidden"
          animate="visible"
        />
      )}

      {/* Brazo derecho */}
      {errors >= 4 && (
        <motion.line
          x1="140"
          y1="110"
          x2="170"
          y2="140"
          stroke="currentColor"
          strokeWidth="3"
          className="text-amber-600 dark:text-yellow-400"
          variants={draw}
          initial="hidden"
          animate="visible"
        />
      )}

      {/* Pierna izquierda */}
      {errors >= 5 && (
        <motion.line
          x1="140"
          y1="150"
          x2="110"
          y2="190"
          stroke="currentColor"
          strokeWidth="3"
          className="text-amber-600 dark:text-yellow-400"
          variants={draw}
          initial="hidden"
          animate="visible"
        />
      )}

      {/* Pierna derecha */}
      {errors >= 6 && (
        <motion.line
          x1="140"
          y1="150"
          x2="170"
          y2="190"
          stroke="currentColor"
          strokeWidth="3"
          className="text-amber-600 dark:text-yellow-400"
          variants={draw}
          initial="hidden"
          animate="visible"
        />
      )}
    </svg>
  );
}
