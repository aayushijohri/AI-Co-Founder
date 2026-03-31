import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Send, MessageSquare, Target, Zap, Activity, Info, User, HelpCircle, Rocket, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const { chatHistory, sendMessage, confidenceScore, analyzeProblem, problem } = useAppContext();
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleQuickAction = (action) => {
    if (action === 'validate') {
      if (problem) {
        analyzeProblem(problem);
        navigate('/app/problem');
      } else {
        sendMessage("Help me validate this idea.");
      }
    } else if (action === 'generate') {
      sendMessage("Generate 5 startup ideas for me.");
    } else if (action === 'test') {
      navigate('/app/test');
    }
  };

  return (
    <aside className="w-72 h-screen glass-nav-premium border-r border-white/5 flex flex-col flex-shrink-0 z-40 fixed left-0 top-0">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-white/5 bg-white/[0.01]">
        <div className="flex items-center gap-3 mb-6 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-9 h-9 bg-purple-primary rounded-xl flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Rocket className="w-5 h-5" />
          </div>
          <span className="font-black text-xl tracking-tight uppercase gradient-text">AI Founder</span>
        </div>
        
        <div className="flex items-center gap-3 bg-white/[0.02] p-3.5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-primary to-blue-secondary rounded-full flex items-center justify-center text-white shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-white/10 animate-pulse-slow"></div>
            <User className="w-5 h-5 relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-white">Llama 3.3</span>
            <span className="text-[9px] font-black text-purple-primary uppercase tracking-widest">Co-Founder</span>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 scrollbar-hide">
        {chatHistory.map((msg, idx) => (
          <div 
            key={idx} 
            className={`max-w-[92%] p-3.5 rounded-2xl text-[13px] leading-relaxed animate-in ${
              msg.role === 'user' 
                ? 'bg-purple-primary ml-auto text-white rounded-br-none shadow-lg shadow-purple-primary/20 font-medium' 
                : 'bg-white/[0.02] border border-white/5 mr-auto text-text-primary rounded-bl-none backdrop-blur-md'
            }`}
          >
            {msg.content === '...' ? (
              <div className="flex gap-1 py-1">
                <div className="w-1.5 h-1.5 bg-purple-primary rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-purple-primary rounded-full animate-bounce delay-150"></div>
                <div className="w-1.5 h-1.5 bg-purple-primary rounded-full animate-bounce delay-300"></div>
              </div>
            ) : (
              msg.content
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-5 grid grid-cols-1 gap-2.5 bg-white/[0.01] border-t border-white/5">
        <button 
          onClick={() => handleQuickAction('validate')}
          className="flex items-center justify-between px-3.5 py-2.5 text-[10px] font-black uppercase tracking-widest bg-white/[0.02] border border-white/5 rounded-xl hover:border-purple-primary/30 transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <Target className="w-3.5 h-3.5 text-blue-secondary" /> Validate Idea
          </div>
          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <button 
          onClick={() => handleQuickAction('generate')}
          className="flex items-center justify-between px-3.5 py-2.5 text-[10px] font-black uppercase tracking-widest bg-white/[0.02] border border-white/5 rounded-xl hover:border-purple-primary/30 transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <Zap className="w-3.5 h-3.5 text-purple-primary" /> Core Strategy
          </div>
          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Input Area */}
      <div className="p-5 border-t border-white/5 bg-surface/80 backdrop-blur-3xl">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Ask AI Founder..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-white/[0.04] border border-white/5 rounded-xl px-4 py-3 pr-12 text-[13px] focus:outline-none focus:border-purple-primary/30 transition-all placeholder:text-text-muted/40 font-medium"
          />
          <button 
            onClick={handleSend}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-purple-primary text-white rounded-lg hover:bg-purple-light transition-all shadow-md shadow-purple-primary/10 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        
        {/* Confidence Badge */}
        <div className="mt-4 p-3 bg-white/[0.02] border border-white/5 rounded-2xl">
          <div className="flex items-center justify-between mb-1.5 px-0.5">
            <span className="text-[9px] uppercase tracking-widest font-black text-text-muted">AI Certainty</span>
            <span className="text-[9px] font-black text-purple-primary">{confidenceScore}%</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-primary to-blue-secondary transition-all duration-1000" 
              style={{ width: `${confidenceScore}%` }}
            ></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

