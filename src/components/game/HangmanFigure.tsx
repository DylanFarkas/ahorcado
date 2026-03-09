"use client";

import { motion, type Variants } from "framer-motion";

interface HangmanFigureProps {
  errors: number;
  gameOver?: boolean;
}

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" as const },
  },
};

const appear: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

const swing: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    rotate: [0, 3, -3, 2, -2, 0],
    transition: { duration: 1.2, ease: "easeInOut" as const },
  },
};

export default function HangmanFigure({ errors, gameOver = false }: HangmanFigureProps) {
  const isDead = gameOver && errors >= 6;

  return (
    <svg
      viewBox="0 0 200 250"
      className="w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80"
    >
      {/* Base */}
      <line
        x1="20" y1="230" x2="180" y2="230"
        stroke="currentColor" strokeWidth="4" strokeLinecap="round"
        className="text-slate-400 dark:text-slate-500"
      />
      {/* Poste vertical */}
      <line
        x1="60" y1="230" x2="60" y2="20"
        stroke="currentColor" strokeWidth="4" strokeLinecap="round"
        className="text-slate-400 dark:text-slate-500"
      />
      {/* Refuerzo diagonal */}
      <line
        x1="60" y1="190" x2="90" y2="230"
        stroke="currentColor" strokeWidth="3" strokeLinecap="round"
        className="text-slate-400 dark:text-slate-500"
      />
      {/* Viga horizontal */}
      <line
        x1="55" y1="20" x2="140" y2="20"
        stroke="currentColor" strokeWidth="4" strokeLinecap="round"
        className="text-slate-400 dark:text-slate-500"
      />
      {/* Cuerda */}
      <motion.line
        x1="140" y1="20" x2="140" y2="48"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        className="text-amber-700 dark:text-amber-500"
        strokeDasharray="4 3"
      />

      {/* === Cuerpo del muñeco === */}
      <motion.g
        variants={errors >= 1 ? swing : undefined}
        initial="hidden"
        animate={errors >= 1 ? "visible" : "hidden"}
        style={{ transformOrigin: "140px 48px" }}
      >
        {/* Cabeza */}
        {errors >= 1 && (
          <motion.g variants={appear} initial="hidden" animate="visible">
            <circle
              cx="140" cy="68" r="20"
              fill="none" stroke="currentColor" strokeWidth="2.5"
              className="text-slate-700 dark:text-slate-300"
            />
            {/* Ojos */}
            {isDead ? (
              <>
                {/* Ojos X cuando pierde */}
                <line x1="131" y1="61" x2="137" y2="67" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-red-500 dark:text-red-400" />
                <line x1="137" y1="61" x2="131" y2="67" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-red-500 dark:text-red-400" />
                <line x1="143" y1="61" x2="149" y2="67" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-red-500 dark:text-red-400" />
                <line x1="149" y1="61" x2="143" y2="67" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-red-500 dark:text-red-400" />
                {/* Boca triste */}
                <path d="M132 77 Q140 72 148 77" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-red-500 dark:text-red-400" />
              </>
            ) : (
              <>
                {/* Ojos normales */}
                <circle cx="134" cy="64" r="2" fill="currentColor" className="text-slate-700 dark:text-slate-300" />
                <circle cx="146" cy="64" r="2" fill="currentColor" className="text-slate-700 dark:text-slate-300" />
                {/* Boca neutral */}
                <line x1="135" y1="75" x2="145" y2="75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-slate-500 dark:text-slate-400" />
              </>
            )}
          </motion.g>
        )}

        {/* Cuerpo */}
        {errors >= 2 && (
          <motion.line
            x1="140" y1="88" x2="140" y2="155"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            className="text-slate-700 dark:text-slate-300"
            variants={draw} initial="hidden" animate="visible"
          />
        )}

        {/* Brazo izquierdo */}
        {errors >= 3 && (
          <motion.g variants={draw} initial="hidden" animate="visible">
            <motion.line
              x1="140" y1="105" x2="112" y2="130"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              className="text-slate-700 dark:text-slate-300"
              variants={draw} initial="hidden" animate="visible"
            />
            {/* Mano izquierda */}
            <motion.circle
              cx="110" cy="132" r="3"
              fill="currentColor"
              className="text-slate-600 dark:text-slate-400"
              variants={appear} initial="hidden" animate="visible"
            />
          </motion.g>
        )}

        {/* Brazo derecho */}
        {errors >= 4 && (
          <motion.g variants={draw} initial="hidden" animate="visible">
            <motion.line
              x1="140" y1="105" x2="168" y2="130"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              className="text-slate-700 dark:text-slate-300"
              variants={draw} initial="hidden" animate="visible"
            />
            {/* Mano derecha */}
            <motion.circle
              cx="170" cy="132" r="3"
              fill="currentColor"
              className="text-slate-600 dark:text-slate-400"
              variants={appear} initial="hidden" animate="visible"
            />
          </motion.g>
        )}

        {/* Pierna izquierda */}
        {errors >= 5 && (
          <motion.g variants={draw} initial="hidden" animate="visible">
            <motion.line
              x1="140" y1="155" x2="115" y2="195"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              className="text-slate-700 dark:text-slate-300"
              variants={draw} initial="hidden" animate="visible"
            />
            {/* Pie izquierdo */}
            <motion.line
              x1="115" y1="195" x2="105" y2="195"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              className="text-slate-600 dark:text-slate-400"
              variants={draw} initial="hidden" animate="visible"
            />
          </motion.g>
        )}

        {/* Pierna derecha */}
        {errors >= 6 && (
          <motion.g variants={draw} initial="hidden" animate="visible">
            <motion.line
              x1="140" y1="155" x2="165" y2="195"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              className="text-slate-700 dark:text-slate-300"
              variants={draw} initial="hidden" animate="visible"
            />
            {/* Pie derecho */}
            <motion.line
              x1="165" y1="195" x2="175" y2="195"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              className="text-slate-600 dark:text-slate-400"
              variants={draw} initial="hidden" animate="visible"
            />
          </motion.g>
        )}
      </motion.g>
    </svg>
  );
}
