import React, { useState } from 'react';
import { SportChallenge } from '../types';
import { X, Download, Check, Shield, FileText, ChevronRight, Scale, Award } from 'lucide-react';

interface RulebookModalProps {
  sport: SportChallenge | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectRegister: (sportId: SportChallenge['id']) => void;
}

export const RulebookModal: React.FC<RulebookModalProps> = ({
  sport,
  isOpen,
  onClose,
  onSelectRegister,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  if (!isOpen || !sport) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadComplete(true);

      // Trigger dummy PDF text download
      const element = document.createElement('a');
      const file = new Blob([
        `===============================================================\n` +
        `MINOAN ROBOTSPORTS GHANA 2027 — OFFICIAL TECHNICAL RULEBOOK\n` +
        `THE MAKERSPLACE GHANA • NATIONAL CHAMPIONSHIP SERIES\n` +
        `===============================================================\n\n` +
        `DISCIPLINE: ${sport.name} [CODE: ${sport.code}]\n` +
        `VERSION: ${sport.pdfRulebook.version} (${sport.pdfRulebook.lastUpdated})\n` +
        `MAX POINTS: ${sport.maxPoints}\n` +
        `MATCH DURATION / HEATS: ${sport.attemptsOrDuration}\n` +
        `DIVISIONS: ${sport.divisions.join(', ')}\n\n` +
        `1. OVERVIEW & OBJECTIVE\n` +
        `${sport.fullDescription}\n\n` +
        `2. ARENA & FIELD SPECIFICATIONS\n` +
        `- Dimensions: ${sport.arenaSpecs.dimensions}\n` +
        `- Surface: ${sport.arenaSpecs.surfaceType}\n` +
        `- Lighting: ${sport.arenaSpecs.lighting}\n\n` +
        `3. HARDWARE & SAFETY ENVELOPE\n` +
        `- Microcontrollers: ${sport.techSpecs.microcontrollers.join(', ')}\n` +
        `- Max Weight: ${sport.techSpecs.maxWeight}\n` +
        `- Max Sizing: ${sport.techSpecs.maxDimensions}\n` +
        `- Voltage Limit: ${sport.techSpecs.voltageLimit}\n` +
        `- Control Mode: ${sport.techSpecs.controlMode}\n\n` +
        `4. SCORE RUBRIC BREAKDOWN\n` +
        sport.rubric.map(r => `* ${r.criteria}: ${r.points} (${r.notes})`).join('\n') +
        `\n\n5. KEY TOURNAMENT REGULATIONS\n` +
        sport.keyRulesSummary.map((k, i) => `[${i+1}] ${k}`).join('\n') +
        `\n\n© 2027 The MakersPlace Ghana. All Rights Reserved.\n`
      ], { type: 'text/plain' });
      
      element.href = URL.createObjectURL(file);
      element.download = sport.pdfRulebook.fileName.replace('.pdf', '.txt');
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => setDownloadComplete(false), 3500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Click outside to close backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-950 border border-cyan-500/40 shadow-2xl shadow-cyan-950/40 overflow-hidden z-10 my-8">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              {sport.code}
            </span>
            <div>
              <h3 className="font-orbitron font-bold text-lg text-white">
                {sport.name} — Technical Rulebook
              </h3>
              <p className="font-mono text-xs text-slate-400">
                Official Edition {sport.pdfRulebook.version} • {sport.pdfRulebook.lastUpdated}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 max-h-[72vh] overflow-y-auto space-y-8">
          
          {/* Overview & Quick Meta */}
          <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-5 space-y-3">
            <p className="text-sm text-slate-300 leading-relaxed">
              {sport.fullDescription}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">MAX POINTS</span>
                <span className="text-cyan-400 font-bold font-orbitron">{sport.maxPoints}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">DURATION / HEATS</span>
                <span className="text-amber-400 font-bold">{sport.attemptsOrDuration}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">TEAM COMPOSITION</span>
                <span className="text-emerald-400 font-bold">{sport.teamCapacity}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">CONTROL PROTOCOL</span>
                <span className="text-pink-400 font-bold">{sport.techSpecs.controlMode}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Score Rubric Table */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-cyan-400" />
              <h4 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
                Official Scoring Rubric
              </h4>
            </div>

            <div className="rounded-lg border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4">Evaluation Criteria</th>
                    <th className="py-2.5 px-4 text-right">Points / Reward</th>
                    <th className="py-2.5 px-4 hidden sm:table-cell">Technical Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
                  {sport.rubric.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-slate-200">{item.criteria}</td>
                      <td className="py-2.5 px-4 text-right text-cyan-400 font-bold font-orbitron">{item.points}</td>
                      <td className="py-2.5 px-4 text-slate-400 text-[11px] hidden sm:table-cell">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Key Arena & Dimension Schematics */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-4 h-4 text-amber-400" />
              <h4 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
                Arena Geometry & Technical Constraints
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase text-amber-400 font-bold">Arena Dimensions</span>
                <p className="text-slate-200">{sport.arenaSpecs.dimensions}</p>
                <span className="text-[10px] uppercase text-slate-400 block pt-1">Surface Type</span>
                <p className="text-slate-300">{sport.arenaSpecs.surfaceType}</p>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase text-cyan-400 font-bold">Chassis Constraints</span>
                <p className="text-slate-200">Max Weight: <span className="text-white font-bold">{sport.techSpecs.maxWeight}</span></p>
                <p className="text-slate-200">Envelope: <span className="text-white font-bold">{sport.techSpecs.maxDimensions}</span></p>
                <p className="text-slate-200">Battery Cap: <span className="text-white font-bold">{sport.techSpecs.voltageLimit}</span></p>
              </div>
            </div>
          </div>

          {/* Section 3: Essential Regulations */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-emerald-400" />
              <h4 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
                Tournament Regulations
              </h4>
            </div>

            <div className="space-y-2.5">
              {sport.keyRulesSummary.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 text-xs">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-400 flex items-center justify-center font-mono font-bold shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="text-slate-300 leading-relaxed">{rule}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>{sport.pdfRulebook.fileName} ({sport.pdfRulebook.fileSize})</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
            >
              {downloadComplete ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Downloaded Rulebook</span>
                </>
              ) : (
                <>
                  <Download className={`w-3.5 h-3.5 ${downloading ? 'animate-bounce' : 'text-cyan-400'}`} />
                  <span>{downloading ? 'Generating PDF...' : 'Download Official PDF'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                onClose();
                onSelectRegister(sport.id);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-orbitron font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
            >
              <span>Register This Sport</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
