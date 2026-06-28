import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

export default function About() {
  const { t } = useSettings();

  const skillCategories = [
    {
      title: t("Vývoj Frontendu", "Frontend Development"),
      skills: ["React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"]
    },
    {
      title: t("Nástroje a systémy", "Tools & Systems"),
      skills: ["Git", "GitHub", "Vite", "Linux (Fedora)", "Windows"]
    },
    {
      title: t("Další technologie", "Other Technologies"),
      skills: ["C", "Python", "Bash"]
    },
    {
      title: t("Jazykové znalosti", "Spoken Languages"),
      skills: [
        t("Čeština", "Czech"), 
        t("Angličtina", "English"), 
        t("Arabština", "Arabic")
      ]
    }
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-12 items-start">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-1"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-4">{t('O mně', 'About Me')}</h2>
        <div className="h-1 w-20 bg-blue-500 rounded-full mb-8"></div>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-6">
          {t('Jsem studentem vysoké školy. Mým koníčkem je vytvářet stránky, které potěší lidi. Spokojenost zákazníka je moje spokojenost.', 'I am a university student. My hobby is creating websites that make people happy. Customer satisfaction is my satisfaction.')}
        </p>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
          {t('Jsem společenský člověk, který si rád pokecá o čemkoliv, rád hraje deskové hry nebo sportuje s kamarády (např. fotbal, jízda na kole...).', 'I am a sociable person who loves to chat about anything, play board games, or do sports with friends like football, cycling, ...')}
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex-1 w-full flex flex-col gap-6"
      >
        {skillCategories.map((category, idx) => (
          <div key={idx} className="p-6 rounded-3xl backdrop-blur-md bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-red-500/30 dark:hover:border-white/20 transition-colors shadow-lg dark:shadow-none">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700/50 hover:border-red-500/50 dark:hover:border-blue-500/50 hover:text-red-600 dark:hover:text-blue-400 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
