import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VirtualKeyboard from "@/src/components/game/VirtualKeyboard";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
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
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const ALPHABET = "QWERTYUIOPASDFGHJKLÑZXCVBNM";

describe("VirtualKeyboard", () => {
  it("renders all 27 letter buttons (A-Z + Ñ)", () => {
    render(
      <VirtualKeyboard
        word="PERRO"
        guessedLetters={[]}
        disabled={false}
        onGuess={vi.fn()}
      />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(27);
  });

  it("renders every letter of the Spanish alphabet", () => {
    render(
      <VirtualKeyboard
        word="PERRO"
        guessedLetters={[]}
        disabled={false}
        onGuess={vi.fn()}
      />
    );
    for (const letter of ALPHABET) {
      expect(screen.getByText(letter)).toBeInTheDocument();
    }
  });

  it("disables already guessed letters", () => {
    render(
      <VirtualKeyboard
        word="PERRO"
        guessedLetters={["P", "Z"]}
        disabled={false}
        onGuess={vi.fn()}
      />
    );
    expect(screen.getByText("P").closest("button")).toBeDisabled();
    expect(screen.getByText("Z").closest("button")).toBeDisabled();
    expect(screen.getByText("A").closest("button")).not.toBeDisabled();
  });

  it("calls onGuess when an unused letter is clicked", async () => {
    const onGuess = vi.fn();
    const user = userEvent.setup();
    render(
      <VirtualKeyboard
        word="PERRO"
        guessedLetters={[]}
        disabled={false}
        onGuess={onGuess}
      />
    );
    await user.click(screen.getByText("A"));
    expect(onGuess).toHaveBeenCalledWith("A");
  });

  it("does not call onGuess for a disabled (guessed) letter", async () => {
    const onGuess = vi.fn();
    const user = userEvent.setup();
    render(
      <VirtualKeyboard
        word="PERRO"
        guessedLetters={["P"]}
        disabled={false}
        onGuess={onGuess}
      />
    );
    await user.click(screen.getByText("P"));
    expect(onGuess).not.toHaveBeenCalled();
  });

  it("disables all buttons when disabled prop is true", () => {
    render(
      <VirtualKeyboard
        word="PERRO"
        guessedLetters={[]}
        disabled={true}
        onGuess={vi.fn()}
      />
    );
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("applies correct CSS class to correct guessed letters", () => {
    render(
      <VirtualKeyboard
        word="PERRO"
        guessedLetters={["P"]}
        disabled={false}
        onGuess={vi.fn()}
      />
    );
    const btn = screen.getByText("P").closest("button");
    expect(btn?.className).toContain("bg-green-500");
  });

  it("applies incorrect CSS class to wrong guessed letters", () => {
    render(
      <VirtualKeyboard
        word="PERRO"
        guessedLetters={["Z"]}
        disabled={false}
        onGuess={vi.fn()}
      />
    );
    const btn = screen.getByText("Z").closest("button");
    expect(btn?.className).toContain("bg-red-500");
  });
});
