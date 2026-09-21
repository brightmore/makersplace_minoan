import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { createBreadcrumbSchema } from '../utils/seoSchemas';
import { 
  Scale, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Radio, 
  Flame, 
  Cpu, 
  Users, 
  Gavel, 
  Calendar,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export const TermsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('acceptance');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const sections = [
    { id: 'acceptance', title: '1. Acceptance & Binding Scope' },
    { id: 'eligibility', title: '2. Team Eligibility & Squad Limits' },
    { id: 'rule-zero', title: '3. Rule Zero & Scrutineering Supremacy' },
    { id: 'spectrum', title: '4. Radio Spectrum & Anti-Jamming Ethics' },
    { id: 'safety-pit', title: '5. Pit Lane Protocols & LiPo Fire Safety' },
    { id: 'intellectual-property', title: '6. Intellectual Property & CAD Rights' },
    { id: 'broadcast-release', title: '7. Broadcast, Media & Live Feeds' },
    { id: 'conduct-penalties', title: '8. Code of Conduct & Disqualifications' },
    { id: 'disputes-appeals', title: '9. Official Referee Appeals Procedure' },
    { id: 'liability-waiver', title: '10. Limitation of Liability & Risk' },
    { id: 'governing-law', title: '11. Governing Law & Jurisdiction' },
  ];

  return (
    <div className="pt-6 pb-20 relative z-10">
      <SEOHead
        title="Official Tournament Terms & Conditions | MINOAN 2027"
        description="Official tournament bylaws, competitor eligibility, Rule Zero supremacy, RF spectrum anti-jamming ethics, and IP ownership for MINOAN Ghana 2027."
        keywords="MINOAN terms, tournament bylaws, robotics rules Ghana, RF anti-jamming, Rule Zero supremacy"
        canonicalPath="/terms"
        jsonLd={createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Terms & Conditions', path: '/terms' },
        ])}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <Link to="/" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Home
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-semibold">Terms & Conditions</span>
        </div>

        {/* Page Hero Banner */}
        <div className="relative rounded-2xl bg-slate-900 border border-amber-500/30 p-6 sm:p-10 mb-10 shadow-2xl overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Official Tournament Regulations & Code of Ethics</span>
              </div>

              <h1 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
                TOURNAMENT TERMS & <br className="hidden sm:inline" />
                <span className="text-amber-400">ENTRY CONDITIONS</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Official terms, scrutineering regulations, intellectual property protections, and safety bylaws governing team entry into the <strong>MINOAN RobotSports Ghana 2027</strong> national championship.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  Season: 2026/2027 Cycle
                </span>
                <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-amber-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  Standard: H.E.R.O. Olympic Bylaws
                </span>
                <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Sanctioned by The MakersPlace
                </span>
              </div>
            </div>

            {/* Right Summary Box */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-xl bg-slate-950 border border-amber-500/40 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="font-orbitron font-bold text-xs uppercase text-amber-300">
                    RULE ZERO SUMMARY
                  </span>
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                </div>
                
                <div className="text-xs font-mono text-slate-300 space-y-2 leading-relaxed">
                  <p className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-amber-300 block mb-1">Safety First, Always:</strong>
                    Common sense and human safety supersede all match scores. Any robot posing danger will be disarmed immediately.
                  </p>
                  <p className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <strong className="text-cyan-300 block mb-1">100% Passing Required:</strong>
                    Only robots passing physical scrutineering receive certified arena flight/ground tags.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Quick Sticky Index (4 cols) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-orbitron font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>Tournament Bylaws</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Click any section to review binding tournament entry clauses.
              </p>

              <nav className="space-y-1 pt-2">
                {sections.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-between ${
                      activeSection === item.id
                        ? 'bg-amber-950/80 border border-amber-500/40 text-amber-300 font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="truncate">{item.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                  </button>
                ))}
              </nav>
            </div>

            {/* Scrutineering Download Link */}
            <div className="p-5 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-2">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                Technical Preparation
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                Ensure your robotics chassis satisfies the dimensional envelopes and kill-switch specs before arriving in Accra.
              </p>
              <div className="pt-2 text-xs font-mono">
                <Link 
                  to="/rules"
                  className="text-cyan-400 hover:text-cyan-300 underline font-bold flex items-center gap-1"
                >
                  <span>Interactive Scrutineering Checklist</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Column: Detailed Clauses (8 cols) */}
          <div className="lg:col-span-8 space-y-10 text-slate-300 text-sm leading-relaxed">

            {/* Section 1 */}
            <section id="acceptance" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>Clause 1.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                1. Acceptance & Binding Scope of Terms
              </h2>
              <p>
                By registering a team, submitting payment (if applicable), or stepping into the competitive paddock arenas of <strong>MINOAN RobotSports Ghana 2027</strong>, all participants, institutions, coaches, mentors, and spectators agree to be irrevocably bound by these Terms and Conditions and the official rulebooks issued by <strong>The MakersPlace Ghana</strong> and the <strong>Hellenic Educational Robotics Organization (H.E.R.O.)</strong>.
              </p>
              <p className="text-slate-400 text-xs font-mono">
                Any team that fails to adhere to these terms or breaches the safety protocols set out herein shall be subject to immediate round forfeiture or total tournament expulsion at the discretion of the Chief Referee.
              </p>
            </section>

            {/* Section 2 */}
            <section id="eligibility" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
                <Users className="w-4 h-4" />
                <span>Clause 2.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                2. Team Eligibility & Squad Composition
              </h2>
              <p>
                Participation is segregated strictly into official age divisions to ensure balanced competitive integrity:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="text-cyan-300 block uppercase">Junior Division</strong>
                  <span className="text-slate-400 block">Ages 10 to 14</span>
                  <p className="text-slate-500 text-[11px]">Must be enrolled in upper primary or JHS with an accredited adult coach.</p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="text-amber-300 block uppercase">Senior Division</strong>
                  <span className="text-slate-400 block">Ages 15 to 18</span>
                  <p className="text-slate-500 text-[11px]">Senior High School (SHS) students, technical institutes, and youth STEM clubs.</p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <strong className="text-emerald-300 block uppercase">University / Open</strong>
                  <span className="text-slate-400 block">Ages 18+</span>
                  <p className="text-slate-500 text-[11px]">Tertiary students, university engineering labs, and independent adult makers.</p>
                </div>
              </div>

              <p className="text-xs font-mono text-slate-400">
                Squad rosters are limited to 2 - 5 athletes per team. Athletes may compete across multiple sport categories provided their match schedules do not directly conflict.
              </p>
            </section>

            {/* Section 3 */}
            <section id="rule-zero" className="p-6 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Clause 3.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                3. Rule Zero & Scrutineering Supremacy
              </h2>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono leading-relaxed">
                <strong>RULE ZERO MANDATE:</strong> "The safety of participants, referees, spectators, and facilities overrides every rule, score, and timer. Any robot deemed dangerous by the Technical Inspection Board will be barred from competition until rectified."
              </div>

              <ul className="space-y-2 text-xs font-mono text-slate-300">
                <li className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  • <strong>Mandatory Paddock Scrutineering:</strong> Every robot must undergo physical inspection before its initial heat. Robots that pass receive a serialized holographic clearance tag.
                </li>
                <li className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  • <strong>Emergency Kill-Switch:</strong> All motorized or autonomous platforms must possess an easily accessible physical hardware disconnect (switch or pull-plug) clearly labeled in red.
                </li>
                <li className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  • <strong>Propeller Guard Integrity:</strong> Drones and aerial robots must feature rigid 360° ducting or guards. Any drone shedding a prop guard during flight will be commanded to land instantly.
                </li>
                <li className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  • <strong>Finality of Referees:</strong> Decisions of the Chief Scrutineer regarding hardware safety cannot be appealed or overridden.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="spectrum" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Radio className="w-4 h-4" />
                <span>Clause 4.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                4. Radio Spectrum & Anti-Jamming Ethics
              </h2>
              <p>
                In RobotSports, fair play extends directly to the wireless radio spectrum:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs font-mono text-slate-400">
                <li>All radio transmitters (2.4 GHz control links and 5.8 GHz FPV video feeds) must adhere to the official channel assignment grid published by the Field Technical Director.</li>
                <li>Transmitters must remain powered OFF inside the paddock areas unless stationed inside an RF-shielded test cage.</li>
                <li><strong>Strict Zero Tolerance for Jamming:</strong> Any team operating de-authentication devices, rogue Wi-Fi emitters, or intentional radio frequency jammers will face immediate disqualification and permanent tournament suspension under Ghanaian cyber regulations.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="safety-pit" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase">
                <Flame className="w-4 h-4" />
                <span>Clause 5.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                5. Pit Lane Protocols & LiPo Fire Safety
              </h2>
              <p>
                Lithium Polymer (LiPo) and Lithium-Ion batteries present combustion hazards if mishandled:
              </p>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono text-slate-300">
                <p>• <strong>Charging Containers:</strong> All battery charging must occur inside certified fireproof LiPo safety bags or steel ammo cans at designated charging tables.</p>
                <p>• <strong>Puffy/Damaged Cells:</strong> Swollen, punctured, or physically dented batteries are banned from the venue and must be deposited in the chemical sand bin.</p>
                <p>• <strong>Eye Protection:</strong> Safety glasses must be worn whenever power tools, high-speed rotary cutters, or exposed robot actuators are activated.</p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="intellectual-property" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Cpu className="w-4 h-4" />
                <span>Clause 6.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                6. Intellectual Property & Robot Designs
              </h2>
              <p>
                We champion student innovation and open engineering:
              </p>
              <ul className="space-y-2 text-xs font-mono text-slate-400">
                <li className="p-3 rounded bg-slate-950 border border-slate-800">
                  <strong className="text-cyan-300 block mb-1">100% Competitor Ownership:</strong>
                  Teams retain all rights, title, and ownership of their custom firmware code, neural network models, CAD mechanical blueprints, and electrical schematics.
                </li>
                <li className="p-3 rounded bg-slate-950 border border-slate-800">
                  <strong className="text-amber-300 block mb-1">Non-Exclusive Educational Display License:</strong>
                  By competing, teams grant The MakersPlace and HERO a worldwide, royalty-free license to photograph, film, display, and publish non-confidential technical summaries for STEAM educational advancement.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="broadcast-release" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Radio className="w-4 h-4" />
                <span>Clause 7.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                7. Arena Broadcast, Photography & Media Rights
              </h2>
              <p>
                All matches and ceremonies will be recorded and broadcast live over internet feeds and domestic television partners.
              </p>
              <p className="text-xs font-mono text-slate-400">
                Participants consent to the use of their team likeness, robot performance footage, interviews, and award ceremonies for event highlights, promotional marketing, and historical sports archives without financial remuneration.
              </p>
            </section>

            {/* Section 8 */}
            <section id="conduct-penalties" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
                <Gavel className="w-4 h-4" />
                <span>Clause 8.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                8. Code of Conduct & Fair Play
              </h2>
              <p>
                The spirit of MINOAN RobotSports is built upon gracious professionalism, integrity, and mutual respect. The following behaviors warrant immediate disciplinary action:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs font-mono text-rose-300">
                <li>Harassment, intimidation, or verbal abuse of volunteer referees, student competitors, or venue staff.</li>
                <li>Tampering with or sabotaging another team's paddock equipment, tools, or robots.</li>
                <li>Deliberate falsification of competitor ages or institutional enrollment credentials.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section id="disputes-appeals" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Scale className="w-4 h-4" />
                <span>Clause 9.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                9. Official Referee Appeals Procedure
              </h2>
              <p>
                If a team captain or accredited coach believes an objective scoring error occurred:
              </p>
              <ol className="list-decimal pl-5 space-y-1.5 text-xs font-mono text-slate-400">
                <li>The inquiry must be lodged in writing with the Lead Field Referee within <strong>15 minutes</strong> of the round conclusion.</li>
                <li>Only the student team captain and registered coach may attend the arbitration hearing.</li>
                <li>Video telemetry reviews may be conducted if official multi-angle arena camera footage is available.</li>
                <li>The decision of the Chief Tournament Referee following review is final and binding.</li>
              </ol>
            </section>

            {/* Section 10 */}
            <section id="liability-waiver" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
                <AlertTriangle className="w-4 h-4" />
                <span>Clause 10.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                10. Limitation of Liability & Physical Risk
              </h2>
              <p>
                Competitive robotics involves autonomous mechanics, rapid physical collisions, high-speed rotors, and electrical voltages.
              </p>
              <p className="text-xs font-mono text-slate-400">
                To the fullest extent permitted under the laws of the Republic of Ghana, neither The MakersPlace Ghana, H.E.R.O., sponsors, nor venue hosts shall be liable for indirect, incidental, or consequential damages resulting from robot damage, physical collisions, component wear-and-tear, or power fluctuations at the venue.
              </p>
            </section>

            {/* Section 11 */}
            <section id="governing-law" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>Clause 11.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                11. Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms and Conditions shall be governed by, construed, and enforced in accordance with the substantive laws of the <strong>Republic of Ghana</strong>.
              </p>
              <p className="text-xs font-mono text-slate-400">
                Any legal proceeding arising out of or relating to these tournament bylaws shall be instituted exclusively in the competent courts located in Accra, Ghana.
              </p>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
};
