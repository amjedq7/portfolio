import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

const RedStars = () => {
  const starsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [starsData, setStarsData] = useState<{ id: number; ox: number; oy: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate 75 random stars on mount
    const newStars = Array.from({ length: 75 }).map((_, i) => ({
      id: i,
      ox: Math.random() * 100,
      oy: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setStarsData(newStars);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      starsRef.current.forEach((starEl) => {
        if (!starEl) return;
        
        // offsetLeft and offsetTop are independent of CSS transforms
        const starX = starEl.offsetLeft + starEl.offsetWidth / 2;
        const starY = starEl.offsetTop + starEl.offsetHeight / 2;

        const dx = mouseX - starX;
        const dy = mouseY - starY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxDist = 300; // Influence radius
        
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          // Move away from mouse
          const moveX = -(dx / dist) * force * 60; 
          const moveY = -(dy / dist) * force * 60;
          
          starEl.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.5)`;
        } else {
          starEl.style.transform = `translate(0px, 0px) scale(1)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute w-full h-full pointer-events-none z-0">
      {starsData.map((star, i) => (
        <div
          key={star.id}
          ref={(el) => {
            starsRef.current[i] = el;
          }}
          className="absolute rounded-full bg-red-500 animate-pulse transition-transform duration-500 ease-out"
          style={{
            left: `${star.ox}%`,
            top: `${star.oy}%`,
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

const InteractiveLines = () => {
  const linesRef = useRef<(SVGGElement | null)[]>([]);
  const [linePoints, setLinePoints] = useState<{ x: number, y: number }[][]>([]);

  useEffect(() => {
    // Sample points along each SVG path to track distance accurately
    setTimeout(() => {
      const points: { x: number, y: number }[][] = [];
      linesRef.current.forEach((g) => {
        if (!g) {
          points.push([]);
          return;
        }
        const path = g.querySelector('path');
        if (path) {
          const length = path.getTotalLength();
          const pts = [];
          for (let i = 0; i <= 30; i++) {
            const domPt = path.getPointAtLength((i / 30) * length);
            pts.push({ x: domPt.x, y: domPt.y });
          }
          points.push(pts);
        } else {
          points.push([]);
        }
      });
      setLinePoints(points);
    }, 100);
  }, []);

  useEffect(() => {
    if (linePoints.length === 0) return;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      
      const svgW = screenW * 1.1;
      const svgH = screenH * 1.1;
      const offsetX = screenW * -0.05;
      const offsetY = screenH * -0.05;

      linesRef.current.forEach((g, index) => {
        if (!g) return;
        const pts = linePoints[index];
        if (!pts || pts.length === 0) return;

        let minDist = Infinity;
        let closestScreenX = 0;
        let closestScreenY = 0;

        for (const pt of pts) {
          const ptScreenX = offsetX + (pt.x / 100) * svgW;
          const ptScreenY = offsetY + (pt.y / 100) * svgH;
          const dx = mouseX - ptScreenX;
          const dy = mouseY - ptScreenY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDist) {
            minDist = dist;
            closestScreenX = ptScreenX;
            closestScreenY = ptScreenY;
          }
        }

        const maxDist = 120; // Trigger radius
        
        if (minDist < maxDist) {
          const force = (maxDist - minDist) / maxDist;
          const dx = closestScreenX - mouseX;
          const dy = closestScreenY - mouseY;
          // Push away very subtly (15px max) so it doesn't move too much
          const moveX = (dx / minDist) * force * 15; 
          const moveY = (dy / minDist) * force * 15;
          
          g.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          g.style.transform = `translate(0px, 0px)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [linePoints]);

  return (
    <svg 
      className="absolute w-[110%] h-[110%] -left-[5%] -top-[5%] opacity-70 dark:opacity-100" 
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

      {/* Floating animations for the lines */}
      <g ref={el => linesRef.current[0] = el} className="transition-transform duration-150 ease-out animate-[pulse_4s_ease-in-out_infinite]">
        <path d="M-10,40 C30,-20 70,120 110,60" fill="none" stroke="url(#line-grad1)" strokeWidth="1.5" opacity="0.3" />
        <path d="M-10,40 C30,-20 70,120 110,60" fill="none" stroke="url(#line-grad1)" strokeWidth="0.15" />
      </g>

      <g ref={el => linesRef.current[1] = el} className="transition-transform duration-150 ease-out animate-[pulse_5s_ease-in-out_infinite_1s]">
        <path d="M-10,70 C40,120 60,-20 110,30" fill="none" stroke="url(#line-grad2)" strokeWidth="1.5" opacity="0.3" />
        <path d="M-10,70 C40,120 60,-20 110,30" fill="none" stroke="url(#line-grad2)" strokeWidth="0.15" />
      </g>

      <g ref={el => linesRef.current[2] = el} className="transition-transform duration-150 ease-out animate-[pulse_6s_ease-in-out_infinite_2s]">
        <path d="M-10,50 C30,20 70,80 110,50" fill="none" stroke="url(#line-grad1)" strokeWidth="2.5" opacity="0.15" />
        <path d="M-10,50 C30,20 70,80 110,50" fill="none" stroke="url(#line-grad1)" strokeWidth="0.1" />
      </g>

      <g ref={el => linesRef.current[3] = el} className="transition-transform duration-150 ease-out animate-[pulse_4.5s_ease-in-out_infinite_0.5s]">
        <path d="M-10,20 C20,100 80,0 110,80" fill="none" stroke="url(#line-grad2)" strokeWidth="1" opacity="0.4" />
        <path d="M-10,20 C20,100 80,0 110,80" fill="none" stroke="url(#line-grad2)" strokeWidth="0.2" />
      </g>

      <g ref={el => linesRef.current[4] = el} className="transition-transform duration-150 ease-out animate-[pulse_5.5s_ease-in-out_infinite_1.5s]">
        <path d="M-10,60 C40,40 60,60 110,40" fill="none" stroke="url(#line-grad1)" strokeWidth="0.8" opacity="0.3" />
        <path d="M-10,60 C40,40 60,60 110,40" fill="none" stroke="url(#line-grad1)" strokeWidth="0.05" />
      </g>
    </svg>
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

        {/* Interactive Floating Lines */}
        <InteractiveLines />
        
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
