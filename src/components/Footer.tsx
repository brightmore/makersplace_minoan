import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUp, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  Check, 
  Send, 
  ShieldCheck
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmailInput('');
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800 bg-slate-950 text-slate-300 pt-16 pb-12 overflow-hidden">
      
      {/* Background Accent Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 (5 cols): Brand & Host Information */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none inline-flex">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-400/50 p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:border-cyan-400 transition-colors">
                <img 
                  src="/images/makersplace_icon_hires.png" 
                  alt="The MakersPlace Emblem"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(0,240,255,0.5)]"
                />
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-amber-400 font-bold uppercase block">
                  The MakersPlace Presents
                </span>
                <span className="font-orbitron font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                  MINOAN ROBOTSPORTS GHANA 2027
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Ghana's premier official RobotSports championship uniting primary, high school, university, and independent makers across seven rigorous technical disciplines.
            </p>

            <div className="pt-2 space-y-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Accra, Ghana (Venue announcement to follow)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:info@makersplacegh.com" className="hover:text-cyan-300 transition-colors">
                  info@makersplacegh.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+233 (0) 24 123 4567 / +233 (0) 30 890 1234</span>
              </div>
            </div>
          </div>

          {/* Col 2 (3 cols): Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-orbitron font-bold text-xs uppercase tracking-wider text-cyan-400">
              Tournament Links
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link to="/sports" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  All 7 RobotSports Disciplines
                </Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Rule Zero & Scrutineering
                </Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  Media Hub & Arena Visualizer
                </Link>
              </li>
              <li>
                <Link to="/pathway" className="hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Minoan Global Finals Pathway
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  CAD Blueprints & Rulebooks
                </Link>
              </li>
              <li>
                <Link to="/sponsors" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  Sponsors & Educational Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 (4 cols): Venue & Scrutineering Updates Notification Alert */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-orbitron font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Venue & Inspection Bulletins
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get immediate alerts when the official Accra stadium venue is revealed, plus technical FAQ addendums from the Chief Referee.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="coach@institution.edu.gh"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all shrink-0 flex items-center justify-center"
                >
                  {subscribed ? <Check className="w-4 h-4 text-slate-950" /> : <Send className="w-4 h-4" />}
                </button>
              </div>

              {subscribed && (
                <p className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  Subscribed to official Accra tournament bulletins!
                </p>
              )}
            </form>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Official MakersPlace Privacy Guarantee. No spam.</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Smooth Back-to-Top Button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© 2027 The MakersPlace Ghana.</span>
            <span className="hidden sm:inline">•</span>
            <span>All rights reserved. MINOAN RobotSports is an international mark.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/50 transition-all font-mono text-xs"
              aria-label="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
