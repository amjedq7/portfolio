import { Code2, Terminal, User, Mail, Briefcase, Sun, Moon } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const { theme, toggleTheme, language, toggleLanguage, t } = useSettings();

  const navItems = [
    { id: 'home', label: t('Domů', 'Home'), icon: Terminal },
    { id: 'projects', label: t('Projekty', 'Projects'), icon: Briefcase },
    { id: 'about', label: t('O mně', 'About'), icon: User },
    { id: 'contact', label: t('Kontakt', 'Contact'), icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 pointer-events-none">
      {/* Logo - Top Left */}
      <div 
        onClick={() => scrollToSection('home')} 
        className="flex items-center gap-2 cursor-pointer group text-zinc-900 dark:text-white font-semibold tracking-tight pointer-events-auto"
      >
        <Code2 className="h-6 w-6 text-emerald-500 dark:text-emerald-400 transition-transform group-hover:rotate-12" />
        <span className="hidden sm:inline text-lg">Dev<span className="text-emerald-500 dark:text-emerald-400">.</span>Portfolio</span>
      </div>

      {/* Center Nav Pill */}
      <nav className="absolute left-1/2 -translate-x-1/2 flex items-center p-1.5 rounded-full backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/50 shadow-lg dark:shadow-2xl pointer-events-auto transition-all duration-300">
        <ul className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="h-4 w-4 sm:hidden block" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Settings Controls - Top Right */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={toggleLanguage}
          className="flex items-center justify-center h-10 w-10 rounded-full backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 shadow-lg transition-all font-bold text-xs uppercase"
          title="Toggle Language"
        >
          {language}
        </button>
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center h-10 w-10 rounded-full backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 shadow-lg transition-all"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
