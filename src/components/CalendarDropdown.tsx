import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Download, ExternalLink, Check, ChevronDown } from 'lucide-react';

export const CalendarDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const eventDetails = {
    title: 'MINOAN ROBOTSPORTS GHANA 2027 (MRC GHANA 2027)',
    description: "Ghana's Official National RobotSports Championship presented by The MakersPlace. 7 Technical challenges, 3 divisions, 1 global pathway to World Finals. Website: https://minoanrobotsports.org.gh",
    location: 'Accra, Ghana (Venue announcement to follow)',
    startDate: '20270130T080000Z',
    endDate: '20270130T190000Z',
  };

  const getGoogleCalendarUrl = () => {
    const base = 'https://calendar.google.com/calendar/render';
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventDetails.title,
      dates: `${eventDetails.startDate}/${eventDetails.endDate}`,
      details: eventDetails.description,
      location: eventDetails.location,
    });
    return `${base}?${params.toString()}`;
  };

  const getOutlookCalendarUrl = () => {
    const base = 'https://outlook.live.com/calendar/0/deeplink/compose';
    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: eventDetails.title,
      startdt: '2027-01-30T08:00:00Z',
      enddt: '2027-01-30T19:00:00Z',
      body: eventDetails.description,
      location: eventDetails.location,
    });
    return `${base}?${params.toString()}`;
  };

  const downloadIcsFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//The MakersPlace//Minoan RobotSports Ghana 2027//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:mrc-ghana-2027@makersplacegh.com',
      'DTSTAMP:20260101T000000Z',
      `DTSTART:${eventDetails.startDate}`,
      `DTEND:${eventDetails.endDate}`,
      `SUMMARY:${eventDetails.title}`,
      `DESCRIPTION:${eventDetails.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${eventDetails.location}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'BEGIN:VALARM',
      'TRIGGER:-P7D',
      'DESCRIPTION:Reminder: Minoan RobotSports Ghana 2027 in 7 days!',
      'ACTION:DISPLAY',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'MRC-GHANA-2027-January-30.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  const copyEventDate = () => {
    navigator.clipboard.writeText('Saturday, January 30, 2027 — Accra, Ghana (Minoan RobotSports Ghana 2027)');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 text-xs font-mono font-medium tracking-wide uppercase text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/60 rounded-md transition-all duration-200 hover:text-cyan-300"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
        <span className="hidden sm:inline">Add to Calendar</span>
        <span className="sm:hidden">Calendar</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-lg bg-slate-950/95 border border-cyan-500/30 p-2 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
            <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">Tournament Date</p>
            <p className="text-xs font-semibold text-slate-200 mt-0.5">January 30, 2027</p>
            <p className="text-[11px] text-slate-400">Accra, Ghana</p>
          </div>

          <div className="space-y-1">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-xs rounded-md text-slate-200 hover:text-cyan-300 hover:bg-slate-800/80 transition-colors group"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:shadow-[0_0_8px_#00f0ff]" />
                Google Calendar
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300" />
            </a>

            <a
              href={getOutlookCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-xs rounded-md text-slate-200 hover:text-amber-300 hover:bg-slate-800/80 transition-colors group"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:shadow-[0_0_8px_#f59e0b]" />
                Outlook / Office 365
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300" />
            </a>

            <button
              onClick={downloadIcsFile}
              className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-md text-slate-200 hover:text-emerald-300 hover:bg-slate-800/80 transition-colors group text-left"
            >
              <span className="flex items-center gap-2">
                <Download className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-300" />
                Apple / iCal (.ics file)
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">.ICS</span>
            </button>

            <button
              onClick={copyEventDate}
              className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-md text-slate-300 hover:text-slate-100 hover:bg-slate-850 transition-colors text-left border-t border-slate-800/60 pt-2 mt-1"
            >
              <span className="flex items-center gap-2">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Calendar className="w-3.5 h-3.5 text-slate-400" />}
                {copied ? 'Copied to Clipboard!' : 'Copy Event Summary'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
