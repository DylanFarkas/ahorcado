import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import HangmanFigure from "@/src/components/game/HangmanFigure";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    circle: (props: React.SVGProps<SVGCircleElement>) => (
      <circle {...props} data-testid="body-part" />
    ),
    line: (props: React.SVGProps<SVGLineElement>) => (
      <line {...props} data-testid="body-part" />
    ),
  },
}));

describe("HangmanFigure", () => {
  it("renders no body parts when errors = 0", () => {
    const { container } = render(<HangmanFigure errors={0} />);
    const parts = container.querySelectorAll("[data-testid='body-part']");
    expect(parts).toHaveLength(0);
  });

  it("renders 1 body part (head) when errors = 1", () => {
    const { container } = render(<HangmanFigure errors={1} />);
    const parts = container.querySelectorAll("[data-testid='body-part']");
    expect(parts).toHaveLength(1);
  });

  it("renders 2 body parts when errors = 2", () => {
    const { container } = render(<HangmanFigure errors={2} />);
    const parts = container.querySelectorAll("[data-testid='body-part']");
    expect(parts).toHaveLength(2);
  });

  it("renders 3 body parts when errors = 3", () => {
    const { container } = render(<HangmanFigure errors={3} />);
    const parts = container.querySelectorAll("[data-testid='body-part']");
    expect(parts).toHaveLength(3);
  });

  it("renders 4 body parts when errors = 4", () => {
    const { container } = render(<HangmanFigure errors={4} />);
    const parts = container.querySelectorAll("[data-testid='body-part']");
    expect(parts).toHaveLength(4);
  });

  it("renders 5 body parts when errors = 5", () => {
    const { container } = render(<HangmanFigure errors={5} />);
    const parts = container.querySelectorAll("[data-testid='body-part']");
    expect(parts).toHaveLength(5);
  });

  it("renders 6 body parts (full figure) when errors = 6", () => {
    const { container } = render(<HangmanFigure errors={6} />);
    const parts = container.querySelectorAll("[data-testid='body-part']");
    expect(parts).toHaveLength(6);
  });

  it("always renders the gallows structure", () => {
    const { container } = render(<HangmanFigure errors={0} />);
    // The gallows consists of 4 static lines (base, post, beam, rope)
    const staticLines = container.querySelectorAll("line:not([data-testid])");
    expect(staticLines).toHaveLength(4);
  });

  it("renders an SVG element", () => {
    const { container } = render(<HangmanFigure errors={0} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
