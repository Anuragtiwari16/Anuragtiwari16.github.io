import React from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink } from 'lucide-react';

export default function Projects({ data }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="flex flex-col h-full text-left pt-2 pb-10">
      <h3 className="text-purple-400 tracking-widest text-sm mb-6 uppercase">Featured Projects</h3>
      
      <motion.div 
        className="space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {data.projects.map((project, i) => (
          <motion.div 
            key={i} 
            variants={item}
            className="group relative border border-white/10 rounded-xl p-6 bg-gradient-to-b from-purple-900/20/50 to-transparent hover:border-gray-600 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-medium text-white group-hover:text-blue-400 transition-colors">{project.name}</h4>
                <span className="text-xs text-gray-500 font-mono mt-1 block">{project.date} • {project.status}</span>
              </div>
              <div className="flex gap-2">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                    <Code size={18} />
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.technologies.map((tech, j) => (
                <span key={j} className="text-xs text-purple-400/70 bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
