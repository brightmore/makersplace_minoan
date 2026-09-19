/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#070a12',
          surface: '#0d1322',
          card: 'rgba(13, 19, 34, 0.75)',
          cyan: '#00f0ff',
          'cyan-glow': 'rgba(0, 240, 255, 0.35)',
          amber: '#f59e0b',
          'amber-glow': 'rgba(245, 158, 11, 0.35)',
          emerald: '#10b981',
          'emerald-glow': 'rgba(16, 185, 129, 0.35)',
          magenta: '#ec4899',
          border: 'rgba(51, 65, 85, 0.7)',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'Rajdhani', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['JetBrains Mono', 'Share Tech Mono', 'monospace'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px -3px rgba(0, 240, 255, 0.45)',
        'neon-cyan-lg': '0 0 35px -5px rgba(0, 240, 255, 0.6)',
        'neon-amber': '0 0 20px -3px rgba(245, 158, 11, 0.45)',
        'neon-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.45)',
        'hud-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'ticker': 'ticker 35s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.8))' },
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.05) 1px, transparent 1px)',
        'cyber-dots': 'radial-gradient(rgba(0, 240, 255, 0.15) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
