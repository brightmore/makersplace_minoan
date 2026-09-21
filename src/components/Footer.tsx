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
  ShieldCheck,
  Loader2,
  AlertCircle,
  Lock
} from 'lucide-react';
import { subscribeNewsletter } from '../lib/api';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;

    setIsSubscribing(true);
    setFeedback(null);

    try {
      const res = await subscribeNewsletter(emailInput, 'footer_bulletin');
      setFeedback({
        message: res.message || 'Subscribed to official Accra tournament bulletins!',
        isError: false,
      });
      setEmailInput('');
      setTimeout(() => {
        setFeedback(null);
      }, 5000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Subscription failed. Please try again.';
      setFeedback({
        message: msg,
        isError: true,
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800 bg-slate-950 text-slate-300 pt-16 pb-12 overflow-hidden">
      
      {/* Background Accent Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-cyan-500/40" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 (5 cols): Brand & Host Information */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none inline-flex">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-400/50 p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:border-cyan-400 transition-colors">
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
                <span>+233 (0) 55 631 0034 / +233 (0) 24 623 7518</span>
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
              <li className="pt-1 border-t border-slate-800/60">
                <Link to="/sitemap" className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Platform Sitemap & Directory
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
                  disabled={isSubscribing}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono disabled:opacity-60"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-4 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 disabled:bg-cyan-600 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all shrink-0 flex items-center justify-center"
                >
                  {isSubscribing ? (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  ) : feedback && !feedback.isError ? (
                    <Check className="w-4 h-4 text-slate-950" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>

              {feedback && (
                <p className={`text-[11px] font-mono flex items-center gap-1.5 animate-in fade-in ${
                  feedback.isError ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {feedback.isError ? (
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <Check className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{feedback.message}</span>
                </p>
              )}
            </form>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Official MakersPlace Privacy Guarantee. No spam.</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-center md:text-left">
            <span>© 2027 The MakersPlace Ghana. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <Link to="/privacy" className="hover:text-cyan-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-600">•</span>
            <Link to="/terms" className="hover:text-amber-300 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-slate-600">•</span>
            <Link to="/sitemap" className="hover:text-emerald-300 transition-colors">
              Sitemap
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-all font-mono text-xs"
              title="Organizers Scrutineering & Registration Portal"
            >
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>Organizer Portal</span>
            </Link>

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
