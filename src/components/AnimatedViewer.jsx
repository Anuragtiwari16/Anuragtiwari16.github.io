import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Internship from './sections/Internship';
import Education from './sections/Education';
import Certificates from './sections/Certificates';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Intro from './sections/Intro';

const sectionComponents = {
  INTRO: Intro,
  ABOUT: About,
  SKILLS: Skills,
  PROJECTS: Projects,
  INTERNSHIP: Internship,
  EDUCATION: Education,
  CERTIFICATES: Certificates,
  ACHIEVEMENTS: Achievements,
  CONTACT: Contact
};

export default function AnimatedViewer({ section, onClose, data }) {
  const ContentComponent = sectionComponents[section];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div 
      className="absolute inset-0 z-50 flex items-center justify-center p-8 md:p-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Overlay */}
      <motion.div 
        className="absolute inset-0 bg-[#07050f]/60 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div 
        className="relative w-full max-w-6xl h-full max-h-[85vh] bg-[#110c1f]/80 backdrop-blur-2xl rounded-3xl border border-purple-500/20 shadow-[0_0_100px_rgba(124,58,237,0.15)] flex overflow-hidden z-10"
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        {/* Left Side: Large Title & Summary */}
        <div className="hidden md:flex w-2/5 bg-gradient-to-br from-purple-900/20 to-transparent border-r border-purple-500/10 p-12 flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent pointer-events-none"></div>
           
           <div className="relative z-10">
              <motion.span 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="text-purple-400 tracking-[0.3em] text-sm font-bold mb-4 block"
              >
                0{(Object.keys(sectionComponents).indexOf(section) + 1)}
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tighter uppercase leading-none"
              >
                {section}
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="w-16 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full mb-8"
              />
              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="text-gray-400 text-lg leading-relaxed font-light"
              >
                {section === 'INTRO' && "A quick introduction to who I am and what drives my passion for technology."}
                {section === 'ABOUT' && "Discover my background, education, and the core values that shape my professional journey."}
                {section === 'SKILLS' && "An overview of my technical expertise, from programming languages to modern web frameworks."}
                {section === 'PROJECTS' && "Explore the real-world applications and digital experiences I have built."}
                {section === 'INTERNSHIP' && "A look into my professional experience and the impactful projects I've contributed to."}
                {section === 'EDUCATION' && "My academic background and the foundation of my technical knowledge."}
                {section === 'CERTIFICATES' && "Professional certifications and continuous learning achievements."}
                {section === 'ACHIEVEMENTS' && "Hackathons, awards, and milestones that mark my dedication to solving problems."}
                {section === 'CONTACT' && "Get in touch for collaborations, opportunities, or just to say hello."}
              </motion.p>
           </div>
           
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
             className="relative z-10 text-gray-600 text-xs tracking-widest font-mono"
           >
             ANURAG TIWARI PORTFOLIO
           </motion.div>
        </div>

        {/* Right Side: Main Content */}
        <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-white flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-50 group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            className="pt-12 md:pt-4 h-full text-white"
          >
            {ContentComponent && <ContentComponent data={data} />}
          </motion.div>
        </div>

      </motion.div>
    </motion.div>
  );
}
