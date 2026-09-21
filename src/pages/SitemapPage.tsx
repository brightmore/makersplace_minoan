import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Network, 
  ArrowLeft, 
  ExternalLink, 
  Search, 
  FileCode2, 
  Layers, 
  ShieldCheck, 
  Lock, 
  FileSpreadsheet, 
  ChevronRight, 
  Sparkles,
  Bot,
  Trophy,
  Video,
  FileText,
  Handshake,
  Cpu
} from 'lucide-react';
import { SPORTS_DATA } from '../data/sportsData';
import { SEOHead } from '../components/SEOHead';
import { createBreadcrumbSchema } from '../utils/seoSchemas';

export const SitemapPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const mainPages = [
    {
      title: 'Tournament Home Portal',
      path: '/',
      description: 'Main event landing page featuring countdown HUD, video showcases, and quick registration access.',
      badge: 'Core Portal',
      icon: Sparkles,
      color: 'cyan',
    },
    {
      title: 'All RobotSports Disciplines',
      path: '/sports',
      description: 'Comprehensive directory of all 7 sanctioned competitive categories with filtering and telemetry.',
      badge: 'Competition',
      icon: Layers,
      color: 'cyan',
    },
    {
      title: 'Rule Zero & Technical Scrutineering',
      path: '/rules',
      description: 'Interactive pre-flight inspection checklist, safety criteria, dimensional limits, and fail-safe standards.',
      badge: 'Safety First',
      icon: ShieldCheck,
      color: 'amber',
    },
    {
      title: 'Minoan Global Finals Pathway',
      path: '/pathway',
      description: 'Seeding structure, national qualifiers, and international travel pathway to Crete, Greece.',
      badge: 'World Finals',
      icon: Trophy,
      color: 'emerald',
    },
    {
      title: 'Media Hub & Video Showcase',
      path: '/media',
      description: 'Arena telemetry feeds, official YouTube match showcases, drone flight demonstrations, and press media kits.',
      badge: 'Media',
      icon: Video,
      color: 'purple',
    },
    {
      title: 'CAD Blueprints & Technical Vault',
      path: '/resources',
      description: 'Downloadable arena field drawings, score sheet rubrics, and official PDF rulebooks.',
      badge: 'Downloads',
      icon: FileText,
      color: 'cyan',
    },
    {
      title: 'Sponsors & STEAM Alliance',
      path: '/sponsors',
      description: 'Industry, academic, and governmental partners advancing African robotics and youth engineering.',
      badge: 'Partners',
      icon: Handshake,
      color: 'amber',
    },
  ];

  const legalPages = [
    {
      title: 'Official Privacy Policy',
      path: '/privacy',
      description: 'Data protection standards compliant with the Ghana Data Protection Act 2012 (Act 843) and child protection protocols.',
      badge: 'Statutory Act 843',
    },
    {
      title: 'Tournament Terms & Conditions',
      path: '/terms',
      description: 'Bylaws governing team eligibility, Rule Zero supremacy, radio spectrum anti-jamming, and intellectual property.',
      badge: 'Binding Regulations',
    },
    {
      title: 'HTML Platform Sitemap',
      path: '/sitemap',
      description: 'Visual matrix and deep links across all competition nodes, categories, and technical resources.',
      badge: 'Current Page',
    },
  ];

  const adminPages = [
    {
      title: 'Organizer SCADA Command Vault',
      path: '/admin',
      description: 'Restricted dashboard for referees, scrutineers, and directors to verify teams, inspect robots, and broadcast bulletins.',
      badge: 'Restricted Access',
      icon: Lock,
    },
    {
      title: 'Registered Teams CSV Stream',
      path: '/api/registrations/export/csv',
      description: 'Live RFC-4180 CSV export of all registered schools, institutions, athletes, and challenge categories.',
      badge: 'Data Export',
      icon: FileSpreadsheet,
      external: true,
    },
    {
      title: 'Newsletter Subscribers CSV Stream',
      path: '/api/newsletter/export/csv',
      description: 'Export of accredited coach contacts and opted-in tournament alert subscribers.',
      badge: 'Data Export',
      icon: FileSpreadsheet,
      external: true,
    },
    {
      title: 'Backend API Health Telemetry',
      path: '/api/health',
      description: 'Live server status, SQLite database connectivity, and uptime telemetry.',
      badge: 'System Status',
      icon: FileCode2,
      external: true,
    },
  ];

  // Filtering
  const filterItem = (title: string, desc: string, path: string) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return title.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || path.toLowerCase().includes(q);
  };

  const filteredMain = mainPages.filter(p => filterItem(p.title, p.description, p.path));
  const filteredSports = SPORTS_DATA.filter(s => filterItem(s.name, s.shortTagline, `/sports/${s.id}`));
  const filteredLegal = legalPages.filter(p => filterItem(p.title, p.description, p.path));
  const filteredAdmin = adminPages.filter(p => filterItem(p.title, p.description, p.path));

  return (
    <div className="pt-6 pb-20 relative z-10">
      <SEOHead
        title="Tournament Sitemap & System Directory | MINOAN 2027"
        description="Complete navigational directory indexing all MINOAN RobotSports Ghana 2027 categories, technical specifications, legal frameworks, and crawler feeds."
        keywords="MINOAN sitemap, robotics directory Ghana, XML sitemap, llms.txt, robotics API endpoints"
        canonicalPath="/sitemap"
        jsonLd={createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Sitemap', path: '/sitemap' },
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Home
          </Link>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">Sitemap</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-2xl bg-slate-900 border border-cyan-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest">
                <Network className="w-3.5 h-3.5 text-cyan-400" />
                <span>Complete Platform Directory & Sitemap</span>
              </div>

              <h1 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
                SYSTEM SITEMAP & <br />
                <span className="text-cyan-400">TOURNAMENT DIRECTORY</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Direct navigational matrix indexing every competition category, technical rulebook, legal framework, and organizer API endpoint across MINOAN RobotSports Ghana 2027.
              </p>
            </div>

            {/* XML Sitemap & AEO Crawler Feeds */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
              >
                <FileCode2 className="w-4 h-4" />
                <span>View Search Engine XML</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-850 text-cyan-400 border border-cyan-500/40 font-mono text-xs uppercase tracking-wider transition-all"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>AI Engine Context (llms.txt)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <span className="text-[10px] font-mono text-slate-400 text-center">
                W3C XML & LLMs.txt Standards • UTF-8 Compliant
              </span>
            </div>
          </div>
        </div>

        {/* Real-time Filter Bar */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-500 shrink-0 ml-1" />
          <input
            type="text"
            placeholder="Search sitemap by title, discipline code (e.g. DRN-01), keyword, or URL route..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-mono text-slate-500 hover:text-slate-300 px-2"
            >
              Clear
            </button>
          )}
        </div>

        {/* SECTION 1: PRIMARY TOURNAMENT PORTALS */}
        {filteredMain.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h2 className="font-orbitron font-bold text-base text-white uppercase tracking-wider">
                1. Primary Tournament Portals
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMain.map(page => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all space-y-2 group block"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300 text-[10px] font-mono uppercase font-bold">
                      {page.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                      {page.path}
                    </span>
                  </div>

                  <h3 className="font-orbitron font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {page.title}
                  </h3>

                  <p className="text-xs font-mono text-slate-400 line-clamp-2 leading-relaxed">
                    {page.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: OFFICIAL ROBOTSPORTS CHALLENGES */}
        {filteredSports.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-amber-400" />
                <h2 className="font-orbitron font-bold text-base text-white uppercase tracking-wider">
                  2. Regulated RobotSports Disciplines ({SPORTS_DATA.length} Challenges)
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">he-ro.gr Olympiad Sanctioned</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSports.map(sport => (
                <Link
                  key={sport.id}
                  to={`/sports/${sport.id}`}
                  className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/50 transition-all space-y-2.5 group block"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-mono uppercase font-bold">
                      {sport.code}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 group-hover:text-amber-400 transition-colors">
                      /sports/{sport.id}
                    </span>
                  </div>

                  <h3 className="font-orbitron font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                    {sport.name}
                  </h3>

                  <p className="text-xs font-mono text-slate-400 line-clamp-2 leading-relaxed">
                    {sport.shortTagline}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-800/60">
                    <span>{sport.divisions.length} Divisions</span>
                    <span className="text-cyan-400 font-bold">{sport.maxPoints}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: LEGAL, GOVERNANCE & COMPLIANCE */}
        {filteredLegal.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h2 className="font-orbitron font-bold text-base text-white uppercase tracking-wider">
                3. Legal, Governance & Participant Safeguards
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredLegal.map(page => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all space-y-2 group block"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono uppercase font-bold">
                      {page.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 group-hover:text-emerald-400 transition-colors">
                      {page.path}
                    </span>
                  </div>

                  <h3 className="font-orbitron font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">
                    {page.title}
                  </h3>

                  <p className="text-xs font-mono text-slate-400 leading-relaxed">
                    {page.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: ORGANIZER OPERATIONS & EXPORTS */}
        {filteredAdmin.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Lock className="w-4 h-4 text-purple-400" />
              <h2 className="font-orbitron font-bold text-base text-white uppercase tracking-wider">
                4. Organizer Operations & Data Streams
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredAdmin.map(item => {
                const Icon = item.icon || FileCode2;
                if (item.external) {
                  return (
                    <a
                      key={item.path}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/50 transition-all space-y-2 group block"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-purple-300 text-[10px] font-mono uppercase font-bold">
                          {item.badge}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400" />
                      </div>

                      <h3 className="font-orbitron font-bold text-xs text-slate-100 group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{item.title}</span>
                      </h3>

                      <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/50 transition-all space-y-2 group block"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-purple-300 text-[10px] font-mono uppercase font-bold">
                        {item.badge}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400" />
                    </div>

                    <h3 className="font-orbitron font-bold text-xs text-slate-100 group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{item.title}</span>
                    </h3>

                    <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
