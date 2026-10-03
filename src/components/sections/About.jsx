import React from 'react';
import { motion } from 'framer-motion';

export default function About({ data }) {
  return (
    <div className="flex flex-col h-full text-left pt-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h3 className="text-purple-400 tracking-widest text-sm mb-6 uppercase">About Me</h3>
        
        <div className="prose prose-invert">
          <p className="text-gray-300 leading-relaxed mb-6 text-lg">
            {data.personal.aboutIntro}
          </p>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-white/10 p-5 rounded-lg bg-transparent/5 border border-white/10">
               <h4 className="text-xs tracking-widest text-gray-500 uppercase mb-2">Location</h4>
               <p className="text-white">{data.personal.location}</p>
            </div>
            <div className="border border-white/10 p-5 rounded-lg bg-transparent/5 border border-white/10">
               <h4 className="text-xs tracking-widest text-gray-500 uppercase mb-2">Degree</h4>
               <p className="text-white">{data.personal.degree}</p>
            </div>
            <div className="border border-white/10 p-5 rounded-lg bg-transparent/5 border border-white/10">
               <h4 className="text-xs tracking-widest text-gray-500 uppercase mb-2">Institution</h4>
               <p className="text-white">{data.personal.college}</p>
            </div>
            <div className="border border-white/10 p-5 rounded-lg bg-transparent/5 border border-white/10">
               <h4 className="text-xs tracking-widest text-gray-500 uppercase mb-2">CGPA</h4>
               <p className="text-white">{data.personal.cgpa}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
