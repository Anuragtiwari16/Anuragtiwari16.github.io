import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function Certificates({ data }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="flex flex-col h-full text-left pt-2 pb-10">
      <h3 className="text-purple-400 tracking-widest text-sm mb-6 uppercase">Certificates</h3>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {data.certificates.map((cert, i) => (
          <motion.div 
            key={i} 
            variants={item}
            className="border border-white/10 rounded-lg p-5 flex items-start gap-4 hover:border-gray-600 transition-colors bg-transparent/5 border border-white/10"
          >
            <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 border border-blue-900/50">
              <Award size={18} className="text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-1 leading-tight">{cert.name}</h4>
              <div className="text-xs text-gray-500">{cert.issuer}</div>
              {cert.date && <div className="text-xs text-gray-400 font-mono mt-2">{cert.date}</div>}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
