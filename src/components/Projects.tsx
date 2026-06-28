import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

export default function Projects() {
  const { t } = useSettings();

  const projects = [
    {
      title: t("MUSLIMSKÁ OBEC V TEPLICÍCH", "ISLAMIC FOUNDATION TEPLICE"),
      description: t("Moderní komunitní platforma, která poskytuje informace o náboženství, časy modliteb, kontakty komunity, ...", "A modern community platform that provides information about religion, prayer times, community contacts, ..."),
      tech: ["React", "TypeScript", "Tailwind", "Vite"],
      live: "https://muslimska-obec-v-teplicich.cz/", 
      image: import.meta.env.BASE_URL + "project-1.png", 
      colSpan: "md:col-span-2",
    },
    {
      title: "Urologie Jahaf",
      description: t("Urologická ordinace nabízející vyšetření močových cest, prostaty a onkologickou prevenci v moderně vybavené ordinaci.", "Urology clinic offering examinations of the urinary tract, prostate, and oncological prevention in a modernly equipped clinic."),
      tech: ["React", "TypeScript", "Tailwind", "Vite"],
      live: "https://amjedq7.github.io/web-jahaf/#/", 
      image: import.meta.env.BASE_URL + "project-2.png", 
      colSpan: "md:col-span-1",
    }
  ];

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-4">{t('Moje projekty', 'My projects')}</h2>
        <div className="h-1 w-20 bg-red-500 rounded-full"></div>
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
            className={`group block relative rounded-3xl backdrop-blur-md bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-red-500/30 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer shadow-lg dark:shadow-none ${project.colSpan}`}
          >
            <div className="w-full h-48 sm:h-56 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
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
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">{project.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-medium text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-500/10 rounded-full border border-red-200 dark:border-red-500/20">
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
