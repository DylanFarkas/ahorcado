import HangmanGame from "@/src/components/game/HangmanGame";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-purple-950 dark:to-indigo-950 py-8 transition-colors duration-300">
      <HangmanGame />
    </main>
  );
}

