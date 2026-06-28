import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface HeroProps {
  onNavigate?: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { t, language } = useSettings();

  const text1 = t('Vytvářím moderní', 'Building modern');
  const text2 = t('webové zážitky.', 'web experiences.');

  const [displayed1, setDisplayed1] = useState('');
  const [displayed2, setDisplayed2] = useState('');
  const [phase, setPhase] = useState<'type1' | 'type2' | 'pause' | 'delete2' | 'delete1' | 'idle'>('type1');

  // Reset when language changes
  useEffect(() => {
    setDisplayed1('');
    setDisplayed2('');
    setPhase('type1');
  }, [text1, text2]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const speed = 50;
    const pauseTime = 4000;

    if (phase === 'type1') {
      if (displayed1.length < text1.length) {
        timeout = setTimeout(() => setDisplayed1(text1.slice(0, displayed1.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setPhase('type2'), 200);
      }
    } else if (phase === 'type2') {
      if (displayed2.length < text2.length) {
        timeout = setTimeout(() => setDisplayed2(text2.slice(0, displayed2.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setPhase('pause'), pauseTime);
      }
    } else if (phase === 'pause') {
      setPhase('delete2');
    } else if (phase === 'delete2') {
      if (displayed2.length > 0) {
        timeout = setTimeout(() => setDisplayed2(displayed2.slice(0, -1)), speed);
      } else {
        timeout = setTimeout(() => setPhase('delete1'), 200);
      }
    } else if (phase === 'delete1') {
      if (displayed1.length > 0) {
        timeout = setTimeout(() => setDisplayed1(displayed1.slice(0, -1)), speed);
      } else {
        timeout = setTimeout(() => setPhase('idle'), 1500);
      }
    } else if (phase === 'idle') {
      setPhase('type1');
    }

    return () => clearTimeout(timeout);
  }, [displayed1, displayed2, phase, text1, text2]);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full py-20 gap-12 lg:gap-8">
      <motion.div
        className="flex-1 flex flex-col items-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight mb-6 min-h-[140px] md:min-h-[180px]">
          <span>
            {displayed1}
            {(phase === 'type1' || phase === 'delete1' || phase === 'idle') && (
              <span className="inline-block font-light animate-pulse -ml-1">|</span>
            )}
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-600 dark:from-red-400 dark:to-blue-500">
            {displayed2}
            {(phase === 'type2' || phase === 'delete2' || phase === 'pause') && (
              <span className="inline-block font-light animate-pulse -ml-1">|</span>
            )}
          </span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          {t('Vytvářím úžasná, bleskově rychlá a vysoce responzivní digitální rozhraní pomocí Reactu, TypeScriptu a Tailwind CSS.', 'I craft stunning, lightning-fast, and highly responsive digital interfaces using React, TypeScript, and Tailwind CSS.')}
        </p>
        
        <button 
          onClick={() => {
            if (onNavigate) {
              onNavigate('projects');
            } else {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="group flex items-center gap-2 px-6 py-3 bg-red-500 text-zinc-50 dark:text-zinc-950 font-bold rounded-full hover:bg-red-600 dark:hover:bg-red-400 transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]"
        >
          {t('Zobrazit moji práci', 'View My Work')}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>

      <motion.div
        className="flex-1 flex justify-center lg:justify-end w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.img 
          src={import.meta.env.BASE_URL + "favicon.svg"} 
          alt="AmjedQ7 Logo" 
          className="w-56 h-56 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] object-cover rounded-full drop-shadow-[0_0_50px_rgba(239,68,68,0.2)] border-4 border-red-500/20"
          animate={{ y: [-15, 15, -15] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
}
