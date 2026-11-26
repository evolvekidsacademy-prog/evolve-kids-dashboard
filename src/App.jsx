import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
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
  PhoneOff,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
  Send,
  Award,
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
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Safely initialize Supabase inline (works both in Vite with .env vars and in single-file Preview)
const getEnvVar = (key) => {
  try {
    return (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) || '';
  } catch {
    return '';
  }
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const normalizeRole = (role) => {
  const normalized = typeof role === 'string' ? role.trim().toLowerCase() : '';
  return ['admin', 'staff', 'student'].includes(normalized) ? normalized : null;
};

const getCurrentTimestamp = () => Date.now();

function formatDuration(totalSeconds) {
  const secs = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const hrs = Math.floor(secs / 3600);
  const mins = Math.floor((secs % 3600) / 60);
  const remSecs = secs % 60;
  if (hrs > 0) {
    return `${hrs}h ${mins}m ${remSecs}s`;
  }
  if (mins > 0) {
    return `${mins}m ${remSecs}s`;
  }
  return `${remSecs}s`;
}

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
  const [numbers, setNumbers] = useState([]);
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
        {numbers.length === 0 && <span className="text-xs text-slate-400">Generate a drill to begin.</span>}
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
        {numbers.length > 0 && (
          <>
            <span className="text-slate-400 font-bold">=</span>
            <span className="font-mono text-xl font-black px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {showAnswer ? sum : '?'}
            </span>
          </>
        )}
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
          disabled={numbers.length === 0}
          className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold transition cursor-pointer"
        >
          {showAnswer ? 'Hide Answer' : 'Reveal Answer'}
        </button>
      </div>
    </div>
  );
}

// --- EMBEDDED JITSI MEET VIDEO CALL COMPONENT ---
function JitsiVideoRoom({ roomCode, displayName, isJoined, elapsedSeconds, onJoinToggle, onEndClass }) {
  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);
  const [useIframeFallback, setUseIframeFallback] = useState(false);

  const sanitizedRoom = useMemo(() => {
    return (roomCode || '').replace(/[^a-zA-Z0-9_-]/g, '');
  }, [roomCode]);

  const jitsiUrl = `https://meet.jit.si/${sanitizedRoom}`;

  useEffect(() => {
    if (!isJoined) {
      if (apiRef.current) {
        try {
          apiRef.current.dispose();
        } catch {
          // ignore cleanup errors
        }
        apiRef.current = null;
      }
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
            displayName: displayName || ''
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
      } catch {
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
        } catch {
          // ignore cleanup errors
        }
        apiRef.current = null;
      }
    };
  }, [isJoined, sanitizedRoom, displayName]);

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Jitsi Meet Live Video Call • Room: <span className="font-mono text-amber-300">{sanitizedRoom}</span>
          </span>
          {isJoined && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
              <Clock className="w-3 h-3" />
              Live Duration: {formatDuration(elapsedSeconds)}
            </span>
          )}
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
            displayName || ''
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
function AuthGateScreen({ authError, authLoading, onSignIn, onSignUp }) {
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
                placeholder="Your full name"
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

      </div>
    </div>
  );
}

// --- MAIN APPLICATION ---
export default function App() {
  // Auth & Role State ('admin' | 'staff' | 'student')
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
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
  const [staff, setStaff] = useState([]);
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [callLogs, setCallLogs] = useState([]);
  const [adminCallRoleFilter, setAdminCallRoleFilter] = useState('All');

  // Classroom & Jitsi State
  const [activeBatchId, setActiveBatchId] = useState('');
  const [jitsiJoined, setJitsiJoined] = useState(false);
  const [callStartedAt, setCallStartedAt] = useState(null);
  const [callElapsedSeconds, setCallElapsedSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  // Filters & Modals
  const [studentSearch, setStudentSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [trainerFilter, setTrainerFilter] = useState('All');
  const [feeFilter, setFeeFilter] = useState('All');

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  // Attendance Tab State
  const [attendanceBatchId, setAttendanceBatchId] = useState('');
  const [sessionDate, setSessionDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  });
  const [todayAttendance, setTodayAttendance] = useState({});
  const [attendanceReady, setAttendanceReady] = useState(false);

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    name: '',
    userId: '',
    level: '',
    trainerId: '',
    batchId: '',
    monthlyFee: '',
    parentPhone: ''
  });

  const triggerToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3200);
  }, []);

  // Effective Role ('admin' | 'staff' | 'student')
  const currentRole = useMemo(() => {
    return normalizeRole(profile?.role);
  }, [profile]);

  const currentUserName = useMemo(() => {
    if (profile?.full_name) return profile.full_name;
    if (session?.user?.email) return session.user.email.split('@')[0];
    return 'Evolve Kids User';
  }, [profile, session]);

  // Fetch user profile from public.profiles
  const fetchUserProfile = useCallback(async (userId, userEmail, claimRole) => {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, full_name, role')
      .eq('id', userId)
      .maybeSingle();

    if (error && !normalizeRole(claimRole)) throw error;
    return {
      ...data,
      id: userId,
      email: data?.email || userEmail,
      full_name: data?.full_name || userEmail?.split('@')[0] || '',
      role: normalizeRole(data?.role) || normalizeRole(claimRole)
    };
  }, []);

  // Load only persisted academy data; empty tables stay empty rather than showing sample records.
  const loadAcademyData = useCallback(async (roleToFetch, activeProfile, activeUserId) => {
    if (!supabase) {
      setIsUsingLiveDb(false);
      return;
    }
    setDataLoading(true);
    setIsUsingLiveDb(false);
    setProfilesList([]);
    setStaff([]);
    setStudents([]);
    setBatches([]);
    setCallLogs([]);
    setTodayAttendance({});
    setAttendanceReady(false);
    try {
      const userId = activeUserId;
      if (!userId) throw new Error('An authenticated user is required to load dashboard data.');

      const studentFields = roleToFetch === 'staff'
        ? 'id, user_id, full_name, abacus_level, trainer_id, batch_id, sessions_completed'
        : '*';
      let studentsQuery = supabase.from('students').select(studentFields).order('created_at', { ascending: false });
      if (roleToFetch === 'staff') studentsQuery = studentsQuery.eq('trainer_id', userId);
      if (roleToFetch === 'student') studentsQuery = studentsQuery.eq('user_id', userId);

      const [studentsRes, adminProfilesRes, callLogsRes] = await Promise.all([
        studentsQuery,
        roleToFetch === 'admin'
          ? supabase.from('profiles').select('id, email, full_name, role').order('created_at', { ascending: true })
          : Promise.resolve({ data: null, error: null }),
        (roleToFetch === 'admin'
          ? supabase.from('class_sessions').select('*')
          : supabase.from('class_sessions').select('*').eq('user_id', userId)
        ).order('created_at', { ascending: false })
      ]);

      const loadedStudents = studentsRes.error ? [] : studentsRes.data || [];
      const batchIds = [...new Set(loadedStudents.map((student) => student.batch_id).filter(Boolean))];
      const trainerIds = [...new Set(loadedStudents.map((student) => student.trainer_id).filter(Boolean))];
      const profilesRes = roleToFetch === 'admin'
        ? adminProfilesRes
        : roleToFetch === 'student' && trainerIds.length
        ? await supabase.from('profiles').select('id, email, full_name, role').in('id', trainerIds)
        : { data: [], error: null };
      let batchesQuery = supabase.from('batches').select('*').order('created_at', { ascending: true });
      if (roleToFetch === 'staff') batchesQuery = batchesQuery.eq('trainer_id', userId);
      if (roleToFetch === 'student') {
        batchesQuery = batchIds.length ? batchesQuery.in('id', batchIds) : null;
      }
      const batchesRes = batchesQuery
        ? await batchesQuery
        : { data: [], error: null };

      const loadErrors = [];
      if (batchesRes.error) loadErrors.push(`classes: ${batchesRes.error.message}`);
      if (studentsRes.error) loadErrors.push(`students: ${studentsRes.error.message}`);
      if (profilesRes.error) loadErrors.push(`profiles: ${profilesRes.error.message}`);
      if (callLogsRes.error) loadErrors.push(`call logs: ${callLogsRes.error.message}`);
      if (loadErrors.length) {
        triggerToast(`Some dashboard data could not be loaded: ${loadErrors.join('; ')}`);
      }

      const loadedBatches = batchesRes.error ? [] : batchesRes.data || [];
      const loadedCallLogs = callLogsRes.error ? [] : callLogsRes.data || [];

      setBatches(
        loadedBatches.map((batch) => ({
          id: batch.id,
          name: batch.name,
          days: batch.schedule_days,
          time: batch.schedule_time,
          level: batch.level,
          trainerId: batch.trainer_id,
          status: batch.status || '',
          roomCode: batch.room_code
        }))
      );
      setActiveBatchId(loadedBatches[0]?.id || '');
      setAttendanceBatchId(loadedBatches[0]?.id || '');
      setTodayAttendance({});
      setStudents(
        loadedStudents.map((student) => ({
          id: student.id,
          userId: student.user_id || null,
          name: student.full_name || '',
          age: student.age ?? null,
          level: student.abacus_level || '',
          trainerId: student.trainer_id || null,
          batchId: student.batch_id || null,
          sessionsCompleted: student.sessions_completed ?? 0,
          totalCycleSessions: student.total_cycle_sessions ?? null,
          attendanceRate: student.attendance_rate ?? null,
          monthlyFee: student.monthly_fee == null ? null : Number(student.monthly_fee),
          feeStatus: student.fee_status || '',
          paymentMode: student.payment_mode || '',
          lastPaidDate: student.last_paid_date || '',
          parentPhone: student.parent_phone || ''
        }))
      );
      const loadedProfiles = profilesRes.error ? [] : profilesRes.data || [];
      setProfilesList(roleToFetch === 'admin' ? loadedProfiles : []);
      setStaff(
        (roleToFetch === 'admin'
          ? loadedProfiles
          : roleToFetch === 'staff' && activeProfile
          ? [activeProfile]
          : loadedProfiles)
          .filter((userProfile) => ['staff', 'admin'].includes(normalizeRole(userProfile.role)))
          .map((userProfile) => ({
            id: userProfile.id,
            name: userProfile.full_name || userProfile.email || '',
            role: normalizeRole(userProfile.role),
            specialties: [],
            email: userProfile.email || '',
            activeBatches: loadedBatches.filter((batch) => batch.trainer_id === userProfile.id).length,
            avatarColor: 'bg-indigo-600'
          }))
      );
      setCallLogs(
        loadedCallLogs.map((call) => ({
          id: call.id,
          userId: call.user_id || null,
          participantName: call.participant_name || '',
          participantRole: normalizeRole(call.participant_role),
          batchId: call.batch_id || null,
          batchName: call.batch_name || '',
          roomCode: call.room_code || '',
          sessionDate: call.session_date || '',
          startedAt: call.started_at || '',
          endedAt: call.ended_at || '',
          durationSeconds: Number(call.duration_seconds) || 0
        }))
      );

      setIsUsingLiveDb(!batchesRes.error && (roleToFetch !== 'student' || !studentsRes.error));
    } catch (error) {
      setIsUsingLiveDb(false);
      triggerToast(`Unable to load dashboard data: ${error.message}`);
    } finally {
      setDataLoading(false);
    }
  }, [triggerToast]);

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
          const prof = await fetchUserProfile(
            currentSession.user.id,
            currentSession.user.email,
            currentSession.user.app_metadata?.role
          );
          if (mounted) {
            setProfile(prof);
            if (prof?.role) await loadAcademyData(prof.role, prof, currentSession.user.id);
            else setAuthError('Your account does not have an assigned admin, staff, or student role. Contact an administrator.');
          }
        }
      } catch (error) {
        if (mounted) setAuthError(`Unable to load your account: ${error.message}`);
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
        try {
          const prof = await fetchUserProfile(
            nextSession.user.id,
            nextSession.user.email,
            nextSession.user.app_metadata?.role
          );
          if (mounted) {
            setProfile(prof);
            if (prof?.role) await loadAcademyData(prof.role, prof, nextSession.user.id);
            else setAuthError('Your account does not have an assigned admin, staff, or student role. Contact an administrator.');
          }
        } catch (error) {
          if (mounted) setAuthError(`Unable to load your account: ${error.message}`);
        }
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe?.();
    };
  }, [fetchUserProfile, loadAcademyData]);

  useEffect(() => {
    if (!supabase || !session?.user?.id || !isUsingLiveDb || !attendanceBatchId || currentRole === 'student') return undefined;
    let active = true;

    const loadAttendance = async () => {
      const { data, error } = await supabase
        .from('attendance')
        .select('student_id, status')
        .eq('batch_id', attendanceBatchId)
        .eq('session_date', sessionDate);
      if (!active) return;
      if (error) {
        triggerToast(`Unable to load attendance: ${error.message}`);
        return;
      }
      setTodayAttendance(Object.fromEntries((data || []).map((record) => [record.student_id, record.status])));
      setAttendanceReady(true);
    };

    loadAttendance();
    return () => {
      active = false;
    };
  }, [attendanceBatchId, currentRole, isUsingLiveDb, session, sessionDate, triggerToast]);

  // Live Call Timer Effect
  useEffect(() => {
    if (!jitsiJoined || !callStartedAt) return undefined;
    const interval = setInterval(() => {
      setCallElapsedSeconds(Math.max(1, Math.floor((getCurrentTimestamp() - callStartedAt) / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, [jitsiJoined, callStartedAt]);

  // Auth Handlers
  const handleSignIn = async (email, password) => {
    setAuthError('');
    if (!supabase) {
      setAuthError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to sign in.');
      return;
    }
    setAuthLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setAuthError(error.message);
      } else if (data?.user) {
        const prof = await fetchUserProfile(data.user.id, data.user.email, data.user.app_metadata?.role);
        setProfile(prof);
        if (!prof?.role) {
          setAuthError('Your account does not have an assigned admin, staff, or student role. Contact an administrator.');
        } else {
          await loadAcademyData(prof.role, prof, data.user.id);
          triggerToast(`Signed in as ${prof.role}`);
        }
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
      setAuthError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to create an account.');
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
    if (jitsiJoined) {
      await finishAndLogVideoCall();
    }
    if (supabase && session) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setProfile(null);
    setAuthError('');
    setActiveTab('overview');
  };

  // Role promotion in public.profiles (Admin only)
  const handleUpdateUserRole = async (userId, nextRole) => {
    const role = normalizeRole(nextRole);
    if (currentRole !== 'admin' || userId === session?.user?.id || !role || !supabase) return;
    const { error } = await supabase.from('profiles').update({ role }).eq('id', userId);
    if (error) {
      triggerToast(`Unable to update account role: ${error.message}`);
      return;
    }
    setProfilesList((prev) => prev.map((p) => (p.id === userId ? { ...p, role } : p)));
    triggerToast(`Updated user role to ${role}`);
  };

  // Students visible to current role
  const roleStudents = useMemo(() => {
    if (!session?.user?.id) return [];
    if (currentRole === 'admin') return students;
    if (currentRole === 'staff') return students.filter((student) => student.trainerId === session.user.id);
    if (currentRole === 'student') return students.filter((student) => student.userId === session.user.id);
    return [];
  }, [currentRole, session, students]);

  // Derived Metrics
  const stats = useMemo(() => {
    const totalStudents = roleStudents.length;
    const activeTrainers = staff.filter((member) => normalizeRole(member.role) === 'staff').length;
    const collectedRevenue = roleStudents
      .filter((s) => s.feeStatus === 'Paid')
      .reduce((acc, s) => acc + (Number(s.monthlyFee) || 0), 0);
    const pendingRevenue = roleStudents
      .filter((s) => s.feeStatus !== 'Paid')
      .reduce((acc, s) => acc + (Number(s.monthlyFee) || 0), 0);
    const attendanceRecords = roleStudents.filter(
      (student) => student.attendanceRate != null && Number.isFinite(Number(student.attendanceRate))
    );
    const avgAttendance = attendanceRecords.length
      ? Math.round(attendanceRecords.reduce((acc, student) => acc + Number(student.attendanceRate), 0) / attendanceRecords.length)
      : null;
    return { totalStudents, activeTrainers, collectedRevenue, pendingRevenue, avgAttendance };
  }, [roleStudents, staff]);

  const roleBatches = useMemo(() => {
    if (currentRole === 'admin') return batches;
    if (currentRole === 'staff') return batches.filter((batch) => batch.trainerId === session?.user?.id);
    const studentBatchIds = new Set(roleStudents.map((student) => student.batchId).filter(Boolean));
    return batches.filter((batch) => studentBatchIds.has(batch.id));
  }, [batches, currentRole, roleStudents, session]);

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

  // Video Call Logs filtered by Role:
  // - Admin: sees ALL sessions across Admin, Staff, and Students (with optional role filter)
  // - Staff: sees all sessions attended/conducted by this staff member
  // - Student: sees all sessions attended by this student
  const visibleCallLogs = useMemo(() => {
    if (currentRole === 'admin') {
      if (adminCallRoleFilter === 'All') return callLogs;
      return callLogs.filter((log) => log.participantRole === adminCallRoleFilter.toLowerCase());
    }

    return callLogs.filter((log) => log.userId && log.userId === session?.user?.id);
  }, [callLogs, currentRole, adminCallRoleFilter, session]);

  const totalCallSeconds = useMemo(
    () => visibleCallLogs.reduce((acc, log) => acc + (Number(log.durationSeconds) || 0), 0),
    [visibleCallLogs]
  );

  // Admin Summary by Participant (shows total duration per staff & student)
  const adminParticipantSummary = useMemo(() => {
    if (currentRole !== 'admin') return [];
    const map = new Map();
    callLogs.forEach((log) => {
      const key = `${log.participantRole}:${log.userId || log.participantName.toLowerCase()}`;
      const existing = map.get(key) || {
        key,
        name: log.participantName,
        role: log.participantRole,
        sessionsCount: 0,
        totalSeconds: 0
      };
      existing.sessionsCount += 1;
      existing.totalSeconds += Number(log.durationSeconds) || 0;
      map.set(key, existing);
    });
    return Array.from(map.values()).sort((a, b) => b.totalSeconds - a.totalSeconds);
  }, [callLogs, currentRole]);

  // Start / Stop & Log Video Call Duration
  const startVideoCallSession = (batchIdToJoin) => {
    const targetBatchId = batchIdToJoin || activeBatchId || currentLiveBatch?.id;
    if (!targetBatchId || !roleBatches.some((batch) => batch.id === targetBatchId)) {
      triggerToast('No class is assigned to your account.');
      return;
    }
    setActiveBatchId(targetBatchId);
    if (!jitsiJoined) {
      setCallStartedAt(getCurrentTimestamp());
      setCallElapsedSeconds(0);
      setJitsiJoined(true);
    }
  };

  const finishAndLogVideoCall = async () => {
    if (!jitsiJoined) return;
    const endTimeMs = getCurrentTimestamp();
    const startTimeMs = callStartedAt || endTimeMs;
    const durationSecs = Math.max(1, Math.round((endTimeMs - startTimeMs) / 1000));
    const batch = roleBatches.find((item) => item.id === activeBatchId) || currentLiveBatch;
    if (!batch) {
      setJitsiJoined(false);
      setCallStartedAt(null);
      return;
    }

    const newLog = {
      id: `call-${endTimeMs}`,
      userId: session?.user?.id || null,
      participantName: currentUserName,
      participantRole: currentRole,
      batchId: batch.id,
      batchName: batch.name,
      roomCode: batch.roomCode || '',
      sessionDate: new Date(endTimeMs).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      startedAt: new Date(startTimeMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endedAt: new Date(endTimeMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationSeconds: durationSecs
    };

    setJitsiJoined(false);
    setCallStartedAt(null);
    setCallElapsedSeconds(0);

    if (supabase && session) {
      const { error } = await supabase.from('class_sessions').insert({
          user_id: session.user.id,
          participant_name: newLog.participantName,
          participant_role: currentRole,
          batch_id: newLog.batchId,
          batch_name: newLog.batchName,
          room_code: newLog.roomCode,
          session_date: newLog.sessionDate,
          started_at: newLog.startedAt,
          ended_at: newLog.endedAt,
          duration_seconds: durationSecs
        });
      if (error) {
        triggerToast(`Unable to save classroom session: ${error.message}`);
      } else {
        setCallLogs((prev) => [newLog, ...prev]);
      }
    }

    triggerToast(`Video session ended • Logged duration: ${formatDuration(durationSecs)}`);
  };

  // Handlers
  const handleJoinClassroom = (batchId) => {
    const batch = roleBatches.find((item) => item.id === batchId);
    if (!batch) {
      triggerToast('This class is not assigned to your account.');
      return;
    }
    if (!batch.roomCode) {
      triggerToast('This class does not have a video room configured yet.');
      return;
    }
    startVideoCallSession(batchId);
    setActiveTab('classroom');
    triggerToast(`Joined Live Video Classroom: ${batch.name}`);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: getCurrentTimestamp(),
        sender: currentUserName,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: chatInput.trim()
      }
    ]);
    setChatInput('');
  };

  const handleMarkAttendance = async (studentId, status, targetBatchId = attendanceBatchId) => {
    if (!['admin', 'staff'].includes(currentRole) || !roleStudents.some((student) => student.id === studentId)) return;
    if (!roleBatches.some((batch) => batch.id === targetBatchId)) {
      triggerToast('This class is not assigned to your account.');
      return;
    }
    if (!attendanceReady) {
      triggerToast('Attendance data is still loading.');
      return;
    }
    if (!supabase || !session) {
      triggerToast('Attendance requires a connected account.');
      return;
    }

    const targetStudent = roleStudents.find((student) => student.id === studentId);
    const previousStatus = todayAttendance[studentId];
    const previouslyAttended = ['Present', 'Late'].includes(previousStatus);
    const currentlyAttended = ['Present', 'Late'].includes(status);
    const sessionDelta = Number(currentlyAttended) - Number(previouslyAttended);
    const nextSessionCount = Math.max(0, targetStudent.sessionsCompleted + sessionDelta);

    const { error } = await supabase.from('attendance').upsert(
      {
        student_id: studentId,
        batch_id: targetBatchId,
        session_date: sessionDate,
        status: status === 'Absent' ? 'Absent' : 'Present',
        marked_by: session.user.id
      },
      { onConflict: 'student_id,batch_id,session_date' }
    );
    if (error) {
      triggerToast(`Unable to save attendance: ${error.message}`);
      return;
    }

    setTodayAttendance((prev) => ({ ...prev, [studentId]: status }));
    if (sessionDelta !== 0) {
      const { error: progressError } = await supabase
        .from('students')
        .update({ sessions_completed: nextSessionCount })
        .eq('id', studentId);
      if (progressError) {
        triggerToast(`Attendance saved, but session progress could not be updated: ${progressError.message}`);
        return;
      }
      setStudents((prev) =>
        prev.map((student) => (student.id === studentId ? { ...student, sessionsCompleted: nextSessionCount } : student))
      );
    }
    triggerToast(`Attendance marked as ${status}`);
  };

  const handleRecordPayment = async (studentId) => {
    if (currentRole !== 'admin') return;
    const target = students.find((s) => s.id === studentId);
    if (!target || target.monthlyFee == null || !supabase || !session || !isUsingLiveDb) {
      triggerToast('A saved student with a monthly fee is required to record a payment.');
      return;
    }

    const paidDate = new Date().toISOString().slice(0, 10);
    const { error: studentError } = await supabase
      .from('students')
      .update({ fee_status: 'Paid' })
      .eq('id', studentId);
    if (studentError) {
      triggerToast(`Unable to update student fee status: ${studentError.message}`);
      return;
    }

    const { error: paymentError } = await supabase.from('payments').insert({
      student_id: studentId,
      trainer_id: target.trainerId,
      amount: target.monthlyFee,
      status: 'Paid',
      paid_date: paidDate
    });
    setStudents((prev) =>
      prev.map((student) => (student.id === studentId ? { ...student, feeStatus: 'Paid' } : student))
    );
    if (paymentError) {
      triggerToast(`Fee status updated, but payment history could not be saved: ${paymentError.message}`);
      return;
    }
    triggerToast('Payment recorded.');
  };

  const handleAddStudentSubmit = async (e) => {
    e.preventDefault();
    if (!newStudent.name.trim() || currentRole !== 'admin' || !supabase || !session) {
      triggerToast('Only an administrator can save student enrollments.');
      return;
    }

    const isUuid = (val) =>
      typeof val === 'string' &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);
    const assignedTrainer = staff.find(
      (member) => member.id === newStudent.trainerId && normalizeRole(member.role) === 'staff'
    );
    const assignedBatch = batches.find(
      (batch) => batch.id === newStudent.batchId && batch.trainerId === newStudent.trainerId
    );
    const linkedStudent = !newStudent.userId || profilesList.some(
      (userProfile) => userProfile.id === newStudent.userId && normalizeRole(userProfile.role) === 'student'
    );
    if (!assignedTrainer || !assignedBatch || !linkedStudent) {
      triggerToast('Choose a valid student account, trainer, and class assignment.');
      return;
    }

    const payload = {
      full_name: newStudent.name.trim(),
      user_id: isUuid(newStudent.userId) ? newStudent.userId : null,
      parent_phone: newStudent.parentPhone.trim() || null,
      abacus_level: newStudent.level,
      batch_id: isUuid(newStudent.batchId) ? newStudent.batchId : null,
      trainer_id: isUuid(newStudent.trainerId) ? newStudent.trainerId : null,
      sessions_completed: 0,
      monthly_fee: newStudent.monthlyFee === '' ? null : Number(newStudent.monthlyFee),
      fee_status: 'Pending'
    };

    const { data, error } = await supabase.from('students').insert(payload).select().single();
    if (error) {
      triggerToast(`Unable to save student: ${error.message}`);
      return;
    }

    const created = {
      id: data.id,
      userId: data.user_id || null,
      name: data.full_name || '',
      level: data.abacus_level || '',
      trainerId: data.trainer_id || null,
      batchId: data.batch_id || null,
      sessionsCompleted: data.sessions_completed ?? 0,
      totalCycleSessions: data.total_cycle_sessions ?? null,
      attendanceRate: data.attendance_rate ?? null,
      monthlyFee: data.monthly_fee == null ? null : Number(data.monthly_fee),
      feeStatus: data.fee_status || '',
      paymentMode: data.payment_mode || '',
      lastPaidDate: data.last_paid_date || '',
      parentPhone: data.parent_phone || ''
    };

    setStudents((prev) => [created, ...prev]);
    setIsUsingLiveDb(true);
    setShowAddStudentModal(false);
    setNewStudent({
      name: '',
      userId: '',
      level: '',
      trainerId: '',
      batchId: '',
      monthlyFee: '',
      parentPhone: ''
    });
    triggerToast(`${created.name} saved.`);
  };

  // Navigation filtered by Role
  const navItems = useMemo(() => {
    const all = [
      {
        id: 'overview',
        label: currentRole === 'admin' ? 'Admin Dashboard' : currentRole === 'staff' ? 'Teaching Dashboard' : 'My Learning Dashboard',
        icon: LayoutDashboard,
        roles: ['admin', 'staff', 'student']
      },
      { id: 'classroom', label: 'Live Video Classroom', icon: Video, roles: ['admin', 'staff', 'student'] },
      { id: 'students', label: 'Students & Levels', icon: Users, count: roleStudents.length, roles: ['admin', 'staff'] },
      { id: 'staff', label: 'Staff & Roles', icon: UserCheck, count: staff.length, roles: ['admin'] },
      { id: 'schedule', label: 'Class Timings', icon: Calendar, roles: ['admin', 'staff'] },
      {
        id: 'attendance',
        label: currentRole === 'student' ? 'My Attended Sessions' : 'Attendance & Call Logs',
        icon: ClipboardCheck,
        roles: ['admin', 'staff', 'student']
      },
      {
        id: 'payments',
        label: currentRole === 'student' ? 'My Fee Status' : 'Fees & Payments',
        icon: IndianRupee,
        roles: ['admin', 'student']
      }
    ];
    return all.filter((item) => item.roles.includes(currentRole));
  }, [currentRole, roleStudents.length, staff.length]);

  const visibleTab = navItems.some((item) => item.id === activeTab) ? activeTab : 'overview';
  const getTrainerName = (id) => staff.find((s) => s.id === id)?.name || '';

  const currentLiveBatch = roleBatches.find((batch) => batch.id === activeBatchId) || roleBatches[0] || null;
  const liveBatchStudents = currentLiveBatch
    ? roleStudents.filter((student) => student.batchId === currentLiveBatch.id)
    : [];
  const currentDateLabel = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date());

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm font-medium text-slate-600">
        Loading your account…
      </div>
    );
  }

  // Show the sign-in screen when there is no authenticated session.
  if (!session) {
    return (
      <AuthGateScreen
        authError={authError}
        authLoading={authLoading}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />
    );
  }

  if (session && !currentRole) {
    const profilePermissionDenied = authError?.toLowerCase().includes('permission denied for table profiles');
    const roleIsMissing = authError?.includes('does not have an assigned');
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
          <ShieldCheck className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h1 className="text-lg font-bold text-slate-900">
            {profilePermissionDenied ? 'Profile access blocked' : roleIsMissing || !authError ? 'Role assignment required' : 'Unable to load account'}
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            {profilePermissionDenied
              ? 'Sign-in succeeded, but Supabase blocked access to public.profiles. Apply the profile-access migration in supabase/migrations, then sign out and sign in again.'
              : authError || 'Your account does not have an assigned role. Contact an administrator to get access.'}
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            Sign Out
          </button>
        </div>
      </div>
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
            const isActive = visibleTab === item.id;
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
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
        {/* Top Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {navItems.find((n) => n.id === visibleTab)?.label || 'Dashboard Overview'}
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
                  {isUsingLiveDb ? 'Live data' : 'Data unavailable'}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              {currentDateLabel} • Evolve Kids Academy
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
              onClick={() => currentLiveBatch && handleJoinClassroom(currentLiveBatch.id)}
              disabled={!currentLiveBatch}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-sm transition cursor-pointer"
            >
              <Video className="w-4 h-4" />
              {currentRole === 'student' ? 'Join My Live Class' : 'Enter Live Classroom'}
            </button>
            {currentRole === 'admin' && (
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
        {visibleTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {currentRole !== 'student' ? (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {currentRole === 'admin' ? 'Enrolled Students' : 'My Assigned Students'}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900">{stats.totalStudents}</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {currentRole === 'admin' ? 'Academy-wide' : 'Assigned'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {currentRole === 'admin' ? 'Across the academy' : 'Assigned to your classes'}
                  </p>
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
                    {roleStudents[0]?.level || 'Not assigned'}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {getTrainerName(roleStudents[0]?.trainerId)
                      ? `Trainer: ${getTrainerName(roleStudents[0]?.trainerId)}`
                      : 'Your assigned level and trainer appear here.'}
                  </p>
                </div>
              )}

              {currentRole !== 'student' ? (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {currentRole === 'admin' ? 'Teaching Staff & Trainers' : 'My Assigned Batches'}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                      <UserCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {currentRole === 'admin' ? stats.activeTrainers : roleBatches.length}
                    </span>
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                      {currentRole === 'admin' ? 'Staff accounts' : 'Assigned'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {currentRole === 'admin' ? 'With staff access' : 'Available for your classes'}
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      My Sessions
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                      <ClipboardCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900">
                    {roleStudents[0]
                      ? `${roleStudents[0].sessionsCompleted}${roleStudents[0].totalCycleSessions ? ` / ${roleStudents[0].totalCycleSessions}` : ''}`
                      : 'No enrollment'}
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
                    {roleStudents[0]?.feeStatus || 'Not available'}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Monthly Fee: {roleStudents[0]?.monthlyFee == null
                      ? 'Not available'
                      : `₹${Number(roleStudents[0].monthlyFee).toLocaleString('en-IN')}`}
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
                  <div className="text-3xl font-extrabold text-slate-900">{roleBatches.length}</div>
                  <p className="text-xs text-slate-500 mt-2">Available classes</p>
                </div>
              )}

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {currentRole === 'admin' ? 'All Video Call Duration' : 'My Video Call Duration'}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {formatDuration(totalCallSeconds)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {visibleCallLogs.length} {visibleCallLogs.length === 1 ? 'session' : 'sessions'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {currentRole === 'admin'
                    ? 'Combined staff & student call time'
                    : currentRole === 'staff'
                    ? 'Total live teaching call time'
                    : stats.avgAttendance == null
                    ? 'Attendance data is not available'
                    : `Attendance rate: ${stats.avgAttendance}%`}
                </p>
              </div>
            </div>

            {/* Batches Panel */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {currentRole === 'student' ? 'My Class Schedule & Live Room' : 'Live & Upcoming Online Batches'}
                  </h3>
                  <p className="text-xs text-slate-500">Your role-specific classes and upcoming sessions.</p>
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
                {roleBatches.map((batch) => {
                  const enrolledCount = roleStudents.filter((student) => student.batchId === batch.id).length;
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
                          {batch.status && <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              isLive ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {batch.status}
                          </span>}
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
                {roleBatches.length === 0 && (
                  <p className="py-6 text-center text-sm text-slate-500">
                    No classes are assigned to your account yet.
                  </p>
                )}
              </div>
            </div>

            {/* Admin Per-Participant Total Duration Breakdown */}
            {currentRole === 'admin' && adminParticipantSummary.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
                <div className="mb-4">
                  <h3 className="text-base font-bold text-slate-900">
                    Total Video Call Time by Staff & Student
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cumulative live classroom duration per trainer and student
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {adminParticipantSummary.map((item) => (
                    <div key={item.key} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-slate-900 truncate">{item.name}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              item.role === 'admin'
                                ? 'bg-indigo-100 text-indigo-800'
                                : item.role === 'staff'
                                ? 'bg-teal-100 text-teal-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.role}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {item.sessionsCount} {item.sessionsCount === 1 ? 'session' : 'sessions'}
                          </span>
                        </div>
                      </div>
                      <div className="font-mono text-xs font-extrabold text-indigo-700 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shrink-0">
                        {formatDuration(item.totalSeconds)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Call Duration & Attended Sessions Log (Admin: All | Staff & Student: Own Sessions) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {currentRole === 'admin'
                      ? 'All Video Call Sessions & Durations (Admin Audit)'
                      : currentRole === 'staff'
                      ? 'My Attended & Conducted Sessions with Time Duration'
                      : 'My Attended Video Sessions & Time Duration'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {currentRole === 'admin'
                      ? 'Shows every live video call attended by all staff trainers and students'
                      : 'Automatically recorded whenever you join and leave a Jitsi live video room'}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {currentRole === 'admin' && (
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                      {['All', 'Staff', 'Student', 'Admin'].map((roleOpt) => (
                        <button
                          key={roleOpt}
                          type="button"
                          onClick={() => setAdminCallRoleFilter(roleOpt)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                            adminCallRoleFilter === roleOpt
                              ? 'bg-white text-indigo-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {roleOpt}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-800">
                    Total Time: {formatDuration(totalCallSeconds)}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {currentRole === 'admin' && <th className="py-3 px-4">Participant</th>}
                      {currentRole === 'admin' && <th className="py-3 px-4">Role</th>}
                      <th className="py-3 px-4">Batch / Live Class</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Time Window</th>
                      <th className="py-3 px-4 text-right">Call Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {visibleCallLogs.length === 0 ? (
                      <tr>
                        <td
                          colSpan={currentRole === 'admin' ? 6 : 4}
                          className="py-6 px-4 text-center text-slate-500"
                        >
                          No video calls recorded yet. Click <strong>Enter Live Classroom</strong> to start a session.
                        </td>
                      </tr>
                    ) : (
                      visibleCallLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/70">
                          {currentRole === 'admin' && (
                            <td className="py-3 px-4 font-bold text-slate-900">{log.participantName}</td>
                          )}
                          {currentRole === 'admin' && (
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                  log.participantRole === 'admin'
                                    ? 'bg-indigo-100 text-indigo-800'
                                    : log.participantRole === 'staff'
                                    ? 'bg-teal-100 text-teal-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {log.participantRole}
                              </span>
                            </td>
                          )}
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-800">{log.batchName}</div>
                            <div className="text-[11px] font-mono text-slate-400">{log.roomCode}</div>
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-700">{log.sessionDate}</td>
                          <td className="py-3 px-4 text-slate-600">
                            {log.startedAt} – {log.endedAt}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold">
                              <Clock className="w-3 h-3" />
                              {formatDuration(log.durationSeconds)}
                            </span>
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

        {/* ===================================================================== */}
        {/* TAB 2: INTEGRATED JITSI VIDEO CLASSROOM + SOROBAN + ANZAN            */}
        {/* ===================================================================== */}
        {visibleTab === 'classroom' && (
          <div className="space-y-5">
            <div className="bg-slate-900 text-white rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 border border-slate-800">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  {jitsiJoined ? 'LIVE CLASSROOM' : 'CLASSROOM'}
                </span>
                <select
                  value={activeBatchId}
                  onChange={(e) => setActiveBatchId(e.target.value)}
                  disabled={roleBatches.length === 0}
                  className="bg-slate-800 border border-slate-700 text-sm font-bold text-white rounded-lg px-3 py-1 outline-none"
                >
                  {roleBatches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.time})
                    </option>
                  ))}
                </select>
                <span className="text-xs font-mono text-slate-400">
                  Room: {currentLiveBatch?.roomCode || 'Not configured'}
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
                {jitsiJoined && (
                  <button
                    type="button"
                    onClick={async () => {
                      await finishAndLogVideoCall();
                      setActiveTab('overview');
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition cursor-pointer"
                  >
                    <PhoneOff className="w-4 h-4" />
                    <span>{currentRole === 'student' ? 'Leave Classroom' : 'End Class'}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-2 space-y-5">
                {/* Real Embedded Jitsi Meet Room */}
                {currentLiveBatch?.roomCode ? (
                  <JitsiVideoRoom
                    roomCode={currentLiveBatch.roomCode}
                    displayName={currentUserName}
                    isJoined={jitsiJoined}
                    elapsedSeconds={callElapsedSeconds}
                    onJoinToggle={() => startVideoCallSession(currentLiveBatch.id)}
                    onEndClass={finishAndLogVideoCall}
                  />
                ) : (
                  <div className="min-h-[260px] rounded-2xl border border-slate-200 bg-white flex items-center justify-center p-6 text-center">
                    <p className="text-sm text-slate-600">
                      {currentLiveBatch
                        ? 'A video room has not been configured for this class.'
                        : 'No classes are assigned to your account.'}
                    </p>
                  </div>
                )}

                {/* Interactive Digital Soroban */}
                <InteractiveSoroban />
              </div>

              {/* Right Column: Student list and session notes */}
              <div className="space-y-5 flex flex-col">
                <MentalMathFlashcard />

                {currentRole !== 'student' && (
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                      Students in this class
                    </h4>
                    <div className="space-y-2">
                      {liveBatchStudents.map((stu) => (
                        <div key={stu.id} className="flex items-center justify-between text-xs bg-slate-50 px-3 py-2 rounded-xl">
                          <span className="font-bold text-slate-800">{stu.name}</span>
                        </div>
                      ))}
                      {liveBatchStudents.length === 0 && (
                        <p className="py-4 text-center text-xs text-slate-500">No students are assigned to this class.</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col flex-1 min-h-[260px]">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">Classroom Notes</h4>
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      Local only
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
                    {chatMessages.length === 0 && (
                      <p className="py-6 text-center text-xs text-slate-500">
                        No notes have been added during this session.
                      </p>
                    )}
                  </div>

                  <form onSubmit={handleSendChat} className="p-3 border-t border-slate-100 flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Add a note for this session..."
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
        {/* TAB 3: STUDENTS & LEVELS                                              */}
        {/* ===================================================================== */}
        {visibleTab === 'students' && currentRole !== 'student' && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder="Search student name or Abacus level..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none"
                >
                  <option value="All">All Levels</option>
                  {[...new Set(roleStudents.map((student) => student.level).filter(Boolean))].sort().map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
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
                    {[...new Set(roleStudents.map((student) => student.feeStatus).filter(Boolean))].sort().map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-3.5 px-4">Student & Age</th>
                      <th className="py-3.5 px-4">Abacus Level</th>
                      <th className="py-3.5 px-4">Assigned Trainer</th>
                      <th className="py-3.5 px-4">Session Progress</th>
                      {currentRole === 'admin' && <th className="py-3.5 px-4">Fee Status</th>}
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredStudents.map((stu) => {
                      const pct = stu.totalCycleSessions
                        ? Math.min(100, Math.round((stu.sessionsCompleted / stu.totalCycleSessions) * 100))
                        : null;
                      return (
                        <tr key={stu.id} className="hover:bg-slate-50/70 transition">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{stu.name}</div>
                            <div className="text-xs text-slate-500">
                              {stu.age != null ? `Age ${stu.age}` : ''}
                              {currentRole === 'admin' && stu.parentPhone ? ` • ${stu.parentPhone}` : ''}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                              <Award className="w-3.5 h-3.5" />
                              {stu.level}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-800 text-xs">{getTrainerName(stu.trainerId)}</div>
                            <div className="text-[11px] text-slate-400">
                              {roleBatches.find((batch) => batch.id === stu.batchId)?.days || ''}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-between text-xs font-semibold mb-1">
                              <span>
                                {stu.totalCycleSessions
                                  ? `${stu.sessionsCompleted}/${stu.totalCycleSessions} Sessions`
                                  : `${stu.sessionsCompleted} recorded`}
                              </span>
                              <span className="text-slate-400">
                                {stu.attendanceRate == null ? '' : `${stu.attendanceRate}% Att.`}
                              </span>
                            </div>
                            {pct != null && (
                              <div className="w-32 h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full rounded-full bg-teal-500" style={{ width: `${pct}%` }} />
                              </div>
                            )}
                          </td>
                          {currentRole === 'admin' && <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                                stu.feeStatus === 'Paid'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : stu.feeStatus === 'Due Soon'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {stu.feeStatus || 'Not recorded'}
                              {stu.monthlyFee == null ? '' : ` (₹${Number(stu.monthlyFee).toLocaleString('en-IN')})`}
                            </span>
                          </td>}
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
                    {filteredStudents.length === 0 && (
                      <tr>
                        <td colSpan={currentRole === 'admin' ? 6 : 5} className="py-8 text-center text-sm text-slate-500">
                          No assigned students match these filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 4: STAFF & ROLES                                                  */}
        {/* ===================================================================== */}
        {visibleTab === 'staff' && currentRole === 'admin' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Staff Accounts & Permissions</h3>
                <p className="text-xs text-slate-500">
                  Review staff assignments and manage account roles.
                </p>
              </div>
            </div>

            {/* Supabase Account Role Manager (Admin Only) */}
            {currentRole === 'admin' && profilesList.length > 0 && (
              <div className="bg-white rounded-2xl border border-indigo-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-indigo-600" />
                      Supabase Account Roles (`public.profiles`)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Promote signed-up trainers to <strong>staff</strong> or keep learners as <strong>student</strong>
                    </p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase">
                        <th className="py-2.5 px-3">Name</th>
                        <th className="py-2.5 px-3">Email</th>
                        <th className="py-2.5 px-3">Assigned Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {profilesList.map((prof) => (
                        <tr key={prof.id}>
                          <td className="py-2.5 px-3 font-bold text-slate-900">{prof.full_name || prof.email}</td>
                          <td className="py-2.5 px-3 text-slate-600">{prof.email}</td>
                          <td className="py-2.5 px-3">
                            <select
                              value={normalizeRole(prof.role) || ''}
                              onChange={(e) => handleUpdateUserRole(prof.id, e.target.value)}
                              disabled={prof.id === session?.user?.id}
                              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-bold text-slate-800 outline-none"
                            >
                              {!normalizeRole(prof.role) && <option value="">Unassigned</option>}
                              <option value="student">student</option>
                              <option value="staff">staff</option>
                              <option value="admin">admin</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {staff.map((member) => {
                const assignedStudents = students.filter((s) => s.trainerId === member.id);
                const assignedBatches = batches.filter((batch) => batch.trainerId === member.id);

                return (
                  <div
                    key={member.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-12 h-12 rounded-2xl ${member.avatarColor} text-white font-extrabold flex items-center justify-center text-base shadow-sm`}
                          >
                            {member.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-bold text-base text-slate-900">{member.name}</h4>
                            <p className="text-xs font-medium text-slate-500">{member.role}</p>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                          {member.role}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {member.specialties.map((spec) => (
                          <span
                            key={spec}
                            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-center">
                      <div className="bg-slate-50 rounded-xl p-2.5">
                        <div className="text-xs text-slate-500">Students</div>
                        <div className="text-base font-extrabold text-slate-900">{assignedStudents.length}</div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2.5">
                        <div className="text-xs text-slate-500">Assigned Classes</div>
                        <div className="text-base font-extrabold text-slate-900">{assignedBatches.length}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {staff.length === 0 && (
                <p className="col-span-full py-8 text-center text-sm text-slate-500">
                  No staff accounts are available yet.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 5: CLASS TIMINGS & ONLINE BATCH SCHEDULE                          */}
        {/* ===================================================================== */}
        {visibleTab === 'schedule' && currentRole !== 'student' && (
          <div className="space-y-5">
            <div className="bg-indigo-950 text-white rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  {currentRole === 'admin' ? 'Academy Schedule' : 'Your Teaching Schedule'}
                </span>
                <h3 className="text-lg font-extrabold mt-0.5">Assigned classes and meeting details</h3>
              </div>
              <button
                type="button"
                onClick={() => currentLiveBatch && handleJoinClassroom(currentLiveBatch.id)}
                disabled={!currentLiveBatch}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 text-xs font-extrabold transition shrink-0 cursor-pointer"
              >
                Open Assigned Class
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roleBatches.map((batch) => {
                const batchStudents = roleStudents.filter((student) => student.batchId === batch.id);
                return (
                  <div
                    key={batch.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700">
                          {batch.days}
                        </span>
                        <span className="text-xs font-mono font-semibold text-slate-400">
                          {batch.roomCode || 'No room configured'}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900">{batch.name}</h4>
                      <p className="text-sm font-semibold text-teal-700 mt-1 flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {batch.time}
                      </p>

                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        <span>
                          Trainer: <strong className="text-slate-900">{getTrainerName(batch.trainerId) || 'Not assigned'}</strong>
                        </span>
                        <span>
                          Enrolled: <strong className="text-slate-900">{batchStudents.length} Students</strong>
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleJoinClassroom(batch.id)}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Video className="w-4 h-4" />
                      Start Live Video & Digital Abacus
                    </button>
                  </div>
                );
              })}
              {roleBatches.length === 0 && (
                <p className="col-span-full py-8 text-center text-sm text-slate-500">
                  No classes are assigned to your account yet.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 6: SESSION ATTENDANCE TRACKER & CALL DURATIONS                    */}
        {/* ===================================================================== */}
        {visibleTab === 'attendance' && (
          <div className="space-y-6">
            {currentRole !== 'student' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Session Attendance</h3>
                    <p className="text-xs text-slate-500">
                      Record attendance for a selected class and date.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={attendanceBatchId}
                      onChange={(e) => {
                        setTodayAttendance({});
                        setAttendanceReady(false);
                        setAttendanceBatchId(e.target.value);
                      }}
                      className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none"
                    >
                      {roleBatches.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={sessionDate}
                      onChange={(e) => {
                        setTodayAttendance({});
                        setAttendanceReady(false);
                        setSessionDate(e.target.value);
                      }}
                      className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {roleStudents
                    .filter((s) => s.batchId === attendanceBatchId)
                    .map((stu) => {
                      const status = todayAttendance[stu.id] || '';
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
                              {stu.totalCycleSessions
                                ? `${stu.sessionsCompleted} / ${stu.totalCycleSessions} sessions`
                                : `${stu.sessionsCompleted} recorded sessions`}
                              {' • Attendance: '}
                              {stu.attendanceRate == null ? 'Not available' : `${stu.attendanceRate}%`}
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
                                  disabled={!attendanceReady}
                                  onClick={() => handleMarkAttendance(stu.id, opt)}
                                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition disabled:opacity-50 cursor-pointer ${styles}`}
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

            {/* Video Call Duration History (Admin: All | Staff & Student: Own Attended Sessions) */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {currentRole === 'admin'
                      ? 'All Video Call Durations (Staff & Students)'
                      : currentRole === 'staff'
                      ? 'My Attended & Conducted Sessions with Time Duration'
                      : 'Sessions Attended & Video Call Time Duration'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Detailed start time, end time, and exact call duration per live session
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {currentRole === 'admin' && (
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                      {['All', 'Staff', 'Student', 'Admin'].map((roleOpt) => (
                        <button
                          key={roleOpt}
                          type="button"
                          onClick={() => setAdminCallRoleFilter(roleOpt)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                            adminCallRoleFilter === roleOpt
                              ? 'bg-white text-indigo-900 shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {roleOpt}
                        </button>
                      ))}
                    </div>
                  )}
                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    Cumulative Time: {formatDuration(totalCallSeconds)}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {currentRole === 'admin' && <th className="py-3.5 px-4">Participant</th>}
                      {currentRole === 'admin' && <th className="py-3.5 px-4">Role</th>}
                      <th className="py-3.5 px-4">Batch</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Start – End</th>
                      <th className="py-3.5 px-4 text-right">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {visibleCallLogs.length === 0 ? (
                      <tr>
                        <td
                          colSpan={currentRole === 'admin' ? 6 : 4}
                          className="py-6 px-4 text-center text-slate-500"
                        >
                          No video calls recorded yet. Click <strong>Enter Live Classroom</strong> to start a session.
                        </td>
                      </tr>
                    ) : (
                      visibleCallLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/70">
                          {currentRole === 'admin' && (
                            <td className="py-3.5 px-4 font-bold text-slate-900">{log.participantName}</td>
                          )}
                          {currentRole === 'admin' && (
                            <td className="py-3.5 px-4 uppercase font-bold text-slate-600">{log.participantRole}</td>
                          )}
                          <td className="py-3.5 px-4 font-semibold text-slate-800">{log.batchName}</td>
                          <td className="py-3.5 px-4 text-slate-600">{log.sessionDate}</td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {log.startedAt} – {log.endedAt}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-indigo-700">
                            {formatDuration(log.durationSeconds)}
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

        {/* ===================================================================== */}
        {/* TAB 7: FEES & PAYMENTS                                               */}
        {/* ===================================================================== */}
        {visibleTab === 'payments' && currentRole !== 'staff' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  {currentRole === 'admin' ? 'Student Fee Ledger' : 'My Fee Status'}
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
                          {stu.totalCycleSessions
                            ? `${stu.sessionsCompleted} / ${stu.totalCycleSessions} Sessions`
                            : `${stu.sessionsCompleted} recorded sessions`}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {stu.monthlyFee == null ? 'Not available' : `₹${Number(stu.monthlyFee).toLocaleString('en-IN')}`}
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
                            {stu.feeStatus || 'Not recorded'}
                          </span>
                        </td>
                        {currentRole === 'admin' && (
                          <td className="py-3.5 px-4 text-right">
                            {stu.feeStatus !== 'Paid' && stu.monthlyFee != null ? (
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
                    {roleStudents.length === 0 && (
                      <tr>
                        <td colSpan={currentRole === 'admin' ? 6 : 5} className="py-8 text-center text-sm text-slate-500">
                          No student fee records are available.
                        </td>
                      </tr>
                    )}
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
      {showAddStudentModal && currentRole === 'admin' && (
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
                  placeholder="Student full name"
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Abacus Level</label>
                <input
                  type="text"
                  required
                  value={newStudent.level}
                  onChange={(e) => setNewStudent({ ...newStudent, level: e.target.value })}
                  placeholder="Level"
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
                    required
                    value={newStudent.trainerId}
                    required
                    onChange={(e) => setNewStudent({ ...newStudent, trainerId: e.target.value, batchId: '' })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                  >
                    <option value="">Select a trainer</option>
                    {staff.filter((member) => normalizeRole(member.role) === 'staff').map((st) => (
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
                    min="0"
                    required
                    value={newStudent.monthlyFee}
                    onChange={(e) => setNewStudent({ ...newStudent, monthlyFee: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assign Batch</label>
                <select
                  required
                  value={newStudent.batchId}
                  onChange={(e) => setNewStudent({ ...newStudent, batchId: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                >
                  <option value="">Select a class</option>
                  {batches.filter((batch) => batch.trainerId === newStudent.trainerId).map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.days} • {b.time})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Phone</label>
                <input
                  type="tel"
                  value={newStudent.parentPhone}
                  onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                />
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

    </div>
  );
}