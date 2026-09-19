import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2, Flame, Terminal } from 'lucide-react';

export const TickerBar: React.FC = () => {
  const tickerItems = [
    'ENGINEERING',
    'AUTONOMY',
    'PRECISION',
    'TEAMWORK',
    'ROBOTICS',
    'INNOVATION',
    'STRATEGY',
    'ALGORITHMS',
    'SPORTSMANSHIP',
  ];

  return (
    <section className="relative z-20 overflow-hidden border-y border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      {/* Infinite Ticker Ribbon */}
      <div className="py-2.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-cyan-500/20 overflow-hidden flex whitespace-nowrap">
        <div className="flex items-center space-x-8 animate-ticker">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-6 text-xs font-mono font-bold tracking-[0.2em]">
              <span className="text-slate-200 hover:text-cyan-400 transition-colors cursor-default">
                {item}
              </span>
              <span className="text-cyan-400 text-sm drop-shadow-[0_0_8px_#00f0ff]">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rule Zero HUD Section */}
      <div id="rules" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="relative rounded-2xl bg-gradient-to-r from-slate-950 via-amber-950/20 to-slate-950 border border-amber-500/40 p-6 sm:p-8 shadow-2xl shadow-amber-950/20 overflow-hidden">
          
          {/* Subtle Ambient Amber Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 shadow-[0_0_15px_#f59e0b]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Indicator & Caution Icon */}
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-100 text-glow-amber">
                  Rule Zero
                </span>
              </h2>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>Applicable to all 7 competition disciplines</span>
              </div>
            </div>

            {/* Right: The Core Quote & Educational Doctrine */}
            <div className="lg:col-span-8 lg:border-l lg:border-slate-800/80 lg:pl-8 space-y-4">
              <div className="relative pl-6 border-l-2 border-amber-400/80">
                <blockquote className="font-sans text-base sm:text-lg lg:text-xl font-bold text-amber-200/95 leading-snug">
                  “If you are not sure whether something is allowed, then it is probably not allowed.”
                </blockquote>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Common sense, participant safety, fair play, and the educational spirit of RobotSports always take absolute priority. Any team attempting to exploit technical ambiguity to circumvent safety or fair play will be subject to immediate judicial review by the Head Referee Council.
              </p>

              {/* Guiding Tenets */}
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
    </section>
  );
};
