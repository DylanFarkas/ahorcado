import { getRandomWord } from "@/src/data/words";
import { NextResponse } from "next/server";

export async function GET() {
  const word = getRandomWord();
  return NextResponse.json({ word });
}
