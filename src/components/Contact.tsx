import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Contact() {
  const { t } = useSettings();

  const links = [
    { icon: GithubIcon, label: "GitHub", href: "https://github.com/amjedq7" },
    { icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/amjed-quwarah/" },
    { icon: Mail, label: "Email", href: "mailto:amjedq7.spam@gmail.com" },
  ];

  return (
    <div className="w-full flex flex-col items-center text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-6">
          {t('Něco na srdci?', "Something on your mind?")}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-12">
          {t('Chcete vědět více o mně, nebo máte nějaký dotaz či přání? Najdete mě na GitHubu nebo LinkedIn, anebo se se mnou můžete spojit přes e-mail.', "Want to know more about me, or do you have a question or request? Find me on GitHub or LinkedIn, or you can connect with me via email.")}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 group shadow-md dark:shadow-none"
              >
                <Icon className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
                <span className="font-medium">{link.label}</span>
              </a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
