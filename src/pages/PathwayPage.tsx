import React from 'react';
import { PathwaySection } from '../components/PathwaySection';
import { Link } from 'react-router-dom';
import { 
  Award, 
  ArrowLeft, 
  ArrowRight, 
  Globe, 
  Trophy, 
  Plane,
  GraduationCap
} from 'lucide-react';

export const PathwayPage: React.FC = () => {
  return (
    <div className="pt-6 pb-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <Link to="/" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Home
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">Global Pathway</span>
        </div>

        {/* Page Hero Banner */}
        <div className="relative rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-950 to-emerald-950/20 border border-emerald-500/30 p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>International Progression Roadmap</span>
            </div>

            <h1 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
              From Accra to the <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
                World Championship Stage
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              MINOAN RobotSports Ghana 2027 is the sanctioned national gateway. Outstanding podium teams in each category qualify for continental and global representation, international STEM scholarships, and global engineering prestige.
            </p>

            <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono">
              <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                3 Tier Progression Ladder
              </span>
              <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Direct Minoan World Finals Seeds
              </span>
            </div>
          </div>
        </div>

        {/* Global Pathway Section Component */}
        <PathwaySection />

        {/* Qualification & Scholarship Directives Box */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="font-orbitron font-bold text-lg text-white">
                Delegation Travel & Logistics Support
              </h3>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Qualifying champions representing Ghana at the African Continental Qualifiers and World Finals receive logistical support, visa facilitation letters from The MakersPlace, and equipment transit assistance for robotics flight cases.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-orbitron font-bold text-lg text-white">
                Academic & STEAM Scholarships
              </h3>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Top-ranking youth and university competitors are nominated for international STEM bursaries, engineering apprenticeships, and summer robotics accelerator programs sponsored by educational partners.
            </p>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/sports"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <span>← Explore 7 RobotSports Disciplines</span>
          </Link>
          <Link
            to="/sponsors"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-emerald-300 border border-emerald-500/40 text-xs font-orbitron font-bold uppercase tracking-wider transition-colors"
          >
            <span>View Partners & Academic Alliance</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
