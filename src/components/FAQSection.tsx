import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  Sparkles, 
  MessageSquare, 
  Search
} from 'lucide-react';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'pathway' | 'registration';
}

export const CHAMPIONSHIP_FAQS: FAQItem[] = [
  {
    id: 'what-is-minoan-ghana',
    category: 'general',
    question: 'What is MINOAN RobotSports Ghana 2027?',
    answer: 'MINOAN RobotSports Ghana 2027 (MRC Ghana 2027) is Ghana\'s official national championship where robotics meets competitive sports. Presented by The MakersPlace Ghana under international sanction from H.E.R.O. (Hellenic Educational Robotics Organization, Greece), the tournament brings together youth, university, and independent maker teams across 7 regulated engineering challenges.',
  },
  {
    id: 'who-organizes-the-championship',
    category: 'general',
    question: 'Who organizes and licenses the MINOAN Ghana championship?',
    answer: 'The championship is exclusively hosted, organized, and governed by The MakersPlace Ghana—a pioneer in Ghanaian STEAM education, robotics, and coding academies. The tournament operates under official franchise and technical rules from the global Minoan RobotSports Competition in Heraklion, Crete, Greece.',
  },
  {
    id: 'when-and-where',
    category: 'general',
    question: 'When and where will MINOAN RobotSports Ghana 2027 take place?',
    answer: 'The national championship will take place on Saturday, January 30, 2027, at the National RobotSports Arena Complex in Accra, Greater Accra Region, Ghana. Tournament heats and exhibition showcases run from 08:00 to 20:00 GMT.',
  },
  {
    id: 'what-are-the-seven-disciplines',
    category: 'technical',
    question: 'What are the 7 official RobotSports disciplines?',
    answer: 'The 7 regulated disciplines span aerial, terrestrial, ballistic, and innovation categories: (1) DRN-01 Drone Precision Obstacle, (2) SOC-02 3v3 Autonomous Drone Soccer, (3) RUN-03 Autonomous Robot Marathon, (4) FBT-04 3v3 Autonomous Robot Football, (5) ARC-05 Robotic Precision Archery, (6) EXH-06 STEAM Innovation Exhibition, and (7) SHT-09 Precision Target Shooting.',
  },
  {
    id: 'what-are-the-age-divisions',
    category: 'registration',
    question: 'What are the age divisions and eligibility guidelines?',
    answer: 'Competition is organized across three primary divisions: Junior Division (ages 8 to 12 / Primary and Junior High), Senior Division (ages 13 to 17 / Senior High School and Technical Institutes), and University / Open Division (ages 18+ / Tertiary undergraduates, makerspaces, and independent engineers). Each squad typically consists of 2 to 5 registered student competitors and 1 adult coach or mentor.',
  },
  {
    id: 'what-is-rule-zero',
    category: 'technical',
    question: 'What is Rule Zero in the official tournament bylaws?',
    answer: 'Rule Zero is the overarching supreme safety doctrine of the MINOAN championship. It dictates that human life, spectator well-being, physical containment, and sportsmanship unconditionally supersede any software routine, sensor telemetry, mechanical advantage, or score calculation. Referees possess non-negotiable remote disarm and disqualification authority for any safety breach.',
  },
  {
    id: 'how-does-global-pathway-work',
    category: 'pathway',
    question: 'How do Ghanaian teams qualify for the World Championship in Greece?',
    answer: 'Podium gold and silver medalists in each official discipline at the January 30, 2027 Accra championship earn automatic qualification to represent Team Ghana at the Minoan International World Championship in Heraklion, Crete, Greece. The MakersPlace facilitates official documentation, international travel endorsements, and pre-departure technical bootcamps.',
  },
  {
    id: 'custom-hardware-allowed',
    category: 'technical',
    question: 'Can teams use custom-built robots and open microcontrollers?',
    answer: 'Yes. Teams are encouraged to engineer custom chassis, 3D printed components, and open microcontrollers including Betaflight F4/F7, STM32, Arduino RP2040 Aero, Raspberry Pi Pico / Pi 4/5, ESP32, and Pixhawk. Commercial educational kits (such as LEGO Spike Prime or VEX) are also accepted provided they adhere strictly to dimensional, weight, and battery voltage limits.',
  },
  {
    id: 'how-to-register',
    category: 'registration',
    question: 'How do schools and independent teams register for 2027?',
    answer: 'Registration is open online through the official tournament portal at minoan.makersplacegh.com. Team captains or coaches create an entry profile, select their category and age division, submit student roster credentials, and download the digital scrutineering checklist. Entry confirmations are processed on a first-cleared basis.',
  },
  {
    id: 'spectators-and-tickets',
    category: 'general',
    question: 'Can public spectators, parents, and school excursions attend the arena?',
    answer: 'Yes! The MINOAN RobotSports Ghana Championship is open to public spectators, school excursions, technology enthusiasts, and families. Live arena viewing, pit lane paddock access, flight visualizers, and interactive robotics maker booths will be available throughout competition day.',
  },
];

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'technical' | 'pathway' | 'registration'>('all');
  const [openId, setOpenId] = useState<string | null>(CHAMPIONSHIP_FAQS[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = CHAMPIONSHIP_FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesQuery = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section 
      id="faq" 
      aria-labelledby="faq-section-title"
      className="py-20 border-t border-slate-800/80 bg-slate-950/80 relative z-10"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Knowledge Base & AEO Questions</span>
          </div>
          <h2 
            id="faq-section-title"
            className="font-orbitron font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
            Everything you need to know about MINOAN RobotSports Ghana 2027, technical bylaws, Rule Zero, team eligibility, and the global pathway to Greece.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 w-full sm:w-auto">
            {(['all', 'general', 'technical', 'pathway', 'registration'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all capitalize ${
                  activeCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Questions' : cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search answers..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 font-mono text-xs">
              No matching answers found for &ldquo;{searchQuery}&rdquo;. Try another search term.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all ${
                    isOpen 
                      ? 'bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-950/20' 
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg border ${
                        isOpen 
                          ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400' 
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}>
                        <HelpCircle className="w-4 h-4 shrink-0" />
                      </div>
                      <span className="font-orbitron font-bold text-sm sm:text-base text-white">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-cyan-300' : 'text-slate-500'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Direct Inquiries & Contact Note */}
        <div className="mt-10 p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-xs uppercase tracking-wider text-white">
                Have an unlisted technical query?
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Reach the Technical Scrutineering Committee at The MakersPlace Ghana.
              </p>
            </div>
          </div>
          <a
            href="mailto:info@makersplacegh.com?subject=MINOAN%202027%20Technical%20Inquiry"
            className="px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-850 text-cyan-400 hover:text-cyan-300 border border-cyan-500/40 font-mono text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
          >
            info@makersplacegh.com
          </a>
        </div>

      </div>
    </section>
  );
};
