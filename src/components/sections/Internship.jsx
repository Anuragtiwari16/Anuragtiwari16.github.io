import React from 'react';
import { motion } from 'framer-motion';

export default function Internship({ data }) {
  return (
    <div className="flex flex-col h-full text-left pt-2 pb-10">
      <h3 className="text-purple-400 tracking-widest text-sm mb-6 uppercase">Experience</h3>
      
      <div className="relative pl-4 border-l border-white/10 space-y-8 mt-4">
        {data.internships.map((intern, i) => (
          <motion.div 
            key={i}
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + (i * 0.2) }}
          >
            <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-blue-500 border border-gray-900 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            
            <div className="mb-1 text-xs font-mono text-blue-400">{intern.date}</div>
            <h4 className="text-lg font-medium text-white">{intern.company}</h4>
            <div className="text-sm text-gray-400 mb-4 italic">Project: {intern.project}</div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-4 bg-orange-50/ p-4 rounded-lg border border-white/10/">
              {intern.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {intern.technologies.map((tech, j) => (
                <span key={j} className="text-xs text-gray-400 border border-white/10 px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
