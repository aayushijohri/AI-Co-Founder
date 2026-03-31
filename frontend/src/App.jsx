import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import ProblemPage from './pages/ProblemPage';
import ValidationPage from './pages/ValidationPage';
import MarketPage from './pages/MarketPage';
import IdeaPage from './pages/IdeaPage';
import TestPage from './pages/TestPage';
import LaunchPage from './pages/LaunchPage';
import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';

const AppLayout = ({ children }) => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="relative min-h-screen bg-background text-white font-sans overflow-x-hidden selection:bg-purple-primary selection:text-white">
      {/* Premium Background Layers */}
      <div className="fixed inset-0 z-0 bg-background overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.02)_1px,transparent_0)] bg-[size:40px_40px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-glow-mesh-center"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {!isLanding && (
          <div className="fixed inset-y-0 left-0 w-72 z-50">
             <Sidebar />
          </div>
        )}
        
        <div className={`flex flex-col flex-1 ${!isLanding ? 'ml-72' : ''}`}>
          <NavBar />
          <main className={`flex-1 relative ${!isLanding ? 'px-6 py-6 pt-16' : 'pt-14'}`}>
            <div className="max-w-5xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Global Aesthetics Overlay */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-primary to-transparent opacity-50 z-[100] animate-pulse"></div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<ProblemPage />} />
            <Route path="/app/problem" element={<ProblemPage />} />
            <Route path="/app/validation" element={<ValidationPage />} />
            <Route path="/app/market" element={<MarketPage />} />
            <Route path="/app/idea" element={<IdeaPage />} />
            <Route path="/app/test" element={<TestPage />} />
            <Route path="/app/launch" element={<LaunchPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppLayout>
      </Router>
    </AppProvider>
  );
}

export default App;
