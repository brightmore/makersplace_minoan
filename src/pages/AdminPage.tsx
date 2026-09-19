import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Mail, 
  Sparkles, 
  Search, 
  Download, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Send, 
  ShieldCheck, 
  Trash2, 
  Phone, 
  MapPin, 
  X,
  FileSpreadsheet,
  Layers,
  Radio,
  Eye
} from 'lucide-react';
import { 
  RegistrationRecord, 
  NewsletterSubscriber, 
  NewsletterBroadcast, 
  TournamentTelemetryStats
} from '../types';
import { 
  fetchTournamentStats, 
  fetchRegistrations, 
  updateRegistrationStatus, 
  deleteRegistration, 
  fetchSubscribers, 
  deleteSubscriber, 
  fetchBroadcasts, 
  sendBroadcastBulletin, 
  getRegistrationCsvUrl, 
  getNewsletterCsvUrl 
} from '../lib/api';
import { SPORTS_DATA } from '../data/sportsData';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'registrations' | 'newsletter' | 'bulletins'>('overview');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Stats & Overview
  const [stats, setStats] = useState<TournamentTelemetryStats | null>(null);

  // Registrations state
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [regSearch, setRegSearch] = useState('');
  const [regSportFilter, setRegSportFilter] = useState('all');
  const [regDivisionFilter, setRegDivisionFilter] = useState('all');
  const [regRegionFilter, setRegRegionFilter] = useState('all');
  const [regStatusFilter, setRegStatusFilter] = useState('all');
  const [selectedReg, setSelectedReg] = useState<RegistrationRecord | null>(null);
  const [inspectionNotes, setInspectionNotes] = useState('');
  const [inspectorName, setInspectorName] = useState('MakersPlace Chief Referee');
  const [statusUpdating, setStatusUpdating] = useState(false);

  // Newsletter state
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [subSearch, setSubSearch] = useState('');
  const [subStatusFilter, setSubStatusFilter] = useState('all');

  // Broadcasts state
  const [broadcasts, setBroadcasts] = useState<NewsletterBroadcast[]>([]);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastSubject, setBroadcastSubject] = useState('');
  const [broadcastCategory, setBroadcastCategory] = useState('general');
  const [broadcastAudience, setBroadcastAudience] = useState('all');
  const [broadcastContent, setBroadcastContent] = useState('');
  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);
  const [broadcastSuccessMessage, setBroadcastSuccessMessage] = useState<string | null>(null);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  const showToast = (text: string, isError = false) => {
    setToastMessage({ text, isError });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, regsData, subsData, bcastsData] = await Promise.all([
        fetchTournamentStats(),
        fetchRegistrations({
          search: regSearch,
          sport: regSportFilter,
          division: regDivisionFilter,
          region: regRegionFilter,
          status: regStatusFilter,
          limit: 100,
        }),
        fetchSubscribers({
          search: subSearch,
          status: subStatusFilter,
          limit: 100,
        }),
        fetchBroadcasts(),
      ]);

      setStats(statsData);
      setRegistrations(regsData.data);
      setSubscribers(subsData.data);
      setBroadcasts(bcastsData);
    } catch (err: unknown) {
      console.error('[Admin] Error loading operations data:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect to backend server');
    } finally {
      setLoading(false);
    }
  }, [regSearch, regSportFilter, regDivisionFilter, regRegionFilter, regStatusFilter, subSearch, subStatusFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Status Update
  const handleUpdateStatus = async (regId: number, newStatus: RegistrationRecord['status']) => {
    setStatusUpdating(true);
    try {
      const res = await updateRegistrationStatus(regId, newStatus, inspectionNotes, inspectorName);
      showToast(`Status updated: ${res.data.team_name} is now ${newStatus.replace('_', ' ').toUpperCase()}`);
      if (selectedReg && selectedReg.id === regId) {
        setSelectedReg(res.data);
      }
      loadData();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Status update failed', true);
    } finally {
      setStatusUpdating(false);
    }
  };

  // Handle Delete Registration
  const handleDeleteRegistration = async (id: number, teamName: string) => {
    if (!window.confirm(`Are you sure you want to delete and archive team "${teamName}"?`)) return;
    try {
      await deleteRegistration(id);
      showToast(`Team "${teamName}" was removed.`);
      if (selectedReg?.id === id) setSelectedReg(null);
      loadData();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Delete failed', true);
    }
  };

  // Handle Delete Subscriber
  const handleDeleteSubscriber = async (id: number, email: string) => {
    if (!window.confirm(`Remove subscriber "${email}"?`)) return;
    try {
      await deleteSubscriber(id);
      showToast(`Subscriber ${email} removed.`);
      loadData();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Delete subscriber failed', true);
    }
  };

  // Handle Send Broadcast
  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastSubject.trim() || !broadcastContent.trim()) {
      showToast('Please fill all broadcast fields', true);
      return;
    }

    setIsSendingBroadcast(true);
    setBroadcastSuccessMessage(null);

    try {
      const res = await sendBroadcastBulletin({
        title: broadcastTitle,
        subject: broadcastSubject,
        category: broadcastCategory,
        content: broadcastContent,
        targetAudience: broadcastAudience,
      });

      setBroadcastSuccessMessage(res.message);
      setBroadcastTitle('');
      setBroadcastSubject('');
      setBroadcastContent('');
      showToast(res.message);
      loadData();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Broadcast dispatch failed', true);
    } finally {
      setIsSendingBroadcast(false);
    }
  };

  const getStatusBadge = (status: RegistrationRecord['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-bold uppercase">
            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
            Approved
          </span>
        );
      case 'scrutineering_passed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold uppercase">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Passed Scrutineering
          </span>
        );
      case 'waitlisted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold uppercase">
            <Clock className="w-3 h-3 text-amber-400" />
            Waitlisted
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[11px] font-mono font-bold uppercase">
            <XCircle className="w-3 h-3 text-rose-400" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[11px] font-mono font-bold uppercase">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            Pending Review
          </span>
        );
    }
  };

  const ghanaRegions = [
    'Greater Accra', 'Ashanti', 'Central', 'Western', 'Eastern', 'Volta',
    'Northern', 'Upper East', 'Upper West', 'Bono', 'Bono East', 'Ahafo',
    'Oti', 'Savannah', 'North East', 'Western North',
  ];

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-20 right-5 z-50 px-4 py-3 rounded-lg border shadow-xl flex items-center gap-2.5 font-mono text-xs animate-in slide-in-from-top-3 ${
          toastMessage.isError 
            ? 'bg-rose-950/95 border-rose-500 text-rose-200' 
            : 'bg-emerald-950/95 border-emerald-500 text-emerald-200'
        }`}>
          {toastMessage.isError ? <AlertTriangle className="w-4 h-4 text-rose-400" /> : <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Command Console Top HUD */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase font-bold">
                MakersPlace Ghana Operations Command
              </span>
            </div>
            <h1 className="font-orbitron font-black text-xl sm:text-2xl lg:text-3xl text-white tracking-wide">
              TOURNAMENT REGISTRATION & BULLETIN VAULT
            </h1>
            <p className="text-slate-400 text-xs font-mono">
              Live Scrutineering, Roster Verification & Direct Athlete Communication System
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-mono text-xs transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Telemetry</span>
            </button>

            <a
              href={getRegistrationCsvUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono text-xs transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export Teams CSV</span>
            </a>

            <a
              href={getNewsletterCsvUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-amber-950 text-amber-300 border border-amber-500/40 font-mono text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export Subscribers</span>
            </a>
          </div>
        </div>

        {/* Global Operational Error Banner */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-300 text-xs font-mono flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>Backend connection alert: {error}. Ensure backend is running (`npm run server`).</span>
            </div>
            <button 
              onClick={loadData}
              className="px-3 py-1 rounded bg-rose-900/80 hover:bg-rose-800 text-white font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Primary Navigation Tabs */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-px font-mono text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-3 border-b-2 font-bold uppercase tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Telemetry Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-5 py-3 border-b-2 font-bold uppercase tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'registrations'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Registered Teams ({registrations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('newsletter')}
            className={`px-5 py-3 border-b-2 font-bold uppercase tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'newsletter'
                ? 'border-amber-400 text-amber-300 bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Newsletter Subscribers ({subscribers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bulletins')}
            className={`px-5 py-3 border-b-2 font-bold uppercase tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'bulletins'
                ? 'border-emerald-400 text-emerald-300 bg-slate-900/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Broadcast Bulletins ({broadcasts.length})</span>
          </button>
        </div>

        {/* TAB 1: TELEMETRY OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-xs font-mono uppercase block">Registered Teams</span>
                  <span className="font-orbitron font-black text-3xl text-cyan-400 mt-1 block">
                    {stats?.totalTeams ?? '—'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 mt-0.5 block">Official Tournament Entries</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-xs font-mono uppercase block">Athletes / Competitors</span>
                  <span className="font-orbitron font-black text-3xl text-emerald-400 mt-1 block">
                    {stats?.totalAthletes ?? '—'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 mt-0.5 block">Calculated Squad Size</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-xs font-mono uppercase block">Active Subscribers</span>
                  <span className="font-orbitron font-black text-3xl text-amber-400 mt-1 block">
                    {stats?.activeSubscribers ?? '—'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 mt-0.5 block">Official Bulletin Audience</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Mail className="w-6 h-6" />
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-xs font-mono uppercase block">Dispatched Bulletins</span>
                  <span className="font-orbitron font-black text-3xl text-purple-400 mt-1 block">
                    {stats?.totalBroadcasts ?? '—'}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 mt-0.5 block">Venue & Rule Announcements</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Send className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Disciplines & Regional Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Sport Disciplines Breakdown (7 cols) */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h3 className="font-orbitron font-bold text-sm text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Entries per RobotSports Discipline</span>
                </h3>

                <div className="space-y-3 pt-2">
                  {SPORTS_DATA.map(sport => {
                    const found = stats?.sportBreakdown?.find(s => s.sport_id === sport.id);
                    const count = found ? found.count : 0;
                    const maxCount = Math.max(1, ...(stats?.sportBreakdown?.map(s => s.count) || [1]));
                    const percentage = Math.round((count / maxCount) * 100);

                    return (
                      <div key={sport.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-300 font-bold">{sport.name} ({sport.code})</span>
                          <span className="text-cyan-400 font-bold">{count} teams</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className="h-full bg-cyan-400 transition-all duration-500" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Regional Ghanaian Distribution (5 cols) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h3 className="font-orbitron font-bold text-sm text-amber-300 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Ghana Regional Reach</span>
                </h3>

                <div className="space-y-2 pt-2 max-h-[340px] overflow-y-auto pr-1">
                  {stats?.regionBreakdown && stats.regionBreakdown.length > 0 ? (
                    stats.regionBreakdown.map(r => (
                      <div key={r.city_region} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs font-mono">
                        <span className="text-slate-200">{r.city_region} Region</span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                          {r.count} {r.count === 1 ? 'Team' : 'Teams'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-xs font-mono">No regional telemetry yet.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Scrutineering Status Distribution */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Scrutineering & Rule Zero Verification Pipeline</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                  <span className="text-slate-400 text-[11px] font-mono block">Pending Review</span>
                  <span className="font-orbitron text-2xl font-bold text-slate-200 mt-1 block">
                    {stats?.statusBreakdown?.pending || 0}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-center">
                  <span className="text-cyan-300 text-[11px] font-mono block">Approved</span>
                  <span className="font-orbitron text-2xl font-bold text-cyan-400 mt-1 block">
                    {stats?.statusBreakdown?.approved || 0}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
                  <span className="text-emerald-300 text-[11px] font-mono block">Scrutineering Passed</span>
                  <span className="font-orbitron text-2xl font-bold text-emerald-400 mt-1 block">
                    {stats?.statusBreakdown?.scrutineering_passed || 0}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-center">
                  <span className="text-amber-300 text-[11px] font-mono block">Waitlisted</span>
                  <span className="font-orbitron text-2xl font-bold text-amber-400 mt-1 block">
                    {stats?.statusBreakdown?.waitlisted || 0}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-center">
                  <span className="text-rose-300 text-[11px] font-mono block">Rejected / Ineligible</span>
                  <span className="font-orbitron text-2xl font-bold text-rose-400 mt-1 block">
                    {stats?.statusBreakdown?.rejected || 0}
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: REGISTRATIONS MANAGEMENT */}
        {activeTab === 'registrations' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Filter Bar */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by team, school/institution, coach, phone, or code (e.g. MRC27-GH)..."
                    value={regSearch}
                    onChange={(e) => setRegSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={regStatusFilter}
                  onChange={(e) => setRegStatusFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="scrutineering_passed">Scrutineering Passed</option>
                  <option value="waitlisted">Waitlisted</option>
                  <option value="rejected">Rejected</option>
                </select>

                {/* Sport Filter */}
                <select
                  value={regSportFilter}
                  onChange={(e) => setRegSportFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  <option value="all">All Disciplines</option>
                  {SPORTS_DATA.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>

                {/* Division Filter */}
                <select
                  value={regDivisionFilter}
                  onChange={(e) => setRegDivisionFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  <option value="all">All Divisions</option>
                  <option value="junior">Junior (10-14)</option>
                  <option value="senior">Senior (15-18)</option>
                  <option value="open">University / Open</option>
                </select>

                {/* Region Filter */}
                <select
                  value={regRegionFilter}
                  onChange={(e) => setRegRegionFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  <option value="all">All 16 Regions</option>
                  {ghanaRegions.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Registrations Table */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Code</th>
                      <th className="py-3 px-4">Team & Institution</th>
                      <th className="py-3 px-4">Division & Size</th>
                      <th className="py-3 px-4">Lead Contact</th>
                      <th className="py-3 px-4">Region</th>
                      <th className="py-3 px-4">Selected Disciplines</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {registrations.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-500 font-mono text-xs">
                          No team registrations match the selected filters.
                        </td>
                      </tr>
                    ) : (
                      registrations.map(row => (
                        <tr key={row.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-cyan-300">
                            {row.registration_code}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-100">{row.team_name}</div>
                            <div className="text-[11px] text-slate-400">{row.organization_name} ({row.organization_type})</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="capitalize px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                              {row.division}
                            </span>
                            <span className="text-slate-500 block text-[10px] mt-0.5">{row.team_size} Athletes</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-slate-200">{row.lead_contact_name}</div>
                            <div className="text-slate-400 text-[10px]">{row.lead_contact_email}</div>
                            <div className="text-cyan-400 text-[10px]">{row.lead_contact_phone}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300">
                            {row.city_region}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1 max-w-[180px]">
                              {row.sports && row.sports.map(s => (
                                <span key={s} className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-cyan-300 text-[10px] uppercase">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            {getStatusBadge(row.status)}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedReg(row);
                                  setInspectionNotes(row.scrutineering_notes || '');
                                }}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
                                title="Inspect Team Dossier"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteRegistration(row.id, row.team_name)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 border border-slate-700 hover:border-rose-500/40"
                                title="Archive / Delete Team"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NEWSLETTER SUBSCRIBERS */}
        {activeTab === 'newsletter' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search subscriber emails..."
                  value={subSearch}
                  onChange={(e) => setSubSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <select
                value={subStatusFilter}
                onChange={(e) => setSubStatusFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Subscribers</option>
                <option value="active">Active Only</option>
                <option value="unsubscribed">Unsubscribed</option>
              </select>

              <a
                href={getNewsletterCsvUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Download CSV</span>
              </a>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Subscriber Email</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Acquisition Source</th>
                    <th className="py-3 px-4">Subscribed Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {subscribers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 font-mono text-xs">
                        No newsletter subscribers found.
                      </td>
                    </tr>
                  ) : (
                    subscribers.map(sub => (
                      <tr key={sub.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-4 text-slate-500">#{sub.id}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-200">{sub.email}</td>
                        <td className="py-3.5 px-4">
                          {sub.status === 'active' ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-bold uppercase">
                              Unsubscribed
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">
                          {sub.source.replace('_', ' ')}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">
                          {sub.created_at}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDeleteSubscriber(sub.id, sub.email)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 border border-slate-700 hover:border-rose-500/40"
                            title="Remove Subscriber"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: BROADCAST BULLETINS */}
        {activeTab === 'bulletins' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
            {/* Compose Bulletin (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="font-orbitron font-bold text-base text-white uppercase tracking-wider flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-400" />
                <span>Compose Tournament Bulletin</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Dispatches an official bulletin notification across registered team coaches and active tournament subscribers.
              </p>

              {broadcastSuccessMessage && (
                <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{broadcastSuccessMessage}</span>
                </div>
              )}

              <form onSubmit={handleSendBroadcast} className="space-y-3.5 pt-2">
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Bulletin Header / Internal Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Accra National Stadium Pitch Netting Standard"
                    value={broadcastTitle}
                    onChange={(e) => setBroadcastTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Email Subject Line
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="[MRC27 OFFICIAL BULLETIN] Scrutineering Protocols Updated"
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                      Category Tag
                    </label>
                    <select
                      value={broadcastCategory}
                      onChange={(e) => setBroadcastCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-400"
                    >
                      <option value="general">General Tournament</option>
                      <option value="venue">Accra Venue Drop</option>
                      <option value="scrutineering">Rule Zero & Inspection</option>
                      <option value="schedule">Qualifiers Schedule</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                      Target Audience
                    </label>
                    <select
                      value={broadcastAudience}
                      onChange={(e) => setBroadcastAudience(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-400"
                    >
                      <option value="all">All ({subscribers.length + registrations.length} recipients)</option>
                      <option value="newsletter_only">Subscribers Only ({subscribers.length})</option>
                      <option value="team_mentors">Registered Mentors ({registrations.length})</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Bulletin Message Content
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Detail the official technical advisory, inspection pit times, or venue layout details..."
                    value={broadcastContent}
                    onChange={(e) => setBroadcastContent(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSendingBroadcast}
                  className="w-full py-3 rounded-lg bg-emerald-400 hover:bg-emerald-300 disabled:bg-emerald-600 text-slate-950 font-orbitron font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSendingBroadcast ? 'Dispatching...' : 'Dispatch Official Bulletin'}</span>
                </button>
              </form>
            </div>

            {/* Dispatched History (7 cols) */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="font-orbitron font-bold text-base text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Dispatched Bulletins Audit Log</span>
              </h3>

              <div className="space-y-3 pt-2">
                {broadcasts.length === 0 ? (
                  <p className="text-slate-500 font-mono text-xs py-8 text-center">No bulletins recorded in the log.</p>
                ) : (
                  broadcasts.map(b => (
                    <div key={b.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-mono font-bold uppercase border border-cyan-500/30">
                          {b.category}
                        </span>
                        <span className="text-slate-400 text-[11px] font-mono">{b.created_at}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-100">{b.title}</h4>
                      <p className="text-slate-400 text-xs font-mono">{b.content}</p>
                      <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/60">
                        <span>Subject: <strong className="text-slate-300">{b.subject}</strong></span>
                        <span className="text-emerald-400 font-bold">Dispatched to {b.sent_count} recipients</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* TEAM SCRUTINEERING & DOSSIER MODAL */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-cyan-400">{selectedReg.registration_code}</span>
                  {getStatusBadge(selectedReg.status)}
                </div>
                <h3 className="font-orbitron font-bold text-xl text-white">
                  {selectedReg.team_name}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {selectedReg.organization_name} • {selectedReg.city_region} Region
                </p>
              </div>

              <button
                onClick={() => setSelectedReg(null)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Squad & Contact Details */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] block">AGE DIVISION</span>
                  <span className="text-slate-200 capitalize font-bold">{selectedReg.division}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">SQUAD SIZE</span>
                  <span className="text-slate-200 font-bold">{selectedReg.team_size} Athletes</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">LEAD CONTACT</span>
                  <span className="text-slate-200 font-bold">{selectedReg.lead_contact_name} ({selectedReg.lead_contact_role})</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">EXPERIENCE LEVEL</span>
                  <span className="text-slate-200 capitalize font-bold">{selectedReg.experience_level}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">EMAIL</span>
                  <a href={`mailto:${selectedReg.lead_contact_email}`} className="text-cyan-400 hover:underline">
                    {selectedReg.lead_contact_email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">TELEPHONE</span>
                  <a href={`tel:${selectedReg.lead_contact_phone}`} className="text-emerald-400 hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{selectedReg.lead_contact_phone}</span>
                  </a>
                </div>
              </div>

              {/* Selected RobotSports Disciplines */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                  Registered Challenges ({selectedReg.sports?.length || 0})
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedReg.sports?.map(sportId => {
                    const sport = SPORTS_DATA.find(s => s.id === sportId);
                    return (
                      <div key={sportId} className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-cyan-300 text-xs font-mono">
                        <strong>{sport?.code || sportId}</strong>: {sport?.name || sportId}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Scrutineering Inspection Remarks */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Rule Zero Scrutineering Inspection Remarks</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Chief Inspector Name"
                    value={inspectorName}
                    onChange={(e) => setInspectorName(e.target.value)}
                    className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 focus:outline-none focus:border-amber-400 max-w-[200px]"
                  />
                </div>
                <textarea
                  rows={3}
                  value={inspectionNotes}
                  onChange={(e) => setInspectionNotes(e.target.value)}
                  placeholder="Record physical inspection observations (chassis dimensions, LiPo containment, kill-switch wiring, safety ratings)..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              {/* Quick Status Action Controls */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase text-slate-400 block font-bold">
                  Update Official Status
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    disabled={statusUpdating}
                    onClick={() => handleUpdateStatus(selectedReg.id, 'approved')}
                    className="px-3 py-2 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold transition-colors"
                  >
                    Approve Entry
                  </button>
                  <button
                    disabled={statusUpdating}
                    onClick={() => handleUpdateStatus(selectedReg.id, 'scrutineering_passed')}
                    className="px-3 py-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold transition-colors"
                  >
                    Pass Scrutineer
                  </button>
                  <button
                    disabled={statusUpdating}
                    onClick={() => handleUpdateStatus(selectedReg.id, 'waitlisted')}
                    className="px-3 py-2 rounded-lg bg-amber-950 hover:bg-amber-900 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold transition-colors"
                  >
                    Waitlist
                  </button>
                  <button
                    disabled={statusUpdating}
                    onClick={() => handleUpdateStatus(selectedReg.id, 'rejected')}
                    className="px-3 py-2 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-mono text-xs font-bold transition-colors"
                  >
                    Reject Entry
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                Registered: {selectedReg.created_at}
              </span>
              <button
                onClick={() => setSelectedReg(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs"
              >
                Close Dossier
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
