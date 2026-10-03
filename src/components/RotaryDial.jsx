import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RotaryDial({ sections, activeIndex, onSelect, onRotate }) {
  const dialRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const anglePerSection = 180 / (sections.length - 1); // Spread across 180 degrees (semi-circle)

  const handleDrag = (event, info) => {
    const delta = info.delta.x; // Horizontal drag for rotation
    const newRotation = rotation + delta * 0.5;
    
    // clamp rotation between -90 and 90 (or similar depending on initial setup)
    // Actually, if we map sections to angles 0 to 180, and rotate the dial from -90 to +90 to align them to top center.
    // Let's just calculate the nearest index directly based on the drag
    
    let clampedRotation = Math.max(-180, Math.min(180, newRotation));
    setRotation(clampedRotation);
    
    // Assuming active index 0 is at 0 degrees, max index is at 180 degrees.
    // If the dial rotates by `clampedRotation`, the top center is at `-clampedRotation`.
    // Wait, if it's a semi circle, let's keep it simple: Map horizontal drag directly to activeIndex
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    // Determine which direction we dragged
    if (info.offset.x > 50) {
       const prev = Math.max(0, activeIndex - 1);
       onRotate(prev);
    } else if (info.offset.x < -50) {
       const next = Math.min(sections.length - 1, activeIndex + 1);
       onRotate(next);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const next = Math.min(sections.length - 1, activeIndex + 1);
        onRotate(next);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prev = Math.max(0, activeIndex - 1);
        onRotate(prev);
      } else if (e.key === 'Enter') {
        onSelect(activeIndex);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, onRotate, onSelect, sections.length]);

  return (
    <div className="relative w-80 h-40 flex items-end justify-center z-30 mb-8 cursor-grab active:cursor-grabbing overflow-visible">
      
      {/* Background Arch */}
      <div className="absolute w-80 h-40 overflow-hidden border-b-2 border-gray-200">
         <motion.div 
           className="absolute bottom-0 w-80 h-80 rounded-full flex items-center justify-center"
           drag="x"
           dragConstraints={{ left: 0, right: 0 }}
           onDragStart={() => setIsDragging(true)}
           onDragEnd={handleDragEnd}
           animate={{ rotate: (sections.length / 2 - 0.5 - activeIndex) * anglePerSection }}
           transition={{ type: "spring", stiffness: 100, damping: 20 }}
         >
           {/* Blocks forming the semi-circle */}
           {sections.map((_, i) => {
             const angle = -90 + (i * anglePerSection); // -90 to 90
             return (
               <div 
                 key={i} 
                 className="absolute w-[30px] h-[40px] bg-gradient-to-b from-sky-500 to-[#004e82] origin-bottom"
                 style={{ 
                   transform: `rotate(${angle}deg) translateY(-140px)`,
                   borderTopLeftRadius: '4px',
                   borderTopRightRadius: '4px',
                   boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)',
                   opacity: activeIndex === i ? 0 : 1 // Hide block if it's currently selected to show the keystone instead
                 }}
               />
             );
           })}
         </motion.div>
      </div>

      {/* Stationary Keystone Selector */}
      <div 
        className="absolute bottom-[100px] w-[45px] h-[60px] bg-gradient-to-b from-gray-500 to-gray-800 rounded-t-lg shadow-xl cursor-pointer hover:from-gray-400 hover:to-gray-700 transition-colors z-20 flex items-center justify-center transform -translate-y-10"
        onClick={() => onSelect(activeIndex)}
        style={{
           clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
           boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
        }}
      >
        <span className="text-white text-xs font-bold tracking-widest -rotate-90 origin-center translate-y-3 opacity-50">OK</span>
      </div>

      {/* Current Section Text near the dial */}
      <div className="absolute -top-12 text-center w-full">
         <span className="text-sm font-bold tracking-[0.3em] text-gray-500 uppercase">{sections[activeIndex]}</span>
      </div>
      
      {/* Click target overlay to make it easier to click ok */}
      <div 
        className="absolute bottom-[110px] w-[50px] h-[50px] z-30 cursor-pointer rounded-full"
        onClick={() => onSelect(activeIndex)}
      />
    </div>
  );
}
