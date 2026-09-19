import React from 'react';
import { MediaHub } from '../components/MediaHub';
import { Link } from 'react-router-dom';
import { Layers, ArrowLeft, ArrowRight, Video, Radar, Download } from 'lucide-react';

export const MediaHubPage: React.FC = () => {
  return (
    <div className="pt-6 pb-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
          <Link to="/" className="hover:text-cyan-300 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Home
          </Link>
          <span>/</span>
          <span className="text-cyan-400 font-semibold">Media Hub & Visualizer</span>
        </div>

        {/* Page Hero Banner */}
        <div className="relative rounded-2xl bg-slate-900 border border-cyan-500/30 p-8 sm:p-12 mb-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Broadcast & Arena Operations</span>
            </div>

            <h1 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
              Interactive Media Hub & <br className="hidden sm:inline" />
              <span className="text-cyan-400">
                Arena Visualizer
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore pitch layouts, dynamic obstacle ring trajectories, pilot telemetry stations, and high-resolution viewports from previous championships. Switch between video explainers and 360° radar tracking grids across all seven disciplines.
            </p>

            <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono">
              <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-cyan-400" />
                HUD Flight Path Simulation
              </span>
              <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <Radar className="w-3.5 h-3.5 text-amber-400" />
                Live Radar Geometry
              </span>
            </div>
          </div>
        </div>

        {/* Media Hub Visualizer & Gallery */}
        <MediaHub />

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/sports"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <span>← Review All 7 RobotSports Disciplines</span>
          </Link>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-cyan-300 border border-cyan-500/40 text-xs font-orbitron font-bold uppercase tracking-wider transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Field CAD & Blueprints</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
