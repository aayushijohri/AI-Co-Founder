import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import LoadingSkeleton from '../components/LoadingSkeleton';
import CompetitorCard from '../components/cards/CompetitorCard';
import { Globe, IndianRupee, User, BarChart3, TrendingUp, AlertCircle } from 'lucide-react';

const MarketPage = () => {
  const { problem, marketData, fetchMarketData, loadingStates, errorStates } = useAppContext();
  const navigate = useNavigate();

  const loading = loadingStates.market;
  const error = errorStates.market;

  useEffect(() => {
    if (!problem) {
      navigate('/app/problem');
      return;
    }
    if (!marketData && !loading) {
      fetchMarketData();
    }
  }, [problem]);

  if (!problem) return null;

  if (loading) {
    return (
      <div className="space-y-12 animate-fadeIn">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Market Intelligence</h1>
          <p className="text-text-muted">Analyzing competitive landscape...</p>
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

  if (!marketData) return null;

  return (
    <div className="space-y-12 animate-in pb-20 max-w-5xl mx-auto">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase gradient-text-purple">Market + global</h1>
        <p className="text-lg text-text-muted font-medium">Learn from global successes, adapt to India</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Global Copy Engine */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-primary/20 text-purple-primary rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black tracking-tight uppercase">Global Copy Engine</h2>
          </div>
          <div className="glass-card-premium rounded-3xl p-6 space-y-4 border border-white/5">
            {marketData.global_competitors?.map((comp, idx) => (
              <CompetitorCard key={idx} {...comp} />
            ))}
          </div>
        </section>

        {/* India Adaptation */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-secondary/20 text-blue-secondary rounded-xl flex items-center justify-center">
              <IndianRupee className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black tracking-tight uppercase">India Adaptation</h2>
          </div>
          <div className="glass-card-premium rounded-3xl p-8 space-y-8 hover:border-blue-secondary/20 transition-all group">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-yellow-500/10 text-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                 <IndianRupee className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black tracking-tight uppercase">Pricing Advantage</h3>
                <p className="text-2xl font-black text-white mt-3">{marketData.india_pricing}</p>
                <p className="text-base text-text-muted mt-1 opacity-50">vs {marketData.india_pricing_global} globally</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-purple-primary/10 text-purple-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                 <User className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black tracking-tight uppercase">Localized Features</h3>
                <div className="flex flex-wrap gap-2 mt-4">
                   {marketData.india_features?.map((f, i) => (
                     <span key={i} className="px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded-lg text-xs font-bold text-white hover:bg-white/5 transition-colors">
                       {f}
                     </span>
                   ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-blue-secondary/5 border border-blue-secondary/10 rounded-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-blue-secondary"></div>
               <h4 className="text-[9px] font-black uppercase tracking-widest text-blue-secondary mb-3">Market Insight</h4>
               <p className="text-lg italic text-text-primary leading-relaxed font-medium">"{marketData.india_user_behavior}"</p>
            </div>
          </div>
        </section>
      </div>

      {/* Competition Analysis Table */}
      {marketData.competition_analysis && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/20 text-yellow-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black tracking-tight uppercase">Competition Matrix</h2>
          </div>

          <div className="glass-card-premium rounded-3xl overflow-hidden border border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-text-muted">Competitor</th>
                  <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-text-muted">Tier</th>
                  <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-text-muted">Strength</th>
                  <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-text-muted w-1/3">Key Gaps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {marketData.competition_analysis.map((comp, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-black text-lg text-white group-hover:text-purple-primary transition-colors">{comp.name}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        comp.tier === 'High' ? 'bg-danger/10 text-danger border border-danger/5' : 
                        comp.tier === 'Medium' ? 'bg-warning/10 text-warning border border-warning/5' : 
                        'bg-success/10 text-success border border-success/5'
                      }`}>
                        {comp.tier} Tier
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="w-40 h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-500 to-warning transition-all duration-1000 shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{ width: `${comp.strength}%` }}></div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-teal-accent to-success transition-all duration-1000 shadow-[0_0_10px_rgba(45,212,191,0.5)]" style={{ width: `${comp.gaps}%` }}></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default MarketPage;
