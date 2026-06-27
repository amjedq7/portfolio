import { motion } from 'framer-motion';

const projects = [
  {
    title: "Muslimská obec v Teplicích",
    description: "A modern, highly responsive community platform built to provide essential information and a seamless user experience.",
    tech: ["React", "TypeScript", "Tailwind", "Vite"],
    live: "https://muslimska-obec-v-teplicich.cz/", 
    image: import.meta.env.BASE_URL + "project-1.png", 
    colSpan: "md:col-span-2",
  },
  {
    title: "Urologie Jahaf",
    description: "A professional medical practice website designed for accessibility, fast load times, and clear patient communication.",
    tech: ["React", "TypeScript", "Tailwind", "Vite"],
    live: "https://amjedq7.github.io/web-jahaf/#/", 
    image: import.meta.env.BASE_URL + "project-2.png", 
    colSpan: "md:col-span-1",
  }
];

export default function Projects() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">My projects</h2>
        <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={`group block relative rounded-3xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer ${project.colSpan}`}
          >
            <div className="w-full h-48 sm:h-56 bg-zinc-800 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800';
                }}
              />
            </div>

            <div className="p-6 flex flex-col flex-grow relative z-20">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <h3 className="text-2xl font-bold text-zinc-50 mb-3">{project.title}</h3>
              <p className="text-zinc-400 mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium text-emerald-300 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
