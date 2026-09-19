import React from 'react';
import { Award, Globe, Flag, Trophy, CheckCircle } from 'lucide-react';

export const PathwaySection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Ghana National Championship',
      location: 'Accra, Ghana',
      date: 'January 30, 2027',
      status: 'REGISTRATION OPEN',
      icon: Flag,
      color: 'cyan',
      description: 'The pinnacle national competition hosted by The MakersPlace. Top 3 podium teams in each category and division qualify for direct continental seedings.',
      perks: [
        'Gold, Silver & Bronze National Medals',
        'Official National RobotSports Trophy',
        'Direct seed to African Continental Stage',
      ],
    },
    {
      step: '02',
      title: 'African Continental Qualifiers',
      location: 'Pan-African Stage (TBA)',
      date: 'May 2027',
      status: 'QUALIFICATION REQUIRED',
      icon: Globe,
      color: 'amber',
      description: 'Podium finishers from Ghana face top engineering delegations from Nigeria, Kenya, South Africa, Rwanda, and Egypt.',
      perks: [
        'Continental Innovation Grant Access',
        'Technical Mentorship from Global Drone/Robotics Labs',
        'Official Minoan World Seed Allocation',
      ],
    },
    {
      step: '03',
      title: 'International Minoan RobotSports Finals',
      location: 'Crete / Global Host City',
      date: 'Autumn 2027',
      status: 'WORLD STAGE',
      icon: Trophy,
      color: 'emerald',
      description: 'The supreme global championship uniting hundreds of international teams across Asia, Europe, the Americas, and Africa.',
      perks: [
        'Global World Title & Championship Ring',
        'International STEM & University Scholarships',
        'Worldwide Broadcast & Industry Recruitment',
      ],
    },
  ];

  return (
    <section id="pathway" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-300 font-mono text-xs uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>International Advancement Pipeline</span>
          </div>

          <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
            The Global Pathway to the <br className="hidden sm:inline" />
            <span className="text-emerald-400">
              World Championship Finals
            </span>
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            MINOAN RobotSports Ghana 2027 is not just a one-day tournament—it is the recognized national gateway to international esports-grade robotics.
          </p>
        </div>

        {/* 3-Step Pathway Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/3 left-[15%] right-[15%] h-0.5 bg-slate-700 z-0" />

          {steps.map((item, idx) => {
            const Icon = item.icon;
            const borderColors = 
              item.color === 'cyan' ? 'border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.15)]' :
              item.color === 'amber' ? 'border-amber-500/40 hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)]' :
              'border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]';

            const badgeColors = 
              item.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' :
              item.color === 'amber' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
              'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';

            const textColors = 
              item.color === 'cyan' ? 'text-cyan-400' :
              item.color === 'amber' ? 'text-amber-400' :
              'text-emerald-400';

            return (
              <div
                key={item.step}
                className={`relative z-10 rounded-2xl bg-slate-900/80 border ${borderColors} p-6 sm:p-7 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5`}
              >
                <div>
                  {/* Top Step Pill & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-slate-700">
                      STEP {item.step}
                    </span>
                    <div className={`p-3 rounded-xl border ${badgeColors}`}>
                      <Icon className={`w-5 h-5 ${textColors}`} />
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${badgeColors}`}>
                    {item.status}
                  </span>

                  <h3 className="font-orbitron font-bold text-lg text-white mt-3 mb-1">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
                    <span>{item.location}</span>
                    <span>•</span>
                    <span className="text-slate-300">{item.date}</span>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Key Perks */}
                  <div className="space-y-2 border-t border-slate-800/80 pt-4 mb-4">
                    <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                      Advancement Rewards:
                    </p>
                    {item.perks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle className={`w-3.5 h-3.5 ${textColors} shrink-0`} />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>SEED: RANK #{idx + 1}</span>
                  <span className="text-white font-bold flex items-center gap-1">
                    OFFICIAL PIPELINE
                  </span>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
