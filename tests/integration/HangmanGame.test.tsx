import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HangmanGame from "@/src/components/game/HangmanGame";

// Mock framer-motion
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
    button: ({
      children,
      className,
      onClick,
      disabled,
      ...rest
    }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button className={className} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    ),
    circle: (props: React.SVGProps<SVGCircleElement>) => (
      <circle {...props} data-testid="body-part" />
    ),
    line: (props: React.SVGProps<SVGLineElement>) => (
      <line {...props} data-testid="body-part" />
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock getRandomWord to always return "GATO"
vi.mock("@/src/data/words", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/src/data/words")>();
  return {
    ...actual,
    getRandomWord: vi.fn(() => "GATO"),
  };
});

describe("HangmanGame — Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the game title", () => {
    render(<HangmanGame />);
    expect(screen.getByText("Ahorcado")).toBeInTheDocument();
  });

  it("renders keyboard, word display, and status on mount", () => {
    render(<HangmanGame />);
    // Keyboard exists
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(27);
    // Word display with underscores (4 letter slots for GATO)
    expect(screen.getByText("Intentos restantes:")).toBeInTheDocument();
  });

  it("reveals a correct letter when clicked", async () => {
    const user = userEvent.setup();
    render(<HangmanGame />);
    await user.click(screen.getByText("G"));
    expect(screen.getByText("G").closest("button")).toBeDisabled();
  });

  it("marks incorrect letter as wrong", async () => {
    const user = userEvent.setup();
    render(<HangmanGame />);
    await user.click(screen.getByText("Z"));
    const btn = screen.getByText("Z").closest("button");
    expect(btn).toBeDisabled();
    expect(btn?.className).toContain("bg-red-500");
  });

  it("increases errors on wrong guess (body part appears)", async () => {
    const user = userEvent.setup();
    const { container } = render(<HangmanGame />);
    await user.click(screen.getByText("Z"));
    const parts = container.querySelectorAll("[data-testid='body-part']");
    expect(parts.length).toBe(1);
  });

  it("wins the game when all letters are guessed", async () => {
    const user = userEvent.setup();
    render(<HangmanGame />);
    // GATO = G, A, T, O
    await user.click(screen.getByText("G"));
    await user.click(screen.getByText("A"));
    await user.click(screen.getByText("T"));
    await user.click(screen.getByText("O"));
    expect(screen.getByText("🎉 ¡Ganaste!")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /nueva partida/i })
    ).toBeInTheDocument();
  });

  it("loses the game after 6 wrong guesses", async () => {
    const user = userEvent.setup();
    render(<HangmanGame />);
    const wrongLetters = ["Z", "X", "W", "Q", "F", "J"];
    for (const l of wrongLetters) {
      await user.click(screen.getByText(l));
    }
    expect(screen.getByText("💀 ¡Perdiste!")).toBeInTheDocument();
    expect(screen.getByText("GATO")).toBeInTheDocument();
  });

  it("disables the keyboard after the game ends", async () => {
    const user = userEvent.setup();
    render(<HangmanGame />);
    // Win the game
    for (const l of ["G", "A", "T", "O"]) {
      await user.click(screen.getByText(l));
    }
    // All buttons should be disabled
    const buttons = screen.getAllByRole("button").filter(
      (btn) => !btn.textContent?.includes("Nueva Partida")
    );
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("resets the game when restart button is clicked", async () => {
    const user = userEvent.setup();
    render(<HangmanGame />);
    // Lose the game
    const wrongLetters = ["Z", "X", "W", "Q", "F", "J"];
    for (const l of wrongLetters) {
      await user.click(screen.getByText(l));
    }
    expect(screen.getByText("💀 ¡Perdiste!")).toBeInTheDocument();

    // Click restart
    await user.click(
      screen.getByRole("button", { name: /nueva partida/i })
    );

    // Game should be back to playing
    expect(screen.getByText("Intentos restantes:")).toBeInTheDocument();
    expect(screen.queryByText("💀 ¡Perdiste!")).not.toBeInTheDocument();
  });

  it("ignores clicks on already guessed letters", async () => {
    const user = userEvent.setup();
    const { container } = render(<HangmanGame />);
    // Click wrong letter
    await user.click(screen.getByText("Z"));
    let parts = container.querySelectorAll("[data-testid='body-part']");
    expect(parts.length).toBe(1);

    // Try clicking Z again (should be disabled, errors shouldn't increase)
    await user.click(screen.getByText("Z"));
    parts = container.querySelectorAll("[data-testid='body-part']");
    expect(parts.length).toBe(1);
  });
});
