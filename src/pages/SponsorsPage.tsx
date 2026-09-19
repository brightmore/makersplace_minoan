import React from 'react';
import { SponsorsSection } from '../components/SponsorsSection';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ArrowLeft, 
  ArrowRight, 
  Handshake, 
  Cpu, 
  GraduationCap, 
  Sparkles
} from 'lucide-react';

export const SponsorsPage: React.FC = () => {
  const sponsorshipTiers = [
    {
      tier: 'Title Partner',
      badge: 'EXCLUSIVE',
      color: 'border-cyan-400/60 bg-cyan-950/20 text-cyan-300',
      description: 'Supreme naming rights across all 7 RobotSports arenas, main stage branding, and opening ceremony keynote.',
      benefits: ['Main Arena Naming Rights', 'Live Stream Title Sponsor', 'VIP Jury Representation', 'Full Brand Immersion'],
    },
    {
      tier: 'Discipline Sponsor',
      badge: '7 SLOTS AVAILABLE',
      color: 'border-amber-400/60 bg-amber-950/20 text-amber-300',
      description: 'Exclusive branding of a specific sport arena (e.g. Drone Soccer Arena, RoboSoccer Pitch, or Autonomous Speed Track).',
      benefits: ['Arena Perimeter LED Signage', 'Discipline Trophy Presentation', 'Product Showcase Booth', 'Media Press Kit Features'],
    },
    {
      tier: 'Youth STEM Bursary',
      badge: 'IMPACT FOCUSED',
      color: 'border-emerald-400/60 bg-emerald-950/20 text-emerald-300',
      description: 'Directly subsidize robotics component kits, travel bursaries, and registration fees for under-resourced public school teams.',
      benefits: ['Direct Impact Reporting', 'Team Mentor Alignment', 'CSR Sustainability Recognition', 'Official Gratitude Plaque'],
    },
  ];

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
          <span className="text-cyan-400 font-semibold">Partners & Sponsors</span>
        </div>

        {/* Page Hero Banner */}
        <div className="relative rounded-2xl bg-slate-900 border border-cyan-500/30 p-6 sm:p-10 mb-10 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80')" }} 
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Alliance & Ecosystem</span>
              </div>

              <h1 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
                Tournament Partners & <br className="hidden sm:inline" />
                <span className="text-cyan-400">
                  Educational Alliances
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                MINOAN RobotSports Ghana 2027 is powered by an exceptional coalition of technology companies, STEAM education foundations, governmental bodies, and international robotics organizations committed to accelerating Africa's tech workforce.
              </p>

              <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-amber-400" />
                  The MakersPlace Ghana (Host Secretariat)
                </span>
                <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  Academic & STEM Alliance
                </span>
              </div>
            </div>

            {/* Right Featured Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 shadow-2xl bg-slate-950 group">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 z-10" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 z-10" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 z-10" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 z-10" />

                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                    alt="Makerspace STEAM Collaboration"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/30" />

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/90 border border-cyan-400/60 text-[10px] font-mono text-cyan-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="font-bold">STEAM ECOSYSTEM ALLIANCE</span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-white font-semibold">The MakersPlace Coalition</span>
                    <span className="text-amber-400 font-bold">Industry & Academia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Existing Sponsors Section Component */}
        <SponsorsSection />

        {/* Corporate Sponsorship Tiers */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Investment Opportunities</span>
            </div>
            <h3 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
              Sponsorship & Partnership Packages
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Connect your brand with over 1,500 elite young engineers, universities, educators, and tech innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sponsorshipTiers.map((tier, idx) => (
              <div 
                key={idx}
                className={`p-6 sm:p-7 rounded-2xl border ${tier.color} backdrop-blur-sm flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded bg-slate-900/80 border border-current">
                      {tier.badge}
                    </span>
                    <Handshake className="w-4 h-4 opacity-70" />
                  </div>
                  <h4 className="font-orbitron font-bold text-xl text-white mb-2">
                    {tier.tier}
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-800/80 pt-4 mb-6">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Key Deliverables:</span>
                    {tier.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={`mailto:info@makersplacegh.com?subject=Sponsorship%20Inquiry%20-%20${encodeURIComponent(tier.tier)}`}
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/60 text-white font-orbitron font-bold text-xs uppercase tracking-wider text-center transition-all block"
                >
                  Inquire For Package
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <span>← Download Official Document Vault</span>
          </Link>
          <Link
            to="/sports"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-orbitron font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            <span>Explore All 7 Sports & Register</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
