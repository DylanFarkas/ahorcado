import { describe, it, expect, vi } from "vitest";
import { words } from "@/src/data/words";

// Mock NextResponse since it's a server-side Next.js API
vi.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown) => ({
      json: async () => body,
      status: 200,
    }),
  },
}));

// We import the handler after mocking
import { GET } from "@/app/api/words/route";

describe("API Route — /api/words", () => {
  it("returns a response with status 200", async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("returns a JSON body with a word property", async () => {
    const response = await GET();
    const data = await response.json();
    expect(data).toHaveProperty("word");
    expect(typeof data.word).toBe("string");
  });

  it("returns a word from the words list", async () => {
    const response = await GET();
    const data = await response.json();
    expect(words).toContain(data.word);
  });

  it("returns a non-empty string", async () => {
    const response = await GET();
    const data = await response.json();
    expect(data.word.length).toBeGreaterThan(0);
  });
});
