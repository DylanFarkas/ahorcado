export type GameStatus = "playing" | "won" | "lost";

export interface GameState {
  word: string;
  guessedLetters: string[];
  errors: number;
  status: GameStatus;
  maxAttempts: number;
}

export interface Letter {
  char: string;
  isGuessed: boolean;
  isCorrect: boolean;
}
