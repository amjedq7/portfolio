import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

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
                <GithubIcon className="h-4 w-4" /> Code
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
