import React from 'react';
import { motion } from 'framer-motion';

export default function Intro({ data }) {
  return (
    <div className="flex flex-col justify-center h-full text-left">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h3 className="text-purple-400 tracking-widest text-sm mb-4 uppercase">Introduction</h3>
        <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
          Hello, I am <br />
          <span className="font-semibold">{data.personal.name}</span>
        </h1>
        <p className="text-gray-400 leading-relaxed text-lg max-w-lg mb-8">
          {data.personal.tagline}
        </p>
        
        <div className="flex items-center gap-4">
          <div className="h-px bg-gray-700 flex-1 max-w-[100px]"></div>
          <span className="text-xs tracking-widest text-gray-500 uppercase">Welcome to my portfolio</span>
        </div>
      </motion.div>
    </div>
  );
}
