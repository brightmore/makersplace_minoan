import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Award, 
  Users, 
  Bot, 
  ShieldAlert, 
  Globe2, 
  CheckCircle2, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';

interface QuickFactItem {
  label: string;
  value: string;
  detail: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: 'cyan' | 'amber' | 'emerald';
}

const QUICK_FACTS: QuickFactItem[] = [
  {
    label: 'Championship Date',
    value: 'January 30, 2027',
    detail: 'Full-day multi-arena tournament heats from 08:00 to 20:00 GMT.',
    icon: Calendar,
    badge: 'CONFIRMED',
    badgeColor: 'emerald',
  },
  {
    label: 'Host City & Arena',
    value: 'Accra, Ghana',
    detail: 'National RobotSports Arena Complex, Greater Accra Region.',
    icon: MapPin,
    badge: 'OFFICIAL VENUE',
    badgeColor: 'cyan',
  },
  {
    label: 'Official Organizer',
    value: 'The MakersPlace Ghana',
    detail: "Leading Ghanaian STEAM education, robotics, and innovation academy.",
    icon: Award,
    badge: 'HOST & LICENSEE',
    badgeColor: 'amber',
  },
  {
    label: 'Sanctioning Body',
    value: 'H.E.R.O. Minoan Olympiad',
    detail: 'Hellenic Educational Robotics Organization (Heraklion, Crete, Greece).',
    icon: Globe2,
    badge: 'INTERNATIONAL',
    badgeColor: 'cyan',
  },
  {
    label: 'Official Disciplines',
    value: '7 Regulated Categories',
    detail: 'Drone Obstacle, Drone Soccer, Robot Marathon, 3v3 Football, Archery, Exhibition, Target Shooting.',
    icon: Bot,
    badge: 'AERIAL & TERRESTRIAL',
    badgeColor: 'emerald',
  },
  {
    label: 'Eligible Divisions',
    value: 'Junior, Senior & Open',
    detail: 'Junior (8-12 yrs), Senior (13-17 yrs), University / Open / Maker (18+ yrs).',
    icon: Users,
    badge: 'ALL AGES',
    badgeColor: 'cyan',
  },
  {
    label: 'Safety Doctrine',
    value: 'Rule Zero Supremacy',
    detail: 'Human safety and non-hazardous physical containment override any algorithm or score.',
    icon: ShieldAlert,
    badge: 'MANDATORY',
    badgeColor: 'amber',
  },
  {
    label: 'Global Qualification',
    value: 'Pathway to Greece 2027',
    detail: 'National Champions earn official selection to represent Team Ghana at the World Finals in Crete.',
    icon: FileCheck2,
    badge: 'WORLD STAGE',
    badgeColor: 'emerald',
  },
];

export const AEOQuickFacts: React.FC = () => {
  return (
    <section 
      aria-labelledby="quick-facts-heading" 
      className="py-12 border-y border-slate-800/80 bg-slate-950/60 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with AI & Quick-Answer Metadata cues */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-cyan-500/30 text-cyan-400 font-mono text-[11px] uppercase tracking-widest mb-2 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Tournament Fact Sheet • Answer Engine Optimized</span>
            </div>
            <h2 
              id="quick-facts-heading"
              className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wide"
            >
              Tournament At A Glance
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded border border-slate-800 self-start sm:self-auto">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Authoritative Reference for Teams & AI Engines</span>
          </div>
        </div>

        {/* Semantic Definition List for Machine and Human Reading */}
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_FACTS.map((fact, index) => {
            const Icon = fact.icon;
            const badgeClasses = {
              cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
              amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
              emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
            }[fact.badgeColor || 'cyan'];

            return (
              <div 
                key={index} 
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    {fact.badge && (
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badgeClasses}`}>
                        {fact.badge}
                      </span>
                    )}
                  </div>

                  <dt className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">
                    {fact.label}
                  </dt>
                  <dd className="text-white font-orbitron font-bold text-sm sm:text-base leading-snug mb-2">
                    {fact.value}
                  </dd>
                </div>

                <dd className="text-slate-400 text-xs leading-relaxed border-t border-slate-800/80 pt-2.5 mt-2">
                  {fact.detail}
                </dd>
              </div>
            );
          })}
        </dl>

      </div>
    </section>
  );
};
