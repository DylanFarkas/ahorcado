import HangmanGame from "@/src/components/game/HangmanGame";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950 py-8">
      <HangmanGame />
    </main>
  );
}

