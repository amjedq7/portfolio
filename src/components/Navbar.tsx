import { Code2, Terminal, User, Mail, Briefcase, Sun, Moon } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { motion } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const { theme, toggleTheme, language, toggleLanguage, t } = useSettings();

  const navItems = [
    { id: 'home', label: t('Domů', 'Home'), icon: Terminal },
    { id: 'about', label: t('O mně', 'About'), icon: User },
    { id: 'projects', label: t('Projekty', 'Projects'), icon: Briefcase },
    { id: 'contact', label: t('Kontakt', 'Contact'), icon: Mail },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 py-5 pointer-events-none">
      <div 
        onClick={() => onNavigate('home')} 
        className="flex items-center gap-3 cursor-pointer group text-zinc-900 dark:text-white font-semibold tracking-tight pointer-events-auto"
      >
        <Code2 className="h-8 w-8 text-red-500 dark:text-red-400 transition-transform group-hover:rotate-12" />
        <span className="hidden sm:inline text-xl sm:text-2xl font-bold">AmjedQ7</span>
      </div>

      <nav className="absolute left-1/2 -translate-x-1/2 flex items-center p-2 rounded-full backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/50 shadow-lg dark:shadow-2xl pointer-events-auto transition-all duration-300">
        <motion.ul layout className="flex items-center gap-2 sm:gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="relative">
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-red-500/10 border border-red-500/20 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium transition-all duration-300 ${
                    isActive ? 'text-red-700 dark:text-red-400' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <Icon className="h-5 w-5 sm:hidden block" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              </li>
            );
          })}
        </motion.ul>
      </nav>

      <div className="flex items-center gap-4 pointer-events-auto">
        <button onClick={toggleLanguage} className="flex items-center justify-center h-12 w-12 rounded-full backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/30 shadow-lg transition-all font-bold text-sm uppercase">
          {language}
        </button>
        <button onClick={toggleTheme} className="flex items-center justify-center h-12 w-12 rounded-full backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/30 shadow-lg transition-all">
          {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}
