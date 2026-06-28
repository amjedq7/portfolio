import { useState } from 'react';
import { Code2, House, User, Mail, Presentation, Sun, Moon, Menu } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const { theme, toggleTheme, language, toggleLanguage, t } = useSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('Domů', 'Home'), icon: House },
    { id: 'about', label: t('O mně', 'About'), icon: User },
    { id: 'projects', label: t('Projekty', 'Projects'), icon: Presentation },
    { id: 'contact', label: t('Kontakt', 'Contact'), icon: Mail },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-3 sm:px-6 lg:px-8 py-4 sm:py-5 pointer-events-none gap-2">
      {/* Left Side: Logo */}
      <div className="flex-1 flex justify-start pointer-events-none min-w-0">
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group text-zinc-900 dark:text-white font-semibold tracking-tight pointer-events-auto shrink-0"
        >
          <Code2 className="h-8 w-8 shrink-0 text-red-500 dark:text-red-400 transition-transform group-hover:rotate-12" />
          <span className="hidden lg:inline text-xl sm:text-2xl font-bold truncate">AmjedQ7</span>
        </div>
      </div>

      {/* Center: Navigation */}
      <nav className="flex items-center p-1.5 sm:p-2 rounded-full backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/50 shadow-lg dark:shadow-2xl pointer-events-auto transition-all duration-300 shrink-0">
        <motion.ul layout className="flex items-center gap-1 sm:gap-2 lg:gap-3">
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
                  className={`relative flex items-center gap-2 px-3 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full text-sm sm:text-base lg:text-lg font-medium transition-all duration-300 ${
                    isActive ? 'text-red-700 dark:text-red-400' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:hidden block shrink-0" />
                  <span className="hidden lg:inline whitespace-nowrap">{item.label}</span>
                </button>
              </li>
            );
          })}
        </motion.ul>
      </nav>

      {/* Right Side: Actions */}
      <div className="flex-1 flex justify-end pointer-events-none min-w-0">
        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-4 pointer-events-auto shrink-0">
          <button onClick={toggleLanguage} className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/30 shadow-lg transition-all font-bold text-sm uppercase">
            {language}
          </button>
          <button onClick={toggleTheme} aria-label="Toggle theme" className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/30 shadow-lg transition-all">
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Hamburger Actions */}
        <div className="sm:hidden relative pointer-events-auto shrink-0">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="flex items-center justify-center h-10 w-10 rounded-full backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 shadow-lg transition-all"
          >
            <Menu className="h-5 w-5" />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full right-0 mt-3 flex flex-col gap-2 p-2 rounded-full backdrop-blur-md bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/50 shadow-xl"
              >
                <button onClick={() => { toggleLanguage(); setIsMenuOpen(false); }} className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold text-xs uppercase transition-colors">
                  {language}
                </button>
                <button onClick={() => { toggleTheme(); setIsMenuOpen(false); }} aria-label="Toggle theme" className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors">
                  {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
