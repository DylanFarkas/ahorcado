import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameStatus from "@/src/components/game/GameStatus";

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
    button: ({
      children,
      className,
      onClick,
      ...rest
    }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("GameStatus", () => {
  const baseProps = {
    errors: 0,
    maxAttempts: 6,
    word: "PERRO",
    onRestart: vi.fn(),
  };

  it('shows remaining attempts when status is "playing"', () => {
    render(<GameStatus {...baseProps} status="playing" />);
    expect(screen.getByText("Intentos restantes:")).toBeInTheDocument();
  });

  it('renders correct number of dots for attempts', () => {
    const { container } = render(
      <GameStatus {...baseProps} status="playing" errors={2} />
    );
    const dots = container.querySelectorAll(".rounded-full");
    expect(dots).toHaveLength(6);
    // 4 green (remaining) + 2 red (used)
    const green = container.querySelectorAll(".bg-green-400");
    const red = container.querySelectorAll(".bg-red-500");
    expect(green).toHaveLength(4);
    expect(red).toHaveLength(2);
  });

  it("shows win message when status is won", () => {
    render(<GameStatus {...baseProps} status="won" />);
    expect(screen.getByText("🎉 ¡Ganaste!")).toBeInTheDocument();
  });

  it("shows lose message and the word when status is lost", () => {
    render(<GameStatus {...baseProps} status="lost" />);
    expect(screen.getByText("💀 ¡Perdiste!")).toBeInTheDocument();
    expect(screen.getByText("PERRO")).toBeInTheDocument();
    expect(screen.getByText(/La palabra era/i)).toBeInTheDocument();
  });

  it("shows restart button when game is over", () => {
    render(<GameStatus {...baseProps} status="won" />);
    expect(
      screen.getByRole("button", { name: /nueva partida/i })
    ).toBeInTheDocument();
  });

  it("does not show restart button while playing", () => {
    render(<GameStatus {...baseProps} status="playing" />);
    expect(
      screen.queryByRole("button", { name: /nueva partida/i })
    ).not.toBeInTheDocument();
  });

  it("calls onRestart when restart button is clicked", async () => {
    const onRestart = vi.fn();
    const user = userEvent.setup();
    render(
      <GameStatus {...baseProps} status="lost" onRestart={onRestart} />
    );
    await user.click(
      screen.getByRole("button", { name: /nueva partida/i })
    );
    expect(onRestart).toHaveBeenCalledOnce();
  });
});
