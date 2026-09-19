import React from 'react';
import { GalleryItem } from '../types';
import { X, Info } from 'lucide-react';

interface ImageLightboxModalProps {
  image: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  image,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-950 border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 overflow-hidden z-10">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              {image.badge}
            </span>
            <h4 className="font-orbitron font-bold text-sm sm:text-base text-white">
              {image.title}
            </h4>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Preview with HUD Overlays */}
        <div className="relative bg-slate-950 flex items-center justify-center max-h-[65vh] overflow-hidden group">
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-auto max-h-[65vh] object-cover object-center"
          />

          {/* HUD Crosshairs Overlay */}
          <div className="absolute inset-0 pointer-events-none border border-cyan-500/20 m-4 rounded-lg flex flex-col justify-between p-4">
            <div className="flex justify-between text-[10px] font-mono text-cyan-400/70">
              <span>FOV: 110° ULTRA-WIDE</span>
              <span>GRID: CALIBRATED 100mm</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-cyan-400/70">
              <span>STATUS: INSPECTED & CERTIFIED</span>
              <span>MRC GHANA 2027</span>
            </div>
          </div>
        </div>

        {/* Bottom Details Bar */}
        <div className="p-5 border-t border-slate-800 bg-slate-900/95 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-slate-200 font-sans font-medium">
                {image.subtitle}
              </p>
              <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                Official technical archive image verified by The MakersPlace Inspection Committee.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs shrink-0 self-end sm:self-auto transition-colors"
          >
            Close Viewport
          </button>
        </div>

      </div>
    </div>
  );
};
