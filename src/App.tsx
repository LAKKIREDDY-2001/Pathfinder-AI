/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Target, 
  Users, 
  ChevronRight, 
  Briefcase, 
  Zap, 
  Map,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Menu,
  MessageSquare,
  Send,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { PROBLEM_POINTS, IMPACT_POINTS, ROADMAP_PHASES, SAMPLE_ROLES } from './constants';
import { getCareerAdvice } from './services/aiService';

const Navbar = () => (
  <nav className="flex items-center justify-between px-12 py-8 sticky top-0 bg-brand-bg/80 backdrop-blur-md z-50 border-b border-white/5">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-brand-accent rounded-sm flex items-center justify-center">
        <Compass className="text-brand-bg w-5 h-5" />
      </div>
      <span className="font-display font-black text-2xl tracking-tighter uppercase italic">Pathfinder.ai</span>
    </div>
    <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-medium text-brand-text/60">
      <a href="#discovery" className="hover:text-brand-accent transition-colors">Discovery</a>
      <a href="#impact" className="hover:text-brand-accent transition-colors">Impact</a>
      <a href="#roadmap" className="hover:text-brand-accent transition-colors">Roadmap</a>
      <button className="px-6 py-2 bg-brand-text text-brand-bg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-accent transition-colors">
        Open Portal
      </button>
    </div>
    <button className="md:hidden text-brand-text">
      <Menu className="w-6 h-6" />
    </button>
  </nav>
);

const AIAssistant = ({ context }: { context?: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Hello! I'm your Pathfinder AI Career Advisor. How can I help you navigate your growth today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const aiResponse = await getCareerAdvice(userMsg, context);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 md:w-96 bg-brand-bg border border-white/10 shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-brand-accent text-brand-bg font-black uppercase text-xs flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> AI Career Advisor
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:opacity-60 transition-opacity"
              >
                CLOSE
              </button>
            </div>
            
            <div className="h-96 overflow-y-auto p-4 space-y-4 font-sans">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-accent text-brand-bg font-bold' 
                      : 'bg-white/5 border border-white/5 text-brand-text/80'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-xl">
                    <RefreshCw className="w-4 h-4 animate-spin opacity-40 text-brand-text" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/5 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for career advice..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-xs focus:border-brand-accent outline-none"
              />
              <button 
                onClick={handleSend}
                className="bg-brand-accent text-brand-bg px-4 py-2 rounded-lg"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-accent text-brand-bg rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all group"
      >
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};

const Hero = ({ onScan }: { onScan: () => void }) => (
  <header className="relative py-32 px-12 overflow-hidden bg-brand-bg text-brand-text">
    {/* Background Decorative Text */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.03] pointer-events-none">
      <div className="text-[500px] font-black leading-none">01</div>
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4 mb-10">
          <span className="h-px w-12 bg-brand-accent"></span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-brand-accent font-black">System Status: Active</span>
        </div>
        
        <h1 className="text-7xl md:text-[140px] font-display font-black leading-[0.85] tracking-tighter mb-12 uppercase">
          Infinite<br/>
          <span className="text-outline text-transparent">Growth.</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-5">
            <p className="text-xl text-brand-text/60 leading-relaxed font-light max-w-md">
              A revolutionary interface designed for high-frequency career decisions. We condense complex skill datasets into intuitive, executable visual flows.
            </p>
          </div>
          <div className="md:col-span-7 flex flex-col sm:flex-row gap-6 md:justify-end">
            <button 
              onClick={onScan}
              className="px-10 py-5 bg-brand-text text-brand-bg text-[12px] font-black uppercase tracking-[0.2em] hover:bg-brand-accent transition-colors"
            >
              Scan My Profile
            </button>
            <button 
              onClick={() => document.getElementById('discovery')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 border border-white/20 text-white text-[12px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
            >
              Internal Roles
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </header>
);

const StatsSection = () => (
  <section id="impact" className="py-32 px-12 bg-brand-bg border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-6 leading-none">Pathfinder<br/><span className="text-brand-accent italic">Impact.</span></h2>
          <p className="text-brand-text/40 text-lg uppercase tracking-widest leading-loose">Validated benchmarks from global internal mobility clusters.</p>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-[10px] uppercase tracking-[0.3em] opacity-30 mb-2">Metrics Update</div>
          <div className="text-xs font-mono opacity-50 italic">14 APR 2026 // LIVE</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10">
        {IMPACT_POINTS.map((stat, idx) => (
          <motion.div 
            key={stat.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`p-12 border-white/10 ${idx !== IMPACT_POINTS.length - 1 ? 'lg:border-r border-b lg:border-b-0' : ''} ${idx % 2 !== 0 ? 'md:border-r-0 lg:border-r' : ''}`}
          >
            <div className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-6">{stat.title}</div>
            <div className="text-6xl font-light tabular-nums mb-4 text-brand-text tracking-tighter">{stat.value}</div>
            <p className="text-[11px] text-brand-text/40 leading-relaxed uppercase tracking-widest">{stat.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const DiscoveryPortal = ({ 
  selectedRole, 
  setSelectedRole, 
  onInitialize 
}: { 
  selectedRole: any; 
  setSelectedRole: (role: any) => void;
  onInitialize: () => void;
}) => {
  return (
    <section id="discovery" className="py-32 px-12 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 border-b border-white/5 pb-12">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-6">Discovery<br/><span className="text-outline text-transparent">Portal.</span></h2>
            <p className="text-brand-text/60 text-lg font-light leading-relaxed">Neural analysis of current skill parity across all active project clusters.</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-[9px] uppercase tracking-widest opacity-30">Authenticated Node</div>
            <div className="px-6 py-3 border border-white/10 flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              <div className="text-[10px] font-black uppercase tracking-[0.2em]">User: L4_OPS_NODE_09</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-2">
            {SAMPLE_ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`w-full text-left px-8 py-10 transition-all border border-white/10 flex flex-col gap-4 relative group overflow-hidden ${
                  selectedRole?.id === role.id 
                    ? 'bg-white text-brand-bg border-white' 
                    : 'bg-transparent text-white hover:border-brand-accent'
                }`}
              >
                {selectedRole?.id === role.id && <div className="absolute right-0 top-0 w-2 h-full bg-brand-accent" />}
                <div>
                  <div className={`text-[9px] uppercase tracking-[0.2em] mb-2 ${selectedRole?.id === role.id ? 'opacity-60' : 'opacity-40'}`}>{role.department}</div>
                  <div className="font-black text-xl uppercase tracking-tighter">{role.title}</div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-light tabular-nums">{role.match}%</div>
                  <div className="flex-1 h-px bg-current opacity-20" />
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {selectedRole ? (
                <motion.div 
                  key={selectedRole.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-brand-bg border border-white/10 px-12 py-12 h-full relative"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <div className="text-[80px] font-black leading-none uppercase select-none">ID.{selectedRole.id.split('-')[1]}</div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex flex-col gap-2 mb-8">
                      <div className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-accent">Classification</div>
                      <h4 className="text-4xl font-black uppercase tracking-tighter">{selectedRole.title}</h4>
                      <p className="text-brand-text/50 font-light text-lg leading-relaxed max-w-lg mt-4">{selectedRole.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12 border-t border-white/5 pt-12">
                      <div>
                        <h5 className="text-[10px] uppercase tracking-[0.2em] font-black mb-8 flex items-center gap-2">
                          <div className="w-1 h-3 bg-brand-accent" /> Delta Requirements
                        </h5>
                        <ul className="space-y-4">
                          {selectedRole.missingSkills.map(skill => (
                            <li key={skill} className="flex items-center justify-between text-[11px] uppercase tracking-widest text-brand-text/80 group">
                              <span>{skill}</span>
                              <span className="opacity-30 group-hover:opacity-100 transition-opacity">MISSING</span>
                            </li>
                          ))}
                        </ul>
                        <button 
                          onClick={onInitialize}
                          className="mt-12 w-full bg-brand-accent text-brand-bg py-5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-colors"
                        >
                          Initialize Roadmap
                        </button>
                      </div>

                      <div>
                        <h5 className="text-[10px] uppercase tracking-[0.2em] font-black mb-8 flex items-center gap-2">
                          <div className="w-1 h-3 bg-white" /> 90D Trajectory
                        </h5>
                        <div className="space-y-6">
                          {[
                            { day: 30, task: 'Complete Advanced SQL Path' },
                            { day: 60, task: 'AWS Practitioner Exam' },
                            { day: 90, task: 'Mentor Shadowing Sessions' }
                          ].map((step, i) => (
                            <div key={i} className="flex items-start gap-6 border-l border-white/10 pl-6 pb-6 last:pb-0">
                              <div className="text-[10px] font-mono text-brand-accent bg-white/5 px-2 py-1">T+{step.day}</div>
                              <div className="text-[11px] uppercase tracking-[0.15em] leading-relaxed pt-1">{step.task}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-20 border border-white/10 bg-white/[0.02]">
                  <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mb-8">
                    <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-widest mb-4">Awaiting Cluster Selection</h4>
                  <p className="text-brand-text/30 text-[10px] uppercase tracking-[0.3em] max-w-xs leading-loose">Select an internal node to generate a career trajectory roadmap.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const RoadmapSection = ({ initialized, role }: { initialized: boolean; role: any }) => (
  <section id="roadmap" className="py-32 px-12 bg-brand-bg relative overflow-hidden text-brand-text">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div className="sticky top-40">
          <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter mb-10 leading-[0.85]">Pathfinder<br/><span className="text-brand-accent">Scaling.</span></h2>
          <p className="text-brand-text/50 text-xl font-light leading-relaxed mb-16 max-w-md">
            {initialized && role 
              ? `Personalized trajectory for ${role.title}. Phase 1 execution ready for initialization.`
              : 'Phased deployment architecture for the global Amazon workforce integration.'}
          </p>
          
          <div className="flex items-center gap-10">
            <div className="group relative">
               <button className={`px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                 initialized 
                  ? 'bg-brand-accent text-brand-bg animate-pulse' 
                  : 'bg-white text-brand-bg hover:bg-brand-accent'
               }`}>
                {initialized ? 'Protocol Active' : 'Initialize Protocol'}
              </button>
            </div>
            <div className="text-[9px] uppercase tracking-widest opacity-40 flex flex-col">
              <span>Rel: 2026.04.14</span>
              <span>Secure Node</span>
            </div>
          </div>
        </div>

        <div className="space-y-px bg-white/10 border border-white/10">
          {ROADMAP_PHASES.map((phase, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`p-12 bg-brand-bg group hover:bg-white/[0.03] transition-colors relative overflow-hidden ${
                initialized && idx === 0 ? 'border-l-4 border-brand-accent' : ''
              }`}
            >
              {initialized && idx === 0 && (
                <div className="absolute top-4 right-4 animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                </div>
              )}
              <div className="flex justify-between items-start mb-6">
                 <div className="text-[10px] font-mono text-brand-accent font-black uppercase tracking-[0.3em]">{phase.phase}</div>
                 <div className="text-[10px] opacity-20 font-black">0{idx + 1}</div>
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 pr-12">{phase.title}</h4>
              <p className="text-brand-text/40 text-sm uppercase tracking-widest leading-loose">{phase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Subtle Side Accents */}
    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 pr-4">
      <div className="w-1 h-12 bg-white/10"></div>
      <div className="w-1 h-24 bg-brand-accent"></div>
      <div className="w-1 h-12 bg-white/10"></div>
    </div>
  </section>
);

const ProblemSection = () => (
  <section className="py-32 px-12 bg-[#0a0a0a] border-t border-white/5">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
        <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">Logic<br/><span className="text-outline text-transparent">Gaps.</span></h2>
        <p className="text-brand-text/30 text-[10px] uppercase tracking-[0.4em] mb-4">Critical Attrition Data // FY2026</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
        {PROBLEM_POINTS.map((point, idx) => (
          <div key={point.id} className="p-12 bg-brand-bg group flex flex-col gap-10">
            <div className="flex justify-between items-center">
              <div className="text-xl font-display font-black opacity-10 font-mono">0{idx + 1}</div>
              <div className="px-4 py-1 border border-brand-accent/20 text-brand-accent text-[10px] font-black uppercase tracking-[0.2em]">{point.stat}</div>
            </div>
            <div>
              <h4 className="font-black text-2xl uppercase tracking-tighter mb-4">{point.title}</h4>
              <p className="text-brand-text/50 text-sm uppercase tracking-widest leading-loose">{point.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-white/10 px-12 py-16 flex flex-col md:flex-row items-center justify-between gap-12 bg-brand-bg">
    <div className="flex gap-20">
      <div>
        <div className="text-[9px] uppercase tracking-widest opacity-30 mb-2">Internal Framework</div>
        <div className="text-xs font-black uppercase tracking-widest italic">Aether.Pathfinder</div>
      </div>
      <div>
        <div className="text-[9px] uppercase tracking-widest opacity-30 mb-2">Last Sync</div>
        <div className="text-xs font-black uppercase tracking-widest">21 APR 2026 // 04:47 GMT</div>
      </div>
    </div>

    <div className="flex items-center gap-10">
      <div className="flex items-center gap-2 opacity-50">
        <Compass className="w-5 h-5" />
        <span className="font-display font-black text-lg uppercase tracking-tighter italic">Pathfinder ai</span>
      </div>
      <div className="text-[9px] uppercase tracking-widest opacity-40 flex flex-col items-end text-right">
        <span>&copy; 2026 AMZN.INTERNAL</span>
        <span>Secure Secure Node.01</span>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [hasScanned, setHasScanned] = useState(false);
  const [selectedRole, setSelectedRole] = useState<typeof SAMPLE_ROLES[0] | null>(null);
  const [roadmapInitialized, setRoadmapInitialized] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setHasScanned(true);
            document.getElementById('discovery')?.scrollIntoView({ behavior: 'smooth' });
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
  };

  const handleInitializeRoadmap = () => {
    setRoadmapInitialized(true);
    document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden selection:bg-brand-accent selection:text-brand-bg">
      <Navbar />
      
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-brand-bg flex flex-col items-center justify-center p-12"
          >
            <div className="text-[10px] uppercase tracking-[0.5em] text-brand-accent mb-8 font-black">Neural Scan in Progress</div>
            <div className="w-full max-w-md h-1 bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-brand-accent"
                initial={{ width: 0 }}
                animate={{ width: `${scanProgress}%` }}
              />
            </div>
            <div className="mt-8 font-display font-black text-6xl tabular-nums italic text-outline text-transparent">
              {Math.round(scanProgress)}%
            </div>
            <div className="mt-12 text-[9px] uppercase tracking-widest opacity-30 animate-pulse">
              Correlating Cluster Data // Node_09 // Amazon Internal
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero onScan={handleScan} />
      <ProblemSection />
      <DiscoveryPortal 
        selectedRole={selectedRole} 
        setSelectedRole={setSelectedRole} 
        onInitialize={handleInitializeRoadmap}
      />
      <StatsSection />
      <RoadmapSection initialized={roadmapInitialized} role={selectedRole} />
      <AIAssistant context={{ selectedRole }} />
      
      <section className="py-40 px-12 bg-brand-accent text-brand-bg text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-bg/5 mix-blend-overlay pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-10 pointer-events-none">
          <div className="text-[400px] font-black leading-none uppercase">JOIN</div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-[120px] font-display font-black tracking-tighter uppercase leading-[0.85] mb-12">Initialize<br/>Deployment.</h2>
          <button className="bg-brand-bg text-brand-text px-16 py-8 text-[14px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
            Join the Pilot Program
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
