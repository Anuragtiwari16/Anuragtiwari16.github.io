import React, { useEffect, useState } from 'react';
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

export default function BookViewer({ section, onClose, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const ContentComponent = sectionComponents[section];

  useEffect(() => {
    // Open the book shortly after mounting
    const timer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 600); // Wait for animation to finish
  };

  return (
    <motion.div 
      className="absolute inset-0 z-50 flex items-center justify-center perspective-1000 bg-white/60 backdrop-blur-sm"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <button 
        onClick={handleClose}
        className="absolute top-8 right-8 text-gray-500 hover:text-gray-900 flex items-center gap-2 group z-50"
      >
        <span className="text-sm tracking-widest uppercase group-hover:text-blue-600 transition-colors">Back to Dial</span>
        <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-blue-600 transition-colors">
          <X size={18} />
        </div>
      </button>

      {/* Book Container */}
      <div className="relative w-[90vw] max-w-[1000px] h-[80vh] max-h-[700px] transform-style-3d drop-shadow-2xl">
        
        {/* Right Page (Back cover / main content area) */}
        <div className="absolute right-0 w-1/2 h-full bg-[#fdfbf7] rounded-r-lg shadow-xl border border-gray-200 border-l-0 origin-left flex flex-col overflow-hidden shadow-[inset_15px_0_20px_rgba(0,0,0,0.05)]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 mix-blend-multiply pointer-events-none"></div>
          
          <div className="p-8 md:p-12 h-full overflow-y-auto custom-scrollbar flex-1 opacity-0 transition-opacity duration-700 delay-300 z-10" style={{ opacity: isOpen ? 1 : 0 }}>
            {ContentComponent && <ContentComponent data={data} />}
          </div>
          
          <div className="absolute bottom-4 right-8 text-gray-400 text-xs font-mono z-10">
            Pg. {(Object.keys(sectionComponents).indexOf(section) * 2) + 2}
          </div>
        </div>

        {/* Left Page (Cover that opens) */}
        <motion.div 
          className="absolute left-0 w-1/2 h-full origin-right transform-style-3d z-20"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? -180 : 0 }}
          transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
        >
          {/* Front of cover */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-[#f0efe9] rounded-l-lg border border-gray-300 border-r-0 shadow-lg flex items-center justify-center backface-hidden z-20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 mix-blend-multiply pointer-events-none"></div>
            <div className="text-center z-10">
               <h2 className="text-4xl font-bold tracking-[0.3em] text-gray-800 uppercase">{section}</h2>
               <div className="w-12 h-px bg-blue-500/50 mx-auto mt-6"></div>
            </div>
          </div>
          
          {/* Back of cover (Inside Left Page) */}
          <div className="absolute inset-0 bg-[#faf9f5] rounded-r-lg border border-gray-200 border-l-0 shadow-[inset_-15px_0_20px_rgba(0,0,0,0.05)] rotate-y-180 backface-hidden flex flex-col justify-center items-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 mix-blend-multiply pointer-events-none"></div>
            
            <span className="text-6xl font-serif text-gray-200 absolute top-12 left-12 z-10">
               {(Object.keys(sectionComponents).indexOf(section) + 1).toString().padStart(2, '0')}
            </span>
            
            <h2 className="text-4xl font-bold tracking-widest text-gray-800 mb-4 z-10 uppercase">{section}</h2>
            <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center z-10">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            
            <div className="mt-8 text-gray-600 max-w-[70%] text-center text-sm z-10 leading-relaxed font-serif italic">
              {section === 'INTRO' && "A quick introduction to who I am and what drives my passion for technology."}
              {section === 'ABOUT' && "Discover my background, education, and the core values that shape my professional journey."}
              {section === 'SKILLS' && "An overview of my technical expertise, from programming languages to modern web frameworks."}
              {section === 'PROJECTS' && "Explore the real-world applications and digital experiences I have built."}
              {section === 'INTERNSHIP' && "A look into my professional experience and the impactful projects I've contributed to."}
              {section === 'EDUCATION' && "My academic background and the foundation of my technical knowledge."}
              {section === 'CERTIFICATES' && "Professional certifications and continuous learning achievements."}
              {section === 'ACHIEVEMENTS' && "Hackathons, awards, and milestones that mark my dedication to solving problems."}
              {section === 'CONTACT' && "Get in touch for collaborations, opportunities, or just to say hello."}
            </div>
            
            <div className="absolute bottom-4 left-8 text-gray-400 text-xs font-mono z-10">
              Pg. {(Object.keys(sectionComponents).indexOf(section) * 2) + 1}
            </div>
          </div>
        </motion.div>
        
        {/* Book spine lighting */}
        <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none z-30"></div>

      </div>
    </motion.div>
  );
}
