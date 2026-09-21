import React from 'react';
import { ResourcesSection } from '../components/ResourcesSection';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { createBreadcrumbSchema } from '../utils/seoSchemas';
import { 
  Download, 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  FileCode2, 
  ShieldCheck
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  return (
    <div className="pt-6 pb-20 relative z-10">
      <SEOHead
        title="Official Document Vault, CAD Blueprints & Rulebooks | MINOAN 2027"
        description="Download official rulebooks, 2D/3D arena CAD DXF files, referee scoring sheets, and paddock compliance guidelines for MINOAN RobotSports Ghana 2027."
        keywords="MINOAN downloads, robotics rulebook PDF, CAD DXF arena layout, referee scoring sheet Ghana"
        canonicalPath="/resources"
        jsonLd={createBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Downloads & Resources', path: '/resources' },
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
          <span className="text-cyan-400 font-semibold">Official Downloads</span>
        </div>

        {/* Page Hero Banner */}
        <div className="relative rounded-2xl bg-slate-900 border border-cyan-500/30 p-6 sm:p-10 mb-10 shadow-2xl overflow-hidden">
          {/* Subtle Ambient Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80')" }} 
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest">
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Official Document Vault & Technical Blueprints</span>
              </div>

              <h1 className="font-orbitron font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
                Official Tournament <br className="hidden sm:inline" />
                <span className="text-cyan-400">
                  Downloads & Resources
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Equip your workshop with official discipline rulebooks, 2D/3D arena CAD DXF files, referee scoring calculation sheets, and paddock safety compliance protocols released by The MakersPlace Technical Secretariat.
              </p>

              <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
                  CAD / DXF Arena Layouts
                </span>
                <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  PDF Official Rulebooks
                </span>
                <span className="px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Safety & Scrutineering Protocols
                </span>
              </div>
            </div>

            {/* Right Featured Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 shadow-2xl bg-slate-950 group">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 z-10" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 z-10" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 z-10" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 z-10" />

                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80"
                    alt="Technical Blueprint and CAD Vault"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/30" />

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/90 border border-cyan-400/60 text-[10px] font-mono text-cyan-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="font-bold">TECHNICAL BLUEPRINT VAULT</span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-white font-semibold">CAD DXF & PDF Rulebooks</span>
                    <span className="text-cyan-400 font-bold">18.4 MB Archive</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Vault Component */}
        <ResourcesSection />

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/rules"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-amber-400 transition-colors"
          >
            <span>← Review Rule Zero & Pre-Flight Scrutineering</span>
          </Link>
          <Link
            to="/sponsors"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-cyan-300 border border-cyan-500/40 text-xs font-orbitron font-bold uppercase tracking-wider transition-colors"
          >
            <span>View Partners & Organizers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
