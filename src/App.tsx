import React, { useState } from 'react';
import { CircuitBackground } from './components/CircuitBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TickerBar } from './components/TickerBar';
import { PillarsSection } from './components/PillarsSection';
import { SportsGrid } from './components/SportsGrid';
import { MediaHub } from './components/MediaHub';
import { PathwaySection } from './components/PathwaySection';
import { InspectionChecklist } from './components/InspectionChecklist';
import { ResourcesSection } from './components/ResourcesSection';
import { SponsorsSection } from './components/SponsorsSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { SportId } from './types';
import { Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedSportForRegister, setSelectedSportForRegister] = useState<SportId | null>(null);

  const handleOpenRegister = (sportId?: SportId) => {
    setSelectedSportForRegister(sportId || null);
    setIsRegisterOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic Circuit & Particle Mesh Background */}
      <CircuitBackground />

      {/* Sticky Frosted Glass Navigation Bar */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

      {/* Main Page Content */}
      <main className="relative z-10">
        {/* Hero Section with Live Countdown */}
        <Hero onOpenRegister={() => handleOpenRegister()} />

        {/* Infinite Ticker Bar & Rule Zero Warning HUD */}
        <TickerBar />

        {/* 4 Pillars of RobotSports */}
        <PillarsSection />

        {/* 7 RobotSports Challenge Grid with Filters, PDF Previews & Tech Specs */}
        <SportsGrid onOpenRegisterWithSport={(sportId) => handleOpenRegister(sportId)} />

        {/* Interactive Media Hub & Arena Visualizer */}
        <MediaHub />

        {/* Global Pathway to World Finals */}
        <PathwaySection />

        {/* Pre-Flight Inspection Checklist & Interactive Self-Assessment */}
        <InspectionChecklist />

        {/* Official Downloads Center */}
        <ResourcesSection />

        {/* Sponsors & Partner Ecosystem */}
        <SponsorsSection />
      </main>

      {/* Footer & Back to Top */}
      <Footer />

      {/* Multi-Step Interactive Registration Modal */}
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
  );
};

export default App;
