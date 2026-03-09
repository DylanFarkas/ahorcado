import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  MAX_ATTEMPTS,
  initializeGame,
  normalizeChar,
  validateLetter,
  getRevealedWord,
  calculateErrors,
  checkGameStatus,
  guessLetter,
} from "@/src/lib/game";
import { words } from "@/src/data/words";

// Mock getRandomWord so initializeGame returns a predictable word
vi.mock("@/src/data/words", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/src/data/words")>();
  return {
    ...actual,
    getRandomWord: vi.fn(() => "PERRO"),
  };
});

describe("Game Logic — src/lib/game.ts", () => {
  // ─── Constants ───────────────────────────────────────────
  describe("MAX_ATTEMPTS", () => {
    it("should be 6", () => {
      expect(MAX_ATTEMPTS).toBe(6);
    });
  });

  // ─── normalizeChar ──────────────────────────────────────
  describe("normalizeChar", () => {
    it("converts lowercase to uppercase", () => {
      expect(normalizeChar("a")).toBe("A");
    });

    it("strips accents", () => {
      expect(normalizeChar("á")).toBe("A");
      expect(normalizeChar("é")).toBe("E");
      expect(normalizeChar("ñ")).toBe("N");
      expect(normalizeChar("ü")).toBe("U");
    });

    it("keeps already-uppercase letters unchanged", () => {
      expect(normalizeChar("Z")).toBe("Z");
    });
  });

  // ─── initializeGame ────────────────────────────────────
  describe("initializeGame", () => {
    it("returns a valid initial state", () => {
      const state = initializeGame();
      expect(state.word).toBe("PERRO");
      expect(state.guessedLetters).toEqual([]);
      expect(state.errors).toBe(0);
      expect(state.status).toBe("playing");
      expect(state.maxAttempts).toBe(MAX_ATTEMPTS);
    });
  });

  // ─── validateLetter ────────────────────────────────────
  describe("validateLetter", () => {
    it("returns true when letter is in the word", () => {
      expect(validateLetter("PERRO", "P")).toBe(true);
      expect(validateLetter("PERRO", "E")).toBe(true);
      expect(validateLetter("PERRO", "R")).toBe(true);
      expect(validateLetter("PERRO", "O")).toBe(true);
    });

    it("returns false when letter is not in the word", () => {
      expect(validateLetter("PERRO", "A")).toBe(false);
      expect(validateLetter("PERRO", "Z")).toBe(false);
    });

    it("is case-insensitive", () => {
      expect(validateLetter("PERRO", "p")).toBe(true);
      expect(validateLetter("PERRO", "e")).toBe(true);
    });

    it("handles accented word characters", () => {
      expect(validateLetter("MONTAÑA", "N")).toBe(true);
      expect(validateLetter("MONTAÑA", "Ñ")).toBe(true);
    });
  });

  // ─── getRevealedWord ───────────────────────────────────
  describe("getRevealedWord", () => {
    it("returns all underscores when no letters guessed", () => {
      expect(getRevealedWord("PERRO", [])).toEqual(["_", "_", "_", "_", "_"]);
    });

    it("reveals matching letters", () => {
      expect(getRevealedWord("PERRO", ["P", "R"])).toEqual([
        "P",
        "_",
        "R",
        "R",
        "_",
      ]);
    });

    it("reveals entire word when all letters guessed", () => {
      expect(getRevealedWord("PERRO", ["P", "E", "R", "O"])).toEqual([
        "P",
        "E",
        "R",
        "R",
        "O",
      ]);
    });

    it("ignores incorrect guesses", () => {
      expect(getRevealedWord("PERRO", ["Z", "X"])).toEqual([
        "_",
        "_",
        "_",
        "_",
        "_",
      ]);
    });
  });

  // ─── calculateErrors ──────────────────────────────────
  describe("calculateErrors", () => {
    it("returns 0 when all guesses are correct", () => {
      expect(calculateErrors("PERRO", ["P", "E"])).toBe(0);
    });

    it("counts only incorrect guesses", () => {
      expect(calculateErrors("PERRO", ["P", "Z", "X"])).toBe(2);
    });

    it("returns 0 with no guesses", () => {
      expect(calculateErrors("PERRO", [])).toBe(0);
    });
  });

  // ─── checkGameStatus ──────────────────────────────────
  describe("checkGameStatus", () => {
    it('returns "playing" when game is in progress', () => {
      expect(checkGameStatus("PERRO", ["P", "E"], 6)).toBe("playing");
    });

    it('returns "won" when all letters are revealed', () => {
      expect(checkGameStatus("PERRO", ["P", "E", "R", "O"], 6)).toBe("won");
    });

    it('returns "lost" when errors reach max attempts', () => {
      const wrongLetters = ["A", "B", "C", "D", "F", "G"];
      expect(checkGameStatus("PERRO", wrongLetters, 6)).toBe("lost");
    });

    it('returns "lost" even if some correct letters were guessed', () => {
      // 1 correct (P) + 6 wrong = lost
      const letters = ["P", "A", "B", "C", "D", "F", "G"];
      expect(checkGameStatus("PERRO", letters, 6)).toBe("lost");
    });
  });

  // ─── guessLetter ──────────────────────────────────────
  describe("guessLetter", () => {
    let state: ReturnType<typeof initializeGame>;

    beforeEach(() => {
      state = initializeGame(); // word = "PERRO"
    });

    it("adds the letter to guessedLetters", () => {
      const next = guessLetter(state, "P");
      expect(next.guessedLetters).toContain("P");
    });

    it("does not add a duplicate letter", () => {
      const after1 = guessLetter(state, "P");
      const after2 = guessLetter(after1, "P");
      expect(after2.guessedLetters.filter((l) => l === "P")).toHaveLength(1);
    });

    it("does not change state if game is already won", () => {
      const won: typeof state = {
        ...state,
        status: "won",
        guessedLetters: ["P", "E", "R", "O"],
      };
      const next = guessLetter(won, "A");
      expect(next).toEqual(won);
    });

    it("does not change state if game is already lost", () => {
      const lost: typeof state = {
        ...state,
        status: "lost",
        errors: 6,
        guessedLetters: ["A", "B", "C", "D", "F", "G"],
      };
      const next = guessLetter(lost, "P");
      expect(next).toEqual(lost);
    });

    it("increments errors for incorrect letter", () => {
      const next = guessLetter(state, "Z");
      expect(next.errors).toBe(1);
    });

    it("does not increment errors for correct letter", () => {
      const next = guessLetter(state, "P");
      expect(next.errors).toBe(0);
    });

    it("transitions to won when last correct letter is guessed", () => {
      let s = state;
      for (const l of ["P", "E", "R"]) {
        s = guessLetter(s, l);
      }
      expect(s.status).toBe("playing");
      s = guessLetter(s, "O");
      expect(s.status).toBe("won");
    });

    it("transitions to lost when max errors reached", () => {
      let s = state;
      const wrong = ["A", "B", "C", "D", "F"];
      for (const l of wrong) {
        s = guessLetter(s, l);
        expect(s.status).toBe("playing");
      }
      s = guessLetter(s, "G");
      expect(s.status).toBe("lost");
      expect(s.errors).toBe(6);
    });

    it("uppercases the letter", () => {
      const next = guessLetter(state, "p");
      expect(next.guessedLetters).toContain("P");
    });
  });
});

// ─── words data ─────────────────────────────────────────
describe("Words data — src/data/words.ts", () => {
  it("words array is not empty", () => {
    expect(words.length).toBeGreaterThan(0);
  });

  it("all words are uppercase strings", () => {
    for (const w of words) {
      expect(w).toBe(w.toUpperCase());
    }
  });
});
