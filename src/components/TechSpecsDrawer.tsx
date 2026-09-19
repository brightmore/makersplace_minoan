import React from 'react';
import { SportChallenge } from '../types';
import { X, Cpu, Gauge, ShieldAlert, Zap, Radio, CheckCircle } from 'lucide-react';

interface TechSpecsDrawerProps {
  sport: SportChallenge | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectRegister: (sportId: SportChallenge['id']) => void;
}

export const TechSpecsDrawer: React.FC<TechSpecsDrawerProps> = ({
  sport,
  isOpen,
  onClose,
  onSelectRegister,
}) => {
  if (!isOpen || !sport) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-950 border-l border-cyan-500/30 shadow-2xl shadow-cyan-950/50 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {sport.code}
                </span>
                <h3 className="font-orbitron font-bold text-lg text-white">
                  Technical Specifications
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4">
              <h4 className="font-orbitron font-bold text-base text-cyan-300">
                {sport.name}
              </h4>
              <p className="font-mono text-xs text-slate-400 mt-1">
                Engineering Constraints & Compliance Thresholds
              </p>
            </div>

            {/* Spec Sections */}
            <div className="mt-6 space-y-5">
              
              {/* Microcontrollers */}
              <div className="rounded-lg bg-slate-900/60 border border-slate-800/80 p-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 mb-2">
                  <Cpu className="w-4 h-4" />
                  <span>PERMITTED MICROCONTROLLERS & FLIGHT BOARDS</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {sport.techSpecs.microcontrollers.map((mcu, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-[11px] text-slate-200">
                      {mcu}
                    </span>
                  ))}
                </div>
              </div>

              {/* Physical Envelope & Weight */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-900/60 border border-slate-800/80 p-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-400 mb-1">
                    <Gauge className="w-3.5 h-3.5" />
                    <span>MAX WEIGHT</span>
                  </div>
                  <p className="font-mono text-xs font-bold text-slate-200">
                    {sport.techSpecs.maxWeight}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-900/60 border border-slate-800/80 p-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-400 mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>VOLTAGE CAP</span>
                  </div>
                  <p className="font-mono text-xs font-bold text-slate-200">
                    {sport.techSpecs.voltageLimit}
                  </p>
                </div>
              </div>

              {/* Physical Sizing Envelope */}
              <div className="rounded-lg bg-slate-900/60 border border-slate-800/80 p-4">
                <div className="text-[11px] font-mono font-bold text-slate-400 uppercase mb-1">
                  Physical Dimensional Gauge
                </div>
                <p className="text-xs text-slate-200 font-mono">
                  {sport.techSpecs.maxDimensions}
                </p>
              </div>

              {/* Control Architecture */}
              <div className="rounded-lg bg-slate-900/60 border border-slate-800/80 p-4">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-cyan-400" />
                    Control Mode
                  </span>
                  <span className="font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    {sport.techSpecs.controlMode}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                    Safety Certification
                  </span>
                  <span className="font-semibold text-emerald-300">
                    {sport.techSpecs.safetyRating}
                  </span>
                </div>
              </div>

              {/* Mandatory Failsafes */}
              <div className="rounded-lg bg-slate-900/60 border border-slate-800/80 p-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>MANDATORY FAILSAFE REQUIREMENTS</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {sport.techSpecs.failsafeRequirements.map((failsafe, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{failsafe}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-slate-800 space-y-3">
            <button
              onClick={() => {
                onClose();
                onSelectRegister(sport.id);
              }}
              className="w-full py-3 px-4 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider text-center shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
            >
              Register for {sport.name}
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-mono text-xs text-center border border-slate-800 transition-colors"
            >
              Close Drawer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
