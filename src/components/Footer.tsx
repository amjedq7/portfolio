export default function Footer() {
  return (
    <footer className="relative z-10 py-8 text-center text-zinc-500 dark:text-zinc-400 text-sm border-t border-zinc-200 dark:border-zinc-800/50 mt-12 bg-white/30 dark:bg-black/30 backdrop-blur-md">
      <p>&copy; {new Date().getFullYear()} AmjedQ7. All rights reserved.</p>
    </footer>
  );
}
