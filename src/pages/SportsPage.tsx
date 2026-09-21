import React from 'react';
import { SportsGrid } from '../components/SportsGrid';
import { SportId } from '../types';
import { Bot, Trophy, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { createBreadcrumbSchema } from '../utils/seoSchemas';

interface SportsPageProps {
  onOpenRegisterWithSport: (sportId: SportId) => void;
}

export const SportsPage: React.FC<SportsPageProps> = ({ onOpenRegisterWithSport }) => {
  return (
    <div className="pt-6 pb-20 relative z-10">
      <SEOHead
        title="7 Official RobotSports Disciplines & Technical Specs | MINOAN 2027"
        description="Explore all 7 regulated RobotSports disciplines for MINOAN Ghana 2027: Drone Obstacle, Drone Soccer, Robot Marathon, 3v3 Football, Archery, Innovation, and Target Shooting."
        keywords="MINOAN disciplines, drone racing Ghana, drone soccer Africa, robot marathon, 3v3 autonomous football, robotic archery, robotics rules"
        canonicalPath="/sports"
        jsonLd={createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'RobotSports Disciplines', path: '/sports' },
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <Link to="/" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Home
          </Link>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">RobotSports Disciplines</span>
        </div>

        {/* Page Hero Banner */}
        <div className="relative rounded-2xl bg-slate-900 border border-cyan-500/30 p-6 sm:p-10 mb-12 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80')" }} 
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest">
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>Official 2027 Competition Roster</span>
              </div>

              <h1 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
                Official Minoan <br className="hidden sm:inline" />
                <span className="text-cyan-400">
                  RobotSports Disciplines
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Engineered to test mechanical endurance, sub-millimeter precision, and autonomous code execution under official H.E.R.O. Minoan Global Olympiad standards. Click any discipline to explore its dedicated page, official rulebook, scoring rubric, and paddock inspection specifications.
              </p>

              {/* Quick Feature Badges */}
              <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  3 Competing Divisions (Junior, Senior, Open)
                </span>
                <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  FIDA & World Minoan Standards Compliant
                </span>
              </div>
            </div>

            {/* Right Featured Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 shadow-2xl bg-slate-950 group">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 z-10" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 z-10" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 z-10" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 z-10" />

                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80"
                    alt="Minoan RobotSports Arena"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/30" />

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/90 border border-cyan-400/60 text-[10px] font-mono text-cyan-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="font-bold">7 REGULATED ARENAS</span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-white font-semibold">Official Competition Pitches</span>
                    <span className="text-cyan-400">HERO Sanctioned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main 7 Sports Grid Component */}
        <SportsGrid onOpenRegisterWithSport={onOpenRegisterWithSport} />

        {/* Navigation to Media Hub / Rules */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/rules"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-amber-400 transition-colors"
          >
            <span>← Review Rule Zero & Pre-Flight Scrutineering</span>
          </Link>
          <Link
            to="/media"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-cyan-300 border border-cyan-500/40 text-xs font-orbitron font-bold uppercase tracking-wider transition-colors"
          >
            <span>Explore Arena Visualizer & Media Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
