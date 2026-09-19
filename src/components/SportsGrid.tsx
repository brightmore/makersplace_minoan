import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPORTS_DATA } from '../data/sportsData';
import { SportChallenge, SportId } from '../types';
import { RulebookModal } from './RulebookModal';
import { TechSpecsDrawer } from './TechSpecsDrawer';
import { 
  FileText, 
  Sliders, 
  UserPlus, 
  Clock, 
  Trophy, 
  Users, 
  ArrowRight,
  Plane, 
  ShieldAlert, 
  Activity, 
  Crosshair, 
  Target, 
  Sparkles,
  Zap
} from 'lucide-react';

interface SportsGridProps {
  onOpenRegisterWithSport: (sportId: SportId) => void;
}

type FilterCategory = 'all' | 'junior' | 'senior' | 'open';

export const SportsGrid: React.FC<SportsGridProps> = ({ onOpenRegisterWithSport }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');
  const [selectedSportForRulebook, setSelectedSportForRulebook] = useState<SportChallenge | null>(null);
  const [selectedSportForDrawer, setSelectedSportForDrawer] = useState<SportChallenge | null>(null);

  const filterTabs: { id: FilterCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Sports', count: 7 },
    { id: 'junior', label: 'Junior Friendly (Ages 10-14)', count: 6 },
    { id: 'senior', label: 'Senior Division (15-18)', count: 7 },
    { id: 'open', label: 'University / Open Division', count: 7 },
  ];

  const filteredSports = SPORTS_DATA.filter((sport) => {
    if (selectedFilter === 'all') return true;
    return sport.divisionSlugs.includes(selectedFilter);
  });

  const getSportIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane': return Plane;
      case 'ShieldAlert': return ShieldAlert;
      case 'Activity': return Activity;
      case 'Trophy': return Trophy;
      case 'Crosshair': return Crosshair;
      case 'Target': return Target;
      case 'Sparkles': return Sparkles;
      default: return Zap;
    }
  };

  const getAccentColors = (color: string) => {
    switch (color) {
      case 'amber':
        return {
          border: 'border-amber-500/40 hover:border-amber-400',
          glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]',
          badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          text: 'text-amber-400',
        };
      case 'emerald':
        return {
          border: 'border-emerald-500/40 hover:border-emerald-400',
          glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
          badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          text: 'text-emerald-400',
        };
      case 'magenta':
        return {
          border: 'border-pink-500/40 hover:border-pink-400',
          glow: 'group-hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]',
          badge: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
          text: 'text-pink-400',
        };
      case 'cyan':
      default:
        return {
          border: 'border-cyan-500/40 hover:border-cyan-400',
          glow: 'group-hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]',
          badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
          text: 'text-cyan-400',
        };
    }
  };

  return (
    <section id="sports" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-3">
            <Trophy className="w-3.5 h-3.5 text-cyan-400" />
            <span>Championship Challenge Roster</span>
          </div>

          <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
            Seven Official <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400">
              RobotSports Disciplines
            </span>
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            From precision aerial navigation to full-contact drone soccer and autonomous ballistics. Review technical criteria, preview rulebooks, and secure your team's division entry.
          </p>
        </div>

        {/* Filter Pill Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`relative px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_18px_rgba(0,240,255,0.5)]'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  isActive ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 7 Sports Challenge Grid with Framer Motion Layout Animation */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredSports.map((sport) => {
              const Icon = getSportIcon(sport.icon);
              const styling = getAccentColors(sport.primaryColor);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={sport.id}
                  className={`group relative rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border ${styling.border} ${styling.glow} p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl hud-corner-tl hud-corner-br`}
                >
                  
                  {/* Top Metadata Row */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-slate-300">
                          {sport.code}
                        </span>
                        <div className={`p-2 rounded-lg border ${styling.badge}`}>
                          <Icon className={`w-4 h-4 ${styling.text}`} />
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-right">
                        <span className={`font-orbitron font-black text-sm ${styling.text}`}>
                          {sport.maxPoints}
                        </span>
                      </div>
                    </div>

                    {/* Sport Name & Tagline */}
                    <h3 className="font-orbitron font-bold text-xl text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {sport.name}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed mb-4">
                      {sport.shortTagline}
                    </p>

                    {/* Key Technical Metric Chips */}
                    <div className="space-y-2 mb-5 text-xs font-mono">
                      <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-850">
                        <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          Match / Heats
                        </span>
                        <span className="text-slate-200 font-semibold">{sport.attemptsOrDuration}</span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-850">
                        <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                          <Users className="w-3.5 h-3.5 text-amber-400" />
                          Team Composition
                        </span>
                        <span className="text-slate-200 font-semibold">{sport.teamCapacity}</span>
                      </div>
                    </div>

                    {/* Division Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {sport.divisions.map((div, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                          {div}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Interactive Actions */}
                  <div className="space-y-2 pt-4 border-t border-slate-800">
                    
                    {/* Primary Button: Quick Register This Sport */}
                    <button
                      onClick={() => onOpenRegisterWithSport(sport.id)}
                      className="w-full py-2.5 px-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all group/btn"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Register for this sport</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>

                    {/* Secondary Dual Action Row: Instant PDF Preview + Tech Specs Drawer */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedSportForRulebook(sport)}
                        className="py-2 px-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 font-mono text-[11px] font-medium border border-slate-800 hover:border-cyan-500/40 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Rulebook PDF</span>
                      </button>

                      <button
                        onClick={() => setSelectedSportForDrawer(sport)}
                        className="py-2 px-2.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-amber-300 font-mono text-[11px] font-medium border border-slate-800 hover:border-amber-500/40 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Sliders className="w-3.5 h-3.5 text-amber-400" />
                        <span>Tech Specs</span>
                      </button>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Modals & Slide-overs */}
        <RulebookModal
          sport={selectedSportForRulebook}
          isOpen={!!selectedSportForRulebook}
          onClose={() => setSelectedSportForRulebook(null)}
          onSelectRegister={(id) => onOpenRegisterWithSport(id)}
        />

        <TechSpecsDrawer
          sport={selectedSportForDrawer}
          isOpen={!!selectedSportForDrawer}
          onClose={() => setSelectedSportForDrawer(null)}
          onSelectRegister={(id) => onOpenRegisterWithSport(id)}
        />

      </div>
    </section>
  );
};
