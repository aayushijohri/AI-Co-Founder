import React from 'react';

const MetricCard = ({ title, value, progress, label, subLabel, color = 'purple' }) => {
  const glowClasses = {
    purple: 'shadow-[0_0_20px_rgba(168,85,247,0.15)] border-purple-primary/20',
    teal: 'shadow-[0_0_20px_rgba(45,212,191,0.15)] border-teal-accent/20',
    success: 'shadow-[0_0_20px_rgba(16,185,129,0.15)] border-success/20',
    warning: 'shadow-[0_0_20px_rgba(245,158,11,0.15)] border-warning/20',
    danger: 'shadow-[0_0_20px_rgba(239,68,68,0.15)] border-danger/20',
  };

  const accentClasses = {
    purple: 'text-purple-primary bg-purple-primary/10',
    teal: 'text-teal-accent bg-teal-accent/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    danger: 'text-danger bg-danger/10',
  };

  const barClasses = {
    purple: 'bg-purple-primary shadow-[0_0_10px_rgba(168,85,247,0.5)]',
    teal: 'bg-teal-accent shadow-[0_0_10px_rgba(45,212,191,0.5)]',
    success: 'bg-success shadow-[0_0_10px_rgba(16,185,129,0.5)]',
    warning: 'bg-warning shadow-[0_0_10px_rgba(245,158,11,0.5)]',
    danger: 'bg-danger shadow-[0_0_10px_rgba(239,68,68,0.5)]',
  };

  return (
    <div className={`glass-card-premium rounded-2xl p-6 hover-lift ${glowClasses[color]}`}>
      <h4 className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-4">{title}</h4>
      
      {value ? (
        <div className="space-y-4">
          <div className="text-3xl md:text-4xl font-black text-white tracking-tight">{value}</div>
          {progress !== undefined && (
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${barClasses[color]} transition-all duration-1000`} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${accentClasses[color]}`}>
            {label}
          </div>
          <p className="text-[13px] text-text-muted font-medium leading-relaxed">{subLabel}</p>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
