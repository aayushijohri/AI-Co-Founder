import React from 'react';

const LoadingSkeleton = ({ type }) => {
  if (type === 'problem') {
    return (
      <div className="space-y-12 animate-pulse">
        <div className="bg-card w-full h-40 rounded-2xl border border-white/5 bg-gradient-to-r from-card to-white/5 bg-[length:200%_100%] animate-shimmer"></div>
        <div className="space-y-6">
          <div className="h-8 w-48 bg-white/5 rounded-lg"></div>
          <div className="h-40 w-full bg-white/5 rounded-2xl"></div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="h-32 bg-white/5 rounded-2xl"></div>
          <div className="h-32 bg-white/5 rounded-2xl"></div>
          <div className="h-32 bg-white/5 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-2/3 bg-white/5 rounded-lg"></div>
      <div className="h-32 w-full bg-white/5 rounded-2xl"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-24 bg-white/5 rounded-xl"></div>
        <div className="h-24 bg-white/5 rounded-xl"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
