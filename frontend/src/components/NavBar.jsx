import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';

  const dashboardTabs = [
    { id: 'problem', name: 'Problem', path: '/app/problem' },
    { id: 'validation', name: 'Validation', path: '/app/validation' },
    { id: 'market', name: 'Market', path: '/app/market' },
    { id: 'idea', name: 'Idea', path: '/app/idea' },
    { id: 'test', name: 'Test', path: '/app/test' },
    { id: 'launch', name: 'Launch', path: '/app/launch' },
  ];

  const landingLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <header className={`fixed top-3 left-3 right-3 h-16 z-50 flex items-center justify-between px-6 rounded-2xl transition-all duration-500 ${
      isLanding ? 'glass-nav-premium' : 'glass-nav-premium border border-white/5 left-[18.75rem]'
    }`}>
      {/* Logo */}
      <div 
        className="flex items-center gap-2.5 cursor-pointer group"
        onClick={() => navigate('/')}
      >
        <div className="w-8 h-8 rounded-lg bg-purple-primary flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:rotate-12 transition-all">
          <Rocket className="w-4 h-4" />
        </div>
        <span className="text-xl font-black tracking-tight gradient-text">AI Founder</span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-1.5">
        {isLanding ? (
          landingLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-xs font-black uppercase tracking-widest text-text-muted hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))
        ) : (
          <div className="flex items-center gap-0.5 bg-white/[0.02] p-0.5 rounded-lg border border-white/5">
            {dashboardTabs.map((tab) => (
              <NavLink
                key={tab.id}
                to={tab.path}
                className={({ isActive }) => 
                  `px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
                    isActive 
                      ? 'bg-purple-primary text-white shadow-md' 
                      : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                  }`
                }
              >
                {tab.name}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {isLanding ? (
          <button 
            onClick={() => navigate('/app')}
            className="btn-premium px-5 py-2 text-xs font-black uppercase tracking-widest"
          >
            Launch App
          </button>
        ) : (
          <button className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-all active:scale-95 shadow-lg shadow-white/5">
            Save
          </button>
        )}
      </div>
    </header>
  );
};

export default NavBar;

