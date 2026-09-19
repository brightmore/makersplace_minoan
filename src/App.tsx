import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CircuitBackground } from './components/CircuitBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { ScrollToTop } from './components/ScrollToTop';
import { SportId } from './types';
import { Sparkles } from 'lucide-react';

// Individual Page Components
import { HomePage } from './pages/HomePage';
import { SportsPage } from './pages/SportsPage';
import { MediaHubPage } from './pages/MediaHubPage';
import { RulesPage } from './pages/RulesPage';
import { PathwayPage } from './pages/PathwayPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { SponsorsPage } from './pages/SponsorsPage';

export const App: React.FC = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedSportForRegister, setSelectedSportForRegister] = useState<SportId | null>(null);

  const handleOpenRegister = (sportId?: SportId) => {
    setSelectedSportForRegister(sportId || null);
    setIsRegisterOpen(true);
  };

  return (
    <BrowserRouter>
      {/* Scroll restoration to top on route change */}
      <ScrollToTop />

      <div className="min-h-screen bg-[#070a12] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col justify-between">
        {/* Dynamic Circuit & Particle Mesh Background */}
        <CircuitBackground />

        {/* Global Sticky Frosted Glass Navigation Bar */}
        <Navbar onOpenRegister={() => handleOpenRegister()} />

        {/* Multi-Page Route Outlet */}
        <main className="relative z-10 flex-1">
          <Routes>
            <Route 
              path="/" 
              element={<HomePage onOpenRegister={handleOpenRegister} />} 
            />
            <Route 
              path="/sports" 
              element={<SportsPage onOpenRegisterWithSport={handleOpenRegister} />} 
            />
            <Route 
              path="/media" 
              element={<MediaHubPage />} 
            />
            <Route 
              path="/rules" 
              element={<RulesPage />} 
            />
            <Route 
              path="/pathway" 
              element={<PathwayPage />} 
            />
            <Route 
              path="/resources" 
              element={<ResourcesPage />} 
            />
            <Route 
              path="/sponsors" 
              element={<SponsorsPage />} 
            />
            {/* Fallback to Home */}
            <Route 
              path="*" 
              element={<Navigate to="/" replace />} 
            />
          </Routes>
        </main>

        {/* Global Footer & Back to Top */}
        <Footer />

        {/* Multi-Step Interactive Registration Modal (Accessible from any page) */}
        <RegistrationModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          initialSportId={selectedSportForRegister}
        />

        {/* Persistent Floating Quick-Action Button on Mobile/Tablet */}
        <div className="fixed bottom-5 left-5 z-40 lg:hidden">
          <button
            onClick={() => handleOpenRegister()}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.7)] active:scale-95 transition-transform"
            aria-label="Register Team"
          >
            <Sparkles className="w-4 h-4" />
            <span>Register Team</span>
          </button>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
