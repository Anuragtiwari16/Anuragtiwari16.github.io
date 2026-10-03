import React from 'react';
import { motion } from 'framer-motion';

export default function Education({ data }) {
  return (
    <div className="flex flex-col h-full text-left pt-2 pb-10">
      <h3 className="text-purple-400 tracking-widest text-sm mb-6 uppercase">Education</h3>
      
      <div className="relative pl-4 border-l border-white/10 space-y-10 mt-4">
        {data.education.map((edu, i) => (
          <motion.div 
            key={i}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (i * 0.15) }}
          >
            <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors border border-gray-900"></div>
            
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
              <h4 className="text-lg font-medium text-white group-hover:text-purple-300 transition-colors">{edu.degree}</h4>
              <span className="text-xs font-mono text-gray-500 mt-1 md:mt-0">{edu.date}</span>
            </div>
            <div className="text-sm text-gray-400 mb-2">{edu.institution}</div>
            
            <div className="inline-block px-3 py-1 bg-orange-50/ border border-white/10 rounded text-sm text-gray-300 font-mono">
              Score: <span className="text-white">{edu.score}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
