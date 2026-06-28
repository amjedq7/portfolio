import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface HeroProps {
  onNavigate?: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { t, language } = useSettings();

  const greetings = language === 'cs'
    ? [
        { t1: 'Vítejte u mě', t2: 'doma' },
        { t1: 'Welcome to', t2: 'my home' },
        { t1: 'Willkommen in', t2: 'meinem Zuhause' },
        { t1: 'Bienvenue dans', t2: 'ma maison' },
        { t1: 'Bienvenido a', t2: 'mi casa' },
        { t1: 'Benvenuto a', t2: 'casa mia' },
        { t1: 'ようこそ', t2: '私の家へ' },
        { t1: 'Добро пожаловать в', t2: 'мой дом' },
        { t1: '欢迎来到', t2: '我的家' },
        { t1: 'مرحباً بكم في', t2: 'بيتي' },
      ]
    : [
        { t1: 'Welcome to', t2: 'my home' },
        { t1: 'Willkommen in', t2: 'meinem Zuhause' },
        { t1: 'Bienvenue dans', t2: 'ma maison' },
        { t1: 'Bienvenido a', t2: 'mi casa' },
        { t1: 'Benvenuto a', t2: 'casa mia' },
        { t1: 'Vítejte u mě', t2: 'doma' },
        { t1: 'ようこそ', t2: '私の家へ' },
        { t1: 'Добро пожаловать в', t2: 'мой дом' },
        { t1: '欢迎来到', t2: '我的家' },
        { t1: 'مرحباً بكم في', t2: 'بيتي' },
      ];

  const baseText1 = greetings[0].t1;
  const baseText2 = greetings[0].t2;

  const [langIndex, setLangIndex] = useState(0);
  const [displayed1, setDisplayed1] = useState('');
  const [displayed2, setDisplayed2] = useState('');
  const [phase, setPhase] = useState<'type1' | 'type2' | 'pause' | 'delete2' | 'delete1' | 'idle'>('type1');

  const text1 = greetings[langIndex].t1;
  const text2 = greetings[langIndex].t2;

  // Reset when language changes
  useEffect(() => {
    setDisplayed1('');
    setDisplayed2('');
    setLangIndex(0);
    setPhase('type1');
  }, [language]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const speed = 40;
    const pauseTime = 2000;

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
      setLangIndex((prev) => (prev + 1) % greetings.length);
      setPhase('type1');
    }

    return () => clearTimeout(timeout);
  }, [displayed1, displayed2, phase, text1, text2]);

  const renderLine = (displayed: string, base: string, showCursor: boolean, isDeletePhase: boolean) => {
    const words = displayed.split(' ');
    const lastWord = words.pop() || '';
    const restText = words.length > 0 ? words.join(' ') + ' ' : '';
    
    return (
      <>
        {restText}
        <span className="whitespace-nowrap">
          {lastWord}
          {showCursor && (
            <span className="inline-block font-light animate-pulse -ml-1 text-zinc-900 dark:text-white">|</span>
          )}
        </span>
        {isDeletePhase && (
          <span className="text-zinc-300 dark:text-zinc-600">
            {base.slice(displayed.length)}
          </span>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full py-20 gap-12 lg:gap-8">
      <motion.div
        className="flex-1 flex flex-col items-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight mb-6 min-h-[140px] md:min-h-[180px] whitespace-pre-wrap">
          <span>
            {renderLine(displayed1, baseText1, phase === 'type1' || phase === 'delete1' || phase === 'idle', phase === 'delete1' || phase === 'delete2')}
          </span>
          <br />
          <span>
            {renderLine(displayed2, baseText2, phase === 'type2' || phase === 'delete2' || phase === 'pause', phase === 'delete1' || phase === 'delete2')}
          </span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          {t('Vytvářím stránky jak pro mladé, tak pro dospělé. Využívám na ně React, TypeScript a Tailwind.', 'I create websites for both young and old. I use React, TypeScript, and Tailwind.')}
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
