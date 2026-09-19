import React from 'react';
import { Wrench, Terminal, Crosshair, Users2, ArrowUpRight } from 'lucide-react';

export const PillarsSection: React.FC = () => {
  const pillars = [
    {
      index: '01',
      title: 'Precision Engineering',
      icon: Wrench,
      accentColor: 'border-cyan-500/50 hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.25)]',
      textColor: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      description: 'Chassis mechanics, CAD modeling, power transmission, ducted fan aerodynamics, and high-traction drive train fabrication built to endure tournament stresses.',
      metric: 'CAD & FABRICATION',
    },
    {
      index: '02',
      title: 'Autonomous Coding',
      icon: Terminal,
      accentColor: 'border-amber-500/50 hover:border-amber-400 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]',
      textColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      description: 'PID closed-loop velocity control, optical sensor fusion, computer vision ArUco detection, and real-time state machine algorithms executing in milliseconds.',
      metric: 'PID & VISION CODE',
    },
    {
      index: '03',
      title: 'Dynamic Strategy',
      icon: Crosshair,
      accentColor: 'border-emerald-500/50 hover:border-emerald-400 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]',
      textColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      description: 'Game theory, offensive spacing in Drone Soccer & Football 3x3, defensive blocking tactics, battery power preservation, and in-match risk management.',
      metric: 'TACTICAL DEPTH',
    },
    {
      index: '04',
      title: 'Synergistic Teamwork',
      icon: Users2,
      accentColor: 'border-pink-500/50 hover:border-pink-400 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]',
      textColor: 'text-pink-400',
      badgeBg: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
      description: 'Coordinated division of roles: pilot, programmer, electrical tech, pit manager, and captain communicating crisply under high-pressure arena clocks.',
      metric: 'PIT CREW SYNERGY',
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                Core Competition Architecture
              </p>
            </div>
            <h2 className="font-orbitron font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide">
              The Four Pillars of <br className="hidden sm:inline" />
              <span className="text-cyan-400">
                RobotSports Excellence
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-md mt-4 md:mt-0">
            MINOAN challenges test far more than raw electronics. Successful teams balance mechanical endurance, algorithmic precision, and disciplined human cooperation.
          </p>
        </div>

        {/* 4-Card Interactive Grid with Hover Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.index}
                className={`group relative rounded-xl bg-slate-900/50 hover:bg-slate-900/90 border ${pillar.accentColor} p-6 transition-all duration-300 transform hover:-translate-y-1.5 backdrop-blur-md flex flex-col justify-between`}
              >
                {/* Top Row: Index & Tech Badge */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-slate-700 group-hover:text-slate-400 transition-colors">
                      {pillar.index}
                    </span>
                    <div className={`p-2.5 rounded-lg border ${pillar.badgeBg} transition-transform group-hover:scale-110 duration-200`}>
                      <Icon className={`w-5 h-5 ${pillar.textColor}`} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-xs leading-relaxed mb-6 font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Metric Strip */}
                <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-[10px] font-mono tracking-wider">
                  <span className="text-slate-400">{pillar.metric}</span>
                  <ArrowUpRight className={`w-3.5 h-3.5 ${pillar.textColor} transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5`} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
