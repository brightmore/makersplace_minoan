import React from 'react';
import { SportsGrid } from '../components/SportsGrid';
import { SportId } from '../types';
import { Bot, Trophy, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SportsPageProps {
  onOpenRegisterWithSport: (sportId: SportId) => void;
}

export const SportsPage: React.FC<SportsPageProps> = ({ onOpenRegisterWithSport }) => {
  return (
    <div className="pt-6 pb-20 relative z-10">
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
        <div className="relative rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-950 to-slate-900/80 border border-cyan-500/30 p-8 sm:p-12 mb-12 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official 2027 Competition Roster</span>
            </div>

            <h1 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
              Official Minoan <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
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
