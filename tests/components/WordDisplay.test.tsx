import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import WordDisplay from "@/src/components/game/WordDisplay";

// Mock framer-motion so animated elements render as plain HTML
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      ...rest
    }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...rest}>
        {children}
      </div>
    ),
    span: ({
      children,
      className,
      ...rest
    }: React.HTMLAttributes<HTMLSpanElement>) => (
      <span className={className} {...rest}>
        {children}
      </span>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("WordDisplay", () => {
  it("renders underscores for hidden letters", () => {
    render(
      <WordDisplay word="GATO" guessedLetters={[]} gameOver={false} />
    );
    // 4 divider lines (one per letter)
    const lines = document.querySelectorAll(
      ".bg-gray-300, .dark\\:bg-white\\/40"
    );
    // Each letter slot has a line at the bottom
    expect(lines.length).toBeGreaterThanOrEqual(4);
  });

  it("reveals guessed letters", () => {
    render(
      <WordDisplay word="GATO" guessedLetters={["G", "A"]} gameOver={false} />
    );
    expect(screen.getByText("G")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("shows all letters when game is over (lost)", () => {
    render(
      <WordDisplay word="GATO" guessedLetters={[]} gameOver={true} />
    );
    expect(screen.getByText("G")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("T")).toBeInTheDocument();
    expect(screen.getByText("O")).toBeInTheDocument();
  });

  it("renders correct number of letter slots", () => {
    const { container } = render(
      <WordDisplay word="SOL" guessedLetters={[]} gameOver={false} />
    );
    // The main flex container's direct children are letter containers
    const slots = container.querySelector(".flex.gap-2")?.children;
    expect(slots?.length).toBe(3);
  });
});
