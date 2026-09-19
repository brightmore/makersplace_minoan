import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Handshake, Cpu, Globe2, Building, GraduationCap, ShieldCheck } from 'lucide-react';

export const SponsorsSection: React.FC = () => {
  const partners = [
    {
      category: 'Official Host & Organizer',
      title: 'The MakersPlace Ghana',
      badge: 'NATIONAL SECRETARIAT',
      description: 'Ghana’s premier creative STEAM innovation lab empowering students and schools with cutting-edge hands-on robotics, coding, and maker curricula.',
      icon: Cpu,
      color: 'cyan',
    },
    {
      category: 'International Sanctioning Body',
      title: 'Minoan RobotSports World Series',
      badge: 'INTERNATIONAL BODY',
      description: 'Global federation governing autonomous robot athletic competitions, technical standards, and World Championship qualifications.',
      icon: Globe2,
      color: 'amber',
    },
    {
      category: 'Education & Institutional Alignment',
      title: 'Ghana STEM & Technical Hubs',
      badge: 'ACADEMIC ALLIANCE',
      description: 'University robotics engineering departments and national technical high schools nurturing the next generation of West African innovators.',
      icon: GraduationCap,
      color: 'emerald',
    },
    {
      category: 'Technical & Hardware Ecosystem',
      title: 'African Drone & Robotics Alliance',
      badge: 'INDUSTRY PARTNER',
      description: 'Consortium of UAV pioneers, avionics engineers, and electronics labs supporting paddock safety and inspection equipment.',
      icon: Building,
      color: 'cyan',
    },
  ];

  return (
    <section id="sponsors" className="py-20 relative z-10 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-3">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tournament Ecosystem</span>
          </div>

          <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
            Powered by Leaders in <br className="hidden sm:inline" />
            <span className="text-cyan-400">
              Robotics & STEAM Education
            </span>
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            MINOAN RobotSports Ghana 2027 brings together academic pioneers, government STEAM stakeholders, and private technology visionaries.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {partners.map((p, idx) => {
            const Icon = p.icon;
            const accentBorder = 
              p.color === 'cyan' ? 'border-cyan-500/30 hover:border-cyan-400/80' :
              p.color === 'amber' ? 'border-amber-500/30 hover:border-amber-400/80' :
              'border-emerald-500/30 hover:border-emerald-400/80';
            
            const badgeStyle = 
              p.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' :
              p.color === 'amber' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' :
              'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';

            return (
              <div
                key={idx}
                className={`rounded-2xl bg-slate-900/50 hover:bg-slate-900/90 border ${accentBorder} p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-md hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                      {p.category}
                    </span>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded border ${badgeStyle} inline-block mb-2`}>
                    {p.badge}
                  </span>

                  <h3 className="font-orbitron font-bold text-base text-white mb-2">
                    {p.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-cyan-400">
                  <span>VERIFIED CO-OPERATOR</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Call for Sponsorship & Academic Delegations */}
        <div className="rounded-2xl bg-slate-900 border border-cyan-500/30 p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
              Join the Movement
            </span>
            <h3 className="font-orbitron font-bold text-xl sm:text-2xl text-white">
              Partner with Ghana’s Premier National RobotSports Arena
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Support student STEM grants, sponsor category prize pools, or exhibit emerging robotics tech to thousands of young engineers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="mailto:info@makersplacegh.com?subject=Sponsorship%20Inquiry%20-%20MINOAN%20RobotSports%20Ghana%202027"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider text-center shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <Handshake className="w-4 h-4" />
              <span>Sponsor Inquiry</span>
            </a>

            <Link
              to="/resources"
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-mono text-xs text-center border border-slate-700 transition-colors"
            >
              <span>Download Partner Deck</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
