import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack shopping experience with real-time cart updates and secure checkout.",
    tech: ["React", "TypeScript", "Tailwind", "Zustand"],
    colSpan: "md:col-span-2",
  },
  {
    title: "Task Manager AI",
    description: "Smart productivity app that organizes workflows.",
    tech: ["Vite", "Framer Motion", "OpenAI"],
    colSpan: "md:col-span-1",
  },
  {
    title: "Financial Dashboard",
    description: "Real-time crypto and stock tracking interface with interactive charts.",
    tech: ["React", "D3.js", "Tailwind"],
    colSpan: "md:col-span-1",
  },
  {
    title: "Social Connect",
    description: "A community platform for developers to share snippets and collaborate.",
    tech: ["Next.js", "Prisma", "Tailwind"],
    colSpan: "md:col-span-2",
  }
];

export default function Projects() {
  return (
    <div id="projects" className="w-full py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Selected Projects</h2>
        <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`group relative p-6 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between ${project.colSpan} overflow-hidden`}
          >
            {/* Subtle hover gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-zinc-50 mb-3">{project.title}</h3>
              <p className="text-zinc-400 mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium text-emerald-300 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex gap-4 mt-auto">
              <a href="#" className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-emerald-400 transition-colors">
                <Github className="h-4 w-4" /> Code
              </a>
              <a href="#" className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-emerald-400 transition-colors">
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
