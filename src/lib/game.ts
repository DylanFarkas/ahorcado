import type { GameState, GameStatus } from "@/src/types/game";
import { getRandomWord } from "@/src/data/words";

export const MAX_ATTEMPTS = 6;

export function initializeGame(): GameState {
  return {
    word: getRandomWord(),
    guessedLetters: [],
    errors: 0,
    status: "playing",
    maxAttempts: MAX_ATTEMPTS,
  };
}

export function normalizeChar(char: string): string {
  return char
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function validateLetter(word: string, letter: string): boolean {
  const normalizedLetter = normalizeChar(letter);
  return word.split("").some((ch) => normalizeChar(ch) === normalizedLetter);
}

export function getRevealedWord(word: string, guessedLetters: string[]): string[] {
  const normalizedGuessed = guessedLetters.map(normalizeChar);
  return word.split("").map((ch) =>
    normalizedGuessed.includes(normalizeChar(ch)) ? ch : "_"
  );
}

export function calculateErrors(word: string, guessedLetters: string[]): number {
  return guessedLetters.filter(
    (letter) => !validateLetter(word, letter)
  ).length;
}

export function checkGameStatus(
  word: string,
  guessedLetters: string[],
  maxAttempts: number
): GameStatus {
  const errors = calculateErrors(word, guessedLetters);
  if (errors >= maxAttempts) return "lost";

  const revealed = getRevealedWord(word, guessedLetters);
  if (revealed.every((ch) => ch !== "_")) return "won";

  return "playing";
}

export function guessLetter(state: GameState, letter: string): GameState {
  const upperLetter = letter.toUpperCase();

  if (state.status !== "playing") return state;
  if (state.guessedLetters.includes(upperLetter)) return state;

  const newGuessedLetters = [...state.guessedLetters, upperLetter];
  const errors = calculateErrors(state.word, newGuessedLetters);
  const status = checkGameStatus(state.word, newGuessedLetters, state.maxAttempts);

  return {
    ...state,
    guessedLetters: newGuessedLetters,
    errors,
    status,
  };
}
