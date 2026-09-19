import React, { useState } from 'react';
import { INSPECTION_ITEMS } from '../data/checklistData';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  CheckSquare, 
  Square,
  Sparkles,
  Info
} from 'lucide-react';

export const InspectionChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(['env-01', 'saf-02']);
  const [openAccordionId, setOpenAccordionId] = useState<string | null>('env-01');

  const totalItems = INSPECTION_ITEMS.length;
  const passedItems = checkedIds.length;
  const progressPercent = Math.round((passedItems / totalItems) * 100);

  const toggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordionId(prev => (prev === id ? null : id));
  };

  const resetChecks = () => {
    setCheckedIds([]);
  };

  const checkAll = () => {
    setCheckedIds(INSPECTION_ITEMS.map(i => i.id));
  };

  const isReady = passedItems === totalItems;

  return (
    <section className="py-16 sm:py-20 relative z-10 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Paddock Pit Compliance</span>
          </div>

          <h2 className="font-orbitron font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide">
            Pre-Flight Technical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-cyan-300">
              Inspection Checklist
            </span>
          </h2>

          <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
            Every robot must pass official Technical Inspection before entering any arena or flight cage. Use this interactive self-assessment tool to verify compliance before arriving in Accra.
          </p>
        </div>

        {/* Readiness Meter Card */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block">
                Self-Assessment Status
              </span>
              <h4 className="font-orbitron font-bold text-lg text-white mt-0.5">
                {isReady ? (
                  <span className="text-emerald-400 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    Paddock Cleared — 100% Ready for Technical Pass
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    {totalItems - passedItems} Inspection Items Remaining
                  </span>
                )}
              </h4>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={checkAll}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                Pass All
              </button>
              <button
                onClick={resetChecks}
                className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Compliance Score: {passedItems} of {totalItems} verified</span>
              <span className={isReady ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                {progressPercent}%
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  isReady ? 'bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_12px_#10b981]' : 'bg-gradient-to-r from-amber-500 to-amber-400'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {INSPECTION_ITEMS.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            const isOpen = openAccordionId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isChecked
                    ? 'bg-slate-900/70 border-emerald-500/40'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Accordion Header Row */}
                <div
                  onClick={() => toggleAccordion(item.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => toggleCheck(item.id, e)}
                      className="p-1 rounded text-slate-400 hover:text-cyan-400 transition-colors shrink-0"
                      aria-label={isChecked ? 'Mark unverified' : 'Mark verified'}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.2 rounded bg-slate-950 text-slate-400 border border-slate-800">
                          {item.category}
                        </span>
                        <span className={`font-mono text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          item.importance === 'CRITICAL FAIL'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {item.importance}
                        </span>
                      </div>

                      <h4 className={`font-orbitron text-sm font-semibold truncate ${
                        isChecked ? 'text-slate-200 line-through decoration-emerald-500/50' : 'text-white'
                      }`}>
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
                      {item.ruleReference}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </div>

                {/* Accordion Expanded Details */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 bg-slate-950/60 text-xs font-sans space-y-3 animate-in fade-in duration-150">
                    <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                      <span className="font-mono text-[10px] uppercase text-cyan-400 font-bold block mb-1">
                        Technical Specification
                      </span>
                      <p className="text-slate-300 leading-relaxed font-normal">
                        {item.specification}
                      </p>
                    </div>

                    <div className="flex items-start gap-2.5 text-slate-400 text-xs font-mono">
                      <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item.details}</span>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={(e) => toggleCheck(item.id, e)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                          isChecked
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold'
                        }`}
                      >
                        {isChecked ? 'Uncheck Requirement' : 'Mark as Compliant'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
