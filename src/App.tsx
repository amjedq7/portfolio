import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

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
        highlightedSection === sectionId 
          ? 'bg-emerald-500/10 dark:bg-emerald-500/15 shadow-[0_0_40px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/40 opacity-100 scale-100' 
          : 'opacity-0 scale-95 ring-transparent bg-transparent'
      }`} 
    />
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[40%] -left-[20%] h-[80%] w-[60%] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px]" />
        <div className="absolute top-[60%] -right-[20%] h-[70%] w-[50%] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[120px]" />
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
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 transition-colors"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
