import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SPORTS_DATA } from '../data/sportsData';
import { SportId, GalleryItem } from '../types';
import { RulebookModal } from '../components/RulebookModal';
import { ImageLightboxModal } from '../components/ImageLightboxModal';
import { 
  Bot, 
  Trophy, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Download, 
  Clock, 
  Cpu, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  Target, 
  Plane, 
  Zap, 
  Activity, 
  Layers, 
  Sparkles, 
  Box, 
  Scale, 
  BatteryCharging, 
  HelpCircle,
  Shield,
  Eye,
  Check
} from 'lucide-react';

interface SportDetailPageProps {
  onOpenRegister: (sportId: SportId) => void;
}

export const SportDetailPage: React.FC<SportDetailPageProps> = ({ onOpenRegister }) => {
  const { sportId } = useParams<{ sportId: string }>();

  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'rubric' | 'arena' | 'hardware' | 'gallery' | 'faq'>('overview');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isRulebookOpen, setIsRulebookOpen] = useState(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Find sport by ID or code (case-insensitive)
  const sport = SPORTS_DATA.find(
    (s) => s.id.toLowerCase() === sportId?.toLowerCase() || s.code.toLowerCase() === sportId?.toLowerCase()
  );

  if (!sport) {
    return (
      <div className="pt-16 pb-24 relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-12 rounded-2xl bg-slate-900/80 border border-red-500/40 shadow-2xl space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
          <h2 className="font-orbitron font-bold text-2xl text-white">Discipline Not Found</h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            The requested RobotSports discipline code "{sportId}" could not be located in the official 2027 competition registry.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              to="/sports"
              className="px-6 py-2.5 rounded-lg bg-cyan-400 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider"
            >
              View All 7 Disciplines
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate Next and Previous Sport
  const currentIndex = SPORTS_DATA.findIndex((s) => s.id === sport.id);
  const prevSport = currentIndex > 0 ? SPORTS_DATA[currentIndex - 1] : SPORTS_DATA[SPORTS_DATA.length - 1];
  const nextSport = currentIndex < SPORTS_DATA.length - 1 ? SPORTS_DATA[currentIndex + 1] : SPORTS_DATA[0];

  const getSportIcon = (iconName: string) => {
    switch (iconName) {
      case 'Plane': return Plane;
      case 'ShieldAlert': return Shield;
      case 'Activity': return Activity;
      case 'Trophy': return Trophy;
      case 'Crosshair': return Target;
      case 'Target': return Target;
      case 'Sparkles': return Sparkles;
      default: return Zap;
    }
  };

  const IconComponent = getSportIcon(sport.icon);

  const handleDownloadRulebook = () => {
    setDownloadToast(`Downloaded ${sport.pdfRulebook.fileName}`);
    const element = document.createElement('a');
    const file = new Blob([
      `===============================================================\n` +
      `MINOAN ROBOTSPORTS GHANA 2027 — OFFICIAL DISCIPLINE RULEBOOK\n` +
      `SANCTIONED BY H.E.R.O. (HELLENIC EDUCATIONAL ROBOTICS ORGANIZATION)\n` +
      `ORGANIZED BY THE MAKERSPLACE GHANA • NATIONAL SECRETARIAT\n` +
      `===============================================================\n\n` +
      `DISCIPLINE: ${sport.name} [${sport.code}]\n` +
      `CATEGORY: ${sport.mrcCategory || 'RobotSports'}\n` +
      `RULEBOOK VERSION: ${sport.pdfRulebook.version} (${sport.pdfRulebook.lastUpdated})\n\n` +
      `RULE ZERO DIRECTIVE:\n` +
      `"${sport.ruleZeroClause || 'If you are not sure whether something is allowed, then it is probably not allowed.'}"\n\n` +
      `CHALLENGE OVERVIEW:\n` +
      `${sport.fullDescription}\n\n` +
      `KEY COMPETITION RULES:\n` +
      sport.keyRulesSummary.map((r, i) => `${i + 1}. ${r}`).join('\n') +
      `\n\nSCORING RUBRIC:\n` +
      sport.rubric.map(r => `* ${r.criteria}: ${r.points} (${r.notes})`).join('\n') +
      `\n\nHARDWARE SPECIFICATIONS:\n` +
      `- Control Box Envelope: ${sport.controlBoxDimensions || sport.techSpecs.maxDimensions}\n` +
      `- Max Weight: ${sport.techSpecs.maxWeight}\n` +
      `- Voltage Limits: ${sport.techSpecs.voltageLimit}\n` +
      `- Approved MCUs: ${sport.techSpecs.microcontrollers.join(', ')}\n\n` +
      `Official Helpdesk: info@makersplacegh.com | info@he-ro.gr\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = sport.pdfRulebook.fileName.replace('.pdf', '.txt');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  return (
    <div className="pt-6 pb-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6 flex-wrap">
          <Link to="/" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Home
          </Link>
          <span>/</span>
          <Link to="/sports" className="hover:text-cyan-300 transition-colors">
            RobotSports
          </Link>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">{sport.name}</span>
        </div>

        {/* Page Hero Header Banner */}
        <div className="relative rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-950 to-slate-900/90 border border-cyan-500/40 p-6 sm:p-10 mb-8 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 space-y-5">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest flex items-center gap-1.5">
                <IconComponent className="w-3.5 h-3.5 text-cyan-400" />
                <span>{sport.mrcCategory || 'Official MRC Discipline'}</span>
              </span>

              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest font-bold">
                {sport.code}
              </span>

              <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
                {sport.officialHROStandard || 'H.E.R.O. Sanctioned'}
              </span>
            </div>

            {/* Main Title & Tagline */}
            <div>
              <h1 className="font-orbitron font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-wide">
                {sport.name}
              </h1>
              <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                {sport.shortTagline}
              </p>
            </div>

            {/* Quick Metrics HUD Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Max Target Score</span>
                <span className="font-orbitron font-bold text-sm sm:text-base text-cyan-400">{sport.maxPoints}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Match / Heats</span>
                <span className="font-orbitron font-bold text-sm sm:text-base text-white">{sport.attemptsOrDuration}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Team Capacity</span>
                <span className="font-orbitron font-bold text-sm sm:text-base text-amber-400">{sport.teamCapacity}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Control Mode</span>
                <span className="font-orbitron font-bold text-sm sm:text-base text-emerald-400">{sport.techSpecs.controlMode}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => onOpenRegister(sport.id)}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 text-slate-950 font-orbitron font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all flex items-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Register Team for this Sport</span>
              </button>

              <button
                onClick={handleDownloadRulebook}
                className="px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Rulebook ({sport.pdfRulebook.fileSize})</span>
              </button>

              <button
                onClick={() => setIsRulebookOpen(true)}
                className="px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Preview Document</span>
              </button>

              <Link
                to="/rules"
                className="px-4 py-3 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ml-auto"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Pre-Flight Check</span>
              </Link>
            </div>

            {/* Toast Notification */}
            {downloadToast && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-mono animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                <span>{downloadToast}</span>
              </div>
            )}

          </div>
        </div>

        {/* Tabbed Section Navigation */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto no-scrollbar gap-2">
          {[
            { id: 'overview', label: 'Overview & Challenge', icon: Bot },
            { id: 'rules', label: 'Official Rules & Scrutineering', icon: ShieldCheck },
            { id: 'rubric', label: 'Scoring Rubric', icon: Trophy },
            { id: 'arena', label: 'Arena & Pitch Specs', icon: Layers },
            { id: 'hardware', label: 'Hardware & Tech Specs', icon: Sliders },
            { id: 'gallery', label: 'Image Viewports', icon: Eye },
            { id: 'faq', label: 'FAQ & Mentors', icon: HelpCircle },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 pt-2 px-3.5 sm:px-5 font-mono text-xs sm:text-sm whitespace-nowrap transition-all border-b-2 flex items-center gap-2 ${
                  isActive
                    ? 'border-cyan-400 text-cyan-300 font-bold bg-slate-900/40 rounded-t-lg'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview & Challenge Description */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-4">
                  <h3 className="font-orbitron font-bold text-xl text-white">Challenge Narrative & Objective</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {sport.fullDescription}
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Teams design, assemble, program, and pilot their robots under strict match conditions. 
                    Beyond raw speed or mechanical force, the sport emphasizes algorithmic autonomy, precision state transitions, 
                    energy management, and pit crew turnaround speed.
                  </p>
                </div>

                {/* Match Format & Procedure */}
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm space-y-4">
                  <h3 className="font-orbitron font-bold text-xl text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <span>Tournament Match Format</span>
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {sport.matchFormatDetails || `${sport.attemptsOrDuration} allocated under official tournament timekeeping.`}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block uppercase">1. Paddock Pit Inspection</span>
                      <span className="text-cyan-300 font-semibold">T-Minus 60 Mins</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block uppercase">2. Staging & Calibration</span>
                      <span className="text-amber-300 font-semibold">T-Minus 10 Mins</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block uppercase">3. Official Match Run</span>
                      <span className="text-emerald-300 font-semibold">{sport.attemptsOrDuration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Quick Info */}
              <div className="lg:col-span-4 space-y-6">
                {/* Rule Zero Callout */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-950 border border-amber-500/40 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Rule Zero Directive</span>
                  </div>
                  <blockquote className="font-sans text-xs sm:text-sm text-amber-200/90 italic leading-relaxed">
                    "{sport.ruleZeroClause || 'If you are not sure whether something is allowed, then it is probably not allowed.'}"
                  </blockquote>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    Chief Referee Council has final binding authority on arena safety.
                  </span>
                </div>

                {/* Divisions Accepted */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <h4 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
                    Eligible Age Divisions
                  </h4>
                  <div className="space-y-2 text-xs font-mono">
                    {sport.divisions.map((div, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-300">{div}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Physical Envelope Box */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <h4 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <Box className="w-4 h-4 text-cyan-400" />
                    <span>Control Box Limits</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {sport.controlBoxDimensions || sport.techSpecs.maxDimensions}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
                    <Scale className="w-3.5 h-3.5 text-amber-400" />
                    <span>Max Weight: {sport.techSpecs.maxWeight}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Rules & Scrutineering */}
        {activeTab === 'rules' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Key Rules List */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-orbitron font-bold text-xl text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>Mandatory Competition Regulations</span>
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Every team must adhere to the official rules. Any dispute is governed by the Chief Referee according to official H.E.R.O. texts.
              </p>
              <div className="space-y-3 pt-2">
                {sport.keyRulesSummary.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-850">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Penalties & Disciplinary Infractions Table */}
            {sport.penaltiesAndFouls && sport.penaltiesAndFouls.length > 0 && (
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h3 className="font-orbitron font-bold text-xl text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span>Penalties, Restarts & Infractions</span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="pb-3 pr-4">Infraction / Violation</th>
                        <th className="pb-3 text-amber-400">Consequence / Penalty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850">
                      {sport.penaltiesAndFouls.map((p, i) => (
                        <tr key={i} className="hover:bg-slate-950/40 transition-colors">
                          <td className="py-3 pr-4 text-slate-300 font-medium">{p.violation}</td>
                          <td className="py-3 text-amber-300">{p.consequence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Paddock Scrutineering Checklist */}
            {sport.scrutineeringChecklist && sport.scrutineeringChecklist.length > 0 && (
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h3 className="font-orbitron font-bold text-xl text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Paddock Inspection Gate Clearance</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {sport.scrutineeringChecklist.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-850 text-xs font-mono text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Scoring Rubric */}
        {activeTab === 'rubric' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-orbitron font-bold text-xl text-white">Official Evaluation & Scoring Breakdown</h3>
                  <p className="text-slate-400 text-xs font-mono mt-1">
                    Maximum Achievable Score: <span className="text-cyan-400 font-bold">{sport.maxPoints}</span>
                  </p>
                </div>
                <div className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                  Official 2027 Rubric
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="pb-3 pr-4">Evaluation Task / Station</th>
                      <th className="pb-3 pr-4 text-cyan-400">Point Value</th>
                      <th className="pb-3 text-slate-400">Referee Scoring Criteria & Technical Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {sport.rubric.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-950/40 transition-colors">
                        <td className="py-3.5 pr-4 text-white font-semibold">{item.criteria}</td>
                        <td className="py-3.5 pr-4 text-cyan-300 font-bold whitespace-nowrap">{item.points}</td>
                        <td className="py-3.5 text-slate-300">{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Arena & Playing Field Specs */}
        {activeTab === 'arena' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                  <h3 className="font-orbitron font-bold text-xl text-white">Playing Field Geometry & Materials</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-mono">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                      <span className="text-slate-400 uppercase block">Arena Footprint</span>
                      <span className="text-cyan-300 font-bold text-sm">{sport.arenaSpecs.dimensions}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                      <span className="text-slate-400 uppercase block">Surface Engineering</span>
                      <span className="text-white font-medium text-xs">{sport.arenaSpecs.surfaceType}</span>
                    </div>
                    {sport.arenaSpecs.flightCeiling && (
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                        <span className="text-slate-400 uppercase block">Ceiling Clearance</span>
                        <span className="text-amber-300 font-bold text-sm">{sport.arenaSpecs.flightCeiling}</span>
                      </div>
                    )}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                      <span className="text-slate-400 uppercase block">Arena Illuminance</span>
                      <span className="text-emerald-300 font-bold text-xs">{sport.arenaSpecs.lighting}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-orbitron font-bold text-white text-sm">Experience Arena in 3D Visualizer</h4>
                    <p className="text-slate-400 text-xs">Simulate camera angles, obstacle lines, and radar telemetry.</p>
                  </div>
                  <Link
                    to="/media"
                    className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
                  >
                    Launch Visualizer
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                  <img
                    src={sport.gallery[0]?.url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'}
                    alt={sport.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Official Schematic Viewport</span>
                    <p className="text-xs text-slate-300">{sport.gallery[0]?.subtitle || 'Field layout geometry'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Hardware & Tech Specs */}
        {activeTab === 'hardware' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              <h3 className="font-orbitron font-bold text-xl text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-400" />
                <span>Permitted Hardware & Electrical Envelope</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
                  <span className="text-slate-400 uppercase block flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    Approved Microcontrollers
                  </span>
                  <div className="space-y-1">
                    {sport.techSpecs.microcontrollers.map((mcu, i) => (
                      <div key={i} className="text-slate-200 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                        {mcu}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
                  <span className="text-slate-400 uppercase block flex items-center gap-1.5">
                    <BatteryCharging className="w-3.5 h-3.5 text-amber-400" />
                    Voltage & Battery Protocols
                  </span>
                  <p className="text-amber-300 font-bold">{sport.techSpecs.voltageLimit}</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Over-voltage triggers disqualification on calibrated digital multimeter inspection.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
                  <span className="text-slate-400 uppercase block flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-emerald-400" />
                    Maximum Weight Limit
                  </span>
                  <p className="text-emerald-300 font-bold">{sport.techSpecs.maxWeight}</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Includes battery, armor, sensors, and all mechanical attachments.
                  </p>
                </div>
              </div>

              {/* Failsafes */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h4 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
                  Mandatory Paddock Failsafe Systems
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sport.techSpecs.failsafeRequirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-950 border border-slate-850 text-xs font-mono text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Image Viewports Gallery */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-center max-w-xl mx-auto mb-4">
              <h3 className="font-orbitron font-bold text-xl text-white">Discipline Visual Viewports</h3>
              <p className="text-slate-400 text-xs font-mono mt-1">Click any image to open the full-resolution inspection viewport.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sport.gallery.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className="group relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 space-y-1 bg-slate-900/90 border-t border-slate-800">
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {img.badge}
                    </span>
                    <h4 className="font-orbitron font-bold text-xs text-white truncate group-hover:text-cyan-300">
                      {img.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{img.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: FAQ & Mentors */}
        {activeTab === 'faq' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h3 className="font-orbitron font-bold text-xl text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <span>Frequently Asked Technical Questions</span>
              </h3>
              <div className="space-y-4 pt-2">
                {sport.faq && sport.faq.length > 0 ? (
                  sport.faq.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
                      <h4 className="font-orbitron font-bold text-sm text-cyan-300">Q: {item.q}</h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">A: {item.a}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-xs font-mono">Technical bulletins and FAQ addendums are posted periodically by the Chief Referee.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Persistent Bottom Registration CTA Banner */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/40 p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest font-bold">
              Tournament Matchday: January 30, 2027
            </span>
            <h3 className="font-orbitron font-bold text-xl sm:text-2xl text-white">
              Ready to enter the {sport.name} Arena?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Register your school or maker team today to receive official technical blueprints, paddock entry passes, and mentoring support from The MakersPlace.
            </p>
          </div>

          <button
            onClick={() => onOpenRegister(sport.id)}
            className="px-7 py-3.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all shrink-0"
          >
            Register for {sport.code}
          </button>
        </div>

        {/* Next / Previous Sport Navigator */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex items-center justify-between gap-4">
          <Link
            to={`/sports/${prevSport.id}`}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors p-2 rounded-lg bg-slate-900/60 border border-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <div className="text-left hidden xs:block">
              <span className="text-[10px] text-slate-500 block">PREVIOUS DISCIPLINE</span>
              <span className="text-slate-200 font-semibold">{prevSport.name}</span>
            </div>
          </Link>

          <Link
            to="/sports"
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 text-center"
          >
            All 7 Disciplines
          </Link>

          <Link
            to={`/sports/${nextSport.id}`}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors p-2 rounded-lg bg-slate-900/60 border border-slate-800"
          >
            <div className="text-right hidden xs:block">
              <span className="text-[10px] text-slate-500 block">NEXT DISCIPLINE</span>
              <span className="text-slate-200 font-semibold">{nextSport.name}</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </Link>
        </div>

      </div>

      {/* Rulebook Modal */}
      <RulebookModal
        sport={sport}
        isOpen={isRulebookOpen}
        onClose={() => setIsRulebookOpen(false)}
        onSelectRegister={(id) => {
          setIsRulebookOpen(false);
          onOpenRegister(id);
        }}
      />

      {/* Image Lightbox Modal */}
      <ImageLightboxModal
        image={selectedImage}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};
