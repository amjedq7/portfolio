import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export default function Contact() {
  const links = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Mail, label: "Email", href: "#" },
  ];

  return (
    <div id="contact" className="w-full py-20 flex flex-col items-center text-center max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Let's build something.</h2>
        <p className="text-zinc-400 text-lg mb-12">
          Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-zinc-300 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 group"
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
