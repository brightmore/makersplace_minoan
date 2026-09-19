import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SPORTS_DATA } from '../data/sportsData';
import { GalleryItem, SportChallenge } from '../types';
import { ImageLightboxModal } from './ImageLightboxModal';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ZoomIn, 
  Layers, 
  Video,
  Radar
} from 'lucide-react';

export const MediaHub: React.FC = () => {
  const [activeSportIndex, setActiveSportIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeMode, setActiveMode] = useState<'video' | 'radar'>('video');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  const currentSport: SportChallenge = SPORTS_DATA[activeSportIndex];

  return (
    <section id="media" className="py-20 relative z-10 border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                Visual Telemetry & Operations
              </p>
            </div>
            <h2 className="font-orbitron font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide">
              Interactive Media Hub & <br className="hidden sm:inline" />
              <span className="text-cyan-400">
                Arena Visualizer
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-md mt-4 md:mt-0">
            Preview the pitch geometry, 3D obstacle corridors, pilot command bays, and past team robot builds across all seven disciplines.
          </p>
        </div>

        {/* Horizontal Category Switcher Tabs */}
        <div className="flex overflow-x-auto pb-3 mb-8 no-scrollbar gap-2 border-b border-slate-800/80">
          {SPORTS_DATA.map((sport, index) => {
            const isActive = activeSportIndex === index;
            return (
              <button
                key={sport.id}
                onClick={() => {
                  setActiveSportIndex(index);
                  setIsPlaying(false);
                }}
                className={`whitespace-nowrap px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 font-bold shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className={`text-[10px] font-bold ${isActive ? 'text-cyan-400' : 'text-slate-400'}`}>
                  {sport.code}
                </span>
                <span>{sport.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Grid: Left Visualizer / Right 4-Slot Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 cols): Arena / Match Visualizer Player */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl bg-slate-900/90 border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-950/30">
              
              {/* Visualizer Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-slate-200 uppercase">
                    FEED: {currentSport.code} ARENA SIMULATOR
                  </span>
                </div>

                {/* Mode Switcher: Video Explainer vs Arena Radar */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-md border border-slate-800 text-[11px] font-mono">
                  <button
                    onClick={() => setActiveMode('video')}
                    className={`px-2 py-1 rounded flex items-center gap-1.5 transition-colors ${
                      activeMode === 'video' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Video className="w-3 h-3" />
                    Video
                  </button>
                  <button
                    onClick={() => setActiveMode('radar')}
                    className={`px-2 py-1 rounded flex items-center gap-1.5 transition-colors ${
                      activeMode === 'radar' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Radar className="w-3 h-3" />
                    Radar Grid
                  </button>
                </div>
              </div>

              {/* Player Viewport */}
              <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
                
                {activeMode === 'video' ? (
                  <>
                    {/* Background Visualizer Graphic */}
                    <img
                      src={currentSport.gallery[0].url}
                      alt={currentSport.name}
                      className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 filter brightness-90' : 'filter brightness-60'}`}
                    />

                    {/* HUD Simulated Scanline & Reticle */}
                    <div className="absolute inset-0 pointer-events-none p-5 flex flex-col justify-between border border-cyan-500/20 m-2 rounded-xl">
                      <div className="flex justify-between items-start text-[10px] font-mono text-cyan-400/80">
                        <div className="bg-slate-950/80 px-2 py-1 rounded border border-cyan-500/30">
                          DIMENSIONS: {currentSport.arenaSpecs.dimensions}
                        </div>
                        <div className="bg-slate-950/80 px-2 py-1 rounded border border-cyan-500/30">
                          STATUS: {isPlaying ? 'LIVE STREAMING' : 'PAUSED'}
                        </div>
                      </div>

                      {/* Play/Pause Center Button if paused */}
                      {!isPlaying && (
                        <div className="self-center">
                          <button
                            onClick={() => setIsPlaying(true)}
                            className="group/btn flex items-center justify-center w-16 h-16 rounded-full bg-cyan-400/90 text-slate-950 shadow-[0_0_30px_rgba(0,240,255,0.7)] hover:scale-110 transition-all"
                            aria-label="Play video"
                          >
                            <Play className="w-7 h-7 ml-1 fill-slate-950" />
                          </button>
                        </div>
                      )}

                      <div className="flex justify-between items-end text-[10px] font-mono text-slate-400">
                        <div className="bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
                          RULES BREAKDOWN & FLIGHT PATH EXPLAINER
                        </div>
                        <div className="bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 text-amber-400">
                          {currentSport.maxPoints}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Radar Layout Mode */
                  <div className="relative w-full h-full bg-[#050810] flex items-center justify-center p-6">
                    <div className="relative w-64 h-64 rounded-full border border-cyan-500/30 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20" />
                      <div className="w-44 h-44 rounded-full border border-cyan-500/40 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border border-amber-500/40 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
                        </div>
                      </div>
                      <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-500/20" />
                      <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/20" />
                      <div className="absolute w-full h-full rounded-full border-t border-cyan-400/60 animate-spin" style={{ animationDuration: '6s' }} />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-3 rounded-lg border border-slate-800 flex justify-between text-xs font-mono">
                      <div>
                        <span className="text-slate-400 text-[10px] block">ARENA PERIMETER</span>
                        <span className="text-white font-bold">{currentSport.arenaSpecs.dimensions}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 text-[10px] block">SURFACE SPEC</span>
                        <span className="text-cyan-300">{currentSport.arenaSpecs.surfaceType}</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Player Bottom Control Bar Mockup */}
              <div className="px-4 py-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-slate-300 hover:text-cyan-400 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="font-mono text-[11px] text-slate-400">
                    {isPlaying ? '01:45 / 03:20' : '00:00 / 03:20'}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 max-w-xs h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-cyan-400 transition-all duration-300"
                    style={{ width: isPlaying ? '52%' : '0%' }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    1080p 60FPS
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Summary Note */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">
                Detailed Arena Specifications & CAD available in the downloads section.
              </span>
              <Link to="/resources" className="text-cyan-400 hover:text-cyan-300 font-bold shrink-0 ml-2">
                View CAD Files →
              </Link>
            </div>
          </div>

          {/* Right Column (5 cols): 4-Slot High-Tech Gallery Viewports */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
                  Technical Image Viewports
                </h3>
              </div>
              <span className="font-mono text-[10px] text-slate-400">
                CLICK TO ENLARGE (4 VIEWPORTS)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {currentSport.gallery.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedGalleryItem(item)}
                  className="group relative rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-80 group-hover:opacity-40 transition-opacity" />
                    
                    {/* Hover Zoom Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 rounded-full bg-cyan-400/90 text-slate-950 shadow-lg">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded bg-slate-950/80 text-cyan-300 border border-cyan-500/30">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-3">
                    <h5 className="font-orbitron font-bold text-xs text-white truncate group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Technical Note */}
            <div className="rounded-lg bg-slate-900/30 border border-slate-800/80 p-3 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              <span>All photography & schematics property of The MakersPlace & Minoan Robotics Series.</span>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      <ImageLightboxModal
        image={selectedGalleryItem}
        isOpen={!!selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
      />
    </section>
  );
};
