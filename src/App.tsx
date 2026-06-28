import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

const RedStars = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate 75 random stars on mount
    const newStars = Array.from({ length: 75 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute w-full h-full pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-red-500 animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 3}px ${star.size}px rgba(239, 68, 68, 0.8)`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const highlightTimeout = useRef<NodeJS.Timeout>();

  const handleNavigate = (id: string) => {
    // If the user clicks the same section they are currently on, do nothing
    if (activeSection === id) return;

    const el = document.getElementById(id);
    if (el) {
      isProgrammaticScroll.current = true;
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      
      // Clear timeouts
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (highlightTimeout.current) clearTimeout(highlightTimeout.current);
      
      // Highlight the section temporarily
      setHighlightedSection(id);
      
      // Resume scroll spy after scrolling animation finishes
      scrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1000);

      // Remove highlight after 1 second
      highlightTimeout.current = setTimeout(() => {
        setHighlightedSection(null);
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      
      if (isProgrammaticScroll.current) return;
      
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        setActiveSection('contact');
        return;
      }

      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const CardHighlight = ({ sectionId }: { sectionId: string }) => (
    <div 
      className={`absolute inset-0 sm:-inset-x-6 -z-10 rounded-3xl pointer-events-none transition-all duration-500 ease-out ${
        sectionId === 'home' ? 'top-24' : ''
      } ${
        highlightedSection === sectionId 
          ? 'bg-red-500/10 dark:bg-red-500/15 shadow-[0_0_40px_rgba(239,68,68,0.2)] ring-1 ring-red-500/40 opacity-100 scale-100' 
          : 'opacity-0 scale-95 ring-transparent bg-transparent'
      }`} 
    />
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white dark:bg-black text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      {/* Background SVG Waves */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Red Stars Layer */}
        <RedStars />

        <svg 
          className="absolute w-full h-full opacity-70 dark:opacity-100" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="line-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(239, 68, 68, 0)" />
              <stop offset="30%" stopColor="rgba(239, 68, 68, 1)" />
              <stop offset="70%" stopColor="rgba(239, 68, 68, 1)" />
              <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
            </linearGradient>
            <linearGradient id="line-grad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(239, 68, 68, 0)" />
              <stop offset="20%" stopColor="rgba(220, 38, 38, 1)" />
              <stop offset="80%" stopColor="rgba(220, 38, 38, 1)" />
              <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
            </linearGradient>
          </defs>

          {/* Line 1 */}
          <path d="M-10,40 C30,-20 70,120 110,60" fill="none" stroke="url(#line-grad1)" strokeWidth="1.5" opacity="0.3" />
          <path d="M-10,40 C30,-20 70,120 110,60" fill="none" stroke="url(#line-grad1)" strokeWidth="0.15" />

          {/* Line 2 */}
          <path d="M-10,70 C40,120 60,-20 110,30" fill="none" stroke="url(#line-grad2)" strokeWidth="1.5" opacity="0.3" />
          <path d="M-10,70 C40,120 60,-20 110,30" fill="none" stroke="url(#line-grad2)" strokeWidth="0.15" />

          {/* Line 3 */}
          <path d="M-10,50 C30,20 70,80 110,50" fill="none" stroke="url(#line-grad1)" strokeWidth="2.5" opacity="0.15" />
          <path d="M-10,50 C30,20 70,80 110,50" fill="none" stroke="url(#line-grad1)" strokeWidth="0.1" />

          {/* Line 4 */}
          <path d="M-10,20 C20,100 80,0 110,80" fill="none" stroke="url(#line-grad2)" strokeWidth="1" opacity="0.4" />
          <path d="M-10,20 C20,100 80,0 110,80" fill="none" stroke="url(#line-grad2)" strokeWidth="0.2" />

          {/* Line 5 */}
          <path d="M-10,60 C40,40 60,60 110,40" fill="none" stroke="url(#line-grad1)" strokeWidth="0.8" opacity="0.3" />
          <path d="M-10,60 C40,40 60,60 110,40" fill="none" stroke="url(#line-grad1)" strokeWidth="0.05" />
        </svg>
        
        {/* Subtle red ambient glow so it isn't too dark */}
        <div className="absolute -top-[40%] -left-[20%] h-[80%] w-[60%] rounded-full bg-red-500/10 dark:bg-red-500/5 blur-[120px]" />
        <div className="absolute top-[60%] -right-[20%] h-[70%] w-[50%] rounded-full bg-red-600/5 dark:bg-red-600/5 blur-[120px]" />
      </div>

      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="relative z-10 mx-auto max-w-7xl px-6">
        <section id="home" className="relative min-h-screen pt-24 flex items-center">
          <CardHighlight sectionId="home" />
          <Hero onNavigate={handleNavigate} />
        </section>
        
        <section id="about" className="relative py-24">
          <CardHighlight sectionId="about" />
          <About />
        </section>
        
        <section id="projects" className="relative py-24">
          <CardHighlight sectionId="projects" />
          <Projects />
        </section>
        
        <section id="contact" className="relative py-24">
          <CardHighlight sectionId="contact" />
          <Contact />
        </section>
      </main>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-colors"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
