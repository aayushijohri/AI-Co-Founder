import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import LoadingSkeleton from '../components/LoadingSkeleton';
import CompetitorCard from '../components/cards/CompetitorCard';
import { Globe, IndianRupee, User, BarChart3, ShieldCheck, AlertCircle } from 'lucide-react';

const ValidationPage = () => {
  const { problem, validationData, fetchValidationData, loadingStates, errorStates } = useAppContext();
  const navigate = useNavigate();

  const loading = loadingStates.validation;
  const error = errorStates.validation;

  useEffect(() => {
    if (!problem) {
      navigate('/app/problem');
      return;
    }
    if (!validationData && !loading) {
      fetchValidationData();
    }
  }, [problem]);

  if (!problem) return null;

  if (loading) {
    return (
      <div className="space-y-12 animate-fadeIn">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Validation & Adaptation</h1>
          <p className="text-text-muted">Analyzing global competitors and Indian market fit...</p>
        </div>
        <LoadingSkeleton type="problem" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3">
        <AlertCircle className="w-5 h-5" />
        <p>{error}</p>
      </div>
    );
  }

  if (!validationData) return null;

  return (
    <div className="space-y-12 animate-in pb-20 max-w-5xl mx-auto">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase gradient-text-purple">Validation + fit</h1>
        <p className="text-lg text-text-muted font-medium">Global blueprints, Indian execution</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: Global Copy Engine */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-primary/20 text-purple-primary rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <Globe className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black tracking-tight uppercase">Global Copy Engine</h2>
            </div>
            <span className="text-[9px] text-text-muted font-black uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
              {validationData.global_competitors?.length || 0} Benchmarks
            </span>
          </div>

          <div className="glass-card-premium rounded-3xl p-6 space-y-4 border border-white/5">
            {validationData.global_competitors?.map((comp, idx) => (
              <CompetitorCard key={idx} {...comp} />
            ))}
          </div>
        </section>

        {/* RIGHT: India Adaptation */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-secondary/20 text-blue-secondary rounded-xl flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black tracking-tight uppercase">India Adaptation</h2>
          </div>

          <div className="space-y-6">
            {/* Pricing Tweaks */}
            <div className="glass-card-premium rounded-3xl p-6 hover:border-yellow-500/20 transition-all group">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-yellow-500/10 text-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <IndianRupee className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black tracking-tight uppercase">Pricing Tweaks</h3>
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div className="space-y-1">
                      <span className="text-[9px] text-text-muted font-black uppercase tracking-widest opacity-50">Local Market</span>
                      <p className="text-2xl font-black text-white">{validationData.india_pricing}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] text-text-muted font-black uppercase tracking-widest opacity-50">Global Average</span>
                      <p className="text-2xl font-black text-text-muted/40">{validationData.india_pricing_global}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-success/10 text-success rounded-full text-[9px] font-black uppercase tracking-widest border border-success/5">-{validationData.india_discount} Efficiency</span>
                    <span className="px-3 py-1 bg-purple-primary/10 text-purple-primary rounded-full text-[9px] font-black uppercase tracking-widest border border-purple-primary/5">{validationData.india_free_tier} Strategy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Changes */}
            <div className="glass-card-premium rounded-3xl p-6 hover:border-purple-primary/20 transition-all group">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-purple-primary/10 text-purple-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <User className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black tracking-tight uppercase">Feature Changes</h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {validationData.india_features?.map((feature, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded-lg text-xs font-bold text-white hover:bg-white/5 transition-colors">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* User Behavior */}
            <div className="glass-card-premium rounded-3xl p-6 hover:border-blue-secondary/20 transition-all group">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-blue-secondary/10 text-blue-secondary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black tracking-tight uppercase">User Behavior</h3>
                  <p className="text-base text-text-muted mt-3 leading-relaxed font-medium italic">
                    "{validationData.india_user_behavior}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FULL WIDTH: Regulation as Moat */}
      {validationData.regulations && validationData.regulations.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold">Regulation as Moat</h2>
          </div>

          <div className="bg-surface border border-white/10 rounded-2xl p-8">
            <div className="relative flex justify-between gap-4 overflow-x-auto pb-4 scrollbar-hide">
              <div className="absolute top-10 left-0 w-full h-0.5 bg-white/5 -z-0"></div>
              
              {validationData.regulations.map((reg, idx) => (
                <div key={idx} className="relative z-10 min-w-[240px] space-y-6">
                  <div className="flex flex-col items-center">
                    <div className="px-3 py-1 bg-purple-primary text-white text-[10px] font-black rounded-lg mb-4">
                      {reg.quarter}
                    </div>
                    <div className="w-4 h-4 bg-purple-primary ring-4 ring-purple-primary/20 rounded-full"></div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/5 rounded-xl p-4 hover:border-white/20 transition-all">
                    <h4 className="font-bold text-sm text-text-primary mb-2">{reg.name}</h4>
                    <p className="text-xs text-text-muted mb-4">{reg.description}</p>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      reg.opportunity === 'High' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {reg.opportunity} Opportunity
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ValidationPage;
