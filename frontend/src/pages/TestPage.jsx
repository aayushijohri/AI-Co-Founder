import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import LoadingSkeleton from '../components/LoadingSkeleton';
import DonutChart from '../components/charts/DonutChart';
import SurvivalChart from '../components/charts/SurvivalChart';
import axios from 'axios';
import { Activity, ShieldAlert, User, Briefcase, Zap, Play, AlertCircle } from 'lucide-react';

const TestPage = () => {
  const { problem, testData, fetchTestData, problemData, loadingStates, errorStates } = useAppContext();
  const navigate = useNavigate();
  const [pivotResults, setPivotResults] = useState({});
  const [loadingPivot, setLoadingPivot] = useState(null);

  const loading = loadingStates.test;
  const error = errorStates.test;

  useEffect(() => {
    if (!problem) {
      navigate('/app/problem');
      return;
    }
    if (!testData && !loading) {
      fetchTestData();
    }
  }, [problem]);

  const handleSimulate = async (scenario, index) => {
    setLoadingPivot(index);
    try {
      const response = await axios.post('http://localhost:8000/api/simulate-pivot', {
        startup_context: `Problem: ${problem}. Refined: ${problemData?.refined_problem || problem}`,
        scenario: scenario.name
      });
      setPivotResults(prev => ({ ...prev, [index]: response.data }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPivot(null);
    }
  };

  if (!problem) return null;

  if (loading) {
    return (
      <div className="space-y-12 animate-fadeIn">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Stress Testing</h1>
          <p className="text-text-muted">Simulating users and calculating survival probability...</p>
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

  if (!testData) return null;

  const donutData = [
    { name: 'Like', value: testData.user_like_pct },
    { name: 'Drop', value: testData.user_drop_pct },
    { name: 'Confused', value: testData.user_confused_pct }
  ];

  return (
    <div className="space-y-12 animate-in pb-20 max-w-5xl mx-auto">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase gradient-text-purple">Stress test</h1>
        <p className="text-lg text-text-muted font-medium">Simulate real-world failure and resilience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Simulation */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-primary/20 text-purple-primary rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black tracking-tight uppercase">User Simulation</h2>
          </div>
          
          <div className="glass-card-premium rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 hover:border-purple-primary/20 transition-all group border border-white/5">
            <div className="relative group-hover:scale-105 transition-transform duration-500 shrink-0">
               <DonutChart data={donutData} totalLabel={`${testData.user_like_pct}%`} />
            </div>
            <div className="flex-1 space-y-6 w-full">
              <div className="space-y-3">
                <div className="flex items-center justify-between group/item">
                   <div className="flex items-center gap-3">
                     <div className="w-3 h-3 rounded-full bg-purple-primary shadow-[0_0_8px_rgba(168,85,247,0.4)]"></div>
                     <span className="text-base font-bold text-white">Would Use</span>
                   </div>
                   <span className="text-xl font-black text-purple-primary">{testData.user_like_pct}%</span>
                </div>
                <div className="flex items-center justify-between group/item opacity-60 hover:opacity-100 transition-opacity">
                   <div className="flex items-center gap-3">
                     <div className="w-3 h-3 rounded-full bg-danger shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
                     <span className="text-base font-bold text-white">Would Drop</span>
                   </div>
                   <span className="text-xl font-black text-danger">{testData.user_drop_pct}%</span>
                </div>
              </div>
              
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-success"></div>
                <h4 className="text-[9px] uppercase font-black tracking-widest text-success mb-2">The User Voice</h4>
                <p className="text-base text-text-primary italic leading-relaxed font-medium">"{testData.user_like_reason}"</p>
              </div>
            </div>
          </div>
        </section>

        {/* Survival Probability */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/10 text-yellow-500 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black tracking-tight uppercase">Failure Risk</h2>
          </div>

          <div className="glass-card-premium rounded-3xl p-8 space-y-8 hover:border-yellow-500/20 transition-all group border border-white/5">
             <div className="flex items-end justify-between">
                <div>
                   <div className="text-5xl font-black text-yellow-500 tracking-tight group-hover:scale-105 transition-transform origin-left">{testData.survival_rate}%</div>
                   <div className="text-[9px] font-black text-text-muted uppercase tracking-widest mt-1">Survival Probability</div>
                </div>
                <div className="text-right">
                   <div className="px-5 py-1.5 bg-yellow-500/10 text-yellow-500 border border-yellow-500/10 rounded-full text-[9px] font-black uppercase tracking-widest">{testData.survival_label}</div>
                </div>
             </div>
             
             <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-danger via-warning to-success transition-all duration-1000 shadow-[0_0_10px_rgba(245,158,11,0.4)]" 
                  style={{ width: `${testData.survival_rate}%` }}
                ></div>
             </div>

             <div className="pt-2 h-[180px]">
                <SurvivalChart data={testData.survival_by_year} />
             </div>
          </div>
        </section>
      </div>

      {/* Devil's Advocate */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-danger/20 text-danger rounded-xl flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-black tracking-tight uppercase">Devil's Advocate</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { role: 'VC', question: testData.vc_question, icon: <Briefcase className="w-5 h-5" /> },
            { role: 'User', question: testData.user_question, icon: <User className="w-5 h-5" /> },
            { role: 'Big Tech', question: testData.bigtech_question, icon: <Zap className="w-5 h-5" /> }
          ].map((item, idx) => (
            <div key={idx} className="glass-card-premium rounded-3xl p-6 space-y-4 hover:border-danger/20 transition-all group border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/[0.02] text-text-muted rounded-xl border border-white/5 flex items-center justify-center group-hover:bg-danger group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <span className="text-lg font-black uppercase tracking-tight text-white">{item.role}</span>
              </div>
              <p className="text-lg text-text-primary italic leading-relaxed font-bold">"{item.question}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pivot Simulator */}
      {testData.pivot_scenarios && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-secondary/20 text-blue-secondary rounded-xl flex items-center justify-center">
              <Play className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black tracking-tight uppercase">Pivot Defense</h2>
          </div>

          <div className="glass-card-premium rounded-3xl overflow-hidden border border-white/5 divide-y divide-white/5">
            {testData.pivot_scenarios.map((scenario, idx) => (
              <div key={idx} className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:bg-white/[0.01] transition-colors group">
                <div className="flex-1 space-y-2">
                  <h4 className="text-xl font-black text-white group-hover:text-blue-secondary transition-colors tracking-tight">{scenario.name}</h4>
                  <p className="text-base text-text-muted font-medium">{scenario.description}</p>
                </div>
                
                <div className="flex items-center gap-10 w-full md:w-auto">
                  <div className="flex-1 md:w-56 space-y-2">
                    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-text-muted">
                      <span>Survivability Lift</span>
                      <span className={pivotResults[idx] ? (pivotResults[idx].survival_impact >= 0 ? 'text-success' : 'text-danger') : ''}>
                        {pivotResults[idx] ? `${pivotResults[idx].survival_impact >= 0 ? '+' : ''}${pivotResults[idx].survival_impact}%` : 'TBD'}
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className={`h-full transition-all duration-700 ${pivotResults[idx] ? (pivotResults[idx].survival_impact >= 0 ? 'bg-success shadow-[0_0_8px_#10b981]' : 'bg-danger shadow-[0_0_8px_#ef4444]') : 'bg-white/5'}`} 
                        style={{ width: pivotResults[idx] ? `${Math.max(10, Math.min(100, 50 + pivotResults[idx].survival_impact * 2))}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleSimulate(scenario, idx)}
                    disabled={loadingPivot !== null}
                    className="px-6 py-3.5 bg-white text-black rounded-full font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 disabled:opacity-50 min-w-[160px]"
                  >
                    {loadingPivot === idx ? 'CALCULATING...' : 'EXECUTE PIVOT'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default TestPage;
