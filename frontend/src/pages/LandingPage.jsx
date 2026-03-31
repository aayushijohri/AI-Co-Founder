import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  Zap, 
  Target, 
  CheckCircle2, 
  PlayCircle,
  ChevronRight,
  TrendingUp,
  Globe
} from 'lucide-react';
import heroMockup from '../assets/hero-mockup.png';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative text-white font-sans selection:bg-purple-primary/30 pt-16 pb-16 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-purple-primary/5 blur-[120px] -z-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-secondary/5 blur-[120px] -z-10 rounded-full animate-pulse-slow"></div>

      {/* Hero Section */}
      <section className="relative px-6 py-12 flex flex-col items-center text-center max-w-7xl mx-auto z-10">
        <div className="animate-in inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-xl mb-8 hover:border-purple-primary/30 transition-all pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-purple-primary shadow-[0_0_12px_rgba(168,85,247,0.6)] animate-pulse"></div>
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-text-muted">
            The Future of Startup Intelligence
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6 animate-in uppercase max-w-4xl">
          Build. <span className="gradient-text-purple">Validate.</span> Launch.
        </h1>

        <p className="text-base md:text-lg text-text-muted max-w-2xl mb-10 animate-in leading-relaxed font-medium">
          Stop guessing. Start building. AI Co-Founder transforms your raw ideas into production-ready startup blueprints in seconds.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-5 mb-16 animate-in">
          <button 
            onClick={() => navigate('/app')}
            className="w-full md:w-auto px-8 py-3.5 bg-white text-black rounded-full font-black uppercase tracking-wider hover:scale-105 active:scale-95 transition-all text-[10px] shadow-xl flex items-center justify-center gap-2"
          >
            Launch Builder <ChevronRight className="w-4 h-4" />
          </button>
          <button className="w-full md:w-auto px-8 py-3.5 glass-card-premium border border-white/10 text-white rounded-full font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/5 transition-all text-[10px]">
            <PlayCircle className="w-4 h-4 text-purple-primary" /> System Demo
          </button>
        </div>

        {/* Hero Preview */}
        <div className="relative w-full max-w-5xl mx-auto animate-in group px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-primary/10 to-blue-secondary/10 rounded-[32px] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
          <div className="glass-card-premium rounded-[32px] p-1.5 border border-white/5 overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-8 bg-white/[0.02] border-b border-white/5 flex items-center px-4 gap-1.5 z-20">
               <div className="w-2.5 h-2.5 rounded-full bg-danger/20"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-warning/20"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-success/20"></div>
               <div className="ml-3 h-4 px-3 bg-white/5 rounded-full flex items-center">
                  <span className="text-[8px] text-text-muted font-bold tracking-widest uppercase opacity-50">app.aifounder.io/dashboard</span>
               </div>
            </div>
            <img 
              src={heroMockup} 
              alt="AI Dashboard Preview" 
              className="w-full h-auto object-cover rounded-[24px] mt-8 hover:scale-[1.005] transition-transform duration-1000"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative px-6 py-16 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Analyses Run', value: '45k+' },
            { label: 'Success Rate', value: '92%' },
            { label: 'Latency', value: '1.2s' },
            { label: 'Founders', value: '2.5k' },
          ].map((stat, i) => (
            <div key={i} className="space-y-1 group">
              <div className="text-2xl md:text-4xl font-black text-white group-hover:text-purple-primary transition-colors tracking-tight">{stat.value}</div>
              <div className="text-[8px] text-text-muted font-black uppercase tracking-[0.25em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-24 border-b border-white/5 bg-white/[0.005]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4">The <span className="gradient-text-purple">Process</span></h2>
            <p className="text-sm text-text-muted font-medium uppercase tracking-widest">Neural startup synthesis in four steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Input Idea', desc: 'Describe your concept in plain English. No jargon required.' },
              { step: '02', title: 'AI Analysis', desc: 'Llama 3 processes market depth, moats, and sentiment.' },
              { step: '03', title: 'Blueprint', desc: 'Receive code-ready strategy and technical architecture.' },
              { step: '04', title: 'Launch', desc: 'Generate high-fidelity assets and ship your landing page.' },
            ].map((step, i) => (
              <div key={i} className="space-y-4 p-8 glass-card-premium rounded-3xl border border-white/5 hover:border-purple-primary/20">
                <div className="text-4xl font-black text-purple-primary/10 mb-2">{step.step}</div>
                <h3 className="text-lg font-black uppercase tracking-wide text-white">{step.title}</h3>
                <p className="text-xs text-text-muted font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-6 py-32 max-w-6xl mx-auto">
        <div className="text-center mb-20">
           <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">Precision <span className="gradient-text-purple">Tooling</span></h2>
           <p className="text-text-muted font-medium max-w-xl mx-auto">Advanced intelligence modules for every stage of your journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: 'Neural Validation', icon: <Target className="w-5 h-5" />, desc: 'Sentiment synthesis and moat scoring engine.' },
             { title: 'Tactical GTM', icon: <Zap className="w-5 h-5" />, desc: 'Step-by-step sequencing for market entry.' },
             { title: 'Asset Forge', icon: <Rocket className="w-5 h-5" />, desc: 'One-click generation of production landing pages.' },
           ].map((feature, i) => (
             <div key={i} className="p-10 glass-card-premium rounded-[32px] space-y-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                   {feature.icon}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">{feature.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed font-medium">{feature.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">Scale <span className="gradient-text-purple">Faster</span></h2>
            <p className="text-text-muted font-medium uppercase tracking-[0.2em] text-[10px]">Transparent founding plans</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Seed', price: '$0', features: ['3 Analysis/mo', 'Basic Blueprints', 'Community Support'], cta: 'Start Free' },
              { name: 'Series A', price: '$49', features: ['Unlimited Analysis', 'Advanced GTM Strategy', 'Market Depth Engine', 'Priority AI Queue'], cta: 'Go Pro', featured: true },
              { name: 'Unicorn', price: 'Custom', features: ['Custom ML Models', 'API Integration', 'Whitelabel Pages', 'Dedicated Strategist'], cta: 'Contact Sales' }
            ].map((plan, i) => (
              <div key={i} className={`p-8 rounded-[40px] glass-card-premium flex flex-col border transition-all duration-500 hover:scale-105 ${plan.featured ? 'border-purple-primary/40 bg-purple-primary/5 shadow-2xl shadow-purple-primary/10' : 'border-white/5'}`}>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted mb-4">{plan.name}</div>
                <div className="text-4xl font-black mb-8">{plan.price}<span className="text-sm text-text-muted font-medium">/mo</span></div>
                <div className="space-y-4 flex-1 mb-10">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3 text-xs font-bold text-text-muted">
                      <CheckCircle2 className={`w-4 h-4 ${plan.featured ? 'text-purple-primary' : 'text-white/20'}`} /> {f}
                    </div>
                  ))}
                </div>
                <button className={`w-full py-4 rounded-full font-black uppercase tracking-widest text-[10px] transition-all ${plan.featured ? 'bg-purple-primary text-white hover:bg-purple-light shadow-xl shadow-purple-primary/30' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-48">
        <div className="max-w-5xl mx-auto rounded-[48px] p-16 md:p-24 text-center glass-card-premium relative overflow-hidden group border border-white/5">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-primary/5 blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
          
          <div className="relative z-10 space-y-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-[1] max-w-3xl mx-auto">Build the future with us.</h2>
            <p className="text-text-muted max-w-xl mx-auto font-medium">
              Join 2,500+ elite founders leveraging AI to dominate their markets.
            </p>
            <button 
               onClick={() => navigate('/app')}
               className="px-12 py-5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.25em] hover:scale-105 active:scale-95 transition-all shadow-2xl mx-auto flex items-center gap-3"
            >
              Start Your Journey <Rocket className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="px-6 py-20 border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-purple-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                <Rocket className="w-5 h-5" />
             </div>
             <span className="text-xl font-black tracking-tighter uppercase">AI FOUNDER</span>
          </div>

          <div className="flex flex-wrap justify-center gap-10">
             {['Platform', 'Intelligence', 'Company', 'Legal'].map((link) => (
                <a key={link} href="#" className="text-[9px] font-black uppercase tracking-[0.3em] text-text-muted hover:text-white transition-colors">{link}</a>
             ))}
          </div>

          <div className="text-[9px] text-text-muted font-black uppercase tracking-[0.2em]">
             © 2026 AI Founder • v2.0.4
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
