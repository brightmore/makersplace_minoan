import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Cpu, 
  MapPin, 
  Users, 
  Clock, 
  Crosshair,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';

interface HeroProps {
  onOpenRegister: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface SlideData {
  id: number;
  badge: string;
  superhead: string;
  headlineMain: string;
  headlineAccent: string;
  headlineSuffix: string;
  description: string;
  highlightTag: string;
  themeColor: 'cyan' | 'amber' | 'emerald' | 'blue' | 'magenta';
  navLabel: string;
  bgImage: string;
  sportAnchor?: string;
  stats: { label: string; value: string }[];
}

const HERO_SLIDES: SlideData[] = [
  {
    id: 0,
    badge: "Ghana's Official National RobotSports Championship",
    superhead: 'THE MAKERSPLACE PRESENTS • ACCRA 2027',
    headlineMain: 'MINOAN',
    headlineAccent: 'ROBOTSPORTS',
    headlineSuffix: 'GHANA 2027',
    description: 'Where robotics becomes sport—and young makers become competitors. Design, build, programme and perform across seven technical challenges engineered to test mechanical prowess and autonomous intelligence.',
    highlightTag: '07 Disciplines • 03 Age Divisions • 01 Global Pathway',
    themeColor: 'cyan',
    navLabel: 'CHAMPIONSHIP',
    bgImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80',
    sportAnchor: '#sports',
    stats: [
      { label: 'DISCIPLINES', value: '07' },
      { label: 'DIVISIONS', value: '03' },
      { label: 'CONTINENTAL PATH', value: 'DIRECT' },
    ],
  },
  {
    id: 1,
    badge: 'Featured Aerial League • Caged 3v3 Combat',
    superhead: 'HIGH-OCTANE AEROSPACE COLLISION SPORT',
    headlineMain: 'DRONE SOCCER',
    headlineAccent: '3v3 AERIAL',
    headlineSuffix: 'TACTICAL CLASH',
    description: 'Enclosed spherical exo-drones battle inside suspended glowing toroidal goals. Strikers, defenders, and pit crews duel with sub-second radio telemetry in a 4-minute high-energy aerial collision arena.',
    highlightTag: 'FIDA Class-20 Exoskeletons • 4-Min Halves • Suspended Glowing Hoops',
    themeColor: 'amber',
    navLabel: 'DRONE SOCCER',
    bgImage: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1600&q=80',
    sportAnchor: '#sports',
    stats: [
      { label: 'MATCH LENGTH', value: '4 MIN' },
      { label: 'EXOSKELETON', value: '200mm' },
      { label: 'ROLES', value: 'STRIKER / SWEEPER' },
    ],
  },
  {
    id: 2,
    badge: 'Zero Wireless Intervention • 100% Algorithmic Speed',
    superhead: 'PURE ALGORITHMIC & HARDWARE SUPREMACY',
    headlineMain: 'AUTONOMOUS',
    headlineAccent: 'ROBOT MARATHON',
    headlineSuffix: 'SPEED RACE',
    description: 'Wheeled rovers race along an intricate 45-meter modular circuit. Hairpin curves, bridge gradients, and dead-reckoning sensor gaps conquered by custom PID closed-loop code with zero human radio assistance.',
    highlightTag: '180s Time Limit • 2000Hz Optical Sampling • Sub-Millimeter Line Precision',
    themeColor: 'emerald',
    navLabel: 'MARATHON',
    bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
    sportAnchor: '#sports',
    stats: [
      { label: 'TRACK LENGTH', value: '45 METERS' },
      { label: 'FAILSAFE', value: 'E-STOP 2.0s' },
      { label: 'CONTROL', value: '100% AUTONOMOUS' },
    ],
  },
  {
    id: 3,
    badge: 'Multi-Agent Coordination • Autonomous Turf Warfare',
    superhead: 'HOLONOMIC KINEMATICS & INFRARED SENSOR HUNT',
    headlineMain: 'ROBOT FOOTBALL',
    headlineAccent: '3×3 SOCCER',
    headlineSuffix: 'TURF ARENA',
    description: 'Striker, playmaker, and goalkeeper robots hunt an omni-directional IR pulse ball on tournament felt. Dynamic offensive passing combinations and shot-blocking executed at high speeds by holonomic omni-drive bases.',
    highlightTag: 'Triple Holonomic Drive • 3.0m × 2.0m Pitch • Active IR Electronic Ball',
    themeColor: 'blue',
    navLabel: 'FOOTBALL 3x3',
    bgImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80',
    sportAnchor: '#sports',
    stats: [
      { label: 'ROBOTS / SIDE', value: '3 SQUAD' },
      { label: 'MATCH DURATION', value: '7 MIN' },
      { label: 'BALL SENSING', value: '360° IR' },
    ],
  },
  {
    id: 4,
    badge: 'Computer Vision & Civic Engineering Solutions',
    superhead: 'AI ARUCO TARGETING & CITIZEN PROTOTYPES',
    headlineMain: 'BALLISTICS &',
    headlineAccent: 'FUTURE MAKERS',
    headlineSuffix: 'EXHIBITION',
    description: 'Autonomous computer vision gimbal rovers identify and fire at multi-tiered targets up to 4 meters away, while young innovators defend real-world agricultural, healthcare, and climate solutions before an international jury.',
    highlightTag: 'Dual-Axis Pan/Tilt Gimbals • 100 Max Points • Real-World Ghanaian Impact',
    themeColor: 'magenta',
    navLabel: 'INNOVATION',
    bgImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
    sportAnchor: '#sports',
    stats: [
      { label: 'ACCURACY RANGE', value: '2m & 4m' },
      { label: 'VISION AI', value: 'OPENCV / ARUCO' },
      { label: 'DEFENSE', value: '10 MIN JURY' },
    ],
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenRegister }) => {
  // Target Date: January 30, 2027 at 08:00:00 UTC
  const targetDate = new Date('2027-01-30T08:00:00Z').getTime();

  const calculateTimeRemaining = (): TimeRemaining => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeRemaining());
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const slideDuration = 6000; // 6 seconds per slide

  // Ticking countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Slide Auto-Advance
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, slideDuration);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

  const activeSlide = HERO_SLIDES[currentSlide];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const getColorClasses = (color: SlideData['themeColor']) => {
    switch (color) {
      case 'amber':
        return {
          glowText: 'text-glow-amber text-amber-400',
          solidText: 'text-amber-400',
          badgeBorder: 'border-amber-500/40 text-amber-300',
          badgeBg: 'bg-amber-500/10',
          dotBg: 'bg-amber-400 shadow-[0_0_10px_#f59e0b]',
          accentBorder: 'border-amber-500/30',
        };
      case 'emerald':
        return {
          glowText: 'text-emerald-400',
          solidText: 'text-emerald-400',
          badgeBorder: 'border-emerald-500/40 text-emerald-300',
          badgeBg: 'bg-emerald-500/10',
          dotBg: 'bg-emerald-400 shadow-[0_0_10px_#10b981]',
          accentBorder: 'border-emerald-500/30',
        };
      case 'blue':
        return {
          glowText: 'text-glow-cyan text-cyan-300',
          solidText: 'text-cyan-300',
          badgeBorder: 'border-blue-500/40 text-blue-300',
          badgeBg: 'bg-blue-500/10',
          dotBg: 'bg-blue-400 shadow-[0_0_10px_#3b82f6]',
          accentBorder: 'border-blue-500/30',
        };
      case 'magenta':
        return {
          glowText: 'text-pink-400',
          solidText: 'text-pink-400',
          badgeBorder: 'border-pink-500/40 text-pink-300',
          badgeBg: 'bg-pink-500/10',
          dotBg: 'bg-pink-400 shadow-[0_0_10px_#ec4899]',
          accentBorder: 'border-pink-500/30',
        };
      case 'cyan':
      default:
        return {
          glowText: 'text-glow-cyan text-cyan-400',
          solidText: 'text-cyan-400',
          badgeBorder: 'border-cyan-500/40 text-cyan-300',
          badgeBg: 'bg-cyan-500/10',
          dotBg: 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]',
          accentBorder: 'border-cyan-500/30',
        };
    }
  };

  const currentTheme = getColorClasses(activeSlide.themeColor);

  return (
    <section className="relative pt-6 pb-16 lg:pt-10 lg:pb-20 overflow-hidden min-h-[85vh] flex flex-col justify-between">
      
      {/* Background Slides with Cross-Fade Animation & Cyber Scrim */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.28, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${activeSlide.bgImage})` }}
          />
        </AnimatePresence>

        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-[#070a12]/80" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Slide HUD Status Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${currentTheme.dotBg}`} />
              STAGE PREVIEW // 0{activeSlide.id + 1} OF 0{HERO_SLIDES.length}
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline font-mono text-xs text-slate-400 uppercase">
              {activeSlide.navLabel}
            </span>
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 rounded-md bg-slate-900/80 border border-slate-800 hover:border-cyan-500/60 text-slate-400 hover:text-cyan-300 transition-colors"
              title={isPaused ? 'Resume Slideshow' : 'Pause Slideshow'}
              aria-label={isPaused ? 'Resume Slideshow' : 'Pause Slideshow'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handlePrevSlide}
              className="p-1.5 rounded-md bg-slate-900/80 border border-slate-800 hover:border-cyan-500/60 text-slate-400 hover:text-cyan-300 transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNextSlide}
              className="p-1.5 rounded-md bg-slate-900/80 border border-slate-800 hover:border-cyan-500/60 text-slate-400 hover:text-cyan-300 transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2-Column Hero Grid: Left Dynamic Slide Showcase / Right Persistent Live Countdown Clock */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column (7 cols): Animated Slide Content */}
          <div className="lg:col-span-7 min-h-[440px] flex flex-col justify-center text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-5"
              >
                {/* Live Status Badge */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border shadow-lg backdrop-blur-md transition-colors" style={{ borderColor: 'rgba(0, 240, 255, 0.3)' }}>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
                  </span>
                  <span className="font-mono text-xs font-semibold text-cyan-300 tracking-wide uppercase">
                    {activeSlide.badge}
                  </span>
                </div>

                {/* Superhead */}
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-amber-400/80" />
                  <p className="font-mono text-xs font-bold tracking-[0.35em] text-amber-400 uppercase">
                    {activeSlide.superhead}
                  </p>
                </div>

                {/* Main Headline */}
                <h1 className="font-orbitron font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-white">
                  {activeSlide.headlineMain} <br className="hidden sm:inline" />
                  <span className={`${currentTheme.solidText} text-glow-cyan`}>
                    {activeSlide.headlineAccent}
                  </span> <br />
                  <span className="text-white">
                    {activeSlide.headlineSuffix}
                  </span>
                </h1>

                {/* Sub-headline */}
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                  {activeSlide.description}
                </p>

                {/* Slide Quick Stats Bar */}
                <div className="grid grid-cols-3 gap-2 py-2 max-w-xl">
                  {activeSlide.stats.map((stat, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/90 backdrop-blur-sm">
                      <span className="text-[10px] font-mono text-slate-400 block tracking-wider uppercase">
                        {stat.label}
                      </span>
                      <span className="text-sm sm:text-base font-orbitron font-bold text-white tracking-wide">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Dual CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    onClick={onOpenRegister}
                    className="group relative inline-flex items-center justify-center px-7 py-3.5 font-orbitron text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_35px_rgba(0,240,255,0.8)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Register Your Team</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </button>

                  <Link
                    to="/sports"
                    className="inline-flex items-center justify-center px-6 py-3.5 font-mono text-xs sm:text-sm font-medium uppercase tracking-wider text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/60 rounded-lg transition-all duration-200 hover:text-cyan-300 backdrop-blur-md"
                  >
                    <span>Explore All 7 Sports</span>
                    <ChevronDown className="w-4 h-4 ml-2 text-cyan-400" />
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column (5 cols): Live Tournament Clock Card (HUD Card) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-900/95 border border-cyan-500/30 p-6 sm:p-7 shadow-2xl shadow-black/80 backdrop-blur-xl hud-corner-tl hud-corner-br">
              
              {/* Header HUD Reticle */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                    Official Countdown Clock
                  </span>
                </div>
                <div className="font-mono text-[11px] text-slate-400 flex items-center gap-1">
                  <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                  <span>TARGET: T-MINUS</span>
                </div>
              </div>

              {/* Tournament Date Callout */}
              <div className="mb-5 text-center sm:text-left">
                <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Championship Matchday</p>
                <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Saturday, January 30, 2027
                </h3>
              </div>

              {/* Real-time Ticking Countdown Grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
                
                {/* Days */}
                <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/50 transition-colors">
                  <span className="font-orbitron font-black text-2xl sm:text-3xl text-cyan-400 text-glow-cyan tracking-tight">
                    {formatNumber(timeLeft.days)}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                    DAYS
                  </span>
                </div>

                {/* Hours */}
                <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/50 transition-colors">
                  <span className="font-orbitron font-black text-2xl sm:text-3xl text-slate-100 tracking-tight">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                    HOURS
                  </span>
                </div>

                {/* Minutes */}
                <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/50 transition-colors">
                  <span className="font-orbitron font-black text-2xl sm:text-3xl text-slate-100 tracking-tight">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                    MINUTES
                  </span>
                </div>

                {/* Seconds */}
                <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/50 transition-colors">
                  <span className="font-orbitron font-black text-2xl sm:text-3xl text-amber-400 text-glow-amber tracking-tight">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                    SECONDS
                  </span>
                </div>

              </div>

              {/* Meta Rows with Icons */}
              <div className="space-y-3 border-t border-slate-800/80 pt-4 text-xs font-mono">
                <div className="flex items-start gap-2.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Accra, Ghana</span>
                    <span className="text-slate-400 block sm:inline sm:ml-1.5">• Venue announcement to follow</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-slate-300">
                  <Users className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Ages 10 to Adult</span>
                    <span className="text-slate-400 block sm:inline sm:ml-1.5">• Schools, universities & independents</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-slate-300">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">Gates & Pit Inspection</span>
                    <span className="text-slate-400 block sm:inline sm:ml-1.5">• 07:30 GMT Mandatory Check-in</span>
                  </div>
                </div>
              </div>

              {/* Bottom HUD Badge: CREATE • CODE • COMPETE */}
              <div className="mt-5 pt-3 border-t border-dashed border-slate-800 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-800/60 border border-slate-700/60">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono text-[11px] font-bold tracking-widest text-cyan-300">
                    CREATE • CODE • COMPETE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  LOC: ACCRA_GH
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* 5-Slide Interactive Animated Progress Selector Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = currentSlide === idx;
              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    setCurrentSlide(idx);
                  }}
                  className={`relative p-3 rounded-xl border text-left transition-all duration-200 overflow-hidden group ${
                    isActive
                      ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  {/* Active Slide Linear Progress Bar Indicator */}
                  {isActive && !isPaused && (
                    <motion.div
                      key={`progress-${currentSlide}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: slideDuration / 1000, ease: 'linear' }}
                      className="absolute bottom-0 left-0 h-1 bg-cyan-400"
                    />
                  )}
                  {isActive && isPaused && (
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-cyan-400" />
                  )}

                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-mono text-[11px] font-bold ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                      0{slide.id + 1}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>

                  <h5 className={`font-orbitron font-bold text-xs truncate ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-slate-200'}`}>
                    {slide.navLabel}
                  </h5>
                  <p className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                    {slide.headlineAccent}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Metrics Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-orbitron font-black text-2xl shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              07
            </div>
            <div>
              <h4 className="font-orbitron font-bold text-sm text-white uppercase tracking-wide">
                RobotSports Disciplines
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                From high-speed aerial drone soccer to autonomous ballistics & marathon.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-400 font-orbitron font-black text-2xl shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              03
            </div>
            <div>
              <h4 className="font-orbitron font-bold text-sm text-white uppercase tracking-wide">
                Competing Divisions
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Junior (10-14), Senior (15-18), and University / Open (18+) divisions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 font-orbitron font-black text-2xl shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              01
            </div>
            <div>
              <h4 className="font-orbitron font-bold text-sm text-white uppercase tracking-wide">
                Global Pathway to World Finals
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Top Ghanaian champions advance to the prestigious Minoan World RobotSports Championship.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
