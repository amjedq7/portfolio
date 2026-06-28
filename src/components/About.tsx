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
      title: t("Nástroje & Workflow", "Tools & Workflow"),
      skills: ["Git", "GitHub", "Vite", "NPM"]
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
          {t('Jsem webový vývojář, který rád vytváří krásné a funkční webové stránky pro lidi a firmy. Rád měním nápady ve skutečné, fungující digitální zážitky, které uživatelé milují.', 'I am a web developer who loves building beautiful, functional websites for people and businesses. I enjoy taking ideas and turning them into real, working digital experiences that users love.')}
        </p>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-6">
          {t('Pomocí moderních nástrojů jako React a Tailwind CSS vám mohu pomoci vytvořit webovou stránku, která vypadá skvěle a funguje hladce na všech zařízeních. Ať už potřebujete osobní portfolio, komunitní hub, nebo web pro vaši lokální firmu, jsem tu, abych vám ho pomohl oživit.', 'Using modern tools like React and Tailwind CSS, I can help you create a website that looks great and works smoothly across all devices. Whether you need a personal portfolio, a community hub, or a site for your local business, I am here to help bring it to life.')}
        </p>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
          {t('Když zrovna nepíšu kód, obvykle zkoumám nové webové trendy, učím se nové dovednosti, nebo hledám způsoby, jak dělat své projekty ještě lepší a rychlejší.', 'When I\'m not writing code, I\'m usually exploring new web trends, learning new skills, or finding ways to make my projects even better and faster.')}
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
