import React from 'react';
import { InspectionChecklist } from '../components/InspectionChecklist';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  Flame, 
  Terminal,
  FileText
} from 'lucide-react';

export const RulesPage: React.FC = () => {
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
          <span className="text-amber-400 font-semibold">Rule Zero & Inspection</span>
        </div>

        {/* Page Hero Banner */}
        <div className="relative rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-950 to-amber-950/20 border border-amber-500/30 p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Safety, Fair Play & Technical Scrutineering</span>
            </div>

            <h1 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
              Rule Zero & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-cyan-300">
                Pre-Flight Inspection
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every robot competing at MRC Ghana 2027 must pass rigorous paddock safety and technical scrutineering before being cleared for the arena floor. Master Rule Zero and run our interactive pre-flight compliance check before arriving at the venue.
            </p>

            <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono">
              <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Mandatory Paddock Clearance
              </span>
              <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                FIDA & World Minoan Standards
              </span>
            </div>
          </div>
        </div>

        {/* Rule Zero HUD Deep Dive Directive */}
        <div className="mb-12">
          <div className="relative rounded-2xl bg-gradient-to-r from-slate-950 via-amber-950/20 to-slate-950 border border-amber-500/40 p-6 sm:p-8 shadow-2xl shadow-amber-950/20 overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 shadow-[0_0_15px_#f59e0b]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4 flex flex-col items-start space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/20 border border-amber-400/60 text-amber-300 font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    [RULE 00]
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                    GOVERNING DIRECTIVE
                  </span>
                </div>

                <h2 className="font-orbitron font-bold text-xl sm:text-2xl text-white tracking-wide">
                  The Rule Above All Rules: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-100">
                    Rule Zero
                  </span>
                </h2>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Enforced across all 7 disciplines</span>
                </div>
              </div>

              <div className="lg:col-span-8 lg:border-l lg:border-slate-800/80 lg:pl-8 space-y-4">
                <div className="relative pl-6 border-l-2 border-amber-400/80">
                  <blockquote className="font-sans text-base sm:text-lg lg:text-xl font-bold text-amber-200/95 leading-snug">
                    “If you are not sure whether something is allowed, then it is probably not allowed.”
                  </blockquote>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Common sense, participant safety, fair play, and the educational spirit of RobotSports always take absolute priority. Any team attempting to exploit technical ambiguity to circumvent safety or fair play will be subject to immediate judicial review by the Head Referee Council.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-300 bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Safety First</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-800">
                    <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Fair Play & Integrity</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-800">
                    <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Makers Educational Spirit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Pre-Flight Inspection Checklist Component */}
        <InspectionChecklist />

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/sports"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <span>← Review The 7 RobotSports Disciplines</span>
          </Link>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-amber-300 border border-amber-500/40 text-xs font-orbitron font-bold uppercase tracking-wider transition-colors"
          >
            <span>Download Official PDF Rulebooks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
