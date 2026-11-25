import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Video,
  Users,
  UserCheck,
  Calendar,
  ClipboardCheck,
  IndianRupee,
  Plus,
  Search,
  Mic,
  MicOff,
  VideoOff,
  MonitorUp,
  Hand,
  PhoneOff,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  Send,
  Award,
  TrendingUp,
  ChevronRight,
  X,
  Check,
  Menu,
  Play,
  Calculator,
  LogOut,
  ShieldCheck,
  ExternalLink,
  RefreshCw,
  Lock
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Safely initialize Supabase inline (works both in Vite with .env vars and in single-file Preview)
const getEnvVar = (key) => {
  try {
    return (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) || '';
  } catch (_err) {
    return '';
  }
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// --- INITIAL FALLBACK DEMO DATA ---
const INITIAL_STAFF = [
  {
    id: 'st-1',
    name: 'Ranjitha Ganesh',
    role: 'Founder & Lead Master Trainer',
    specialties: ['Level 1–8', 'Grandmaster Anzan', 'Trainer Certification'],
    email: 'ranjitha@evolvekids.in',
    phone: '+91 98401 22310',
    activeBatches: 4,
    classesThisWeek: 12,
    sharePercent: 100,
    status: 'In Live Class',
    avatarColor: 'bg-indigo-600'
  },
  {
    id: 'st-2',
    name: 'Priya Subramanian',
    role: 'Senior Abacus Trainer',
    specialties: ['Level 1–5', 'Junior Foundation'],
    email: 'priya.s@evolvekids.in',
    phone: '+91 98402 44891',
    activeBatches: 3,
    classesThisWeek: 8,
    sharePercent: 50,
    status: 'Available',
    avatarColor: 'bg-teal-600'
  },
  {
    id: 'st-3',
    name: 'Karthik Narayanan',
    role: 'Abacus & Speed Math Trainer',
    specialties: ['Level 3–7', 'Competition Prep'],
    email: 'karthik.n@evolvekids.in',
    phone: '+91 98403 77120',
    activeBatches: 3,
    classesThisWeek: 6,
    sharePercent: 50,
    status: 'Upcoming Class',
    avatarColor: 'bg-violet-600'
  },
  {
    id: 'st-4',
    name: 'Meera Krishnan',
    role: 'Junior Abacus & Phonics Trainer',
    specialties: ['Level 1–3', 'Little Champs (5–7 yrs)'],
    email: 'meera.k@evolvekids.in',
    phone: '+91 98404 99012',
    activeBatches: 2,
    classesThisWeek: 4,
    sharePercent: 50,
    status: 'Available',
    avatarColor: 'bg-amber-600'
  }
];

const INITIAL_STUDENTS = [
  {
    id: 'stu-101',
    userId: null,
    name: 'Aarav Sharma',
    age: 8,
    level: 'Level 3',
    trainerId: 'st-1',
    batchId: 'b-1',
    sessionsCompleted: 6,
    totalCycleSessions: 8,
    attendanceRate: 96,
    monthlyFee: 1800,
    feeStatus: 'Paid',
    paymentMode: 'UPI',
    lastPaidDate: '04 Nov 2026',
    parentPhone: '+91 98841 10021'
  },
  {
    id: 'stu-102',
    userId: null,
    name: 'Diya Nair',
    age: 9,
    level: 'Level 4',
    trainerId: 'st-1',
    batchId: 'b-1',
    sessionsCompleted: 8,
    totalCycleSessions: 8,
    attendanceRate: 100,
    monthlyFee: 2000,
    feeStatus: 'Due Soon',
    paymentMode: 'Pending',
    lastPaidDate: '26 Oct 2026',
    parentPhone: '+91 98841 10022'
  },
  {
    id: 'stu-103',
    userId: null,
    name: 'Rohan Verma',
    age: 7,
    level: 'Level 1',
    trainerId: 'st-2',
    batchId: 'b-2',
    sessionsCompleted: 5,
    totalCycleSessions: 8,
    attendanceRate: 88,
    monthlyFee: 1500,
    feeStatus: 'Paid',
    paymentMode: 'Bank Transfer',
    lastPaidDate: '08 Nov 2026',
    parentPhone: '+91 98841 10023'
  },
  {
    id: 'stu-104',
    userId: null,
    name: 'Ananya Iyer',
    age: 11,
    level: 'Level 6',
    trainerId: 'st-3',
    batchId: 'b-3',
    sessionsCompleted: 7,
    totalCycleSessions: 8,
    attendanceRate: 94,
    monthlyFee: 2200,
    feeStatus: 'Paid',
    paymentMode: 'UPI',
    lastPaidDate: '02 Nov 2026',
    parentPhone: '+91 98841 10024'
  },
  {
    id: 'stu-105',
    userId: null,
    name: 'Kabir Menon',
    age: 6,
    level: 'Level 1',
    trainerId: 'st-4',
    batchId: 'b-4',
    sessionsCompleted: 8,
    totalCycleSessions: 8,
    attendanceRate: 92,
    monthlyFee: 1500,
    feeStatus: 'Overdue',
    paymentMode: 'Pending',
    lastPaidDate: '19 Oct 2026',
    parentPhone: '+91 98841 10025'
  },
  {
    id: 'stu-106',
    userId: null,
    name: 'Saanvi Reddy',
    age: 10,
    level: 'Level 5',
    trainerId: 'st-2',
    batchId: 'b-2',
    sessionsCompleted: 4,
    totalCycleSessions: 8,
    attendanceRate: 100,
    monthlyFee: 2000,
    feeStatus: 'Paid',
    paymentMode: 'Card',
    lastPaidDate: '11 Nov 2026',
    parentPhone: '+91 98841 10026'
  },
  {
    id: 'stu-107',
    userId: null,
    name: 'Vihaan Gupta',
    age: 12,
    level: 'Level 8 (Grandmaster)',
    trainerId: 'st-1',
    batchId: 'b-1',
    sessionsCompleted: 7,
    totalCycleSessions: 8,
    attendanceRate: 98,
    monthlyFee: 2500,
    feeStatus: 'Paid',
    paymentMode: 'UPI',
    lastPaidDate: '05 Nov 2026',
    parentPhone: '+91 98841 10027'
  },
  {
    id: 'stu-108',
    userId: null,
    name: 'Myra Joshi',
    age: 8,
    level: 'Level 2',
    trainerId: 'st-3',
    batchId: 'b-3',
    sessionsCompleted: 8,
    totalCycleSessions: 8,
    attendanceRate: 85,
    monthlyFee: 1600,
    feeStatus: 'Due Soon',
    paymentMode: 'Pending',
    lastPaidDate: '27 Oct 2026',
    parentPhone: '+91 98841 10028'
  }
];

const INITIAL_BATCHES = [
  {
    id: 'b-1',
    name: 'Alpha Champions (Level 3–8)',
    days: 'Tue & Thu',
    time: '05:00 PM – 05:50 PM',
    level: 'Level 3–8',
    trainerId: 'st-1',
    status: 'Live Now',
    roomCode: 'EvolveKids-Alpha-101'
  },
  {
    id: 'b-2',
    name: 'Junior Sparks (Level 1–2)',
    days: 'Tue & Thu',
    time: '06:00 PM – 06:50 PM',
    level: 'Level 1–2',
    trainerId: 'st-2',
    status: 'Starting in 45m',
    roomCode: 'EvolveKids-Spark-202'
  },
  {
    id: 'b-3',
    name: 'Speed Anzan Masters (Level 5–7)',
    days: 'Wed & Fri',
    time: '05:30 PM – 06:20 PM',
    level: 'Level 5–7',
    trainerId: 'st-3',
    status: 'Scheduled',
    roomCode: 'EvolveKids-Anzan-303'
  },
  {
    id: 'b-4',
    name: 'Little Beads Foundation (Level 1)',
    days: 'Sat & Sun',
    time: '10:30 AM – 11:20 AM',
    level: 'Level 1',
    trainerId: 'st-4',
    status: 'Scheduled',
    roomCode: 'EvolveKids-Beads-404'
  }
];

// --- INTERACTIVE 11-ROD JAPANESE SOROBAN ABACUS COMPONENT ---
function InteractiveSoroban() {
  const ROD_COUNT = 11;
  const [heavenBeads, setHeavenBeads] = useState(Array(ROD_COUNT).fill(false));
  const [earthBeads, setEarthBeads] = useState(Array(ROD_COUNT).fill(0));
  const [showPlaceValues, setShowPlaceValues] = useState(true);

  const toggleHeaven = (rodIdx) => {
    setHeavenBeads((prev) => {
      const next = [...prev];
      next[rodIdx] = !next[rodIdx];
      return next;
    });
  };

  const setEarthCount = (rodIdx, beadIndex) => {
    setEarthBeads((prev) => {
      const next = [...prev];
      const current = prev[rodIdx];
      next[rodIdx] = beadIndex < current ? beadIndex : beadIndex + 1;
      return next;
    });
  };

  const resetAbacus = () => {
    setHeavenBeads(Array(ROD_COUNT).fill(false));
    setEarthBeads(Array(ROD_COUNT).fill(0));
  };

  const totalValue = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < ROD_COUNT; i++) {
      const digit = (heavenBeads[i] ? 5 : 0) + earthBeads[i];
      const power = ROD_COUNT - 1 - i;
      sum += digit * Math.pow(10, power);
    }
    return sum;
  }, [heavenBeads, earthBeads]);

  const placeLabels = ['10B', '1B', '100M', '10M', '1M', '100K', '10K', '1K', '100', '10', '1'];

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-4 shadow-xl text-white">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wide text-amber-300 flex items-center gap-2">
              LIVE DIGITAL SOROBAN (11-ROD)
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Interactive Abacus
              </span>
            </h3>
            <p className="text-xs text-slate-400">Click upper (5) or lower (1) beads to demonstrate live</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 border border-slate-700 px-4 py-1.5 rounded-xl flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Readout</span>
            <span className="font-mono text-xl font-extrabold text-amber-400 tracking-wider">
              {totalValue.toLocaleString('en-IN')}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowPlaceValues(!showPlaceValues)}
            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
          >
            {showPlaceValues ? 'Hide Units' : 'Show Units'}
          </button>
          <button
            type="button"
            onClick={resetAbacus}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear (0)
          </button>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950 border-4 border-amber-700/80 rounded-xl p-3 overflow-x-auto select-none shadow-inner">
        <div className="min-w-[540px] flex justify-between items-stretch relative">
          {Array.from({ length: ROD_COUNT }).map((_, rodIdx) => {
            const isHeavenActive = heavenBeads[rodIdx];
            const activeEarth = earthBeads[rodIdx];
            const rodDigit = (isHeavenActive ? 5 : 0) + activeEarth;
            const hasUnitDot = (ROD_COUNT - 1 - rodIdx) % 3 === 0;

            return (
              <div key={rodIdx} className="flex-1 flex flex-col items-center relative group">
                <div className="text-xs font-mono font-bold text-amber-300/90 mb-1 h-4">
                  {rodDigit}
                </div>

                <div className="relative w-full h-14 flex flex-col items-center justify-start pt-1">
                  <div className="absolute inset-y-0 w-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 rounded-full z-0" />
                  <button
                    type="button"
                    onClick={() => toggleHeaven(rodIdx)}
                    aria-label={`Rod ${rodIdx + 1} Heaven Bead`}
                    className={`relative z-10 w-9 h-5 rounded-full transition-all duration-150 shadow-md border cursor-pointer ${
                      isHeavenActive
                        ? 'translate-y-6 bg-gradient-to-b from-amber-400 to-amber-600 border-amber-200 ring-2 ring-amber-300/40'
                        : 'translate-y-0 bg-gradient-to-b from-amber-600 to-amber-800 border-amber-500/60 hover:brightness-110'
                    }`}
                  />
                </div>

                <div className="w-full h-2.5 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 border-y border-amber-950 z-20 flex items-center justify-center">
                  {hasUnitDot && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
                </div>

                <div className="relative w-full h-28 flex flex-col items-center justify-end pb-1 gap-1">
                  <div className="absolute inset-y-0 w-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 rounded-full z-0" />
                  {[0, 1, 2, 3].map((beadIdx) => {
                    const isRaised = beadIdx < activeEarth;
                    return (
                      <button
                        key={beadIdx}
                        type="button"
                        onClick={() => setEarthCount(rodIdx, beadIdx)}
                        aria-label={`Rod ${rodIdx + 1} Earth Bead ${beadIdx + 1}`}
                        className={`relative z-10 w-9 h-5 rounded-full transition-all duration-150 shadow-md border cursor-pointer ${
                          isRaised
                            ? '-translate-y-4 bg-gradient-to-b from-teal-400 to-teal-600 border-teal-200 ring-2 ring-teal-300/30'
                            : 'translate-y-0 bg-gradient-to-b from-amber-600 to-amber-800 border-amber-500/60 hover:brightness-110'
                        }`}
                      />
                    );
                  })}
                </div>

                {showPlaceValues && (
                  <div className="text-[10px] font-mono text-amber-200/70 mt-1">
                    {placeLabels[rodIdx]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- MENTAL MATH ANZAN FLASHCARD WIDGET ---
function MentalMathFlashcard() {
  const [level, setLevel] = useState('Junior (1-Digit)');
  const [numbers, setNumbers] = useState([4, 3, -2, 5]);
  const [showAnswer, setShowAnswer] = useState(false);

  const generateSequence = () => {
    setShowAnswer(false);
    const count = level.includes('Grandmaster') ? 6 : level.includes('Intermediate') ? 5 : 4;
    const max = level.includes('Grandmaster') ? 99 : level.includes('Intermediate') ? 25 : 9;
    const seq = [];
    let running = 0;
    for (let i = 0; i < count; i++) {
      let n = Math.floor(Math.random() * max) + 1;
      if (i > 0 && running - n >= 0 && Math.random() > 0.45) {
        n = -n;
      }
      running += n;
      seq.push(n);
    }
    setNumbers(seq);
  };

  const sum = numbers.reduce((acc, v) => acc + v, 0);

  return (
    <div className="bg-indigo-950/90 border border-indigo-700/60 rounded-2xl p-4 text-white">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-200">
            Anzan Speed Drill
          </h4>
        </div>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="bg-indigo-900 border border-indigo-700 text-xs rounded-lg px-2 py-1 text-indigo-100 outline-none"
        >
          <option>Junior (1-Digit)</option>
          <option>Intermediate (2-Digit)</option>
          <option>Grandmaster (Fast)</option>
        </select>
      </div>

      <div className="flex items-center justify-center gap-2 bg-slate-950/80 border border-indigo-800/60 rounded-xl py-3 px-2 mb-3 flex-wrap">
        {numbers.map((num, idx) => (
          <span
            key={idx}
            className={`font-mono text-lg font-extrabold px-2.5 py-1 rounded-lg ${
              num < 0
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/30'
            }`}
          >
            {num > 0 && idx > 0 ? `+${num}` : num}
          </span>
        ))}
        <span className="text-slate-400 font-bold">=</span>
        <span className="font-mono text-xl font-black px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          {showAnswer ? sum : '?'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={generateSequence}
          className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold transition cursor-pointer"
        >
          New Drill
        </button>
        <button
          type="button"
          onClick={() => setShowAnswer(!showAnswer)}
          className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold transition cursor-pointer"
        >
          {showAnswer ? 'Hide Answer' : 'Reveal Answer'}
        </button>
      </div>
    </div>
  );
}

// --- EMBEDDED JITSI MEET VIDEO CALL COMPONENT ---
function JitsiVideoRoom({ roomCode, displayName, isJoined, onJoinToggle, onEndClass }) {
  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);
  const [useIframeFallback, setUseIframeFallback] = useState(false);

  const sanitizedRoom = useMemo(() => {
    const clean = (roomCode || 'EvolveKids-Classroom').replace(/[^a-zA-Z0-9_-]/g, '');
    return clean || 'EvolveKids-Classroom';
  }, [roomCode]);

  const jitsiUrl = `https://meet.jit.si/${sanitizedRoom}`;

  useEffect(() => {
    if (!isJoined) {
      if (apiRef.current) {
        try {
          apiRef.current.dispose();
        } catch (_err) {
          // ignore cleanup errors
        }
        apiRef.current = null;
      }
      setUseIframeFallback(false);
      return;
    }

    let cancelled = false;

    const initJitsi = () => {
      if (cancelled || !jitsiContainerRef.current) return;
      if (!window.JitsiMeetExternalAPI) {
        setUseIframeFallback(true);
        return;
      }

      try {
        jitsiContainerRef.current.innerHTML = '';
        const api = new window.JitsiMeetExternalAPI('meet.jit.si', {
          roomName: sanitizedRoom,
          parentNode: jitsiContainerRef.current,
          width: '100%',
          height: 400,
          userInfo: {
            displayName: displayName || 'Evolve Kids Member'
          },
          configOverwrite: {
            prejoinPageEnabled: false,
            startWithAudioMuted: false,
            startWithVideoMuted: false
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false
          }
        });
        apiRef.current = api;
        setUseIframeFallback(false);
      } catch (_err) {
        setUseIframeFallback(true);
      }
    };

    if (window.JitsiMeetExternalAPI) {
      initJitsi();
    } else {
      const existingScript = document.querySelector('script[src="https://meet.jit.si/external_api.js"]');
      if (existingScript) {
        existingScript.addEventListener('load', initJitsi);
        existingScript.addEventListener('error', () => setUseIframeFallback(true));
      } else {
        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js';
        script.async = true;
        script.onload = initJitsi;
        script.onerror = () => setUseIframeFallback(true);
        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      if (apiRef.current) {
        try {
          apiRef.current.dispose();
        } catch (_err) {
          // ignore cleanup errors
        }
        apiRef.current = null;
      }
    };
  }, [isJoined, sanitizedRoom, displayName]);

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Jitsi Meet Live Video Call • Room: <span className="font-mono text-amber-300">{sanitizedRoom}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={jitsiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
          >
            <span>Open in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {!isJoined ? (
            <button
              type="button"
              onClick={onJoinToggle}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              Start / Join Video Call
            </button>
          ) : (
            <button
              type="button"
              onClick={onEndClass}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              Leave Call
            </button>
          )}
        </div>
      </div>

      {!isJoined ? (
        <div className="p-8 text-center flex flex-col items-center justify-center min-h-[260px] bg-gradient-to-b from-slate-900 to-indigo-950/60">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 mb-3">
            <Video className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-white">Ready to Connect Live Video Classroom</h4>
          <p className="text-xs text-slate-400 max-w-md mt-1 mb-4">
            Launches a free Jitsi Meet video room (<span className="font-mono text-slate-300">{sanitizedRoom}</span>) with camera, microphone, and screen sharing so you can teach live while using the Digital Soroban below.
          </p>
          <button
            type="button"
            onClick={onJoinToggle}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            Launch Jitsi Video Call Now
          </button>
        </div>
      ) : useIframeFallback ? (
        <iframe
          title={`Jitsi Classroom ${sanitizedRoom}`}
          src={`${jitsiUrl}#config.prejoinPageEnabled=false&userInfo.displayName="${encodeURIComponent(
            displayName || 'Evolve Kids Member'
          )}"`}
          allow="camera; microphone; fullscreen; display-capture; autoplay"
          className="w-full h-[400px] border-0 bg-slate-950"
        />
      ) : (
        <div ref={jitsiContainerRef} className="w-full min-h-[400px] bg-slate-950" />
      )}
    </div>
  );
}

// --- AUTHENTICATION SCREEN (SUPABASE LOGIN / SIGN UP + DEMO MODE) ---
function AuthGateScreen({ onEnterDemoRole, authError, authLoading, onSignIn, onSignUp }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [localMsg, setLocalMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalMsg('');
    if (mode === 'login') {
      await onSignIn(email, password);
    } else {
      const ok = await onSignUp(email, password, fullName);
      if (ok) {
        setLocalMsg('Account created! You can sign in now or check your email if confirmation is enabled.');
        setMode('login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-teal-950 flex items-center justify-center p-4 text-slate-900">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-teal-400 to-indigo-500 flex items-center justify-center font-black text-slate-950 text-xl shadow">
            EK
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">EVOLVE KIDS</h1>
            <p className="text-xs font-medium text-teal-700">Abacus Academy & Online Classroom Portal</p>
          </div>
        </div>

        <div className="flex rounded-xl bg-slate-100 p-1 mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setLocalMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              mode === 'login' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setLocalMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
              mode === 'signup' ? 'bg-white text-indigo-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Create Account
          </button>
        </div>

        {(authError || localMsg) && (
          <div
            className={`mb-4 p-3 rounded-xl text-xs font-semibold border ${
              authError
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
          >
            {authError || localMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g., Ranjitha Ganesh or Aarav Sharma"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@evolvekids.in"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-bold shadow transition cursor-pointer"
          >
            {authLoading ? 'Connecting...' : mode === 'login' ? 'Sign In to Dashboard' : 'Sign Up'}
          </button>
        </form>

        {/* Instant Preview / Demo Mode Role Switcher */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Preview / Demo Mode (Test Roles Instantly)
            </span>
            <ShieldCheck className="w-4 h-4 text-teal-600" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => onEnterDemoRole('admin')}
              className="py-2 px-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold transition cursor-pointer"
            >
              Admin View
            </button>
            <button
              type="button"
              onClick={() => onEnterDemoRole('staff')}
              className="py-2 px-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition cursor-pointer"
            >
              Staff View
            </button>
            <button
              type="button"
              onClick={() => onEnterDemoRole('student')}
              className="py-2 px-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition cursor-pointer"
            >
              Student View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN APPLICATION ---
export default function App() {
  // Auth & Role State ('admin' | 'staff' | 'student')
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [demoRole, setDemoRole] = useState(null); // null when signed in via Supabase, or 'admin' | 'staff' | 'student' in demo mode
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [profilesList, setProfilesList] = useState([]);

  // Navigation & UI State
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [isUsingLiveDb, setIsUsingLiveDb] = useState(false);

  // Core Academy Data State
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [batches, setBatches] = useState(INITIAL_BATCHES);

  // Classroom & Jitsi State
  const [activeBatchId, setActiveBatchId] = useState('b-1');
  const [jitsiJoined, setJitsiJoined] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [raisedHands, setRaisedHands] = useState({ 'stu-102': true });
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Ranjitha Ganesh (Trainer)', time: '05:02 PM', text: 'Welcome everyone! Keep your Soroban clear and ready.' },
    { id: 2, sender: 'Aarav Sharma', time: '05:03 PM', text: 'Ready Ma’am! My abacus is set to 0.' },
    { id: 3, sender: 'Diya Nair', time: '05:04 PM', text: 'Ma’am, can we do small friends +4 formula next?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Filters & Modals
  const [studentSearch, setStudentSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [trainerFilter, setTrainerFilter] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);

  // Attendance Tab State
  const [attendanceBatchId, setAttendanceBatchId] = useState('b-1');
  const [sessionDate, setSessionDate] = useState('2026-11-24');
  const [todayAttendance, setTodayAttendance] = useState({
    'stu-101': 'Present',
    'stu-102': 'Present',
    'stu-107': 'Late',
    'stu-103': 'Present',
    'stu-106': 'Present',
    'stu-104': 'Present',
    'stu-108': 'Absent',
    'stu-105': 'Present'
  });

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    name: '',
    userId: '',
    age: 8,
    level: 'Level 1',
    trainerId: 'st-2',
    batchId: 'b-2',
    monthlyFee: 1500,
    parentPhone: ''
  });

  // New Staff Form State
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: 'Abacus Trainer',
    specialties: 'Level 1–4, Junior Foundation',
    email: '',
    phone: '',
    sharePercent: 50
  });

  const triggerToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3200);
  };

  // Effective Role ('admin' | 'staff' | 'student')
  const currentRole = useMemo(() => {
    if (profile?.role) return profile.role;
    if (demoRole) return demoRole;
    return 'student';
  }, [profile, demoRole]);

  const currentUserName = useMemo(() => {
    if (profile?.full_name) return profile.full_name;
    if (session?.user?.email) return session.user.email.split('@')[0];
    if (demoRole === 'admin') return 'Ranjitha Ganesh (Demo Admin)';
    if (demoRole === 'staff') return 'Priya Subramanian (Demo Staff)';
    if (demoRole === 'student') return 'Aarav Sharma (Demo Student)';
    return 'Evolve Kids User';
  }, [profile, session, demoRole]);

  // Fetch user profile from public.profiles
  const fetchUserProfile = async (userId, userEmail) => {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, role')
        .eq('id', userId)
        .single();

      if (error || !data) {
        return { id: userId, email: userEmail, full_name: userEmail?.split('@')[0] || 'User', role: 'student' };
      }
      return data;
    } catch (_err) {
      return { id: userId, email: userEmail, full_name: userEmail?.split('@')[0] || 'User', role: 'student' };
    }
  };

  // Load live Supabase tables when authenticated (falls back gracefully to demo arrays)
  const loadAcademyData = async (roleToFetch) => {
    if (!supabase) {
      setIsUsingLiveDb(false);
      return;
    }
    setDataLoading(true);
    try {
      const [batchesRes, studentsRes, profilesRes] = await Promise.all([
        supabase.from('batches').select('*').order('created_at', { ascending: true }),
        supabase.from('students').select('*').order('created_at', { ascending: false }),
        roleToFetch === 'admin' || roleToFetch === 'staff'
          ? supabase.from('profiles').select('id, email, full_name, role').order('created_at', { ascending: true })
          : Promise.resolve({ data: null, error: null })
      ]);

      let liveLoaded = false;

      if (!batchesRes.error && batchesRes.data && batchesRes.data.length > 0) {
        liveLoaded = true;
        setBatches(
          batchesRes.data.map((b, idx) => ({
            id: b.id,
            name: b.name,
            days: b.schedule_days,
            time: b.schedule_time,
            level: b.level,
            trainerId: b.trainer_id || 'st-1',
            status: idx === 0 ? 'Live Now' : 'Scheduled',
            roomCode: b.room_code
          }))
        );
      }

      if (!studentsRes.error && studentsRes.data && studentsRes.data.length > 0) {
        liveLoaded = true;
        setStudents(
          studentsRes.data.map((s) => ({
            id: s.id,
            userId: s.user_id || null,
            name: s.full_name,
            age: 8,
            level: s.abacus_level || 'Level 1',
            trainerId: s.trainer_id || 'st-1',
            batchId: s.batch_id || 'b-1',
            sessionsCompleted: s.sessions_completed ?? 0,
            totalCycleSessions: 8,
            attendanceRate: 95,
            monthlyFee: Number(s.monthly_fee) || 1500,
            feeStatus: s.fee_status || 'Pending',
            paymentMode: 'UPI',
            lastPaidDate: '24 Nov 2026',
            parentPhone: s.parent_phone || '+91 98400 00000'
          }))
        );
      }

      if (!profilesRes.error && profilesRes.data && profilesRes.data.length > 0) {
        setProfilesList(profilesRes.data);
        const staffProfiles = profilesRes.data.filter((p) => p.role === 'staff' || p.role === 'admin');
        if (staffProfiles.length > 0) {
          const palette = ['bg-indigo-600', 'bg-teal-600', 'bg-violet-600', 'bg-amber-600'];
          setStaff(
            staffProfiles.map((sp, i) => ({
              id: sp.id,
              name: sp.full_name || sp.email,
              role: sp.role === 'admin' ? 'Founder & Admin' : 'Abacus Trainer',
              specialties: ['Level 1–6', 'Mental Math'],
              email: sp.email,
              phone: '+91 98400 00000',
              activeBatches: 2,
              classesThisWeek: 6,
              sharePercent: sp.role === 'admin' ? 100 : 50,
              status: 'Available',
              avatarColor: palette[i % palette.length]
            }))
          );
        }
      }

      setIsUsingLiveDb(liveLoaded);
    } catch (_err) {
      setIsUsingLiveDb(false);
    } finally {
      setDataLoading(false);
    }
  };

  // Initialize Supabase Auth listener
  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      if (!supabase) {
        if (mounted) setAuthLoading(false);
        return;
      }
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        const currentSession = data?.session || null;
        setSession(currentSession);

        if (currentSession?.user) {
          const prof = await fetchUserProfile(currentSession.user.id, currentSession.user.email);
          if (mounted) {
            setProfile(prof);
            await loadAcademyData(prof?.role || 'student');
          }
        }
      } catch (_err) {
        // Keep demo gate available if offline or env missing
      } finally {
        if (mounted) setAuthLoading(false);
      }
    };

    initAuth();

    if (!supabase?.auth?.onAuthStateChange) return () => { mounted = false; };

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession);
      if (nextSession?.user) {
        setDemoRole(null);
        const prof = await fetchUserProfile(nextSession.user.id, nextSession.user.email);
        if (mounted) {
          setProfile(prof);
          await loadAcademyData(prof?.role || 'student');
        }
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  // Ensure active tab is valid for current role
  useEffect(() => {
    if (currentRole === 'student' && !['overview', 'classroom', 'payments'].includes(activeTab)) {
      setActiveTab('overview');
    } else if (currentRole === 'staff' && activeTab === 'payments') {
      setActiveTab('overview');
    }
  }, [currentRole, activeTab]);

  // Auth Handlers
  const handleSignIn = async (email, password) => {
    setAuthError('');
    if (!supabase) {
      setAuthError('Supabase is not configured yet. Use a Demo View button below or add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      return;
    }
    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setAuthError(error.message);
      } else if (data?.user) {
        const prof = await fetchUserProfile(data.user.id, data.user.email);
        setProfile(prof);
        await loadAcademyData(prof?.role || 'student');
        triggerToast(`Signed in as ${prof?.role || 'student'}`);
      }
    } catch (err) {
      setAuthError(err.message || 'Unable to sign in');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignUp = async (email, password, fullName) => {
    setAuthError('');
    if (!supabase) {
      setAuthError('Supabase is not configured yet. Use a Demo View button below.');
      return false;
    }
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });
      if (error) {
        setAuthError(error.message);
        return false;
      }
      return true;
    } catch (err) {
      setAuthError(err.message || 'Sign up failed');
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    setJitsiJoined(false);
    if (supabase && session) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setProfile(null);
    setDemoRole(null);
    setActiveTab('overview');
  };

  const handleEnterDemoRole = (role) => {
    setAuthError('');
    setDemoRole(role);
    setActiveTab('overview');
    triggerToast(`Opened ${role.toUpperCase()} preview mode`);
  };

  // Role promotion in public.profiles (Admin only)
  const handleUpdateUserRole = async (userId, nextRole) => {
    if (currentRole !== 'admin') return;
    setProfilesList((prev) => prev.map((p) => (p.id === userId ? { ...p, role: nextRole } : p)));
    if (supabase && session) {
      const { error } = await supabase.from('profiles').update({ role: nextRole }).eq('id', userId);
      if (error) {
        triggerToast(`Role update note: ${error.message}`);
        return;
      }
    }
    triggerToast(`Updated user role to ${nextRole}`);
  };

  // Students visible to current role
  const roleStudents = useMemo(() => {
    if (currentRole === 'student') {
      if (session?.user?.id) {
        const matched = students.filter((s) => s.userId === session.user.id);
        if (matched.length > 0) return matched;
      }
      return [students[0]].filter(Boolean);
    }
    return students;
  }, [currentRole, session, students]);

  // Derived Metrics
  const stats = useMemo(() => {
    const totalStudents = roleStudents.length;
    const activeTrainers = staff.length;
    const collectedRevenue = roleStudents
      .filter((s) => s.feeStatus === 'Paid')
      .reduce((acc, s) => acc + s.monthlyFee, 0);
    const pendingRevenue = roleStudents
      .filter((s) => s.feeStatus !== 'Paid')
      .reduce((acc, s) => acc + s.monthlyFee, 0);
    const avgAttendance = Math.round(
      roleStudents.reduce((acc, s) => acc + s.attendanceRate, 0) / (roleStudents.length || 1)
    );
    return { totalStudents, activeTrainers, collectedRevenue, pendingRevenue, avgAttendance };
  }, [roleStudents, staff]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return roleStudents.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.level.toLowerCase().includes(studentSearch.toLowerCase());
      const matchesLevel = levelFilter === 'All' || s.level.includes(levelFilter);
      const matchesTrainer = trainerFilter === 'All' || s.trainerId === trainerFilter;
      const matchesFee = feeFilter === 'All' || s.feeStatus === feeFilter;
      return matchesSearch && matchesLevel && matchesTrainer && matchesFee;
    });
  }, [roleStudents, studentSearch, levelFilter, trainerFilter, feeFilter]);

  // Handlers
  const handleJoinClassroom = (batchId) => {
    setActiveBatchId(batchId);
    setJitsiJoined(true);
    setActiveTab('classroom');
    const batch = batches.find((b) => b.id === batchId);
    triggerToast(`Joined Live Video Classroom: ${batch?.name || 'Abacus Batch'}`);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: currentUserName,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: chatInput.trim()
      }
    ]);
    setChatInput('');
  };

  const handleMarkAttendance = async (studentId, status) => {
    if (currentRole === 'student') return;
    const prevStatus = todayAttendance[studentId];
    setTodayAttendance((prev) => ({ ...prev, [studentId]: status }));

    let nextSessionCount = 0;
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== studentId) return s;
        let delta = 0;
        if (prevStatus !== 'Present' && prevStatus !== 'Late' && (status === 'Present' || status === 'Late')) {
          delta = 1;
        } else if ((prevStatus === 'Present' || prevStatus === 'Late') && status === 'Absent') {
          delta = -1;
        }
        const nextSessions = Math.min(s.totalCycleSessions, Math.max(0, s.sessionsCompleted + delta));
        nextSessionCount = nextSessions;
        const nextRate = status === 'Absent' ? Math.max(70, s.attendanceRate - 2) : Math.min(100, s.attendanceRate + 1);
        return { ...s, sessionsCompleted: nextSessions, attendanceRate: nextRate };
      })
    );

    if (supabase && session && isUsingLiveDb) {
      try {
        await supabase.from('attendance').upsert(
          {
            student_id: studentId,
            batch_id: attendanceBatchId,
            session_date: sessionDate,
            status: status === 'Absent' ? 'Absent' : 'Present',
            marked_by: session.user.id
          },
          { onConflict: 'student_id,batch_id,session_date' }
        );
        await supabase.from('students').update({ sessions_completed: nextSessionCount }).eq('id', studentId);
      } catch (_err) {
        // Keep optimistic UI update
      }
    }

    triggerToast(`Attendance marked as ${status}`);
  };

  const handleRecordPayment = async (studentId) => {
    if (currentRole !== 'admin') return;
    const target = students.find((s) => s.id === studentId);
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              feeStatus: 'Paid',
              paymentMode: 'UPI',
              lastPaidDate: '24 Nov 2026',
              sessionsCompleted: s.sessionsCompleted === 8 ? 0 : s.sessionsCompleted
            }
          : s
      )
    );

    if (supabase && session && isUsingLiveDb && target) {
      try {
        await supabase.from('students').update({ fee_status: 'Paid' }).eq('id', studentId);
        await supabase.from('payments').insert({
          student_id: studentId,
          trainer_id: target.trainerId,
          amount: target.monthlyFee,
          status: 'Paid',
          paid_date: '2026-11-24'
        });
      } catch (_err) {
        // Keep UI update
      }
    }

    triggerToast('Payment recorded & new 8-session cycle updated!');
  };

  const handleAddStudentSubmit = async (e) => {
    e.preventDefault();
    if (!newStudent.name.trim() || currentRole === 'student') return;

    const isUuid = (val) =>
      typeof val === 'string' &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

    const payload = {
      full_name: newStudent.name.trim(),
      user_id: isUuid(newStudent.userId) ? newStudent.userId : null,
      parent_phone: newStudent.parentPhone || '+91 98400 00000',
      abacus_level: newStudent.level,
      batch_id: isUuid(newStudent.batchId) ? newStudent.batchId : null,
      trainer_id: isUuid(newStudent.trainerId) ? newStudent.trainerId : null,
      sessions_completed: 0,
      monthly_fee: Number(newStudent.monthlyFee) || 1500,
      fee_status: 'Paid'
    };

    let createdId = `stu-${Date.now()}`;
    let savedToDb = false;

    if (supabase && session) {
      const { data, error } = await supabase.from('students').insert(payload).select().single();
      if (error) {
        triggerToast(`Supabase save error: ${error.message}`);
        return;
      }
      if (data?.id) {
        createdId = data.id;
        savedToDb = true;
        setIsUsingLiveDb(true);
      }
    }

    const created = {
      id: createdId,
      userId: payload.user_id,
      name: payload.full_name,
      age: Number(newStudent.age) || 8,
      level: payload.abacus_level,
      trainerId: newStudent.trainerId,
      batchId: newStudent.batchId,
      sessionsCompleted: 0,
      totalCycleSessions: 8,
      attendanceRate: 100,
      monthlyFee: payload.monthly_fee,
      feeStatus: 'Paid',
      paymentMode: 'UPI',
      lastPaidDate: '24 Nov 2026',
      parentPhone: payload.parent_phone
    };

    setStudents((prev) => (savedToDb && !isUsingLiveDb ? [created] : [created, ...prev]));
    setShowAddStudentModal(false);
    setNewStudent({
      name: '',
      userId: '',
      age: 8,
      level: 'Level 1',
      trainerId: staff[0]?.id || 'st-2',
      batchId: batches[0]?.id || 'b-2',
      monthlyFee: 1500,
      parentPhone: ''
    });
    triggerToast(
      savedToDb
        ? `${created.name} saved to Supabase database!`
        : `${created.name} enrolled in preview mode!`
    );
  };

  const handleAddStaffSubmit = (e) => {
    e.preventDefault();
    if (!newStaff.name.trim() || currentRole !== 'admin') return;
    const colors = ['bg-indigo-600', 'bg-teal-600', 'bg-violet-600', 'bg-emerald-600'];
    const created = {
      id: `st-${Date.now()}`,
      name: newStaff.name.trim(),
      role: newStaff.role,
      specialties: newStaff.specialties.split(',').map((item) => item.trim()).filter(Boolean),
      email: newStaff.email || 'trainer@evolvekids.in',
      phone: newStaff.phone || '+91 98400 11223',
      activeBatches: 1,
      classesThisWeek: 2,
      sharePercent: Number(newStaff.sharePercent) || 50,
      status: 'Available',
      avatarColor: colors[staff.length % colors.length]
    };
    setStaff((prev) => [...prev, created]);
    setShowAddStaffModal(false);
    setNewStaff({ name: '', role: 'Abacus Trainer', specialties: 'Level 1–4, Junior Foundation', email: '', phone: '', sharePercent: 50 });
    triggerToast(`Trainer ${created.name} added to roster!`);
  };

  // Navigation filtered by Role
  const navItems = useMemo(() => {
    const all = [
      { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, roles: ['admin', 'staff', 'student'] },
      { id: 'classroom', label: 'Live Video Classroom', icon: Video, badge: 'LIVE', roles: ['admin', 'staff', 'student'] },
      { id: 'students', label: 'Students & Levels', icon: Users, count: roleStudents.length, roles: ['admin', 'staff'] },
      { id: 'staff', label: 'Staff & Roles', icon: UserCheck, count: staff.length, roles: ['admin', 'staff'] },
      { id: 'schedule', label: 'Class Timings', icon: Calendar, roles: ['admin', 'staff'] },
      { id: 'attendance', label: 'Attendance Tracker', icon: ClipboardCheck, roles: ['admin', 'staff'] },
      {
        id: 'payments',
        label: currentRole === 'student' ? 'My Fee Status' : 'Fees & 50–50 Payouts',
        icon: IndianRupee,
        roles: ['admin', 'student']
      }
    ];
    return all.filter((item) => item.roles.includes(currentRole));
  }, [currentRole, roleStudents.length, staff.length]);

  const getTrainerName = (id) => staff.find((s) => s.id === id)?.name || 'Ranjitha Ganesh';

  const currentLiveBatch = batches.find((b) => b.id === activeBatchId) || batches[0];
  const liveBatchStudents = roleStudents.filter((s) => s.batchId === currentLiveBatch.id);

  // Show Login / Demo Role Gate if not signed in and not in demo mode
  if (!authLoading && !session && !demoRole) {
    return (
      <AuthGateScreen
        authError={authError}
        authLoading={authLoading}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onEnterDemoRole={handleEnterDemoRole}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Mobile Header */}
      <div className="lg:hidden bg-indigo-950 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-teal-400 to-indigo-500 flex items-center justify-center font-black text-slate-950 text-lg shadow">
            EK
          </div>
          <div>
            <div className="font-bold text-sm tracking-wide">EVOLVE KIDS</div>
            <div className="text-[11px] text-indigo-300 uppercase">{currentRole} Access</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-indigo-900/80 text-white cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } lg:flex lg:flex-col lg:w-68 lg:shrink-0 bg-indigo-950 text-slate-100 border-r border-indigo-900/80 lg:min-h-screen sticky top-0 z-20`}
      >
        <div className="p-5 border-b border-indigo-900/80 hidden lg:flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-teal-400 to-indigo-400 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg">
            EK
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-wider text-white">EVOLVE KIDS</h1>
            <p className="text-xs text-teal-300 font-medium capitalize">{currentRole} Portal</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/50'
                    : 'text-indigo-200 hover:bg-indigo-900/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-indigo-300'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && (
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                      isActive ? 'bg-indigo-800 text-indigo-100' : 'bg-indigo-900 text-indigo-300'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Active User & Sign Out Footer */}
        <div className="p-4 m-3 rounded-2xl bg-indigo-900/60 border border-indigo-800/80 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-sm shrink-0">
              {currentUserName.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{currentUserName}</p>
              <p className="text-[11px] text-teal-300 font-semibold uppercase">{currentRole}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full py-1.5 px-3 rounded-xl bg-indigo-950/80 hover:bg-rose-600 text-indigo-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{session ? 'Sign Out' : 'Switch Account / Exit Demo'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
        {/* Demo Mode Role Switcher Banner */}
        {!session && demoRole && (
          <div className="mb-5 px-4 py-2.5 rounded-2xl bg-indigo-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <span>
                <strong>Demo Mode Active:</strong> Viewing as <strong className="uppercase text-amber-300">{demoRole}</strong> (connect Supabase env vars for live multi-user database sync).
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {['admin', 'staff', 'student'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleEnterDemoRole(r)}
                  className={`px-2.5 py-1 rounded-lg font-bold capitalize transition cursor-pointer ${
                    demoRole === r ? 'bg-amber-400 text-slate-950' : 'bg-indigo-800 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Top Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard Overview'}
              </h2>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700 uppercase">
                {currentRole}
              </span>
              {session && (
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    isUsingLiveDb ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isUsingLiveDb ? 'Supabase Live DB' : 'Supabase Auth (Demo Rows)'}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              Tuesday, 24 Nov 2026 • Evolve Kids Online Abacus Operations
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {session && (
              <button
                type="button"
                onClick={() => loadAcademyData(currentRole)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${dataLoading ? 'animate-spin' : ''}`} />
                Sync
              </button>
            )}
            <button
              type="button"
              onClick={() => handleJoinClassroom(roleStudents[0]?.batchId || 'b-1')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-sm transition cursor-pointer"
            >
              <Video className="w-4 h-4" />
              {currentRole === 'student' ? 'Join My Live Class' : 'Enter Live Classroom'}
            </button>
            {(currentRole === 'admin' || currentRole === 'staff') && (
              <button
                type="button"
                onClick={() => setShowAddStudentModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Enroll Student
              </button>
            )}
          </div>
        </header>

        {/* ===================================================================== */}
        {/* TAB 1: DASHBOARD OVERVIEW                                             */}
        {/* ===================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {currentRole !== 'student' ? (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Active Abacus Students
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900">{stats.totalStudents}</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Levels 1–8
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Enrolled online learners</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      My Abacus Level
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">
                    {roleStudents[0]?.level || 'Level 3'}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Trainer: {getTrainerName(roleStudents[0]?.trainerId)}
                  </p>
                </div>
              )}

              {currentRole !== 'student' ? (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Teaching Staff & Trainers
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                      <UserCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900">{stats.activeTrainers}</span>
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                      2x/wk batches
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Certified Evolve Kids trainers</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      8-Session Cycle
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                      <ClipboardCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900">
                    {roleStudents[0]?.sessionsCompleted ?? 6} / 8
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Sessions completed in current cycle</p>
                </div>
              )}

              {currentRole === 'admin' ? (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Monthly Fee Collected
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <IndianRupee className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900">
                    ₹{stats.collectedRevenue.toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-amber-600 font-medium mt-2">
                    ₹{stats.pendingRevenue.toLocaleString('en-IN')} pending / renewal
                  </p>
                </div>
              ) : currentRole === 'student' ? (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      My Fee Status
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <IndianRupee className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900">
                    {roleStudents[0]?.feeStatus || 'Paid'}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Monthly Fee: ₹{(roleStudents[0]?.monthlyFee || 1800).toLocaleString('en-IN')}
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Active Online Batches
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900">{batches.length}</div>
                  <p className="text-xs text-slate-500 mt-2">50-minute live sessions</p>
                </div>
              )}

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Attendance Rate
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">{stats.avgAttendance}%</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    On Track
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">2 online sessions/week</p>
              </div>
            </div>

            {/* Batches Panel */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {currentRole === 'student' ? 'My Class Schedule & Live Room' : 'Live & Upcoming Online Batches'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Click Join Classroom to launch Jitsi Meet video call + Interactive Soroban abacus
                  </p>
                </div>
                {currentRole !== 'student' && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('schedule')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    Full Timetable <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {(currentRole === 'student'
                  ? batches.filter((b) => b.id === (roleStudents[0]?.batchId || 'b-1'))
                  : batches
                ).map((batch) => {
                  const enrolledCount = students.filter((s) => s.batchId === batch.id).length;
                  const isLive = batch.status === 'Live Now';
                  return (
                    <div
                      key={batch.id}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                        isLive
                          ? 'bg-indigo-50/60 border-indigo-200'
                          : 'bg-slate-50/70 border-slate-200/80 hover:bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-slate-900">{batch.name}</span>
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              isLive ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {batch.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {batch.days} • {batch.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                            {getTrainerName(batch.trainerId)}
                          </span>
                          {currentRole !== 'student' && (
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-slate-400" />
                              {enrolledCount} Students
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleJoinClassroom(batch.id)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 transition cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Join Classroom
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 2: INTEGRATED JITSI VIDEO CLASSROOM + SOROBAN + ANZAN            */}
        {/* ===================================================================== */}
        {activeTab === 'classroom' && (
          <div className="space-y-5">
            <div className="bg-slate-900 text-white rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 border border-slate-800">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  LIVE CLASSROOM
                </span>
                <select
                  value={activeBatchId}
                  onChange={(e) => setActiveBatchId(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-sm font-bold text-white rounded-lg px-3 py-1 outline-none"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.time})
                    </option>
                  ))}
                </select>
                <span className="text-xs font-mono text-slate-400">
                  Room: {currentLiveBatch.roomCode}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {currentRole !== 'student' && (
                  <>
                    <button
                      type="button"
                      onClick={() => setMicOn(!micOn)}
                      className={`p-2 rounded-xl border transition cursor-pointer ${
                        micOn ? 'bg-slate-800 border-slate-700 text-white' : 'bg-rose-600 border-rose-500 text-white'
                      }`}
                      title="Toggle Mic Status"
                    >
                      {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCamOn(!camOn)}
                      className={`p-2 rounded-xl border transition cursor-pointer ${
                        camOn ? 'bg-slate-800 border-slate-700 text-white' : 'bg-rose-600 border-rose-500 text-white'
                      }`}
                      title="Toggle Camera Status"
                    >
                      {camOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setScreenSharing(!screenSharing);
                        triggerToast(!screenSharing ? 'Highlighting Digital Soroban board' : 'Cleared board highlight');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        screenSharing
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <MonitorUp className="w-4 h-4" />
                      <span>{screenSharing ? 'Board Highlighted' : 'Highlight Board'}</span>
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setJitsiJoined(false);
                    setActiveTab('overview');
                    triggerToast('Left live classroom');
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition cursor-pointer"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Class</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-2 space-y-5">
                {/* Real Embedded Jitsi Meet Room */}
                <JitsiVideoRoom
                  roomCode={currentLiveBatch.roomCode}
                  displayName={currentUserName}
                  isJoined={jitsiJoined}
                  onJoinToggle={() => setJitsiJoined(true)}
                  onEndClass={() => setJitsiJoined(false)}
                />

                {/* Interactive Digital Soroban */}
                <InteractiveSoroban />
              </div>

              {/* Right Column: Anzan Speed Drill + Classroom Chat */}
              <div className="space-y-5 flex flex-col">
                <MentalMathFlashcard />

                {currentRole !== 'student' && (
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                      Quick Doubt & Attendance Strip
                    </h4>
                    <div className="space-y-2">
                      {(liveBatchStudents.length ? liveBatchStudents : students.slice(0, 3)).map((stu) => (
                        <div key={stu.id} className="flex items-center justify-between text-xs bg-slate-50 px-3 py-2 rounded-xl">
                          <span className="font-bold text-slate-800">{stu.name}</span>
                          <div className="flex items-center gap-1.5">
                            {raisedHands[stu.id] && (
                              <button
                                type="button"
                                onClick={() => setRaisedHands((prev) => ({ ...prev, [stu.id]: false }))}
                                className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Hand className="w-3 h-3" /> Doubt
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleMarkAttendance(stu.id, 'Present')}
                              className="px-2 py-0.5 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold cursor-pointer"
                            >
                              ✓ Present
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col flex-1 min-h-[260px]">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">Classroom Chat & Answers</h4>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  </div>

                  <div className="flex-1 p-3.5 space-y-2.5 overflow-y-auto max-h-[220px]">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="text-xs font-bold text-indigo-900">{msg.sender}</span>
                          <span className="text-[10px] text-slate-400">{msg.time}</span>
                        </div>
                        <p className="text-xs text-slate-700">{msg.text}</p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendChat} className="p-3 border-t border-slate-100 flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Send formula or answer..."
                      className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 3: STUDENTS DIRECTORY (ADMIN & STAFF)                             */}
        {/* ===================================================================== */}
        {activeTab === 'students' && currentRole !== 'student' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row gap-3 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder="Search student name or abacus level..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none"
                >
                  <option value="All">All Abacus Levels</option>
                  <option value="Level 1">Level 1</option>
                  <option value="Level 2">Level 2</option>
                  <option value="Level 3">Level 3</option>
                  <option value="Level 4">Level 4</option>
                  <option value="Level 5">Level 5</option>
                  <option value="Level 6">Level 6</option>
                  <option value="Level 8">Level 8 (Grandmaster)</option>
                </select>

                <select
                  value={trainerFilter}
                  onChange={(e) => setTrainerFilter(e.target.value)}
                  className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none"
                >
                  <option value="All">All Trainers</option>
                  {staff.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name}
                    </option>
                  ))}
                </select>

                {currentRole === 'admin' && (
                  <select
                    value={feeFilter}
                    onChange={(e) => setFeeFilter(e.target.value)}
                    className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none"
                  >
                    <option value="All">All Fee Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Due Soon">Due Soon</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Abacus Level</th>
                    <th className="py-3.5 px-4">Assigned Trainer</th>
                    <th className="py-3.5 px-4">8-Session Cycle</th>
                    <th className="py-3.5 px-4">Attendance</th>
                    {currentRole === 'admin' && <th className="py-3.5 px-4">Fee Status</th>}
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredStudents.map((stu) => {
                    const progressPct = Math.round((stu.sessionsCompleted / stu.totalCycleSessions) * 100);
                    return (
                      <tr key={stu.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{stu.name}</div>
                          <div className="text-xs text-slate-500">{stu.parentPhone}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                            <Award className="w-3.5 h-3.5" />
                            {stu.level}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-semibold text-slate-700">
                          {getTrainerName(stu.trainerId)}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="w-36">
                            <div className="flex justify-between text-xs font-semibold mb-1">
                              <span>{stu.sessionsCompleted} / 8</span>
                              <span className="text-slate-500">{progressPct}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  stu.sessionsCompleted === 8 ? 'bg-amber-500' : 'bg-teal-500'
                                }`}
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-bold text-slate-800">{stu.attendanceRate}%</td>
                        {currentRole === 'admin' && (
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                                stu.feeStatus === 'Paid'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : stu.feeStatus === 'Due Soon'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {stu.feeStatus} (₹{stu.monthlyFee})
                            </span>
                          </td>
                        )}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleJoinClassroom(stu.batchId)}
                            className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition cursor-pointer"
                          >
                            Join Batch
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 4: STAFF & ROLE ACCESS MANAGEMENT                                 */}
        {/* ===================================================================== */}
        {activeTab === 'staff' && currentRole !== 'student' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div>
                <h3 className="text-base font-bold text-slate-900">Certified Abacus Trainers & Role Access</h3>
                <p className="text-xs text-slate-500">
                  {currentRole === 'admin'
                    ? 'Manage trainer profiles, 50–50 revenue share, and user access roles'
                    : 'View teaching staff roster and assigned batches'}
                </p>
              </div>
              {currentRole === 'admin' && (
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Add Trainer
                </button>
              )}
            </div>

            {/* Live Supabase User Role Control (Admin Only) */}
            {currentRole === 'admin' && profilesList.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
                <h4 className="text-sm font-bold text-slate-900 mb-3">Supabase Account Roles (public.profiles)</h4>
                <div className="divide-y divide-slate-100">
                  {profilesList.map((u) => (
                    <div key={u.id} className="py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-slate-900">{u.full_name || u.email}</span>
                        <span className="text-slate-500 ml-2">{u.email}</span>
                      </div>
                      <select
                        value={u.role || 'student'}
                        onChange={(e) => handleUpdateUserRole(u.id, e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-bold text-slate-800"
                      >
                        <option value="admin">admin</option>
                        <option value="staff">staff</option>
                        <option value="student">student</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {staff.map((member) => {
                const assignedStudents = students.filter((s) => s.trainerId === member.id);
                const grossFees = assignedStudents.reduce((acc, s) => acc + s.monthlyFee, 0);
                const trainerPayout = Math.round((grossFees * member.sharePercent) / 100);

                return (
                  <div
                    key={member.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-12 h-12 rounded-2xl ${member.avatarColor} text-white font-extrabold flex items-center justify-center text-base shadow`}
                          >
                            {member.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <div>
                            <h4 className="font-bold text-base text-slate-900">{member.name}</h4>
                            <p className="text-xs text-slate-500 font-medium">{member.role}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{member.email}</p>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                          {member.status}
                        </span>
                      </div>
                    </div>

                    <div className={`grid ${currentRole === 'admin' ? 'grid-cols-3' : 'grid-cols-2'} gap-2 pt-3 border-t border-slate-100 text-center`}>
                      <div className="bg-slate-50 rounded-xl p-2.5">
                        <div className="text-lg font-extrabold text-slate-900">{assignedStudents.length}</div>
                        <div className="text-[11px] text-slate-500 font-medium">Students</div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2.5">
                        <div className="text-lg font-extrabold text-slate-900">{member.classesThisWeek}</div>
                        <div className="text-[11px] text-slate-500 font-medium">Classes / Wk</div>
                      </div>
                      {currentRole === 'admin' && (
                        <div className="bg-indigo-50 rounded-xl p-2.5">
                          <div className="text-lg font-extrabold text-indigo-700">
                            ₹{trainerPayout.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[11px] text-indigo-600 font-semibold">
                            {member.sharePercent}% Share
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 5: CLASS TIMINGS & BATCH SCHEDULE                                 */}
        {/* ===================================================================== */}
        {activeTab === 'schedule' && currentRole !== 'student' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Weekly Online Abacus Batch Schedule</h3>
                <p className="text-xs text-slate-500">
                  2 sessions per week (50 mins each • 8 sessions/month cycle)
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700">
                IST (Asia/Kolkata)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {batches.map((batch) => {
                const batchStudents = students.filter((s) => s.batchId === batch.id);
                return (
                  <div
                    key={batch.id}
                    className="rounded-2xl border border-slate-200 p-5 hover:border-indigo-300 transition bg-slate-50/40"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
                          {batch.days}
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900 mt-1.5">{batch.name}</h4>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        {batch.roomCode}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        <span className="font-semibold text-slate-800">{batch.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-teal-600" />
                        <span>
                          Trainer: <strong className="text-slate-900">{getTrainerName(batch.trainerId)}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-amber-500" />
                        <span>Enrolled: {batchStudents.length} students</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-200/70">
                      <button
                        type="button"
                        onClick={() => handleJoinClassroom(batch.id)}
                        className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Launch Video Room
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAttendanceBatchId(batch.id);
                          setActiveTab('attendance');
                        }}
                        className="py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition cursor-pointer"
                      >
                        Attendance
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 6: SESSION ATTENDANCE TRACKER                                     */}
        {/* ===================================================================== */}
        {activeTab === 'attendance' && currentRole !== 'student' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Session Attendance & 8-Class Cycle Tracker</h3>
                <p className="text-xs text-slate-500">
                  Marking Present/Late updates the student's 8-session monthly cycle
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={attendanceBatchId}
                  onChange={(e) => setAttendanceBatchId(e.target.value)}
                  className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              {students
                .filter((s) => s.batchId === attendanceBatchId)
                .map((stu) => {
                  const status = todayAttendance[stu.id] || 'Present';
                  return (
                    <div
                      key={stu.id}
                      className="p-4 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{stu.name}</span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                            {stu.level}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Cycle: <strong className="text-slate-800">{stu.sessionsCompleted} / 8 sessions</strong> • Attendance: {stu.attendanceRate}%
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {['Present', 'Late', 'Absent'].map((opt) => {
                          const active = status === opt;
                          const styles =
                            opt === 'Present'
                              ? active
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-emerald-50'
                              : opt === 'Late'
                              ? active
                                ? 'bg-amber-500 text-white border-amber-500'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-amber-50'
                              : active
                              ? 'bg-rose-600 text-white border-rose-600'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-rose-50';

                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleMarkAttendance(stu.id, opt)}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${styles}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 7: FEES & 50-50 PAYOUTS (ADMIN) / OWN FEE STATUS (STUDENT)      */}
        {/* ===================================================================== */}
        {activeTab === 'payments' && currentRole !== 'staff' && (
          <div className="space-y-6">
            {currentRole === 'admin' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-slate-900">Automated 50–50 Trainer Payout Calculator</h3>
                  <p className="text-xs text-slate-500">
                    Disbursed per student upon completion of each 8-session monthly cycle
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {staff.map((tr) => {
                    const trStudents = students.filter((s) => s.trainerId === tr.id && s.feeStatus === 'Paid');
                    const collected = trStudents.reduce((acc, s) => acc + s.monthlyFee, 0);
                    const payout = Math.round((collected * tr.sharePercent) / 100);
                    return (
                      <div key={tr.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="text-xs font-bold text-slate-900">{tr.name}</div>
                        <div className="text-[11px] text-slate-500 mb-2">
                          {trStudents.length} Paid • {tr.sharePercent}% Split
                        </div>
                        <div className="text-xl font-extrabold text-indigo-700">
                          ₹{payout.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          From ₹{collected.toLocaleString('en-IN')} gross fees
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  {currentRole === 'admin' ? 'Student Monthly Fee Ledger' : 'My Fee & Session Cycle Status'}
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-3.5 px-4">Student</th>
                      <th className="py-3.5 px-4">Trainer</th>
                      <th className="py-3.5 px-4">Cycle Status</th>
                      <th className="py-3.5 px-4">Monthly Fee</th>
                      <th className="py-3.5 px-4">Payment Status</th>
                      {currentRole === 'admin' && <th className="py-3.5 px-4 text-right">Action</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {roleStudents.map((stu) => (
                      <tr key={stu.id} className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{stu.name}</div>
                          <div className="text-xs text-slate-500">{stu.level}</div>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-semibold text-slate-700">
                          {getTrainerName(stu.trainerId)}
                        </td>
                        <td className="py-3.5 px-4 text-xs font-semibold text-slate-700">
                          {stu.sessionsCompleted} / 8 Sessions
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          ₹{stu.monthlyFee.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                              stu.feeStatus === 'Paid'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : stu.feeStatus === 'Due Soon'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {stu.feeStatus}
                          </span>
                        </td>
                        {currentRole === 'admin' && (
                          <td className="py-3.5 px-4 text-right">
                            {stu.feeStatus !== 'Paid' ? (
                              <button
                                type="button"
                                onClick={() => handleRecordPayment(stu.id)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                              >
                                Mark Paid
                              </button>
                            ) : (
                              <span className="text-xs font-semibold text-emerald-600 inline-flex items-center gap-1">
                                <Check className="w-3.5 h-3.5" /> Settled
                              </span>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ===================================================================== */}
      {/* MODAL: ENROLL NEW STUDENT                                             */}
      {/* ===================================================================== */}
      {showAddStudentModal && currentRole !== 'student' && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-slate-900">Enroll New Abacus Student</h3>
              <button
                type="button"
                onClick={() => setShowAddStudentModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="e.g., Arjun Krishnan"
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              {profilesList.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Link Student Login Account (Optional)
                  </label>
                  <select
                    value={newStudent.userId}
                    onChange={(e) => {
                      const selectedProfile = profilesList.find((p) => p.id === e.target.value);
                      setNewStudent({
                        ...newStudent,
                        userId: e.target.value,
                        name: newStudent.name || selectedProfile?.full_name || ''
                      });
                    }}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                  >
                    <option value="">-- Not linked yet (Admin/Staff managed) --</option>
                    {profilesList
                      .filter((p) => p.role === 'student')
                      .map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.full_name || p.email} ({p.email})
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assign Trainer</label>
                  <select
                    value={newStudent.trainerId}
                    onChange={(e) => setNewStudent({ ...newStudent, trainerId: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                  >
                    {staff.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Fee (₹)</label>
                  <input
                    type="number"
                    value={newStudent.monthlyFee}
                    onChange={(e) => setNewStudent({ ...newStudent, monthlyFee: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assign Batch</label>
                <select
                  value={newStudent.batchId}
                  onChange={(e) => setNewStudent({ ...newStudent, batchId: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.days} • {b.time})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm cursor-pointer"
                >
                  Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: ADD NEW STAFF TRAINER (ADMIN ONLY)                             */}
      {/* ===================================================================== */}
      {showAddStaffModal && currentRole === 'admin' && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-slate-900">Add Abacus Staff Trainer</h3>
              <button
                type="button"
                onClick={() => setShowAddStaffModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStaffSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Trainer Full Name</label>
                <input
                  type="text"
                  required
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="e.g., Divya Venkatesh"
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Role / Title</label>
                  <input
                    type="text"
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Revenue Share (%)</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={newStaff.sharePercent}
                    onChange={(e) => setNewStaff({ ...newStaff, sharePercent: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email ID</label>
                <input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  placeholder="trainer@evolvekids.in"
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-sm cursor-pointer"
                >
                  Save Trainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}