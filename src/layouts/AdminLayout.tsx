import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Mail, 
  Radio, 
  Send, 
  ShieldCheck, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  FileSpreadsheet, 
  Download, 
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getRegistrationCsvUrl, getNewsletterCsvUrl } from '../lib/api';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: 'overview' | 'registrations' | 'newsletter' | 'bulletins' | 'staff';
  setActiveTab: (tab: 'overview' | 'registrations' | 'newsletter' | 'bulletins' | 'staff') => void;
  teamCount: number;
  subscriberCount: number;
  broadcastCount: number;
  staffCount: number;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  teamCount,
  subscriberCount,
  broadcastCount,
  staffCount,
}) => {
  const { user, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    {
      id: 'overview' as const,
      label: 'Telemetry Overview',
      icon: Radio,
      badge: null,
    },
    {
      id: 'registrations' as const,
      label: 'Roster & Scrutineering',
      icon: Users,
      badge: teamCount,
    },
    {
      id: 'newsletter' as const,
      label: 'Newsletter Subscribers',
      icon: Mail,
      badge: subscriberCount,
    },
    {
      id: 'bulletins' as const,
      label: 'Broadcast Bulletins',
      icon: Send,
      badge: broadcastCount,
    },
    {
      id: 'staff' as const,
      label: 'Staff & Access Control',
      icon: UserCheck,
      badge: staffCount,
    },
  ];

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'superadmin':
        return <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono font-bold uppercase">Superadmin</span>;
      case 'lead_referee':
        return <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold uppercase">Lead Referee</span>;
      case 'coordinator':
        return <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-mono font-bold uppercase">Coordinator</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold uppercase">Scrutineer</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#06080f] text-slate-100 flex flex-col lg:flex-row selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* MOBILE HEADER BAR */}
      <div className="lg:hidden p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <img 
            src="/images/makersplace_icon_hires.png" 
            alt="The MakersPlace" 
            className="w-8 h-8 object-contain"
          />
          <div>
            <span className="font-orbitron font-bold text-xs text-white block">MINOAN SCADA</span>
            <span className="text-[10px] font-mono text-cyan-400 block">Organizer Console</span>
          </div>
        </div>

        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* DEDICATED ADMIN SIDEBAR */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Top Branding */}
        <div className="p-6 border-b border-slate-800/80 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-400/50 p-1.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <img 
                src="/images/makersplace_icon_hires.png" 
                alt="The MakersPlace" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(0,240,255,0.5)]" 
              />
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-amber-400 font-bold uppercase block">
                The MakersPlace Ghana
              </span>
              <span className="font-orbitron font-black text-sm text-white block tracking-wider">
                CONTROL VAULT
              </span>
            </div>
          </div>

          {/* User Profile Pill */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-slate-400">Authenticated Staff</span>
              {getRoleBadge(user?.role)}
            </div>
            <div className="font-bold text-xs text-slate-100 truncate">{user?.name}</div>
            <div className="text-[10px] font-mono text-cyan-400 truncate">{user?.email}</div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs transition-colors ${
                  isActive
                    ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950/90">
          <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CORE API CONNECTED (v1.0)</span>
          </div>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 font-mono text-xs transition-colors"
          >
            <span>View Public Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-rose-950/40 hover:bg-rose-950 text-rose-300 border border-rose-500/30 font-mono text-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span>End Session / Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 min-w-0 flex flex-col">
        
        {/* TOP COMMAND HUD */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-slate-950/60 border-b border-slate-800/80 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="font-orbitron font-bold text-xs text-white uppercase tracking-wider block">
                MINOAN ROBOTSPORTS GHANA 2027 — CONTROL CONSOLE
              </span>
              <span className="text-[10px] font-mono text-slate-400 block">
                Rule Zero Hardware Scrutineering & Athlete Communication SCADA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={getRegistrationCsvUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-mono text-xs transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
              <span>Teams CSV</span>
            </a>

            <a
              href={getNewsletterCsvUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-amber-950 text-amber-300 border border-amber-500/30 font-mono text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Subscribers CSV</span>
            </a>

            <div className="h-6 w-px bg-slate-800" />

            <button
              onClick={logout}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-rose-400 border border-slate-800 font-mono text-xs transition-colors"
              title="Log out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE CONTENT */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

    </div>
  );
};
