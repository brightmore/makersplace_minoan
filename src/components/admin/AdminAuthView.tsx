import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Key, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ExternalLink 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const AdminAuthView: React.FC = () => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('scrutineer');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFillDemo = () => {
    setEmail('admin@makersplacegh.com');
    setPassword('AdminMakers2027!');
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register({ email, name, password, role });
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 flex flex-col items-center justify-center p-4 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Subtle high-tech cyber background grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00f0ff 1px, transparent 1px),
            linear-gradient(to bottom, #00f0ff 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-md">

        {/* Top Header Card */}
        <div className="text-center mb-6 space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 border border-cyan-400/50 p-2.5 shadow-[0_0_25px_rgba(0,240,255,0.3)]">
            <img 
              src="/images/makersplace_icon_hires.png" 
              alt="The MakersPlace" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" 
            />
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-amber-400 font-bold uppercase block">
              The MakersPlace Ghana • Official SCADA System
            </span>
            <h1 className="font-orbitron font-black text-2xl text-white tracking-wide mt-1">
              ORGANIZER COMMAND VAULT
            </h1>
            <p className="text-slate-400 text-xs font-mono mt-1">
              MINOAN RobotSports Ghana 2027 Technical Scrutineering
            </p>
          </div>
        </div>

        {/* Auth Main Card */}
        <div className="rounded-2xl bg-slate-900/90 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage(null);
              }}
              className={`py-2 rounded-lg font-bold transition-colors ${
                mode === 'login'
                  ? 'bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMessage(null);
              }}
              className={`py-2 rounded-lg font-bold transition-colors ${
                mode === 'register'
                  ? 'bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Register Staff
            </button>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-lg bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-mono flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'register' && (
              <>
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Staff Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Staff Official Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="scrutineer">Hardware Scrutineer & Inspector</option>
                    <option value="lead_referee">Lead Field Referee</option>
                    <option value="coordinator">Tournament Operations Coordinator</option>
                    <option value="superadmin">Tournament Director / Admin</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                Official Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@makersplacegh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 disabled:bg-cyan-600 text-slate-950 font-orbitron font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Verifying Credentials...</span>
                </>
              ) : mode === 'login' ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Enter Console</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Create Staff Account</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Helper Pill */}
          {mode === 'login' && (
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Default Admin Account:</span>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-cyan-400 hover:text-cyan-300 underline font-bold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Fill Demo Credentials</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Back to Public Site Link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <span>Return to Public Tournament Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
};
