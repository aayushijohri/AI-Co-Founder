import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import LoadingSkeleton from '../components/LoadingSkeleton';
import RevenueChart from '../components/charts/RevenueChart';
import { Rocket, ExternalLink, Layout, DollarSign, Users, CheckCircle2, Send, AlertCircle, Zap, ShieldCheck, ChevronRight, Star, Globe, Activity } from 'lucide-react';

const LandingPreview = ({ data }) => {
  if (!data) return null;

  return (
    <div className="w-full bg-[#03040B] min-h-[800px] text-white font-sans overflow-hidden relative">
      {/* Mesh Background for Preview */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-primary/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-secondary/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      {/* Navbar Mockup */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#0A0B14]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-primary to-blue-secondary p-[1px]">
            <div className="w-full h-full bg-[#0A0B14] rounded-xl flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="font-extrabold text-lg tracking-tight">{(data.headline || 'Startup').split(' ')[0]}</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-text-muted">
          <span onClick={(e) => { e.preventDefault(); document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Product</span>
          <span onClick={(e) => { e.preventDefault(); document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Features</span>
          <span onClick={(e) => { e.preventDefault(); document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">Pricing</span>
        </div>
        <button className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          {data.cta || "Get Started"}
        </button>
      </nav>

      {/* Hero Section */}
      <section id="product-section" className="relative z-10 px-6 pt-28 pb-0 md:pt-36 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-text-muted backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
          AI-Powered Startup
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] max-w-4xl mx-auto mb-6">
          <span className="text-white">{data.headline}</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-text-muted max-w-2xl mx-auto leading-relaxed font-medium mb-10">
          {data.subheadline}
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <button className="px-8 py-4 bg-purple-primary text-white rounded-full font-bold text-lg shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-purple-light transition-all transform hover:scale-105 active:scale-95 border border-purple-light/50">
            {data.cta || "Start Free Trial"}
          </button>
        </div>
        
        {/* Abstract Dashboard Mockup */}
        <div className="mt-16 w-full max-w-5xl mx-auto relative hidden md:block group -mb-24 relative z-0">
           <div className="absolute inset-0 bg-gradient-to-b from-purple-primary/20 to-transparent blur-3xl -z-10 opacity-50"></div>
           <div className="border border-white/10 bg-[#0A0B14]/90 backdrop-blur-3xl rounded-t-3xl h-[340px] overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] relative transform transition-transform group-hover:-translate-y-2 duration-700 ease-out">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                 <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                 <div className="ml-4 h-3 w-48 bg-white/5 rounded-full"></div>
              </div>
              <div className="p-6 grid grid-cols-4 gap-8 opacity-60">
                 {/* Sidebar Mockup */}
                 <div className="col-span-1 border-r border-white/5 pr-6 space-y-5">
                    <div className="h-6 w-20 bg-white/10 rounded-lg mb-8"></div>
                    <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-purple-primary/40"></div><div className="h-2 w-16 bg-white/20 rounded-full"></div></div>
                    <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-white/5"></div><div className="h-2 w-20 bg-white/10 rounded-full"></div></div>
                    <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-white/5"></div><div className="h-2 w-14 bg-white/10 rounded-full"></div></div>
                    <div className="flex items-center gap-3"><div className="w-4 h-4 rounded bg-white/5"></div><div className="h-2 w-24 bg-white/10 rounded-full"></div></div>
                 </div>
                 {/* Main Content Mockup */}
                 <div className="col-span-3 space-y-6">
                    <div className="flex justify-between items-center">
                       <div className="h-5 w-32 bg-white/10 rounded-lg"></div>
                       <div className="flex gap-2">
                          <div className="h-8 w-24 bg-white/5 rounded-full"></div>
                          <div className="h-8 w-8 bg-purple-primary/20 rounded-full"></div>
                       </div>
                    </div>
                    {/* Charts Mockup */}
                    <div className="grid grid-cols-3 gap-4">
                       <div className="h-24 bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/5 rounded-2xl p-4 flex flex-col justify-end">
                          <div className="h-12 w-full bg-blue-secondary/20 rounded-t border-t border-blue-secondary/50 mask-image-b group-hover:h-16 transition-all duration-1000"></div>
                       </div>
                       <div className="h-24 bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/5 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                          <div className="absolute inset-0 bg-purple-primary/10 blur-xl"></div>
                          <Activity className="w-6 h-6 text-purple-primary opacity-50" />
                          <div className="h-2 w-16 bg-white/20 rounded-full"></div>
                       </div>
                       <div className="h-24 bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/5 rounded-2xl p-4 flex flex-col space-y-3">
                          <div className="h-2 w-full bg-white/5 rounded-full"></div>
                          <div className="h-2 w-3/4 bg-white/5 rounded-full"></div>
                          <div className="h-2 w-1/2 bg-white/5 rounded-full"></div>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#03040B] via-[#03040B]/80 to-transparent pointer-events-none"></div>
           </div>
        </div>
      </section>

      {/* Modern Bento Features */}
      <section id="features-section" className="relative z-10 px-6 pt-0 pb-24 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
           <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Why Choose Us.</h2>
           <p className="text-text-muted text-lg font-medium">Built for the future of your industry.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.features?.map((f, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-white/5 hover:border-white/15 p-8 rounded-3xl group transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:bg-purple-primary transition-colors duration-300 border border-white/5 group-hover:border-purple-light/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold tracking-tight mb-3 text-white">{f.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed font-medium">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premium Pricing */}
      <section id="pricing-section" className="relative z-10 px-6 py-24 max-w-5xl mx-auto border-t border-white/5 mt-12 bg-gradient-to-b from-white/[0.01] to-transparent">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Simple Pricing.</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-8 items-stretch">
          {data.pricing?.map((p, idx) => {
            const isPro = p.plan?.toLowerCase().includes('pro') || idx === 1;
            return (
              <div key={idx} className={`flex-1 min-w-[300px] rounded-[2rem] p-8 flex flex-col transition-all duration-500 relative overflow-hidden ${
                isPro 
                  ? 'bg-gradient-to-b from-[#1a0b2e] to-[#0A0B14] border border-purple-primary/30 shadow-[0_0_40px_rgba(168,85,247,0.1)] transform md:-translate-y-4' 
                  : 'bg-white/[0.02] border border-white/10 hover:border-white/20'
              }`}>
                {isPro && <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-primary to-transparent"></div>}
                
                <div className="space-y-2 mb-8 relative z-10">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    isPro ? 'bg-purple-primary/20 text-purple-light border-purple-primary/30' : 'bg-white/5 text-text-muted border-white/5'
                  }`}>
                    {p.plan}
                  </span>
                  <div className="text-4xl font-black mt-6 text-white tracking-tight">
                    {p.price} <span className="text-sm text-text-muted font-bold tracking-normal">/mo</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-1 relative z-10">
                  {p.features?.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${isPro ? 'bg-purple-primary/20 text-purple-light' : 'bg-white/5 text-text-muted'}`}>
                         <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-white/80 font-medium leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all relative z-10 ${
                  isPro 
                    ? 'bg-purple-primary text-white hover:bg-purple-light border border-purple-light/50' 
                    : 'bg-white text-black hover:bg-white/90'
                }`}>
                  Get {p.plan}
                </button>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 text-center bg-black/50">
        <div className="w-8 h-8 bg-purple-primary rounded-lg flex items-center justify-center mx-auto mb-6">
          <Rocket className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-2xl font-black mb-6 text-white">{(data.headline || 'Startup').split(' ')[0]}</h2>
        <p className="text-text-muted text-sm font-medium mb-8">© 2026 {(data.headline || 'Startup').split(' ')[0]} Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

// ── NEW LAUNCH EXPERIENCE COMPONENTS ──

const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{prefix}{count.toLocaleString()}{suffix}</>;
};

const LaunchingStateScreen = () => (
  <div className="fixed inset-0 z-[100] bg-[#03040B] flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
     <div className="relative">
        <div className="w-32 h-32 border-4 border-purple-primary/20 rounded-full animate-spin border-t-purple-primary"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           <Rocket className="w-12 h-12 text-purple-primary animate-pulse" />
        </div>
     </div>
     <h2 className="text-3xl md:text-4xl font-black text-white mt-10 uppercase tracking-tight text-center">Deploying Startup...</h2>
     <p className="text-text-muted font-medium mt-4 text-center max-w-sm leading-relaxed">Provisioning servers, configuring AI endpoints, and generating frontend assets to the edge network.</p>
     
     <div className="mt-12 w-full max-w-sm bg-white/5 rounded-full h-1.5 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-primary to-blue-secondary h-full rounded-full w-full origin-left animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
     </div>
  </div>
);

const LaunchSuccessScreen = ({ data, onReset, onStartNew }) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#03040B] overflow-y-auto scrollbar-hide animate-in fade-in duration-1000">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={800} gravity={0.15} colors={['#a855f7', '#3b82f6', '#22c55e', '#ffffff']} />}
      
      {/* Mesh Background */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-primary/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none fixed"></div>
      
      <div className="min-h-screen flex flex-col items-center py-20 px-6 relative z-10 max-w-6xl mx-auto space-y-16">
        
        {/* Hero */}
        <div className="text-center space-y-6 animate-in slide-in-from-bottom-10 fade-in duration-1000 fill-mode-both" style={{ animationDelay: '200ms' }}>
           <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-success/10 text-success mb-2 shadow-[0_0_80px_rgba(34,197,94,0.2)] border border-success/30 relative">
              <div className="absolute inset-0 bg-success/20 rounded-full animate-ping"></div>
              <Rocket className="w-12 h-12 relative animate-bounce" />
           </div>
           <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase">Your Startup is <span className="text-success glow-success drop-shadow-[0_0_30px_rgba(34,197,94,0.6)]">Live.</span></h1>
           <p className="text-xl md:text-2xl text-text-muted font-medium max-w-3xl mx-auto leading-relaxed">{data.headline}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-10 fade-in duration-1000 fill-mode-both" style={{ animationDelay: '800ms' }}>
           <button onClick={() => document.getElementById('live-deployment-snap')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white text-black hover:bg-white/90 rounded-full font-black text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
             <ExternalLink className="w-5 h-5" /> View Live Site
           </button>
           <button onClick={onReset} className="px-8 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-full font-bold text-lg transition-all transform hover:scale-105 active:scale-95">
             Edit Startup
           </button>
           <button onClick={onStartNew} className="px-8 py-4 bg-purple-primary text-white hover:bg-purple-light rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] transform hover:scale-105 active:scale-95">
             Start New
           </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-in slide-in-from-bottom-10 fade-in duration-1000 fill-mode-both" style={{ animationDelay: '500ms' }}>
           <div className="glass-card-premium rounded-3xl p-8 border border-white/10 text-center relative overflow-hidden group hover:border-blue-secondary/30 transition-all cursor-default">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Users className="w-8 h-8 text-blue-secondary mx-auto mb-4" />
              <div className="text-5xl font-black text-white mb-2 tracking-tight"><AnimatedCounter end={parseInt(data.projected_users_y1) ? Math.floor(parseInt(data.projected_users_y1) * 0.1) : 4205} /></div>
              <div className="text-[10px] uppercase font-black text-text-muted tracking-widest bg-white/5 inline-block px-3 py-1 rounded-full mt-2">Waitlist Joins</div>
           </div>
           
           <div className="glass-card-premium rounded-3xl p-8 border border-white/10 text-center relative overflow-hidden group hover:border-purple-primary/30 transition-all cursor-default">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Activity className="w-8 h-8 text-purple-primary mx-auto mb-4" />
              <div className="text-5xl font-black text-white mb-2 tracking-tight"><AnimatedCounter end={94} suffix="%" /></div>
              <div className="text-[10px] uppercase font-black text-text-muted tracking-widest bg-white/5 inline-block px-3 py-1 rounded-full mt-2">Demand Score</div>
           </div>
           
           <div className="glass-card-premium rounded-3xl p-8 border border-white/10 text-center relative overflow-hidden group hover:border-success/30 transition-all cursor-default">
              <div className="absolute inset-0 bg-gradient-to-t from-success/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Globe className="w-8 h-8 text-success mx-auto mb-4" />
              <div className="text-5xl font-black text-white mb-2 tracking-tight"><AnimatedCounter end={14} /></div>
              <div className="text-[10px] uppercase font-black text-text-muted tracking-widest bg-white/5 inline-block px-3 py-1 rounded-full mt-2">Active Regions</div>
           </div>
        </div>

        {/* Embedded Browser Frame Preview */}
        <div id="live-deployment-snap" className="w-full max-w-5xl mx-auto animate-in slide-in-from-bottom-10 fade-in duration-1000 fill-mode-both pt-4" style={{ animationDelay: '1200ms' }}>
           <div className="flex flex-col items-center mb-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/50 border border-white/10">
                 <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-text-muted uppercase tracking-widest">Live Deployment Snap</h3>
           </div>
           <div className="glass-card-premium rounded-[2rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/10 relative">
              <div className="bg-[#0A0B14] border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-danger"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-warning"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-success"></div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 rounded-full px-6 py-1.5 text-[11px] text-text-muted font-mono flex items-center justify-center gap-2">
                  <span className="text-success"><CheckCircle2 className="w-3.5 h-3.5" /></span> https://{(data.headline || 'startup').split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '')}.ai
                </div>
              </div>
              
              <div className="h-[700px] overflow-y-auto overflow-x-hidden scrollbar-hide relative bg-[#03040B] pointer-events-auto">
                <LandingPreview data={data} />
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

const LaunchPage = () => {
  const { problem, launchData, fetchLaunchData, loadingStates, errorStates } = useAppContext();
  const navigate = useNavigate();
  const [shippingState, setShippingState] = useState('idle'); // 'idle', 'deploying', 'live'

  const handleShipNow = () => {
    if (shippingState !== 'idle') return;
    setShippingState('deploying');
    
    // Simulate real deployment pipeline wait
    setTimeout(() => {
      setShippingState('live');
    }, 3500);
  };

  const handleStartNew = () => {
    navigate('/app/problem');
  };

  const loading = loadingStates.launch;
  const error = errorStates.launch;

  useEffect(() => {
    if (!problem) {
      navigate('/app/problem');
      return;
    }
    if (!launchData && !loading) {
      fetchLaunchData();
    }
  }, [problem]);

  if (!problem) return null;

  if (shippingState === 'deploying') {
    return <LaunchingStateScreen />;
  }

  if (shippingState === 'live') {
    return <LaunchSuccessScreen data={launchData} onReset={() => setShippingState('idle')} onStartNew={handleStartNew} />;
  }

  if (loading) {
    return (
      <div className="space-y-10 animate-in">
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-black uppercase gradient-text-purple">Launching</h1>
          <p className="text-lg text-text-muted font-medium">Assembling GTM and AI landing page blueprint...</p>
        </div>
        <LoadingSkeleton type="problem" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 bg-danger/10 border border-danger/20 rounded-2xl text-danger flex items-center gap-3 animate-in uppercase text-[10px] font-black tracking-widest">
        <AlertCircle className="w-4 h-4" />
        <p>{error}</p>
      </div>
    );
  }

  if (!launchData) return null;

  return (
    <div className="space-y-12 animate-in pb-20 max-w-6xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase gradient-text-purple">Ready for Launch</h1>
        <p className="text-base text-text-muted max-w-xl mx-auto font-medium">Your AI Co-Founder has prepared everything you need to ship.</p>
      </div>

      {/* Landing Page Mockup Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-primary/20 text-purple-primary rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight uppercase">Landing Page Generator</h2>
              <p className="text-[10px] text-text-muted uppercase font-black tracking-widest">AI-crafted startup website</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-purple-primary/30 transition-all group shrink-0">
            <ExternalLink className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" /> Export for Vercel
          </button>
        </div>

        <div className="glass-card-premium rounded-[32px] overflow-hidden shadow-2xl border border-white/5">
           {/* Browser Frame */}
           <div className="bg-white/5 border-b border-white/5 px-4 py-3 flex items-center gap-3">
             <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-danger/30"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-warning/30"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-success/30"></div>
             </div>
             <div className="flex-1 bg-black/30 rounded-full px-3 py-1 text-[9px] text-text-muted font-mono flex items-center gap-2 max-w-xs">
               <span className="opacity-30">https://</span>{(launchData.headline || 'startup').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.ai
             </div>
           </div>
           
           <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
              <LandingPreview data={launchData} />
           </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Projection */}
        <section className="glass-card-premium rounded-3xl p-8 space-y-6 hover:border-blue-secondary/20 transition-all border border-white/5">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-blue-secondary">
                <div className="w-10 h-10 bg-blue-secondary/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black tracking-tight uppercase text-white">Revenue Strategy</h3>
              </div>
              <span className="text-[9px] text-text-muted font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Y1 Forecast</span>
           </div>

           <div className="h-[200px]">
             <RevenueChart data={launchData.monthly_users} revenue={launchData.monthly_revenue} />
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl group hover:bg-white/[0.03] transition-all">
                 <div className="flex items-center gap-2 text-blue-secondary mb-2">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">Users</span>
                 </div>
                 <div className="text-2xl font-black group-hover:scale-105 transition-transform truncate">
                   {typeof launchData.projected_users_y1 === 'number' ? launchData.projected_users_y1.toLocaleString() : launchData.projected_users_y1}
                 </div>
              </div>
              <div className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl group hover:bg-white/[0.03] transition-all">
                 <div className="flex items-center gap-2 text-green-400 mb-2">
                    <Zap className="w-3.5 h-3.5" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-muted">Target ARR</span>
                 </div>
                 <div className="text-2xl font-black group-hover:scale-105 transition-transform truncate text-white">
                   {launchData.projected_revenue_y1}
                 </div>
              </div>
           </div>
        </section>

        {/* Go-to-Market */}
        <section className="glass-card-premium rounded-3xl p-8 space-y-6 hover:border-purple-primary/20 transition-all border border-white/5">
           <div className="flex items-center gap-3 text-purple-primary">
              <div className="w-10 h-10 bg-purple-primary/10 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black tracking-tight uppercase text-white">Go-to-Market</h3>
           </div>
           
           <div className="space-y-3">
              {launchData.gtm_channels?.map((channel, idx) => (
                <div key={idx} className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/[0.03] transition-all group">
                   <div className="flex items-center gap-4">
                      <div className="w-9 h-9 bg-surface border border-white/5 rounded-xl flex items-center justify-center group-hover:bg-purple-primary group-hover:text-white transition-all">
                          <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                         <h4 className="font-bold text-sm text-white">{channel.name}</h4>
                         <p className="text-[10px] text-text-muted font-medium italic">"{channel.description}"</p>
                      </div>
                   </div>
                   <ChevronRight className="w-4 h-4 text-text-muted/20 group-hover:text-purple-primary transition-colors" />
                </div>
              ))}
           </div>
        </section>
      </div>

      {/* FINAL CTA */}
      <section className="relative group">
         <div className="absolute inset-0 bg-gradient-to-r from-purple-primary via-blue-secondary to-teal-accent rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
         <div className="glass-card-premium rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-primary/10 blur-[80px] -z-0"></div>
            
            <div className="relative z-10 text-center md:text-left space-y-2 max-w-sm">
               <h3 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase">Time to build.</h3>
               <p className="text-sm text-text-muted font-medium mb-4">Your AI Co-Founder is ready to help you ship this startup now.</p>
            </div>
            
            <button 
              onClick={handleShipNow}
              disabled={shippingState !== 'idle'}
              className={`relative z-10 px-8 py-4 rounded-full font-black text-lg shadow-xl transition-all flex items-center gap-3 overflow-hidden group ${
                shippingState === 'idle' 
                  ? 'bg-white text-black hover:bg-white/90 transform hover:scale-105 active:scale-95'
                  : shippingState === 'deploying'
                  ? 'bg-purple-primary text-white cursor-wait opacity-80'
                  : 'bg-green-500 text-white shadow-green-500/30'
              }`}
            >
               {shippingState === 'idle' && (
                 <>Ship Now <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
               )}
               {shippingState === 'deploying' && (
                 <>Deploying... <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div></>
               )}
               {shippingState === 'live' && (
                 <>It's Live! <CheckCircle2 className="w-6 h-6 animate-pulse" /></>
               )}
               {shippingState === 'live' && (
                 <div className="absolute inset-0 bg-white/20 animate-ping rounded-full pointer-events-none"></div>
               )}
            </button>
         </div>
      </section>
    </div>
  );
};

export default LaunchPage;
