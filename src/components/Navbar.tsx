import React, { useState } from 'react';
import { CalendarDropdown } from './CalendarDropdown';
import { Bot, Menu, X, Sparkles, ChevronRight, Download, Award, ShieldCheck, Layers, Users } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'RobotSports', href: '#sports', icon: Bot },
    { label: 'Media Hub', href: '#media', icon: Layers },
    { label: 'Rule Zero & Inspection', href: '#rules', icon: ShieldCheck },
    { label: 'Global Pathway', href: '#pathway', icon: Award },
    { label: 'Downloads', href: '#resources', icon: Download },
    { label: 'Partners', href: '#sponsors', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-all">
      <div className="px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-3.5 group focus:outline-none">
            {/* Enhanced MakersPlace Cyber Emblem Bezel */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900/95 via-slate-950 to-slate-900/90 border border-cyan-500/50 p-2 shadow-[0_0_18px_rgba(0,240,255,0.25)] group-hover:border-cyan-400 group-hover:shadow-[0_0_28px_rgba(0,240,255,0.55)] transition-all duration-300">
              {/* Subtle Cyber Grid & Ambient Radial Backlight */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-transparent to-amber-500/10 rounded-xl pointer-events-none" />
              
              {/* Micro Corner HUD Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400 rounded-tl-sm pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400 rounded-br-sm pointer-events-none" />

              {/* Official High-Res MakersPlace Emblem */}
              <img 
                src="/images/makersplace_icon_hires.png" 
                alt="The MakersPlace Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,240,255,0.65)] group-hover:scale-110 group-hover:drop-shadow-[0_0_14px_rgba(0,240,255,0.9)] transition-all duration-300"
              />

              {/* Live Pulsing Beacon */}
              <div className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-amber-400 font-bold uppercase">
                  The MakersPlace
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="font-mono text-[9px] tracking-wider text-cyan-400/90 uppercase hidden sm:inline font-semibold">
                  Official Host
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-orbitron font-extrabold text-sm sm:text-base tracking-wide text-white group-hover:text-cyan-300 transition-colors">
                  MINOAN ROBOTSPORTS
                </span>
                {/* Illuminated Pill Badge */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/15 border border-cyan-400/60 text-cyan-300 shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  MRC GHANA 2027
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 rounded-md text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-cyan-300 hover:bg-slate-900/60 transition-colors border border-transparent hover:border-slate-800"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          {/* Add to Calendar Dropdown */}
          <CalendarDropdown />

          {/* Primary CTA: Register Team with Neon Pulse */}
          <button
            onClick={onOpenRegister}
            className="relative group inline-flex items-center justify-center px-4 sm:px-5 py-2 text-xs font-orbitron font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 rounded-md overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_20px_rgba(0,240,255,0.45)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)]"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-slate-950 animate-spin-slow" />
            <span>Register Team</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-300 hover:text-cyan-300 hover:bg-slate-900 border border-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="px-2 py-1 text-[11px] font-mono uppercase text-slate-400 border-b border-slate-800/80 mb-2">
            Tournament Navigation
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:text-cyan-300 hover:bg-slate-900/80 border border-transparent hover:border-slate-800 font-mono tracking-wide"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            );
          })}

          <div className="pt-4 mt-2 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3 px-4 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              <Sparkles className="w-4 h-4" />
              Register Team Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
