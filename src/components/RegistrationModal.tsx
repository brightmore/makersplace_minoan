import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SPORTS_DATA } from '../data/sportsData';
import { SportId, RegistrationFormData } from '../types';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Download, 
  Share2, 
  CheckCircle2, 
  Calendar
} from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSportId?: SportId | null;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialSportId,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  const [formData, setFormData] = useState<RegistrationFormData>({
    teamName: '',
    organizationType: 'school',
    organizationName: '',
    selectedSports: initialSportId ? [initialSportId] : ['drone'],
    division: 'senior',
    teamSize: 3,
    leadContactName: '',
    leadContactRole: 'Head Coach / Mentor',
    leadContactEmail: '',
    leadContactPhone: '+233 ',
    cityRegion: 'Greater Accra',
    experienceLevel: 'intermediate',
    emergencyConsent: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialSportId) {
      setFormData(prev => ({
        ...prev,
        selectedSports: prev.selectedSports.includes(initialSportId)
          ? prev.selectedSports
          : [...prev.selectedSports, initialSportId],
      }));
    }
  }, [initialSportId]);

  if (!isOpen) return null;

  const ghanaRegions = [
    'Greater Accra',
    'Ashanti',
    'Central',
    'Western',
    'Eastern',
    'Volta',
    'Northern',
    'Upper East',
    'Upper West',
    'Bono',
    'Bono East',
    'Ahafo',
    'Oti',
    'Savannah',
    'North East',
    'Western North',
  ];

  const handleSportToggle = (sportId: SportId) => {
    setFormData(prev => {
      const exists = prev.selectedSports.includes(sportId);
      if (exists) {
        if (prev.selectedSports.length === 1) return prev; // Keep at least one
        return { ...prev, selectedSports: prev.selectedSports.filter(id => id !== sportId) };
      } else {
        return { ...prev, selectedSports: [...prev.selectedSports, sportId] };
      }
    });
  };

  const validateStep = (step: number): boolean => {
    const errs: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.teamName.trim()) errs.teamName = 'Team name is required.';
      if (!formData.organizationName.trim()) errs.organizationName = 'Institution / Club name is required.';
      if (formData.selectedSports.length === 0) errs.selectedSports = 'Select at least one challenge category.';
    } else if (step === 2) {
      if (!formData.division) errs.division = 'Please choose an age division.';
    } else if (step === 3) {
      if (!formData.leadContactName.trim()) errs.leadContactName = 'Lead contact name is required.';
      if (!formData.leadContactEmail.trim() || !formData.leadContactEmail.includes('@')) {
        errs.leadContactEmail = 'Valid contact email is required.';
      }
      if (!formData.leadContactPhone.trim() || formData.leadContactPhone.length < 10) {
        errs.leadContactPhone = 'Valid Ghana contact number required (e.g. +233 24 123 4567).';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) {
      setCurrentStep(3);
      return;
    }

    // Generate random Ghana registration reference
    const randomCode = `MRC27-GH-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmationCode(randomCode);

    // Save to LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem('mrc27_registrations') || '[]');
      existing.push({
        ...formData,
        code: randomCode,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('mrc27_registrations', JSON.stringify(existing));
    } catch {
      // ignore storage error
    }

    // Trigger Canvas Confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#f59e0b', '#10b981', '#ffffff'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#00f0ff', '#f59e0b'],
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#10b981', '#00f0ff'],
        });
      }, 300);
    } catch {
      // Confetti fallback
    }

    setSubmitted(true);
  };

  const downloadConfirmationSlip = () => {
    const slip = [
      `==================================================================\n` +
      `MINOAN ROBOTSPORTS GHANA 2027 — OFFICIAL REGISTRATION CONFIRMATION\n` +
      `ORGANIZED BY THE MAKERSPLACE • ACCRA, GHANA • JAN 30, 2027\n` +
      `==================================================================\n\n` +
      `REGISTRATION CODE: ${confirmationCode}\n` +
      `STATUS: VERIFIED & SEEDED IN SCRUTINEERING QUEUE\n` +
      `SUBMISSION TIMESTAMP: ${new Date().toLocaleString()}\n\n` +
      `1. TEAM CREDENTIALS\n` +
      `- Team Name: ${formData.teamName}\n` +
      `- Institution / Club: ${formData.organizationName} (${formData.organizationType.toUpperCase()})\n` +
      `- Region / City: ${formData.cityRegion}, Ghana\n` +
      `- Division: ${formData.division.toUpperCase()}\n` +
      `- Expected Team Size: ${formData.teamSize} members\n\n` +
      `2. REGISTERED ROBOTSPORTS DISCIPLINES (${formData.selectedSports.length})\n` +
      formData.selectedSports.map(id => {
        const sport = SPORTS_DATA.find(s => s.id === id);
        return `* [${sport?.code}] ${sport?.name}`;
      }).join('\n') +
      `\n\n3. LEAD CONTACT DETAILS\n` +
      `- Contact Person: ${formData.leadContactName} (${formData.leadContactRole})\n` +
      `- Email: ${formData.leadContactEmail}\n` +
      `- Phone: ${formData.leadContactPhone}\n\n` +
      `4. TOURNAMENT DAY MANDATORY SCHEDULE\n` +
      `- Venue Scrutineering / Pit Check-in: 07:30 GMT\n` +
      `- Pilots & Drivers Briefing: 08:30 GMT\n` +
      `- Opening Heats: 09:15 GMT\n` +
      `- Venue Location: Accra, Ghana (Notification via WhatsApp & Email)\n\n` +
      `Present this ticket slip at the Scrutineering Gate with your robot safety gear.\n` +
      `Official Help Desk: info@makersplacegh.com | WhatsApp: +233 24 000 0000\n`
    ].join('');

    const blob = new Blob([slip], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MRC27-Confirmation-${confirmationCode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const getWhatsAppShareUrl = () => {
    const text = encodeURIComponent(
      `🎉 We just registered our team "${formData.teamName}" for MINOAN ROBOTSPORTS GHANA 2027 (MRC Ghana 2027)! ` +
      `We are competing in ${formData.selectedSports.length} disciplines on Jan 30, 2027 in Accra. ` +
      `Registration code: ${confirmationCode}. Join us: https://minoanrobotsports.org.gh`
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  };

  const resetForm = () => {
    setSubmitted(false);
    setCurrentStep(1);
    setFormData({
      teamName: '',
      organizationType: 'school',
      organizationName: '',
      selectedSports: ['drone'],
      division: 'senior',
      teamSize: 3,
      leadContactName: '',
      leadContactRole: 'Head Coach / Mentor',
      leadContactEmail: '',
      leadContactPhone: '+233 ',
      cityRegion: 'Greater Accra',
      experienceLevel: 'intermediate',
      emergencyConsent: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-950 border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 overflow-hidden z-10 my-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-cyan-400/40 p-1 flex items-center justify-center">
              <img 
                src="/images/makersplace_icon_hires.png" 
                alt="The MakersPlace Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(0,240,255,0.6)]"
              />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-base text-white">
                Team Registration Portal
              </h3>
              <p className="font-mono text-xs text-slate-400">
                MINOAN RobotSports Ghana 2027 • January 30, 2027 (Accra)
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

        {/* Multi-Step Tracker (If not yet submitted) */}
        {!submitted && (
          <div className="px-6 pt-5 pb-2 bg-slate-950 border-b border-slate-850">
            <div className="flex items-center justify-between text-xs font-mono">
              {[
                { num: 1, label: 'Team & Sports' },
                { num: 2, label: 'Division & Size' },
                { num: 3, label: 'Lead Contact' },
                { num: 4, label: 'Review & Confirm' },
              ].map((step) => {
                const isPassed = currentStep > step.num;
                const isCurrent = currentStep === step.num;
                return (
                  <div key={step.num} className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                        isPassed
                          ? 'bg-emerald-500 text-slate-950'
                          : isCurrent
                          ? 'bg-cyan-400 text-slate-950 shadow-[0_0_10px_#00f0ff]'
                          : 'bg-slate-900 text-slate-500 border border-slate-800'
                      }`}
                    >
                      {isPassed ? <Check className="w-3.5 h-3.5" /> : step.num}
                    </div>
                    <span className={`hidden sm:inline ${isCurrent ? 'text-white font-semibold' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Form Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {submitted ? (
            /* Instant Confirmation Success View */
            <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="font-mono text-xs font-bold text-cyan-400 tracking-widest uppercase">
                  REGISTRATION CONFIRMED
                </span>
                <h3 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white mt-1">
                  Welcome to the Arena!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto mt-2">
                  Team <strong className="text-cyan-300">{formData.teamName}</strong> has been officially queued for Scrutineering at MINOAN RobotSports Ghana 2027.
                </p>
              </div>

              {/* Confirmation Code Card */}
              <div className="p-5 rounded-xl bg-slate-900/90 border border-cyan-500/40 max-w-md mx-auto text-left space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs text-slate-400 uppercase">OFFICIAL REGISTRATION ID</span>
                  <span className="text-cyan-300 font-bold font-orbitron tracking-wider text-base">
                    {confirmationCode}
                  </span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p><span className="text-slate-500">Institution:</span> {formData.organizationName}</p>
                  <p><span className="text-slate-500">Division:</span> {formData.division.toUpperCase()}</p>
                  <p><span className="text-slate-500">Registered Sports:</span> {formData.selectedSports.length} Challenges</p>
                  <p><span className="text-slate-500">Lead Coach:</span> {formData.leadContactName}</p>
                  <p><span className="text-slate-500">Estimated Scrutineering:</span> Jan 30, 2027 at 07:30 GMT</p>
                </div>
              </div>

              {/* Post-Registration Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={downloadConfirmationSlip}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Pass Slip (.TXT)</span>
                </button>

                <a
                  href={getWhatsAppShareUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share on WhatsApp</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={resetForm}
                  className="text-xs font-mono text-slate-400 hover:text-slate-200 underline"
                >
                  Register Another Team
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: Team & Category Details */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CyberVanguard Titans"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-850 text-sm text-white focus:outline-none focus:border-cyan-500/60 font-sans"
                    />
                    {errors.teamName && <p className="text-xs text-red-400 mt-1 font-mono">{errors.teamName}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                        Organization Type
                      </label>
                      <select
                        value={formData.organizationType}
                        onChange={(e) => setFormData({ ...formData, organizationType: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-850 text-sm text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                      >
                        <option value="school">Junior / Senior High School</option>
                        <option value="university">University / Polytechnic</option>
                        <option value="club">Robotics Club / Makerspace</option>
                        <option value="independent">Independent Maker Squad</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                        Organization Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Achimota School / KNUST Robotics"
                        value={formData.organizationName}
                        onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-850 text-sm text-white focus:outline-none focus:border-cyan-500/60 font-sans"
                      />
                      {errors.organizationName && <p className="text-xs text-red-400 mt-1 font-mono">{errors.organizationName}</p>}
                    </div>
                  </div>

                  {/* Multi-Select Category Chips with icon badges */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-bold flex items-center justify-between">
                      <span>Select Sports Disciplines * (Multi-Select Allowed)</span>
                      <span className="text-cyan-400 text-[11px]">{formData.selectedSports.length} Selected</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SPORTS_DATA.map((sport) => {
                        const isSelected = formData.selectedSports.includes(sport.id);
                        return (
                          <div
                            key={sport.id}
                            onClick={() => handleSportToggle(sport.id)}
                            className={`p-3 rounded-lg border cursor-pointer select-none transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-cyan-500/15 border-cyan-400/80 text-white shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300">
                                {sport.code}
                              </span>
                              <span className="font-orbitron text-xs font-bold truncate max-w-[170px]">
                                {sport.name}
                              </span>
                            </div>
                            <div className={`w-4 h-4 rounded flex items-center justify-center ${isSelected ? 'bg-cyan-400 text-slate-950' : 'border border-slate-700'}`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {errors.selectedSports && <p className="text-xs text-red-400 mt-1 font-mono">{errors.selectedSports}</p>}
                  </div>
                </div>
              )}

              {/* STEP 2: Division & Participants */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-bold">
                      Age Division Category *
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'junior', title: 'Junior Division', age: 'Ages 10–14', desc: 'Primary & JHS student competitors' },
                        { id: 'senior', title: 'Senior Division', age: 'Ages 15–18', desc: 'SHS & Technical Institute competitors' },
                        { id: 'open', title: 'University / Open', age: 'Ages 18+', desc: 'Tertiary students & independent makers' },
                      ].map((div) => {
                        const isSelected = formData.division === div.id;
                        return (
                          <div
                            key={div.id}
                            onClick={() => setFormData({ ...formData, division: div.id as any })}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div>
                              <span className="font-mono text-xs font-bold text-amber-400 block">{div.age}</span>
                              <h4 className="font-orbitron font-bold text-sm text-white mt-1">{div.title}</h4>
                              <p className="text-[11px] text-slate-400 mt-1">{div.desc}</p>
                            </div>
                            <div className="mt-3 flex justify-end">
                              <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-700'}`}>
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Team Size Slider / Counter */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
                        Expected Team Size (Students / Pilots)
                      </label>
                      <span className="font-orbitron font-black text-cyan-400 text-base">
                        {formData.teamSize} {formData.teamSize === 1 ? 'Member' : 'Members'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({ ...formData, teamSize: num })}
                          className={`flex-1 py-2 rounded-lg font-mono text-xs font-bold border transition-colors ${
                            formData.teamSize === num
                              ? 'bg-cyan-400 text-slate-950 border-cyan-400 shadow-[0_0_10px_#00f0ff]'
                              : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                          }`}
                        >
                          {num} {num === 1 ? 'Solo' : 'Team'}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 mt-2">
                      * Most sports accommodate 1 to 5 members (pilot, pit mechanic, programmer, captain).
                    </p>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                      Team Robotics Experience
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-850 text-sm text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                    >
                      <option value="beginner">First-time Competition Entrant (Beginner)</option>
                      <option value="intermediate">Prior Robotics / Hackathon Experience (Intermediate)</option>
                      <option value="advanced">National / International Tournament Veteran (Advanced)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 3: Coach / Captain Contact */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                        Lead Contact Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Kwame Boateng"
                        value={formData.leadContactName}
                        onChange={(e) => setFormData({ ...formData, leadContactName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-850 text-sm text-white focus:outline-none focus:border-cyan-500/60"
                      />
                      {errors.leadContactName && <p className="text-xs text-red-400 mt-1 font-mono">{errors.leadContactName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                        Contact Role
                      </label>
                      <select
                        value={formData.leadContactRole}
                        onChange={(e) => setFormData({ ...formData, leadContactRole: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-850 text-sm text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                      >
                        <option value="Head Coach / Mentor">Head Coach / STEM Mentor</option>
                        <option value="School Teacher / Patron">School Teacher / Patron</option>
                        <option value="Student Team Captain">Student Team Captain</option>
                        <option value="Independent Maker">Independent Maker / Lead Pilot</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                        Contact Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="coach@school.edu.gh"
                        value={formData.leadContactEmail}
                        onChange={(e) => setFormData({ ...formData, leadContactEmail: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-850 text-sm text-white focus:outline-none focus:border-cyan-500/60"
                      />
                      {errors.leadContactEmail && <p className="text-xs text-red-400 mt-1 font-mono">{errors.leadContactEmail}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                        Phone Number (+233 Ghana format) *
                      </label>
                      <input
                        type="tel"
                        placeholder="+233 24 123 4567"
                        value={formData.leadContactPhone}
                        onChange={(e) => setFormData({ ...formData, leadContactPhone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-850 text-sm text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                      />
                      {errors.leadContactPhone && <p className="text-xs text-red-400 mt-1 font-mono">{errors.leadContactPhone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-bold">
                      City & Administrative Region in Ghana *
                    </label>
                    <select
                      value={formData.cityRegion}
                      onChange={(e) => setFormData({ ...formData, cityRegion: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-850 text-sm text-white focus:outline-none focus:border-cyan-500/60 font-mono"
                    >
                      {ghanaRegions.map((region) => (
                        <option key={region} value={region}>
                          {region} Region
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.emergencyConsent}
                        onChange={(e) => setFormData({ ...formData, emergencyConsent: e.target.checked })}
                        className="mt-1 rounded bg-slate-900 border-slate-800 text-cyan-500 focus:ring-cyan-500"
                      />
                      <span className="text-xs text-slate-400 leading-normal">
                        I confirm that all team participants will abide by tournament Rule Zero and bring mandatory eye protection (safety glasses) to the venue.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 4: Review & Instant Confirmation */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="rounded-xl bg-slate-900/80 border border-cyan-500/30 p-5 space-y-4 font-mono text-xs">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase">Team Entity</span>
                        <h4 className="font-orbitron font-bold text-base text-white">{formData.teamName}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold uppercase">
                        {formData.division} Division
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-slate-300">
                      <div>
                        <span className="text-slate-400 text-[10px] block">ORGANIZATION</span>
                        <span>{formData.organizationName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">LOCATION</span>
                        <span>{formData.cityRegion}, Ghana</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">LEAD CONTACT</span>
                        <span>{formData.leadContactName} ({formData.leadContactRole})</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">CONTACT PHONE</span>
                        <span>{formData.leadContactPhone}</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-800 pt-3">
                      <span className="text-slate-400 text-[10px] block mb-2">
                        SELECTED CHALLENGES ({formData.selectedSports.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {formData.selectedSports.map(id => {
                          const sport = SPORTS_DATA.find(s => s.id === id);
                          return (
                            <span key={id} className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-cyan-300 text-[11px]">
                              {sport?.code} — {sport?.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        Tournament Scrutineering scheduled for <strong>January 30, 2027 at 07:30 GMT</strong> in Accra, Ghana.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs border border-slate-800 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all"
                  >
                    <span>Proceed to Step {currentStep + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-orbitron font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Submit Official Registration</span>
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
