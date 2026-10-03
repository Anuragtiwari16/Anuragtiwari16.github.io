import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Copy, Check, Users, Code } from 'lucide-react';

export default function Contact({ data }) {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="flex flex-col h-full text-left pt-2 pb-10">
      <h3 className="text-purple-400 tracking-widest text-sm mb-6 uppercase">Contact</h3>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 gap-8"
      >
        <div className="space-y-6">
          <div className="border border-white/10 p-6 rounded-lg bg-orange-50/">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-blue-400 shrink-0">
                      <Mail size={18} />
                   </div>
                   <div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Email</div>
                      <div className="text-white text-sm md:text-base">{data.personal.email}</div>
                   </div>
                </div>
                <button 
                  onClick={() => handleCopy(data.personal.email, 'email')}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                >
                  {copiedField === 'email' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
             </div>
          </div>
          
          <div className="border border-white/10 p-6 rounded-lg bg-orange-50/">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-blue-400 shrink-0">
                      <Phone size={18} />
                   </div>
                   <div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Phone</div>
                      <div className="text-white text-sm md:text-base">{data.personal.phone}</div>
                   </div>
                </div>
                <button 
                  onClick={() => handleCopy(data.personal.phone, 'phone')}
                  className="p-2 text-gray-500 hover:text-white transition-colors"
                >
                  {copiedField === 'phone' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
             </div>
          </div>
          
          <div className="border border-white/10 p-6 rounded-lg bg-orange-50/">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-blue-400 shrink-0">
                   <MapPin size={18} />
                </div>
                <div>
                   <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Location</div>
                   <div className="text-white text-sm md:text-base">{data.personal.location}</div>
                </div>
             </div>
          </div>

          <div className="flex gap-4 pt-4">
             <div className="flex-1 border border-white/10 p-4 rounded-lg bg-orange-50/ flex items-center justify-center gap-3 text-gray-400 opacity-50 cursor-not-allowed">
                <Users size={18} />
                <span className="text-sm">LinkedIn</span>
             </div>
             <div className="flex-1 border border-white/10 p-4 rounded-lg bg-orange-50/ flex items-center justify-center gap-3 text-gray-400 opacity-50 cursor-not-allowed">
                <Code size={18} />
                <span className="text-sm">GitHub</span>
             </div>
          </div>
        </div>
        
      </motion.div>
    </div>
  );
}
