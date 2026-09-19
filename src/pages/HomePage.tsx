import React from 'react';
import { Hero } from '../components/Hero';
import { TickerBar } from '../components/TickerBar';
import { PillarsSection } from '../components/PillarsSection';
import { SPORTS_DATA } from '../data/sportsData';
import { SportId } from '../types';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Award, 
  Download, 
  Users, 
  Sparkles, 
  ChevronRight,
  Plane,
  Target,
  Zap,
  Activity
} from 'lucide-react';

interface HomePageProps {
  onOpenRegister: (sportId?: SportId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenRegister }) => {
  const getSportIcon = (id: string) => {
    switch (id) {
      case 'drone':
        return Plane;
      case 'dronesoccer':
        return Zap;
      case 'archery':
        return Target;
      case 'relay':
        return Activity;
      default:
        return Bot;
    }
  };

  return (
    <div className="relative z-10">
      {/* 5-Slide Animated Hero Section with Live Countdown Clock */}
      <Hero onOpenRegister={() => onOpenRegister()} />

      {/* Infinite Ticker Bar & Rule Zero HUD Warning Banner */}
      <TickerBar />

      {/* 4 Pillars of RobotSports Section */}
      <PillarsSection />

      {/* 7 RobotSports Disciplines Preview Section */}
      <section className="py-16 sm:py-20 relative z-10 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 font-bold">
                  Official 2027 Disciplines
                </span>
              </div>
              <h2 className="font-orbitron font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide">
                Seven Engineering Challenges. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
                  One National Arena.
                </span>
              </h2>
            </div>

            <Link
              to="/sports"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-cyan-300 border border-cyan-500/40 text-xs font-orbitron font-bold uppercase tracking-wider transition-all self-start md:self-auto hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              <span>Explore All 7 Disciplines & Rules</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid of Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPORTS_DATA.map((sport) => {
              const IconComponent = getSportIcon(sport.id);
              return (
                <div
                  key={sport.id}
                  className="group relative rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-400 font-bold">
                        {sport.code}
                      </span>
                    </div>

                    <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {sport.name}
                    </h3>

                    <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-2">
                      {sport.shortTagline}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mb-6">
                      <span className="px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800">
                        {sport.maxPoints}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span>{sport.divisions.length} Divisions</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <Link
                      to="/sports"
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      <span>Rules & Specs</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => onOpenRegister(sport.id)}
                      className="px-3 py-1.5 rounded bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 text-[11px] font-orbitron font-bold uppercase tracking-wider transition-colors"
                    >
                      Register Team
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/sports"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all"
            >
              <span>View Full Rulebooks & Technical Specifications</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Multi-Page Portal Showcase Grid */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Championship Portals</span>
            </div>
            <h2 className="font-orbitron font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide">
              Tournament Hubs & Resources
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Everything teams, coaches, and sponsors need to compete at the highest level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Media Hub & Arena Visualizer */}
            <Link
              to="/media"
              className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                  Media Hub & Arena Visualizer
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Experience interactive 360° radar tracking grids, match preview videos, and high-definition arena viewports across all competition layouts.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>Launch Visualizer</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 2: Rule Zero & Pre-Flight Inspection */}
            <Link
              to="/rules"
              className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/30 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                  Rule Zero & Pre-Flight Scrutineering
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Ensure 100% compliance before arriving at the paddock with our interactive self-assessment inspection tool and governing safety doctrines.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-amber-400">
                <span>Inspect Checklist</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 3: Global Pathway */}
            <Link
              to="/pathway"
              className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/30 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">
                  Minoan Global Finals Pathway
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Discover how Ghana champions advance from the National stage to the African Continental Qualifiers and onto the International World Championship.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>View 3-Stage Ladder</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 4: Official Downloads */}
            <Link
              to="/resources"
              className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit group-hover:scale-110 transition-transform">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                  Official Downloads & CAD Blueprints
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Download official discipline rulebooks, DXF pitch geometries, referee scoring rubrics, and the unified 18.4MB technical documentation package.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>Access Document Vault</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 5: Partners & Academic Alliance */}
            <Link
              to="/sponsors"
              className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-950/30 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 w-fit group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-pink-300 transition-colors">
                  Partners & Ecosystem Alliance
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Meet the educational institutions, drone technology consortiums, and STEAM foundations powering the 2027 championship.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-pink-400">
                <span>Explore Partners</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Card 6: Direct Team Registration CTA Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/50 via-slate-900 to-slate-950 border border-cyan-500/50 flex flex-col justify-between shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-cyan-400 text-slate-950 w-fit font-bold">
                  <Sparkles className="w-6 h-6 animate-spin-slow" />
                </div>
                <h3 className="font-orbitron font-bold text-lg text-white">
                  Ready to Compete in 2027?
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Registrations are actively processed on a first-cleared, first-seeded basis. Secure your paddock bay for your school or maker team today.
                </p>
              </div>
              <div className="pt-4 mt-6 border-t border-slate-800/80">
                <button
                  onClick={() => onOpenRegister()}
                  className="w-full py-2.5 px-4 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider text-center transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                >
                  Register Team Now
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
