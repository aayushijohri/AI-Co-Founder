import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Globe, Zap } from 'lucide-react';

const CompetitorCard = ({ name, country, description, highlight }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card/40 border border-white/5 rounded-xl transition-all hover:bg-card/60">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-text-muted">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-text-primary">{name}</h4>
              <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-text-muted font-bold uppercase tracking-wider">
                {country}
              </span>
            </div>
            <p className="text-xs text-text-muted mt-1 line-clamp-1">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-success/10 border border-success/20 rounded text-[10px] text-success font-black uppercase tracking-widest">
            <Zap className="w-3 h-3" /> {highlight}
          </div>
          {expanded ? <ChevronDown className="w-5 h-5 text-text-muted" /> : <ChevronRight className="w-5 h-5 text-text-muted" />}
        </div>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-white/5 animate-fadeIn">
          <p className="text-sm text-text-muted leading-relaxed mt-4">
            {description}
          </p>
          <div className="mt-4 md:hidden">
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-success/10 border border-success/20 rounded text-[10px] text-success font-black uppercase tracking-widest">
              <Zap className="w-3 h-3" /> {highlight}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitorCard;
