import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="flex flex-col items-start justify-center w-full py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-4">
          Frontend Developer & UI/UX Designer
        </h2>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Building modern <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            web experiences.
          </span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          I craft stunning, lightning-fast, and highly responsive digital interfaces using React, TypeScript, and Tailwind CSS.
        </p>
        
        <button 
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          className="group flex items-center gap-2 px-6 py-3 bg-emerald-500 text-zinc-950 font-bold rounded-full hover:bg-emerald-400 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
        >
          View My Work
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  );
}
