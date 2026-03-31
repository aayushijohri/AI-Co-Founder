import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Lightbulb, Rocket, Globe, ShieldCheck, CheckCircle2, DollarSign, Code, AlertCircle } from 'lucide-react';

const IdeaCard = ({ approach, name, description, tags, isSelected, onSelect }) => {
  const approachColors = {
    Safe: 'text-success bg-success/10 border-success/20',
    Innovative: 'text-purple-primary bg-purple-primary/10 border-purple-primary/20',
    Disruptive: 'text-blue-secondary bg-blue-secondary/10 border-blue-secondary/20',
  };

  return (
    <div 
      onClick={onSelect}
      className={`glass-card-premium rounded-3xl p-6 cursor-pointer transition-all duration-300 group relative border border-white/5 ${
        isSelected 
          ? 'border-purple-primary/40 shadow-[0_0_20px_rgba(168,85,247,0.15)] scale-[1.01]' 
          : 'hover:border-white/10'
      }`}
    >
      <div className={`inline-block px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 ${approachColors[approach] || 'text-white bg-white/10'}`}>
        {approach}
      </div>
      <h3 className="text-xl font-black text-white mb-3 tracking-tight">{name}</h3>
      <p className="text-xs text-text-muted leading-relaxed mb-6 group-hover:text-white transition-colors font-medium">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags?.map((tag, idx) => (
          <span key={idx} className="px-2 py-0.5 bg-white/[0.02] border border-white/5 rounded-full text-[8px] font-black text-text-muted uppercase tracking-widest group-hover:border-purple-primary/20 transition-colors">
            {tag}
          </span>
        ))}
      </div>
      
      {isSelected && (
        <div className="absolute top-4 right-4 text-purple-primary shadow-[0_0_15px_rgba(168,85,247,0.3)] bg-purple-primary/10 rounded-full p-1.5">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

const IdeaPage = () => {
  const { problem, ideasData, fetchIdeasData, selectedIdea, setSelectedIdea, loadingStates, errorStates } = useAppContext();
  const navigate = useNavigate();

  const loading = loadingStates.ideas;
  const error = errorStates.ideas;

  useEffect(() => {
    if (!problem) {
      navigate('/app/problem');
      return;
    }
    if (!ideasData && !loading) {
      fetchIdeasData();
    }
  }, [problem]);

  useEffect(() => {
    if (ideasData?.ideas?.length > 0 && !selectedIdea) {
      setSelectedIdea(ideasData.ideas[0]);
    }
  }, [ideasData]);

  if (!problem) return null;

  if (loading) {
    return (
      <div className="space-y-10 animate-in">
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-black uppercase gradient-text-purple">Ideating</h1>
          <p className="text-lg text-text-muted font-medium">Forging Safe, Innovative, and Disruptive blueprints...</p>
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

  if (!ideasData?.ideas) return null;

  const idea = selectedIdea || ideasData.ideas[0];

  return (
    <div className="space-y-12 animate-in pb-20 max-w-5xl mx-auto">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase gradient-text-purple">Idea + Build</h1>
        <p className="text-lg text-text-muted font-medium">Choose your weapon. Dominate the market.</p>
      </div>

      {/* Idea Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ideasData.ideas.map((item, idx) => (
          <IdeaCard 
            key={idx} 
            {...item} 
            isSelected={selectedIdea?.name === item.name}
            onSelect={() => setSelectedIdea(item)}
          />
        ))}
      </div>

      {/* Startup Blueprint */}
      {idea && (
        <section className="space-y-10 animate-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-primary/20 text-purple-primary rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Rocket className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-black tracking-tight uppercase">Execution Blueprint</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Target Users */}
            <div className="glass-card-premium rounded-3xl p-8 space-y-6 hover:border-purple-primary/20 transition-all border border-white/5">
              <div className="flex items-center gap-3 text-purple-primary">
                <Globe className="w-5 h-5" />
                <h3 className="text-xl font-black tracking-tight uppercase text-white">Target Segments</h3>
              </div>
              
              <div className="space-y-4">
                {idea.target_users?.map((user, idx) => (
                  <div key={idx} className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2 hover:bg-white/[0.04] transition-colors group">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-lg text-white group-hover:text-purple-primary transition-colors">{user.type}</span>
                      <span className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        user.priority === 'Primary' ? 'bg-purple-primary text-white shadow-md' : 'bg-white/5 text-text-muted'
                      }`}>
                        {user.priority}
                      </span>
                    </div>
                    <p className="text-sm text-text-muted font-medium leading-relaxed italic opacity-80 group-hover:opacity-100 italic">"{user.pain}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MVP Features */}
            <div className="glass-card-premium rounded-3xl p-8 space-y-6 hover:border-blue-secondary/20 transition-all border border-white/5">
              <div className="flex items-center gap-3 text-blue-secondary">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-xl font-black tracking-tight uppercase text-white">MVP Pulse</h3>
              </div>
              
              <div className="space-y-3">
                {idea.mvp_features?.map((feature, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/[0.03] rounded-2xl group hover:bg-white/[0.03] transition-all">
                    <span className="text-base font-bold text-white group-hover:translate-x-1 transition-transform">{feature.name}</span>
                    <span className={`px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      feature.priority === 'Must Have' ? 'bg-success/10 text-success border border-success/10' : 
                      feature.priority === 'Nice to Have' ? 'bg-warning/10 text-warning border border-warning/10' : 
                      'bg-white/5 text-text-muted'
                    }`}>
                      {feature.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monetization */}
            <div className="glass-card-premium rounded-3xl p-8 space-y-6 hover:border-teal-accent/20 transition-all border border-white/5">
              <div className="flex items-center gap-3 text-teal-accent">
                <DollarSign className="w-5 h-5" />
                <h3 className="text-xl font-black tracking-tight uppercase text-white">Revenue Models</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {idea.monetization?.map((model, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-5 bg-white/[0.02] rounded-2xl border border-white/5 hover:border-teal-accent/30 transition-all group">
                    <div className="w-8 h-8 bg-teal-accent/10 rounded-lg flex items-center justify-center text-teal-accent group-hover:bg-teal-accent group-hover:text-black transition-all">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-base font-bold text-white">{model}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="glass-card-premium rounded-[32px] p-10 space-y-8 hover:border-purple-primary/30 transition-all border border-white/5">
              <div className="flex items-center gap-4 text-purple-primary">
                <Code className="w-6 h-6" />
                <h3 className="text-2xl font-black tracking-tighter uppercase text-white">Foundry Stack</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {idea.tech_stack?.map((tech, idx) => (
                  <div key={idx} className="px-6 py-3 bg-gradient-to-br from-purple-primary/10 to-transparent border border-purple-primary/20 rounded-2xl text-sm font-black uppercase tracking-widest text-purple-primary hover:scale-105 transition-transform cursor-default">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default IdeaPage;
