import React from 'react';
import { motion } from 'framer-motion';

export default function Skills({ data }) {
  const categories = [
    { title: "Programming", items: data.skills.programming },
    { title: "Web Technologies", items: data.skills.web },
    { title: "Data Science & ML", items: data.skills.dataScience },
    { title: "Database", items: data.skills.database },
    { title: "Tools", items: data.skills.tools },
    { title: "Core Concepts", items: data.skills.coreConcepts }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.6 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col h-full text-left pt-2 pb-10">
      <h3 className="text-purple-400 tracking-widest text-sm mb-6 uppercase">Skills Constellation</h3>
      
      <motion.div 
        className="space-y-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map((cat, i) => (
          <motion.div key={i} variants={item} className="group">
            <h4 className="text-xs tracking-widest text-gray-500 uppercase mb-3 flex items-center gap-2">
              {cat.title}
              <div className="h-px bg-gray-200 flex-1"></div>
            </h4>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill, j) => (
                <span 
                  key={j} 
                  className="px-3 py-1 text-sm bg-transparent border border-white/10 text-gray-300 rounded-full hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
