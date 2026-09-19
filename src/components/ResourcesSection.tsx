import React, { useState } from 'react';
import { RESOURCES_DATA } from '../data/resourcesData';
import { ResourceItem } from '../types';
import { 
  Download, 
  FileText, 
  FolderDown, 
  FileSpreadsheet, 
  FileCode2,
  Search
} from 'lucide-react';

export const ResourcesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = ['All', 'Rulebooks', 'Field CAD & Dimensions', 'Score Sheets', 'Safety Protocols'];

  const filteredResources = RESOURCES_DATA.filter((res) => {
    const matchesCat = activeCategory === 'All' || res.category === activeCategory;
    const matchesSearch = 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.sportCode && res.sportCode.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleDownload = (item: ResourceItem) => {
    setDownloadingId(item.id);
    
    // Simulate generation and download
    setTimeout(() => {
      setDownloadingId(null);
      setToastMessage(`Downloaded "${item.title}" (${item.fileSize})`);

      // Create text blob download
      const element = document.createElement('a');
      const file = new Blob([
        `===============================================================\n` +
        `MINOAN ROBOTSPORTS GHANA 2027 — OFFICIAL DOCUMENTATION\n` +
        `THE MAKERSPLACE GHANA • NATIONAL SECRETARIAT\n` +
        `===============================================================\n\n` +
        `DOCUMENT: ${item.title}\n` +
        `CATEGORY: ${item.category}\n` +
        `VERSION: ${item.version} | RELEASED: ${item.publishedDate}\n` +
        `FORMAT SPEC: ${item.format} | SIZE: ${item.fileSize}\n\n` +
        `DESCRIPTION & SCOPE:\n` +
        `${item.description}\n\n` +
        `This file represents an official verified release from The MakersPlace\n` +
        `RobotSports Technical Secretariat. For inquiries, contact info@makersplacegh.com\n\n` +
        `© 2027 The MakersPlace Ghana. All Rights Reserved.\n`
      ], { type: 'text/plain' });

      element.href = URL.createObjectURL(file);
      element.download = `${item.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.${item.format === 'XLSX' ? 'csv' : item.format === 'CAD/DXF' ? 'dxf' : 'txt'}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => setToastMessage(null), 4000);
    }, 600);
  };

  const getFormatBadge = (format: ResourceItem['format']) => {
    switch (format) {
      case 'CAD/DXF':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'XLSX':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'PDF':
      default:
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    }
  };

  const getFormatIcon = (format: ResourceItem['format']) => {
    switch (format) {
      case 'CAD/DXF': return FileCode2;
      case 'XLSX': return FileSpreadsheet;
      case 'PDF':
      default: return FileText;
    }
  };

  return (
    <section id="resources" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                Official Document Vault
              </p>
            </div>
            <h2 className="font-orbitron font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide">
              Official Downloads & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
                Resource Library
              </span>
            </h2>
          </div>

          <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-md mt-4 md:mt-0">
            Download vector arena blueprints, standardized score sheets, LiPo fire protocols, and governance rules directly.
          </p>
        </div>

        {/* Search & Tabs Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Pills */}
          <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents, CAD, codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
            />
          </div>

        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map((item) => {
            const Icon = getFormatIcon(item.format);
            const isDownloading = downloadingId === item.id;

            return (
              <div
                key={item.id}
                className="group relative rounded-xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/40 p-5 flex flex-col justify-between transition-all duration-200 backdrop-blur-md"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      {item.sportCode && (
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-700">
                          {item.sportCode}
                        </span>
                      )}
                      <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${getFormatBadge(item.format)}`}>
                        {item.format}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">
                        {item.version}
                      </span>
                    </div>

                    <span className="font-mono text-[11px] text-slate-400">
                      {item.fileSize}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-orbitron font-bold text-sm text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    Updated: {item.publishedDate}
                  </span>

                  <button
                    onClick={() => handleDownload(item)}
                    disabled={isDownloading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 font-mono text-xs border border-slate-800 hover:border-cyan-500/50 transition-colors"
                  >
                    <Download className={`w-3.5 h-3.5 ${isDownloading ? 'animate-bounce text-cyan-400' : 'text-cyan-400'}`} />
                    <span>{isDownloading ? 'Saving...' : 'Download'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Zip Archive Bundle Callout */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-slate-900/60 to-slate-900/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <FolderDown className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-orbitron font-bold text-base text-white">
                Download Complete Team Preparation Dossier
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Includes all 7 sports rulebooks, CAD vectors, score sheets, and LiPo checklists in one package (18.4 MB).
              </p>
            </div>
          </div>

          <button
            onClick={() => handleDownload({
              id: 'all-bundle',
              title: 'MRC27-Ghana-Complete-Team-Dossier-v2027.zip',
              category: 'Rulebooks',
              version: 'v2027.Full',
              format: 'PDF',
              fileSize: '18.4 MB',
              description: 'Full tournament technical bundle.',
              publishedDate: 'January 2026',
              downloadUrl: '#',
            })}
            className="shrink-0 px-5 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download All (ZIP)</span>
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-950 border border-emerald-500/60 px-4 py-3 shadow-2xl shadow-emerald-950/50 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="text-xs font-mono text-slate-200">
              <span className="text-emerald-400 font-bold block">DOWNLOAD SUCCESSFUL</span>
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
