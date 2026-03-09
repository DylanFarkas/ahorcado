import HangmanGame from "@/src/components/game/HangmanGame";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 py-8 transition-colors duration-300">
      <HangmanGame />
    </main>
  );
}

