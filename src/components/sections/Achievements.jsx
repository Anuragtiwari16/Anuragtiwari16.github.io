import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export default function Achievements({ data }) {
  return (
    <div className="flex flex-col h-full text-left pt-2 pb-10">
      <h3 className="text-purple-400 tracking-widest text-sm mb-6 uppercase">Achievements</h3>
      
      <div className="space-y-6">
        {data.achievements.map((ach, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (i * 0.2) }}
            className="group relative border border-white/10 rounded-xl p-8 bg-gradient-to-br from-purple-900/20/40 to-transparent overflow-hidden hover:border-blue-900/50 transition-colors"
          >
            {/* Background subtle trophy */}
            <Trophy size={120} className="absolute -right-4 -bottom-4 text-white/[0.02] transform -rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Trophy size={20} className="text-yellow-600/80" />
                <h4 className="text-xl font-medium text-white">{ach.name}</h4>
              </div>
              
              <div className="text-sm font-mono text-gray-500 mb-4 bg-transparent inline-block px-3 py-1 rounded">
                {ach.date}
              </div>
              
              <p className="text-gray-300 leading-relaxed text-sm max-w-xl">
                {ach.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
