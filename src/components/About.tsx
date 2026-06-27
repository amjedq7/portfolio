import { motion } from 'framer-motion';

export default function About() {
  const skills = ["React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion", "Node.js", "Git", "Figma"];

  return (
    <div id="about" className="w-full py-20 flex flex-col md:flex-row gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-1"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">About Me</h2>
        <div className="h-1 w-20 bg-blue-500 rounded-full mb-8"></div>
        <p className="text-zinc-400 text-lg leading-relaxed mb-6">
          I am a passionate frontend developer focused on creating interactive, accessible, and highly optimized web applications. I bridge the gap between design and engineering, ensuring that every pixel serves a purpose.
        </p>
        <p className="text-zinc-400 text-lg leading-relaxed">
          When I'm not writing code, I'm usually exploring new UI trends, contributing to open-source, or refining my local development environment to absolute perfection.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-1 w-full"
      >
        <div className="p-8 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10">
          <h3 className="text-xl font-bold text-zinc-50 mb-6">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span 
                key={index} 
                className="px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
