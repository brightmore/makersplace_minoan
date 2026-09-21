import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  Users, 
  AlertTriangle, 
  ArrowLeft, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ExternalLink,
  ChevronRight,
  Database,
  Radio,
  Share2
} from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navSections = [
    { id: 'overview', title: '1. Regulatory Scope & Framework' },
    { id: 'controller', title: '2. Identity of Data Controller' },
    { id: 'collection', title: '3. Categories of Data Collected' },
    { id: 'purpose', title: '4. Purpose & Lawful Basis' },
    { id: 'minors', title: '5. Youth Athletes & Minors Protection' },
    { id: 'hardware-telemetry', title: '6. Hardware Scrutineering Telemetry' },
    { id: 'media-broadcast', title: '7. Arena Broadcast & Media Rights' },
    { id: 'storage-security', title: '8. Data Security & Storage Protocols' },
    { id: 'international-transfers', title: '9. Minoan Global Pathway Transfers' },
    { id: 'retention', title: '10. Data Retention Schedule' },
    { id: 'participant-rights', title: '11. Rights under Ghana Act 843' },
    { id: 'dpo-contact', title: '12. Contact the Data Protection Officer' },
  ];

  return (
    <div className="pt-6 pb-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <Link to="/" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Home
          </Link>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">Privacy Policy</span>
        </div>

        {/* Page Hero Banner */}
        <div className="relative rounded-2xl bg-slate-900 border border-cyan-500/30 p-6 sm:p-10 mb-10 shadow-2xl overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ghana Data Protection Act, 2012 (Act 843) Compliant</span>
              </div>

              <h1 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
                OFFICIAL PRIVACY & <br className="hidden sm:inline" />
                <span className="text-cyan-400">DATA PROTECTION POLICY</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                This policy outlines the protocols and governance standards governing the collection, processing, storage, and protection of participant, mentor, and hardware scrutineering data for the <strong>MINOAN RobotSports Ghana 2027</strong> national championship.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  Effective: January 1, 2026
                </span>
                <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  Version: 2027.2.1
                </span>
                <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Audited by The MakersPlace Legal Desk
                </span>
              </div>
            </div>

            {/* Right Visual Telemetry Card */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="font-orbitron font-bold text-xs uppercase text-cyan-300">
                    DATA PRIVACY AUDIT
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Statutory Framework:</span>
                    <span className="text-slate-200 font-bold">Act 843 (Ghana)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Data Controller:</span>
                    <span className="text-cyan-300 font-bold">The MakersPlace</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Encryption Standard:</span>
                    <span className="text-emerald-400 font-bold">AES-256 / SHA-256</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Third-Party Brokers:</span>
                    <span className="text-amber-400 font-bold">0% (Strictly Prohibited)</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
                  Participants or institutional mentors can exercise their statutory rights by writing directly to <span className="text-cyan-300 font-bold">privacy@makersplacegh.com</span>.
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
              <h3 className="font-orbitron font-bold text-xs uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Document Index</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Click any section to jump directly to its regulatory provisions.
              </p>

              <nav className="space-y-1 pt-2">
                {navSections.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-between ${
                      activeSection === item.id
                        ? 'bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="truncate">{item.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                  </button>
                ))}
              </nav>
            </div>

            {/* Support Callout */}
            <div className="p-5 rounded-xl bg-slate-900 border border-amber-500/30 space-y-2">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                Parental or School Inquiries
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                Need clarification regarding institutional student rosters or media appearance consent forms?
              </p>
              <div className="pt-2 text-xs font-mono">
                <a 
                  href="mailto:privacy@makersplacegh.com"
                  className="text-cyan-400 hover:text-cyan-300 underline font-bold"
                >
                  privacy@makersplacegh.com
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Detailed Policy Provisions (8 cols) */}
          <div className="lg:col-span-8 space-y-10 text-slate-300 text-sm leading-relaxed">

            {/* Section 1 */}
            <section id="overview" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Section 1.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                1. Regulatory Scope & Framework
              </h2>
              <p>
                The MakersPlace Ghana, as the authorized national licensee and organizing body for the <strong>MINOAN RobotSports Ghana 2027</strong> championship, is dedicated to protecting the privacy, dignity, and personal data of every participating athlete, mentor, coach, volunteer, and event attendee.
              </p>
              <p>
                This Privacy Policy is promulgated in strict conformity with the <strong>Data Protection Act, 2012 (Act 843)</strong> of the Republic of Ghana, and the global safety standards established by the <strong>Hellenic Educational Robotics Organization (H.E.R.O.)</strong>. It governs all data submitted through our registration portals, scrutineering check stations, newsletter subscription feeds, and on-site hardware paddock stations in Accra.
              </p>
            </section>

            {/* Section 2 */}
            <section id="controller" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Database className="w-4 h-4" />
                <span>Section 2.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                2. Identity of Data Controller
              </h2>
              <p>
                For the purposes of the Data Protection Act, 2012 (Act 843), the primary Data Controller is:
              </p>
              
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
                <div className="font-bold text-cyan-300 text-sm">The MakersPlace Ghana Ltd.</div>
                <div>STEM & Robotics Innovation Center</div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Accra, Greater Accra Region, Republic of Ghana</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>privacy@makersplacegh.com / info@makersplacegh.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>+233 (0) 55 631 0034 / +233 (0) 24 623 7518</span>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="collection" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Users className="w-4 h-4" />
                <span>Section 3.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                3. Categories of Data Collected
              </h2>
              <p>
                We collect and process only the minimal necessary data points required to safely coordinate competitive robotics fixtures across all seven regulated disciplines:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-cyan-300 block uppercase">A. Team & Institution Records</span>
                  <p className="text-slate-400">Team name, affiliated basic/senior high school, university, or maker club, administrative division, and geographic region in Ghana.</p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-amber-300 block uppercase">B. Mentor & Coach Contact Info</span>
                  <p className="text-slate-400">Full legal name, professional role (ICT Teacher, STEM Patron, Lab Director), verified telephone number, and institutional email address.</p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-emerald-300 block uppercase">C. Athlete Squad Rosters</span>
                  <p className="text-slate-400">Number of competitors, age division (Junior 10-14, Senior 15-18, or University/Open), and emergency medical consent confirmations.</p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-purple-300 block uppercase">D. Bulletin Subscriptions</span>
                  <p className="text-slate-400">Opt-in email addresses collected via tournament alerts form, source tags, and unsubscription timestamps.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="purpose" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>Section 4.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                4. Purpose & Lawful Basis of Processing
              </h2>
              <p>
                Under Section 18 of Ghana's Act 843, personal data is collected and processed under the following lawful bases:
              </p>

              <ul className="space-y-3 font-mono text-xs">
                <li className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-slate-100 block">Performance of Tournament Entry Contract:</strong>
                    <span className="text-slate-400">Managing tournament brackets, age division qualification, paddock station allocation, and publishing official match schedules.</span>
                  </div>
                </li>

                <li className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-slate-100 block">Legitimate Safety Interests (Rule Zero Compliance):</strong>
                    <span className="text-slate-400">Verifying radio transmitter frequencies to eliminate wireless flight interference, LiPo battery handling safety, and emergency response.</span>
                  </div>
                </li>

                <li className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-slate-100 block">Explicit Consent:</strong>
                    <span className="text-slate-400">Delivering venue announcement bulletins, technical rulebook updates, and publishing competition leaderboard archives.</span>
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="minors" className="p-6 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
                <AlertTriangle className="w-4 h-4" />
                <span>Section 5.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                5. Protection of Minors & Youth Competitors
              </h2>
              <p>
                Given that MINOAN RobotSports Ghana engages students across Junior (10-14) and Senior (15-18) age categories, we maintain rigorous child safeguarding standards:
              </p>
              
              <div className="space-y-2 text-xs font-mono text-slate-300">
                <p className="p-3 rounded bg-slate-950 border border-slate-800">
                  • <strong>Institutional/Parental Representation:</strong> All student competitors under the legal age of 18 must be registered through an accredited educational institution, recognized robotics club, or accompanied by an adult coach/guardian.
                </p>
                <p className="p-3 rounded bg-slate-950 border border-slate-800">
                  • <strong>Zero Direct Marketing to Minors:</strong> Student participant emails are neither requested nor solicited. All communications are strictly routed through the designated adult head coach or institution.
                </p>
                <p className="p-3 rounded bg-slate-950 border border-slate-800">
                  • <strong>Anonymity Safeguards:</strong> Public scoreboards and livestream graphics display institutional team names (e.g. <em>"Achimota Robotics Titans"</em>) and team codes rather than individual minor personal identifiers.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="hardware-telemetry" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Radio className="w-4 h-4" />
                <span>Section 6.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                6. Hardware Scrutineering Telemetry
              </h2>
              <p>
                During pre-competition technical inspection, our Chief Referees log hardware specifications into the organizer SCADA system:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs font-mono text-slate-400">
                <li>Microcontroller platform (e.g., STM32, Arduino, Raspberry Pi, Pixhawk)</li>
                <li>Transmitter control frequencies (2.4 GHz spread spectrum / 5.8 GHz video bands)</li>
                <li>Battery chemistry, voltage caps, and physical kill-switch verification logs</li>
                <li>Dimensional envelope checks (width, height, mass, propeller cage integrity)</li>
              </ul>
              <p className="text-xs font-mono text-slate-400">
                This telemetry is treated as competition verification metadata and retained to resolve technical disputes or verify eligibility for the Minoan Global Finals.
              </p>
            </section>

            {/* Section 7 */}
            <section id="media-broadcast" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Share2 className="w-4 h-4" />
                <span>Section 7.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                7. Arena Broadcast & Media Rights
              </h2>
              <p>
                The MINOAN RobotSports Ghana 2027 championship is a public sports event broadcast to promote STEAM education across Ghana and Africa.
              </p>
              <p>
                By entering the official arena premises, accredited participants and mentors acknowledge that video recordings, digital photography, aerial drone cinematography, and live commentary will be captured. These assets may be utilized by The MakersPlace Ghana and H.E.R.O. Greece for educational broadcasting, news press releases, and tournament archives.
              </p>
              <p className="text-xs font-mono text-slate-400">
                Teams wishing to opt out of promotional photography outside of match arenas may register their preference during paddock check-in with the Chief Media Officer.
              </p>
            </section>

            {/* Section 8 */}
            <section id="storage-security" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Lock className="w-4 h-4" />
                <span>Section 8.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                8. Data Security & Storage Protocols
              </h2>
              <p>
                We apply defense-in-depth technical and organizational measures to safeguard tournament records:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                  <span className="text-cyan-400 font-bold block mb-1">AES-256 Storage</span>
                  <span className="text-slate-400 text-[11px]">Database records are protected with industry standard encryption.</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                  <span className="text-emerald-400 font-bold block mb-1">Role-Based Access</span>
                  <span className="text-slate-400 text-[11px]">Only certified referees and technical directors hold administrative credentials.</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center">
                  <span className="text-amber-400 font-bold block mb-1">Audit Trail Logging</span>
                  <span className="text-slate-400 text-[11px]">Every scrutineering update and status modification is permanently audited.</span>
                </div>
              </div>
            </section>

            {/* Section 9 */}
            <section id="international-transfers" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <ExternalLink className="w-4 h-4" />
                <span>Section 9.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                9. Minoan Global Pathway Transfers
              </h2>
              <p>
                Top qualifying Ghanaian teams in regulated RobotSports categories secure automatic seedings to the <strong>Minoan RobotSports World Finals</strong> hosted in Crete, Greece.
              </p>
              <p>
                In accordance with Section 38 of Ghana Act 843, team credentials and hardware verification scores of champion teams are shared internationally with the <strong>Hellenic Educational Robotics Organization (HERO)</strong> solely for international accreditation, visa facilitation letters, and global seeding.
              </p>
            </section>

            {/* Section 10 */}
            <section id="retention" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Calendar className="w-4 h-4" />
                <span>Section 10.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                10. Data Retention Schedule
              </h2>
              <p>
                Personal and contact data collected for registration is retained for the duration of the 2027 competitive season plus twelve (12) months following the conclusion of the World Finals for reporting and certificate verification.
              </p>
              <p>
                Newsletter subscriber records are maintained until the subscriber requests unsubscription or opts out via our automated unsubscribe link.
              </p>
            </section>

            {/* Section 11 */}
            <section id="participant-rights" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Eye className="w-4 h-4" />
                <span>Section 11.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                11. Your Statutory Rights under Ghana Act 843
              </h2>
              <p>
                Under Part V of the Data Protection Act, 2012, all data subjects possess explicit enforceable rights:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-cyan-300 block mb-1">Right to Access (Section 35)</strong>
                  <span className="text-slate-400">Request confirmation of personal data held about your team or institution.</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-emerald-300 block mb-1">Right to Rectification (Section 33)</strong>
                  <span className="text-slate-400">Update inaccurate roster sizes, phone numbers, or institutional names.</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-amber-300 block mb-1">Right to Erasure (Section 33)</strong>
                  <span className="text-slate-400">Request deletion of contact records following the championship conclusion.</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-purple-300 block mb-1">Right to Object (Section 32)</strong>
                  <span className="text-slate-400">Opt out of tournament bulletin feeds at any time with immediate effect.</span>
                </div>
              </div>
            </section>

            {/* Section 12 */}
            <section id="dpo-contact" className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
                <Mail className="w-4 h-4" />
                <span>Section 12.0</span>
              </div>
              <h2 className="font-orbitron font-bold text-xl text-white">
                12. Contact the Data Protection Officer
              </h2>
              <p>
                If you have questions regarding this policy or wish to exercise statutory data rights under Act 843, contact:
              </p>

              <div className="p-5 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-3 font-mono text-xs">
                <div className="text-slate-200 font-bold">Office of the Data Protection Officer</div>
                <div className="text-cyan-300">The MakersPlace Ghana Ltd.</div>
                <div className="text-slate-400">Accra Digital Center / Innovation Hub, Accra, Ghana</div>
                <div className="pt-2 flex flex-col sm:flex-row gap-4 border-t border-slate-800/80">
                  <span className="text-slate-300">Email: <strong className="text-cyan-400">privacy@makersplacegh.com</strong></span>
                  <span className="text-slate-300">Tel: <strong className="text-emerald-400">+233 (0) 55 631 0034</strong></span>
                </div>
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
};
