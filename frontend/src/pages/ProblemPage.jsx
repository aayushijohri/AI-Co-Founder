import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import LoadingSkeleton from '../components/LoadingSkeleton';
import MetricCard from '../components/cards/MetricCard';
import { Target, Zap, Clock, ChevronDown, ChevronUp, AlertCircle, Rocket } from 'lucide-react';

const ProblemPage = () => {
  const { 
    problem, fetchProblemData, problemData, resetAllData,
    loadingStates, errorStates 
  } = useAppContext();
  const [inputValue, setInputValue] = useState(problem || '');
  const [timingExpanded, setTimingExpanded] = useState(true);

  const loading = loadingStates.problem;
  const error = errorStates.problem;

  const handleValidate = () => {
    if (!inputValue || !inputValue.trim()) return;
    resetAllData();
    fetchProblemData(inputValue);
  };

  if (loading) {
    return (
      <div className="space-y-10 animate-in">
        <div className="text-center space-y-3">
          <h1 className="text-2xl md:text-4xl font-black uppercase gradient-text-purple">Analyzing Idea</h1>
          <p className="text-sm text-text-muted font-medium">Decoding and validating with Llama 3...</p>
        </div>
        <LoadingSkeleton type="problem" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in pb-20 max-w-5xl mx-auto">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase gradient-text-purple">Problem + Context</h1>
        <p className="text-sm text-text-muted font-medium">Decode market gaps with AI intelligence</p>
      </div>

      {/* Main Input Card - Guaranteed Interactive */}
      <div className="bg-[#0A0B14] border-2 border-white/10 rounded-2xl p-6 shadow-2xl relative z-50 hover:border-purple-primary/50 transition-colors">
        <textarea
          autoFocus
          id="problem-input"
          placeholder="Type your startup idea right here..."
          defaultValue={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="relative z-50 w-full bg-transparent border-none focus:ring-0 focus:outline-none text-xl font-bold min-h-[140px] resize-none text-white placeholder:text-white/20 select-text"
          style={{ pointerEvents: 'auto', WebkitUserSelect: 'text', userSelect: 'auto' }}
        />
        <div className="flex justify-end mt-6">
          <button
            onClick={handleValidate}
            className={`btn-premium flex items-center gap-2 ${(!inputValue || !inputValue.trim() || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Validate Idea <Rocket className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-danger/10 border border-danger/20 rounded-2xl text-danger flex items-center gap-3 animate-in uppercase text-[10px] font-black tracking-widest">
          <AlertCircle className="w-4 h-4" />
          <p>{error}</p>
        </div>
      )}

      {problemData && (
        <div className="space-y-12">
          {/* Section 1: Problem Definition */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-primary/20 text-purple-primary rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <Target className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-black tracking-tight uppercase">Problem Definition</h2>
            </div>
            
            <div className="glass-card-premium rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-primary shadow-[0_0_15px_rgba(168,85,247,0.4)]"></div>
              <p className="text-lg md:text-xl font-bold text-white leading-tight tracking-tight pl-4">
                "{problemData.refined_problem}"
              </p>
              
              <div className="flex flex-wrap gap-3 mt-8 pl-4">
                {['target', 'pain', 'gap'].map((key) => (
                  <div key={key} className="px-4 py-1 bg-white/[0.02] border border-white/5 rounded-full text-[9px] font-black uppercase tracking-widest text-text-muted hover:text-white hover:border-white/10 transition-all cursor-default">
                    <span className="text-purple-primary mr-2">{key}:</span> {problemData[key]}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Validation Metrics */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-secondary/20 text-blue-secondary rounded-xl flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-black tracking-tight uppercase">Validation & Depth</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <MetricCard 
                title="Market Demand"
                value={`${problemData.demand_score}%`}
                progress={problemData.demand_score}
                color="purple"
              />
              <MetricCard 
                title="Competition"
                label={problemData.competition_level}
                subLabel={problemData.competition_sub}
                color={problemData.competition_level === 'Low' ? 'success' : problemData.competition_level === 'Medium' ? 'warning' : 'danger'}
              />
              <MetricCard 
                title="Problem Intensity"
                label={problemData.problem_depth}
                subLabel={problemData.problem_depth_sub}
                color={problemData.problem_depth === 'High' ? 'success' : problemData.problem_depth === 'Medium' ? 'warning' : 'danger'}
              />
            </div>
          </section>

          {/* Timing Oracle */}
          <section className="glass-card-premium rounded-3xl overflow-hidden hover:border-yellow-500/20 group">
            <div 
              className="p-5 flex items-center justify-between cursor-pointer"
              onClick={() => setTimingExpanded(!timingExpanded)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight uppercase">Timing Oracle</h3>
                  <div className={`mt-1 px-3 py-0.5 rounded-full text-[9px] uppercase font-black inline-block tracking-[0.2em] ${
                    problemData.timing_label === 'Perfect Timing' ? 'bg-success/20 text-success' :
                    problemData.timing_label === 'Too Early' ? 'bg-warning/20 text-warning' :
                    'bg-danger/20 text-danger'
                  }`}>
                    {problemData.timing_label}
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                {timingExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </div>
            
            {timingExpanded && (
              <div className="px-5 pb-6 pt-2 border-t border-white/5 animate-in">
                <p className="text-sm text-text-muted leading-relaxed font-medium">
                  {problemData.timing_explanation}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[9px] text-text-muted/30 font-black uppercase tracking-widest">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                  AI FOUNDER TIMING ENGINE V2
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {/* Placeholder if no data */}
      {!problemData && !loading && (
        <div className="text-center py-12 opacity-30">
          <div className="mx-auto w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/5">
             <Rocket className="w-8 h-8 text-text-muted" />
          </div>
          <p className="text-sm font-medium">Input your idea above to begin analysis</p>
        </div>
      )}
    </div>
  );
};

export default ProblemPage;
