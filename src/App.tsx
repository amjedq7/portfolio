import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const pointsRef = useRef<{ id: number, pts: {ox: number, oy: number, x: number, y: number, vx: number, vy: number}[] }[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const curves = useMemo(() => [
    { d: "M-10,40 C30,-20 70,120 110,60", grad: "url(#line-grad1)", w1: 1.5, o1: 0.3, w2: 0.15, anim: "animate-[pulse_4s_ease-in-out_infinite]" },
    { d: "M-10,70 C40,120 60,-20 110,30", grad: "url(#line-grad2)", w1: 1.5, o1: 0.3, w2: 0.15, anim: "animate-[pulse_5s_ease-in-out_infinite_1s]" },
    { d: "M-10,50 C30,20 70,80 110,50", grad: "url(#line-grad1)", w1: 2.5, o1: 0.15, w2: 0.1, anim: "animate-[pulse_6s_ease-in-out_infinite_2s]" },
    { d: "M-10,20 C20,100 80,0 110,80", grad: "url(#line-grad2)", w1: 1, o1: 0.4, w2: 0.2, anim: "animate-[pulse_4.5s_ease-in-out_infinite_0.5s]" },
    { d: "M-10,60 C40,40 60,60 110,40", grad: "url(#line-grad1)", w1: 0.8, o1: 0.3, w2: 0.05, anim: "animate-[pulse_5.5s_ease-in-out_infinite_1.5s]" }
  ], []);

  useEffect(() => {
    let animationFrameId: number;

    // Use a slight timeout to ensure paths are fully painted in the DOM 
    // so that getTotalLength() does not crash in certain browsers (like Firefox/Safari)
    setTimeout(() => {
      pointsRef.current = curves.map((_, id) => {
        const pathEl = pathsRef.current[id * 2];
        if (!pathEl) return { id, pts: [] };

        let len = 200;
        try {
          len = pathEl.getTotalLength();
        } catch(e) {
          console.warn("SVG length error:", e);
        }

        const pts = [];
        const numPoints = 100; // High resolution string
        for (let i = 0; i <= numPoints; i++) {
          try {
            const pt = pathEl.getPointAtLength((i / numPoints) * len);
            pts.push({ ox: pt.x, oy: pt.y, x: pt.x, y: pt.y, vx: 0, vy: 0 });
          } catch(e) {
            pts.push({ ox: 0, oy: 0, x: 0, y: 0, vx: 0, vy: 0 });
          }
        }
        return { id, pts };
      });

      render();
    }, 100);

    const render = () => {
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      
      const svgW = screenW * 1.1;
      const svgH = screenH * 1.1;
      const offsetX = screenW * -0.05;
      const offsetY = screenH * -0.05;

      pointsRef.current.forEach((line, index) => {
        const path1 = pathsRef.current[index * 2];
        const path2 = pathsRef.current[index * 2 + 1];
        if (!path1 || !path2 || !line.pts.length) return;

        line.pts.forEach((p, i) => {
          // Pin the extreme edges so the lines don't detach
          if (i === 0 || i === line.pts.length - 1) return;

          // Map point's original position to screen coordinates
          const ptScreenX = offsetX + (p.ox / 100) * svgW;
          const ptScreenY = offsetY + (p.oy / 100) * svgH;

          const dx = mouseX - ptScreenX;
          const dy = mouseY - ptScreenY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const maxDist = 60; // Very tight radius so ONLY the small part moving
          let tx = p.ox;
          let ty = p.oy;

          if (dist < maxDist) {
             const force = Math.pow((maxDist - dist) / maxDist, 2); 
             // Push away sharply
             const moveScreenX = -(dx / dist) * force * 50; 
             const moveScreenY = -(dy / dist) * force * 50;
             tx = p.ox + (moveScreenX / svgW) * 100;
             ty = p.oy + (moveScreenY / svgH) * 100;
          }

          // Snappy spring physics
          p.vx += (tx - p.x) * 0.3; // High tension
          p.vx *= 0.6; // High friction so it doesn't wobble forever
          p.vy += (ty - p.y) * 0.3;
          p.vy *= 0.6;

          p.x += p.vx;
          p.y += p.vy;
        });

        // Use direct LineTo commands instead of CurveTo smoothing. 
        // This makes the displaced point form a sharp, distinct 'V' shape break.
        const pts = line.pts;
        let d = `M${pts[0].x},${pts[0].y} `;
        for (let i = 1; i < pts.length; i++) {
          d += `L${pts[i].x},${pts[i].y} `;
        }

        path1.setAttribute("d", d);
        path2.setAttribute("d", d);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [curves]);

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

      {curves.map((curve, i) => (
        <g key={i} className={curve.anim}>
          <path 
            ref={el => pathsRef.current[i * 2] = el} 
            d={curve.d} 
            fill="none" 
            stroke={curve.grad} 
            strokeWidth={curve.w1} 
            opacity={curve.o1} 
          />
          <path 
            ref={el => pathsRef.current[i * 2 + 1] = el} 
            d={curve.d} 
            fill="none" 
            stroke={curve.grad} 
            strokeWidth={curve.w2} 
          />
        </g>
      ))}
    </svg>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout>>();
  const highlightTimeout = useRef<ReturnType<typeof setTimeout>>();

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
      className={`absolute inset-x-0 sm:-inset-x-6 -z-10 rounded-3xl pointer-events-none transition-all duration-1000 ease-out ring-1 top-24 ${
        sectionId === 'home' ? 'bottom-0' : 'bottom-12'
      } ${
        highlightedSection === sectionId 
          ? 'bg-red-500/10 dark:bg-red-500/15 shadow-[0_0_40px_rgba(239,68,68,0.2)] ring-red-500/40 opacity-100 scale-100' 
          : 'bg-red-100/0 dark:bg-red-950/0 shadow-[0_0_0px_rgba(239,68,68,0)] ring-red-100/0 dark:ring-red-900/0 opacity-0 scale-[0.99]'
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

      <Footer />

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
