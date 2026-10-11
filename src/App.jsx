import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Code, Users, Mail, ExternalLink, Code2, Terminal, Database, Cloud, BookOpen, Briefcase, Award, ChevronRight, Sparkles, MapPin, X, ArrowRight, ShieldCheck, Activity, UserCheck } from 'lucide-react';
import { portfolioData } from './data/portfolioData';
import BankDashboard from './components/BankDashboard';

const MagneticButton = ({ children, className, href }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

// 2. 3D Tilt Card
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`perspective-1000 ${className}`}
    >
      <div style={{ transform: "translateZ(40px)" }} className="h-full">
        {children}
      </div>
    </motion.div>
  );
};

// 3. Staggered Text Reveal
const StaggeredText = ({ text, className }) => {
  const words = text.split(" ");
  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-4">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [hasMoved, setHasMoved] = useState(false);
  
  // Timeline scroll hook
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setHasMoved(true);
    };
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        setHasMoved(true);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
    };
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-gray-300 font-['Inter'] selection:bg-fuchsia-500/30 relative">
      
      {/* FILM GRAIN NOISE */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]"></div>

      {/* REACTIVE SPOTLIGHT */}
      <div 
        className={`fixed inset-0 z-30 pointer-events-none transition-opacity duration-300 ${hasMoved ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 35%, transparent 75%)`
        }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold text-white font-['Outfit'] tracking-tighter flex items-center">
            <span className="text-fuchsia-500 mr-1">/</span>AT
          </a>
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-widest uppercase text-white">
            <a href="#about" className="hover:text-fuchsia-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-fuchsia-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-fuchsia-500 transition-colors">Projects</a>
            <MagneticButton href="#contact" className="px-6 py-2 rounded-full border border-[#ffffff33] hover:border-fuchsia-500 transition-colors">
              Contact
            </MagneticButton>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center flex flex-col items-center">
          
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="w-24 h-24 rounded-full border border-[#ffffff1a] p-2 mb-10 overflow-hidden relative shadow-[0_0_50px_rgba(217,70,239,0.2)]">
             <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600 to-blue-600 animate-spin" style={{ animationDuration: '4s' }}></div>
             <div className="absolute inset-1 bg-[#050505] rounded-full flex items-center justify-center z-10">
                <span className="font-bold text-xl text-white">AT</span>
             </div>
          </motion.div>
          
          <StaggeredText text={`Hi, I am ${portfolioData.personal.name.split(' ')[0]}.`} className="text-5xl md:text-[5rem] lg:text-[7rem] font-extrabold text-white font-['Outfit'] mb-2 tracking-tighter leading-none" />
          
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 font-['Outfit'] mb-12 tracking-tight">
            Engineering Machine Intelligence & Predictive Data Analytics.
          </motion.h2>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <MagneticButton href="#projects" className="group relative px-10 py-5 bg-white text-black rounded-full font-bold text-lg overflow-hidden transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              Explore Work
            </MagneticButton>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="flex items-center gap-6">
             <MagneticButton href={portfolioData.personal.github} className="w-14 h-14 rounded-full border border-[#ffffff33] flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors" target="_blank">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
             </MagneticButton>
             <MagneticButton href={portfolioData.personal.linkedin} className="w-14 h-14 rounded-full border border-[#ffffff33] flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors" target="_blank">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
             </MagneticButton>
          </motion.div>

        </div>
      </section>

      <main className="relative z-10 space-y-40 pb-40">
        
        {/* ABOUT (MEGA SECTION) */}
        <section id="about" className="max-w-7xl mx-auto px-6 pt-20 space-y-12">
          
          {/* Row 1: Who Am I & Building With */}
          <div className="grid md:grid-cols-3 gap-6">
            
            <TiltCard className="md:col-span-2 relative rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-[#ffffff1a] p-8 md:p-12 overflow-hidden group">
              <div className="absolute inset-0 bg-fuchsia-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px]"></div>
              <h3 className="text-3xl font-bold text-white mb-6 font-['Outfit'] flex items-center gap-3">
                <Sparkles className="text-fuchsia-500" /> Who Am I?
              </h3>
              <div className="space-y-4">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Hi, I'm Anurag Tiwari, a B.Tech Computer Science & Engineering (Data Science) student at ABES Engineering College, focused on building practical solutions with Artificial Intelligence, Machine Learning, Data Analytics and Full-Stack Development.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  I enjoy taking an idea from problem definition and data preparation to model development, backend APIs and interactive user interfaces. My projects have helped me explore AI-powered applications, banking analytics, credit-risk assessment, explainable AI, NLP and modern web development.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  I'm currently focused on improving my technical depth, building real-world projects and preparing myself for industry opportunities in AI/ML, Data Science and software development.
                </p>
              </div>
            </TiltCard>

            <TiltCard className="md:col-span-1 relative rounded-[2rem] bg-gradient-to-br from-blue-600/10 to-fuchsia-600/10 border border-[#ffffff1a] p-8 md:p-12 flex flex-col justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[60px]"></div>
              <h3 className="text-xl font-bold text-white mb-8 font-['Outfit'] uppercase tracking-widest text-center relative z-10">Building With</h3>
              <div className="flex flex-col gap-4 w-full relative z-10">
                {['AI / ML', 'Data Science', 'Data Analytics', 'Full-Stack Development'].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full bg-[#111] border border-[#ffffff1a] rounded-xl p-4 text-center text-gray-300 font-medium hover:bg-[#ffffff0d] hover:border-fuchsia-500/30 transition-colors"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </TiltCard>

          </div>

          {/* Row 2: What I Build */}
          <div className="pt-10">
            <h3 className="text-4xl font-extrabold text-white mb-10 font-['Outfit'] text-center">What I Build</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: '01', title: 'AI & Machine Learning', desc: 'Building intelligent systems using Python, Scikit-learn, XGBoost, PyTorch and modern AI techniques.' },
                { num: '02', title: 'Data & Analytics', desc: 'Turning raw data into meaningful insights through EDA, visualization, KPI analysis and interactive dashboards.' },
                { num: '03', title: 'Full-Stack Applications', desc: 'Building complete applications using React, FastAPI, Python, Streamlit and modern web technologies.' },
                { num: '04', title: 'Explainable AI', desc: 'Exploring transparent ML systems using SHAP, LIME and feature-level explanations.' }
              ].map((card, i) => (
                <div key={i} className="bg-[#ffffff0d] border border-[#ffffff1a] rounded-2xl p-6 hover:bg-[#ffffff1a] transition-all duration-300 group">
                  <div className="text-fuchsia-500 font-mono text-sm mb-4">{card.num}</div>
                  <h4 className="text-xl font-bold text-white mb-3">{card.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: My Approach & Current Focus */}
          <div className="grid lg:grid-cols-2 gap-6 pt-10">
            
            {/* Approach */}
            <div className="bg-[#0a0a0a] border border-[#ffffff1a] rounded-[2rem] p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-8 font-['Outfit']">My Approach</h3>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-8 text-sm md:text-base font-semibold tracking-wider text-fuchsia-400 uppercase">
                <span>Learn</span> <ArrowRight size={16} className="text-gray-600" />
                <span>Build</span> <ArrowRight size={16} className="text-gray-600" />
                <span>Experiment</span> <ArrowRight size={16} className="text-gray-600" />
                <span>Improve</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                I learn best by building. Every project is an opportunity to understand a technology, solve a practical problem and improve the way I design and develop software.
              </p>
            </div>

            {/* Current Focus */}
            <div className="bg-[#0a0a0a] border border-[#ffffff1a] rounded-[2rem] p-8 md:p-12">
              <h3 className="text-2xl font-bold text-white mb-8 font-['Outfit']">Currently Focused On</h3>
              <div className="flex flex-wrap gap-3">
                {['AI / ML', 'Data Science', 'Data Analytics', 'NLP', 'Generative AI', 'Full-Stack Development', 'Explainable AI'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-200 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Row 4: Beyond Code & What's Next */}
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            
            <div className="bg-gradient-to-br from-white/5 to-transparent border border-[#ffffff1a] rounded-[2rem] p-8 md:p-10">
              <h3 className="text-xl font-bold text-white mb-4 font-['Outfit']">Beyond Code</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                When I'm away from the keyboard, I enjoy cricket, exploring new technology and discovering new ideas through technical content and web series.
              </p>
            </div>

            <div className="bg-gradient-to-bl from-white/5 to-transparent border border-[#ffffff1a] rounded-[2rem] p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 font-['Outfit']">What's Next?</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-6">
                  My current goal is to gain hands-on industry experience through internships and real-world projects while continuing to grow as an AI/ML and Data Science developer.
                </p>
              </div>
              <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full self-start mt-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-emerald-400 text-xs font-semibold tracking-wide uppercase">Open to Internship Opportunities</span>
              </div>
            </div>

          </div>

        </section>

        {/* SKILLS (MAGNETIC HOVER GRID) */}
        <section id="skills" className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-16 font-['Outfit'] tracking-tighter text-center">Toolkit.</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[...portfolioData.skills.programming, ...portfolioData.skills.web, ...portfolioData.skills.dataScience, ...portfolioData.skills.database].map((s, i) => (
              <motion.div 
                key={s}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
                className="px-6 py-3 rounded-full border border-[#ffffff33] bg-[#ffffff0d] text-gray-300 font-medium cursor-crosshair transition-colors duration-300"
              >
                {s}
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTS (3D PARALLAX CARDS) */}
        <section id="projects" className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-16 font-['Outfit'] tracking-tighter text-center">Selected Work.</h2>
          <div className="grid lg:grid-cols-2 gap-10">
            {portfolioData.projects.map((proj, idx) => (
              <div key={idx} onClick={() => proj.isCaseStudy ? setSelectedProject(proj) : null} className={proj.isCaseStudy ? "cursor-pointer" : ""}>
                <TiltCard className="relative group h-full">
                  <div className="bg-[#0a0a0a] border border-[#ffffff1a] rounded-[2rem] p-10 h-full flex flex-col relative overflow-hidden transition-colors group-hover:border-fuchsia-500/50">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-fuchsia-600/20 blur-[100px] group-hover:bg-fuchsia-600/40 transition-colors duration-700"></div>
                    
                    <div className="flex justify-between items-center mb-6 relative z-10">
                      <Cloud className="text-white/50 group-hover:text-fuchsia-400 transition-colors" size={40} />
                      {proj.isCaseStudy ? (
                         <div className="flex items-center gap-2 text-fuchsia-400 font-semibold text-sm tracking-wider uppercase bg-fuchsia-500/10 px-4 py-2 rounded-full border border-fuchsia-500/20">
                           View Case Study <ArrowRight size={16} />
                         </div>
                      ) : (
                        <ExternalLink className="text-white/30 group-hover:text-white transition-colors cursor-pointer" size={24} />
                      )}
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-4 font-['Outfit'] relative z-10">{proj.name}</h3>
                    <p className="text-gray-400 leading-relaxed mb-8 flex-grow relative z-10">
                      {proj.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 relative z-10">
                      {proj.technologies.map(tech => (
                        <span key={tech} className="text-xs font-mono text-fuchsia-300 bg-fuchsia-500/10 px-3 py-1.5 rounded-full border border-fuchsia-500/20">{tech}</span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE (SCROLL DRIVEN PATH) */}
        <section id="experience" className="max-w-4xl mx-auto px-6 relative" ref={timelineRef}>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-24 font-['Outfit'] tracking-tighter text-center">The Journey.</h2>
          
          <div className="relative pl-10 md:pl-0">
            {/* The Track */}
            <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#ffffff1a] -translate-x-1/2"></div>
            
            {/* The Animated Laser Trace */}
            <motion.div 
              style={{ scaleY: timelineProgress, originY: 0 }}
              className="origin-top absolute left-10 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-emerald-500 via-blue-500 via-purple-500 to-fuchsia-500 -translate-x-1/2 shadow-[0_0_15px_rgba(217,70,239,0.8)]"
            ></motion.div>
            
            <div className="space-y-32 relative z-10">
              
              {/* 1. Class 10th in 2021 with 87.33% */}
              <div className="relative flex flex-col md:flex-row items-center justify-between w-full">
                <div className="hidden md:block w-5/12 text-right pr-16">
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">Shiv Nayak Singh SVM IC, Gauriganj</h3>
                  <div className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
                    2021 (UP Board)
                  </div>
                </div>
                <div className="w-5 h-5 bg-[#050505] border-2 border-emerald-500 rounded-full absolute left-10 md:left-1/2 -translate-x-1/2 top-1.5 md:top-1/2 md:-translate-y-1/2 z-20 shadow-[0_0_12px_rgba(16,185,129,1)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
                <div className="w-full md:w-5/12 pl-12 md:pl-16">
                  <div className="md:hidden mb-2">
                    <h3 className="text-2xl font-bold text-white font-['Outfit']">Shiv Nayak Singh SVM IC, Gauriganj</h3>
                    <div className="inline-block mt-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold">
                      2021 (UP Board)
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">Class 10th (Secondary Education)</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Distinction in Mathematics and Science, building a strong logical foundation.
                  </p>
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#111] border border-gray-800 text-xs font-mono text-gray-300">
                    Distinction: <span className="text-emerald-400 font-bold">87.33%</span>
                  </div>
                </div>
              </div>

              {/* 2. Class 12th in 2023 with 74.2% */}
              <div className="relative flex flex-col md:flex-row-reverse items-center justify-between w-full">
                <div className="hidden md:block w-5/12 text-left pl-16">
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">Shri Rananjay Inter College, Gauriganj</h3>
                  <div className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-semibold">
                    2023 (UP Board)
                  </div>
                </div>
                <div className="w-5 h-5 bg-[#050505] border-2 border-blue-500 rounded-full absolute left-10 md:left-1/2 -translate-x-1/2 top-1.5 md:top-1/2 md:-translate-y-1/2 z-20 shadow-[0_0_12px_rgba(59,130,246,1)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <div className="w-full md:w-5/12 pl-12 md:pr-16 md:pl-0 md:text-right">
                  <div className="md:hidden mb-2">
                    <h3 className="text-2xl font-bold text-white font-['Outfit']">Shri Rananjay Inter College, Gauriganj</h3>
                    <div className="inline-block mt-1 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-semibold">
                      2023 (UP Board)
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">Class 12th (Senior Secondary)</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Senior Secondary in Science & Mathematics, establishing core problem-solving.
                  </p>
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#111] border border-gray-800 text-xs font-mono text-gray-300">
                    Science & Math: <span className="text-blue-400 font-bold">74.2%</span>
                  </div>
                </div>
              </div>

              {/* 3. ABES Engineering College */}
              <div className="relative flex flex-col md:flex-row items-center justify-between w-full">
                <div className="hidden md:block w-5/12 text-right pr-16">
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">ABES Engineering College, AKTU</h3>
                  <div className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-semibold">
                    September 2024 - August 2028
                  </div>
                </div>
                <div className="w-5 h-5 bg-[#050505] border-2 border-purple-500 rounded-full absolute left-10 md:left-1/2 -translate-x-1/2 top-1.5 md:top-1/2 md:-translate-y-1/2 z-20 shadow-[0_0_12px_rgba(168,85,247,1)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
                <div className="w-full md:w-5/12 pl-12 md:pl-16">
                  <div className="md:hidden mb-2">
                    <h3 className="text-2xl font-bold text-white font-['Outfit']">ABES Engineering College, AKTU</h3>
                    <div className="inline-block mt-1 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-semibold">
                      September 2024 - August 2028
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">B.Tech in CSE (Data Science)</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    Specialization in Data Science, Machine Learning algorithms, and software engineering.
                  </p>
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#111] border border-gray-800 text-xs font-mono text-gray-300">
                    Academic CGPA: <span className="text-purple-400 font-bold">7.33</span>
                  </div>
                </div>
              </div>

              {/* 4. IBM-NASSCOM Virtual Internship */}
              <div className="relative flex flex-col md:flex-row-reverse items-center justify-between w-full">
                <div className="hidden md:block w-5/12 text-left pl-16">
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">IBM-NASSCOM Virtual Internship (PBEL 3.0)</h3>
                  <div className="inline-block mt-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 font-mono text-xs font-semibold">
                    June 2026 - July 2026
                  </div>
                </div>
                <div className="w-5 h-5 bg-[#050505] border-2 border-fuchsia-500 rounded-full absolute left-10 md:left-1/2 -translate-x-1/2 top-1.5 md:top-1/2 md:-translate-y-1/2 z-20 shadow-[0_0_12px_rgba(217,70,239,1)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-pulse"></div>
                </div>
                <div className="w-full md:w-5/12 pl-12 md:pr-16 md:pl-0 md:text-right">
                  <div className="md:hidden mb-2">
                    <h3 className="text-2xl font-bold text-white font-['Outfit']">IBM-NASSCOM Virtual Internship (PBEL 3.0)</h3>
                    <div className="inline-block mt-1 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 font-mono text-xs font-semibold">
                      June 2026 - July 2026
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">Project: Spam Detection System & EDA</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    ML text classification with prediction confidence scores. NASSCOM Certified in Exploratory Data Analysis.
                  </p>
                  <div className="inline-block px-3 py-1 rounded-lg bg-[#111] border border-gray-800 text-xs font-mono text-gray-300">
                    Certification: <span className="text-fuchsia-400 font-bold">NASSCOM EDA</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CONTACT (MAGNETIC FOOTER) */}
        <section id="contact" className="max-w-5xl mx-auto px-6 text-center pt-20">
          <div className="relative py-32 rounded-[3rem] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-fuchsia-900/20 group-hover:to-fuchsia-900/40 transition-colors duration-700"></div>
            
            <h2 className="text-5xl md:text-[6rem] font-extrabold text-white font-['Outfit'] mb-12 tracking-tighter relative z-10 leading-none">
              Let's create <br/> something epic.
            </h2>
            
            <MagneticButton href={`mailto:${portfolioData.personal.email}`} className="relative z-10 inline-flex items-center justify-center w-40 h-40 bg-white text-black rounded-full font-bold text-xl hover:scale-95 transition-transform shadow-[0_0_60px_rgba(255,255,255,0.3)] mx-auto mb-16">
              Email Me
            </MagneticButton>

            <div className="relative z-10 flex items-center justify-center gap-8 border-t border-[#ffffff1a] pt-8 mt-12 w-3/4 mx-auto">
              <a href={portfolioData.personal.github} target="_blank" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                GitHub
              </a>
              <a href={portfolioData.personal.linkedin} target="_blank" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* CASE STUDY MODAL OVERLAY */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl overflow-y-auto"
          >
            <div className="min-h-screen p-4 md:p-8 lg:p-12 pb-32">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="fixed top-8 right-8 z-[110] w-12 h-12 bg-[#ffffff1a] hover:bg-[#ffffff33] border border-[#ffffff33] rounded-full flex items-center justify-center text-white transition-all backdrop-blur-md"
              >
                <X size={24} />
              </button>

              <div className="max-w-6xl mx-auto pt-16">
                
                {/* 1. Project Hero */}
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-center mb-24">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-blue-500 font-['Outfit'] mb-6 tracking-tighter">
                    {selectedProject.name}
                  </h1>
                  <p className="text-2xl text-gray-300 font-light mb-12 max-w-3xl mx-auto">{selectedProject.caseStudy.tagline}</p>
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    {selectedProject.caseStudy.badges.map(badge => (
                      <span key={badge} className="px-5 py-2.5 rounded-full bg-[#ffffff0d] border border-[#ffffff1a] text-white text-sm font-semibold tracking-wide uppercase">
                        {badge}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* 2. Interactive Project Preview */}
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="mb-32 relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-600/20 to-blue-600/20 blur-[100px] rounded-[3rem]"></div>
                  <div className="relative bg-[#050505] border border-[#ffffff1a] rounded-[2rem] overflow-hidden shadow-2xl p-6 md:p-12 flex flex-col items-center">
                    
                    {/* Mock Dashboard Layout */}
                    <div className="w-full border border-gray-800 rounded-xl overflow-hidden bg-[#0a0a0a]">
                       
                       {selectedProject.id === 'sahayak' && (
                         <>
                           {/* SAHAYAK Mock */}
                           <div className="h-14 border-b border-gray-800 flex items-center px-6 justify-between bg-black">
                              <div className="flex items-center gap-2 text-white font-bold tracking-widest"><ShieldCheck className="text-blue-500"/> SAHAYAK PORTAL</div>
                              <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-gray-800"></div>
                              </div>
                           </div>
                           <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div className="md:col-span-2 space-y-6">
                               <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
                                  <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Case Assessment</h4>
                                  <div className="h-4 w-1/3 bg-gray-800 rounded mb-4"></div>
                                  <div className="space-y-2">
                                    <div className="h-2 w-full bg-gray-800 rounded"></div>
                                    <div className="h-2 w-5/6 bg-gray-800 rounded"></div>
                                  </div>
                               </div>
                               <div className="grid grid-cols-2 gap-6">
                                  <div className="bg-[#111] border border-fuchsia-500/30 p-6 rounded-xl">
                                    <Activity className="text-fuchsia-500 mb-4" size={32}/>
                                    <div className="text-3xl font-bold text-white">87%</div>
                                    <div className="text-gray-500 text-sm">SVI Risk Score</div>
                                  </div>
                                  <div className="bg-[#111] border border-blue-500/30 p-6 rounded-xl">
                                    <UserCheck className="text-blue-500 mb-4" size={32}/>
                                    <div className="text-3xl font-bold text-white">Active</div>
                                    <div className="text-gray-500 text-sm">Case Status</div>
                                  </div>
                               </div>
                             </div>
                             <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-gray-800 p-6 rounded-xl flex flex-col">
                               <div className="flex items-center gap-2 text-fuchsia-400 font-semibold mb-6"><Sparkles size={18}/> AI Analysis</div>
                               <div className="space-y-4">
                                 <div className="p-4 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-lg text-fuchsia-200 text-sm">
                                   "High vulnerability detected in audio patterns. Immediate officer assignment recommended."
                                 </div>
                               </div>
                             </div>
                           </div>
                         </>
                       )}

                       {selectedProject.id === 'bank_dashboard' && (
                         <BankDashboard />
                       )}

                       {selectedProject.id === 'creditlens' && (
                         <>
                           {/* CREDITLENS AI Mock */}
                           <div className="h-14 border-b border-gray-800 flex items-center px-6 justify-between bg-black">
                              <div className="flex items-center gap-2 text-white font-bold tracking-widest"><ShieldCheck className="text-purple-500"/> CREDITLENS AI</div>
                              <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-gray-800"></div>
                              </div>
                           </div>
                           <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div className="md:col-span-1 bg-[#111] border border-gray-800 p-6 rounded-xl flex flex-col justify-center items-center text-center">
                               <div className="text-gray-400 text-sm uppercase tracking-wider mb-4">Risk Prediction</div>
                               <div className="w-32 h-32 rounded-full border-4 border-red-500 flex items-center justify-center mb-4 relative shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                                 <div className="text-4xl font-bold text-white">78%</div>
                               </div>
                               <div className="text-red-400 font-bold text-lg">HIGH RISK</div>
                               <div className="text-gray-500 text-xs mt-2">Applicant ID: #84920</div>
                             </div>
                             <div className="md:col-span-2 space-y-4">
                               <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
                                 <div className="text-white font-semibold mb-4 flex items-center gap-2"><Sparkles size={16} className="text-purple-500"/> SHAP Feature Contributions</div>
                                 <div className="space-y-4">
                                   <div>
                                     <div className="flex justify-between text-xs mb-1"><span className="text-red-400">Debt-to-Income Ratio (+0.24)</span></div>
                                     <div className="w-full bg-gray-800 h-2 rounded"><div className="bg-red-500 h-2 rounded" style={{width: '70%'}}></div></div>
                                   </div>
                                   <div>
                                     <div className="flex justify-between text-xs mb-1"><span className="text-red-400">Recent Credit Enquiries (+0.15)</span></div>
                                     <div className="w-full bg-gray-800 h-2 rounded"><div className="bg-red-500 h-2 rounded" style={{width: '45%'}}></div></div>
                                   </div>
                                   <div>
                                     <div className="flex justify-between text-xs mb-1"><span className="text-emerald-400">Income Level (-0.08)</span></div>
                                     <div className="w-full bg-gray-800 h-2 rounded"><div className="bg-emerald-500 h-2 rounded" style={{width: '25%'}}></div></div>
                                   </div>
                                 </div>
                               </div>
                               <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-xl text-purple-200 text-sm">
                                 <strong>LIME Explanation:</strong> The model identified high debt-to-income ratio combined with recent credit enquiries as the primary factors increasing risk for this specific applicant profile.
                               </div>
                             </div>
                           </div>
                         </>
                       )}

                    </div>

                  </div>
                </motion.div>

                {/* 3. Problem -> Solution */}
                <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-8 mb-32">
                   <div className="bg-red-500/5 border border-red-500/10 p-10 rounded-3xl">
                     <h3 className="text-red-400 font-mono text-sm uppercase tracking-widest mb-4">The Problem</h3>
                     <p className="text-gray-300 text-xl leading-relaxed">{selectedProject.caseStudy.problem}</p>
                   </div>
                   <div className="bg-emerald-500/5 border border-emerald-500/10 p-10 rounded-3xl">
                     <h3 className="text-emerald-400 font-mono text-sm uppercase tracking-widest mb-4">The Solution</h3>
                     <p className="text-gray-300 text-xl leading-relaxed">{selectedProject.caseStudy.solution}</p>
                   </div>
                </motion.div>

                {/* 4. AI Intelligence Section */}
                <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="mb-32">
                   <h3 className="text-3xl md:text-5xl font-bold text-white mb-12 font-['Outfit'] text-center">AI Assessment Pipeline</h3>
                   <div className="bg-[#0a0a0a] border border-[#ffffff1a] rounded-3xl p-8 md:p-16 relative overflow-hidden">
                     <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 relative z-10">
                        {selectedProject.caseStudy.aiPipeline.map((step, idx) => (
                          <React.Fragment key={idx}>
                            <div className="px-6 py-3 bg-[#ffffff0d] border border-[#ffffff1a] rounded-xl text-fuchsia-300 font-medium text-center shadow-xl">
                              {step}
                            </div>
                            {idx < selectedProject.caseStudy.aiPipeline.length - 1 && (
                              <ArrowRight className="text-gray-600 hidden md:block" />
                            )}
                            {idx < selectedProject.caseStudy.aiPipeline.length - 1 && (
                              <ArrowRight className="text-gray-600 rotate-90 md:hidden my-2" />
                            )}
                          </React.Fragment>
                        ))}
                     </div>
                   </div>
                </motion.div>

                {/* 5. Key Modules */}
                <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="mb-32">
                   <h3 className="text-3xl md:text-5xl font-bold text-white mb-12 font-['Outfit'] text-center">System Modules</h3>
                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {selectedProject.caseStudy.modules.map((mod, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-white/5 to-transparent border border-[#ffffff1a] p-8 rounded-2xl hover:border-blue-500/50 transition-colors">
                           <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
                             <ShieldCheck className="text-blue-400" />
                           </div>
                           <h4 className="text-xl font-bold text-white">{mod}</h4>
                        </div>
                      ))}
                   </div>
                </motion.div>

                {/* 6. Architecture & Tech Stack */}
                <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="mb-32 grid md:grid-cols-2 gap-16">
                   <div>
                      {selectedProject.id === 'sahayak' && (
                        <>
                          <h3 className="text-3xl font-bold text-white mb-8 font-['Outfit']">Architecture</h3>
                          <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 space-y-4">
                             <div className="bg-blue-500/10 text-blue-300 p-4 rounded-xl border border-blue-500/20 text-center font-medium">React + Tailwind (Frontend)</div>
                             <div className="text-center text-gray-600">↓</div>
                             <div className="bg-fuchsia-500/10 text-fuchsia-300 p-4 rounded-xl border border-fuchsia-500/20 text-center font-medium">FastAPI Backend (JWT Auth)</div>
                             <div className="text-center text-gray-600">↓</div>
                             <div className="bg-purple-500/10 text-purple-300 p-4 rounded-xl border border-purple-500/20 text-center font-medium">AI Engine (PyTorch / Whisper)</div>
                             <div className="text-center text-gray-600">↓</div>
                             <div className="bg-emerald-500/10 text-emerald-300 p-4 rounded-xl border border-emerald-500/20 text-center font-medium">PostgreSQL Database</div>
                          </div>
                        </>
                      )}
                      {selectedProject.id === 'bank_dashboard' && (
                        <>
                          <h3 className="text-3xl font-bold text-white mb-8 font-['Outfit']">Dashboard Workflow</h3>
                          <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 space-y-4">
                             <div className="bg-blue-500/10 text-blue-300 p-4 rounded-xl border border-blue-500/20 text-center font-medium">Python (Pandas / NumPy)</div>
                             <div className="text-center text-gray-600">↓</div>
                             <div className="bg-emerald-500/10 text-emerald-300 p-4 rounded-xl border border-emerald-500/20 text-center font-medium">Scikit-learn (ML Model)</div>
                             <div className="text-center text-gray-600">↓</div>
                             <div className="bg-fuchsia-500/10 text-fuchsia-300 p-4 rounded-xl border border-fuchsia-500/20 text-center font-medium">FastAPI (Prediction API)</div>
                             <div className="text-center text-gray-600">↓</div>
                             <div className="bg-purple-500/10 text-purple-300 p-4 rounded-xl border border-purple-500/20 text-center font-medium">Streamlit Dashboard</div>
                          </div>
                        </>
                      )}
                      {selectedProject.id === 'creditlens' && (
                        <>
                          <h3 className="text-3xl font-bold text-white mb-8 font-['Outfit']">Explainable AI Stack</h3>
                          <div className="bg-[#111] p-8 rounded-2xl border border-gray-800 space-y-4">
                             <div className="bg-blue-500/10 text-blue-300 p-4 rounded-xl border border-blue-500/20 text-center font-medium">Data Pipeline (Pandas)</div>
                             <div className="text-center text-gray-600">↓</div>
                             <div className="bg-red-500/10 text-red-300 p-4 rounded-xl border border-red-500/20 text-center font-medium">XGBoost Classification</div>
                             <div className="text-center text-gray-600">↓</div>
                             <div className="bg-fuchsia-500/10 text-fuchsia-300 p-4 rounded-xl border border-fuchsia-500/20 text-center font-medium">SHAP & LIME Explanations</div>
                             <div className="text-center text-gray-600">↓</div>
                             <div className="bg-emerald-500/10 text-emerald-300 p-4 rounded-xl border border-emerald-500/20 text-center font-medium">Streamlit Insights Dashboard</div>
                          </div>
                        </>
                      )}
                   </div>
                   <div>
                      <h3 className="text-3xl font-bold text-white mb-8 font-['Outfit']">My Contribution</h3>
                      <ul className="space-y-4">
                        {selectedProject.caseStudy.role.map((r, idx) => (
                           <li key={idx} className="flex items-center gap-4 text-gray-300 text-lg">
                             <div className="w-2 h-2 rounded-full bg-blue-500"></div> {r}
                           </li>
                        ))}
                      </ul>
                      
                      <h3 className="text-3xl font-bold text-white mb-8 mt-16 font-['Outfit']">Core Technologies</h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.technologies.map(tech => (
                           <span key={tech} className="bg-[#111] border border-gray-800 px-4 py-2 rounded-lg text-gray-300 font-mono text-sm">{tech}</span>
                        ))}
                      </div>
                   </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
