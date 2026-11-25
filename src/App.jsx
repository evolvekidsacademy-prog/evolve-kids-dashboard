import React, { useState, useMemo, useEffect } from 'react';
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
  Filter,
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
  Bell,
  Menu,
  Play,
  BookOpen,
  Calculator
} from 'lucide-react';

// --- INITIAL DATA ---
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
    sharePercent: 100, // Owner keeps 100% of direct batches
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
    roomCode: 'EVK-ALPHA-101'
  },
  {
    id: 'b-2',
    name: 'Junior Sparks (Level 1–2)',
    days: 'Tue & Thu',
    time: '06:00 PM – 06:50 PM',
    level: 'Level 1–2',
    trainerId: 'st-2',
    status: 'Starting in 45m',
    roomCode: 'EVK-SPARK-202'
  },
  {
    id: 'b-3',
    name: 'Speed Anzan Masters (Level 5–7)',
    days: 'Wed & Fri',
    time: '05:30 PM – 06:20 PM',
    level: 'Level 5–7',
    trainerId: 'st-3',
    status: 'Scheduled',
    roomCode: 'EVK-ANZAN-303'
  },
  {
    id: 'b-4',
    name: 'Little Beads Foundation (Level 1)',
    days: 'Sat & Sun',
    time: '10:30 AM – 11:20 AM',
    level: 'Level 1',
    trainerId: 'st-4',
    status: 'Scheduled',
    roomCode: 'EVK-BEADS-404'
  }
];

// --- INTERACTIVE 13-ROD JAPANESE SOROBAN ABACUS COMPONENT ---
function InteractiveSoroban() {
  // 13 rods: index 0 is leftmost (10^12), index 12 is rightmost (10^0 units)
  // For ease of reading for kids, let's label the 7 rightmost rods clearly from Millions to Units, or full 13 rods with unit markers!
  const ROD_COUNT = 11;
  const [heavenBeads, setHeavenBeads] = useState(Array(ROD_COUNT).fill(false)); // true = active (pushed down to beam, value 5)
  const [earthBeads, setEarthBeads] = useState(Array(ROD_COUNT).fill(0)); // 0 to 4 beads pushed up to beam (value 1 each)
  const [showPlaceValues, setShowPlaceValues] = useState(true);

  const toggleHeaven = (rodIdx) => {
    setHeavenBeads((prev) => {
      const next = [...prev];
      next[rodIdx] = !next[rodIdx];
      return next;
    });
  };

  const setEarthCount = (rodIdx, beadIndex) => {
    // beadIndex is 0..3 from top (closest to beam) to bottom
    setEarthBeads((prev) => {
      const next = [...prev];
      const current = prev[rodIdx];
      // If clicking an already raised bead (beadIndex < current), lower it and all below it
      if (beadIndex < current) {
        next[rodIdx] = beadIndex;
      } else {
        // Raise this bead and all above it
        next[rodIdx] = beadIndex + 1;
      }
      return next;
    });
  };

  const resetAbacus = () => {
    setHeavenBeads(Array(ROD_COUNT).fill(false));
    setEarthBeads(Array(ROD_COUNT).fill(0));
  };

  // Calculate numeric value
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
                Interactive Demo Mode
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
            onClick={() => setShowPlaceValues(!showPlaceValues)}
            className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            {showPlaceValues ? 'Hide Units' : 'Show Units'}
          </button>
          <button
            onClick={resetAbacus}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear (0)
          </button>
        </div>
      </div>

      {/* Soroban Wooden Frame */}
      <div className="relative bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950 border-4 border-amber-700/80 rounded-xl p-3 overflow-x-auto select-none shadow-inner">
        <div className="min-w-[540px] flex justify-between items-stretch relative">
          {Array.from({ length: ROD_COUNT }).map((_, rodIdx) => {
            const isHeavenActive = heavenBeads[rodIdx];
            const activeEarth = earthBeads[rodIdx];
            const rodDigit = (isHeavenActive ? 5 : 0) + activeEarth;
            // Unit dot markers on every 3rd rod from right (units, thousands, millions, billions)
            const hasUnitDot = (ROD_COUNT - 1 - rodIdx) % 3 === 0;

            return (
              <div key={rodIdx} className="flex-1 flex flex-col items-center relative group">
                {/* Top digit indicator */}
                <div className="text-xs font-mono font-bold text-amber-300/90 mb-1 h-4">
                  {rodDigit}
                </div>

                {/* Heaven Deck (Upper 5-bead) */}
                <div className="relative w-full h-14 flex flex-col items-center justify-start pt-1">
                  {/* Vertical Rod */}
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

                {/* Reckoning Beam (Horizontal Divider) */}
                <div className="w-full h-2.5 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 border-y border-amber-950 z-20 flex items-center justify-center">
                  {hasUnitDot && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
                </div>

                {/* Earth Deck (Lower 4 beads) */}
                <div className="relative w-full h-28 flex flex-col items-center justify-end pb-1 gap-1">
                  {/* Vertical Rod */}
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

                {/* Place Value Label */}
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
          onClick={generateSequence}
          className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold transition cursor-pointer"
        >
          New Drill
        </button>
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold transition cursor-pointer"
        >
          {showAnswer ? 'Hide Answer' : 'Reveal Answer'}
        </button>
      </div>
    </div>
  );
}

// --- MAIN APPLICATION ---
export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core State
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [toast, setToast] = useState(null);

  // Classroom State
  const [activeBatchId, setActiveBatchId] = useState('b-1');
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

  // Derived Metrics
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const activeTrainers = staff.length;
    const collectedRevenue = students
      .filter((s) => s.feeStatus === 'Paid')
      .reduce((acc, s) => acc + s.monthlyFee, 0);
    const pendingRevenue = students
      .filter((s) => s.feeStatus !== 'Paid')
      .reduce((acc, s) => acc + s.monthlyFee, 0);
    const avgAttendance = Math.round(
      students.reduce((acc, s) => acc + s.attendanceRate, 0) / (students.length || 1)
    );
    return { totalStudents, activeTrainers, collectedRevenue, pendingRevenue, avgAttendance };
  }, [students, staff]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.level.toLowerCase().includes(studentSearch.toLowerCase());
      const matchesLevel = levelFilter === 'All' || s.level.includes(levelFilter);
      const matchesTrainer = trainerFilter === 'All' || s.trainerId === trainerFilter;
      const matchesFee = feeFilter === 'All' || s.feeStatus === feeFilter;
      return matchesSearch && matchesLevel && matchesTrainer && matchesFee;
    });
  }, [students, studentSearch, levelFilter, trainerFilter, feeFilter]);

  // Handlers
  const handleJoinClassroom = (batchId) => {
    setActiveBatchId(batchId);
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
        sender: 'Ranjitha Ganesh (Trainer)',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: chatInput.trim()
      }
    ]);
    setChatInput('');
  };

  const handleMarkAttendance = (studentId, status) => {
    const prevStatus = todayAttendance[studentId];
    setTodayAttendance((prev) => ({ ...prev, [studentId]: status }));

    // Update student's completed session count dynamically
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
        const nextRate = status === 'Absent' ? Math.max(70, s.attendanceRate - 2) : Math.min(100, s.attendanceRate + 1);
        return { ...s, sessionsCompleted: nextSessions, attendanceRate: nextRate };
      })
    );
    triggerToast(`Attendance marked as ${status}`);
  };

  const handleRecordPayment = (studentId) => {
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
    triggerToast('Payment recorded & new 8-session cycle updated!');
  };

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudent.name.trim()) return;
    const created = {
      id: `stu-${Date.now()}`,
      name: newStudent.name.trim(),
      age: Number(newStudent.age) || 8,
      level: newStudent.level,
      trainerId: newStudent.trainerId,
      batchId: newStudent.batchId,
      sessionsCompleted: 0,
      totalCycleSessions: 8,
      attendanceRate: 100,
      monthlyFee: Number(newStudent.monthlyFee) || 1500,
      feeStatus: 'Paid',
      paymentMode: 'UPI',
      lastPaidDate: '24 Nov 2026',
      parentPhone: newStudent.parentPhone || '+91 98400 00000'
    };
    setStudents((prev) => [created, ...prev]);
    setShowAddStudentModal(false);
    setNewStudent({ name: '', age: 8, level: 'Level 1', trainerId: 'st-2', batchId: 'b-2', monthlyFee: 1500, parentPhone: '' });
    triggerToast(`${created.name} enrolled successfully!`);
  };

  const handleAddStaffSubmit = (e) => {
    e.preventDefault();
    if (!newStaff.name.trim()) return;
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
    triggerToast(`Trainer ${created.name} onboarded!`);
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'classroom', label: 'Live Video Classroom', icon: Video, badge: 'LIVE' },
    { id: 'students', label: 'Students & Levels', icon: Users, count: students.length },
    { id: 'staff', label: 'Staff & Trainers', icon: UserCheck, count: staff.length },
    { id: 'schedule', label: 'Class Timings', icon: Calendar },
    { id: 'attendance', label: 'Attendance Tracker', icon: ClipboardCheck },
    { id: 'payments', label: 'Fees & 50–50 Payouts', icon: IndianRupee }
  ];

  const getTrainerName = (id) => staff.find((s) => s.id === id)?.name || 'Unassigned';

  const currentLiveBatch = batches.find((b) => b.id === activeBatchId) || batches[0];
  const liveBatchStudents = students.filter((s) => s.batchId === currentLiveBatch.id);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-fade-in">
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
            <div className="text-[11px] text-indigo-300">Abacus Online Academy</div>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-indigo-900/80 text-white"
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
            <p className="text-xs text-teal-300 font-medium">Abacus & Brain Gym Portal</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
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

        {/* Founder Profile Footer */}
        <div className="p-4 m-3 rounded-2xl bg-indigo-900/60 border border-indigo-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-sm">
              RG
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">Ranjitha Ganesh</p>
              <p className="text-[11px] text-indigo-300 truncate">Founder & Master Trainer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
        {/* Top Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Tuesday, 24 Nov 2026 • Evolve Kids Online Abacus Operations
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleJoinClassroom('b-1')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-sm transition cursor-pointer"
            >
              <Video className="w-4 h-4" />
              Enter Live Classroom
            </button>
            <button
              onClick={() => setShowAddStudentModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Enroll Student
            </button>
          </div>
        </header>

        {/* ===================================================================== */}
        {/* TAB 1: EXECUTIVE OVERVIEW DASHBOARD                                   */}
        {/* ===================================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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
                    +3 this month
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Across Levels 1 to 8 (Grandmaster)</p>
              </div>

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
                    30 classes/wk
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">1 Lead Trainer + {stats.activeTrainers - 1} Certified Staff</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Monthly Fee Collected
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">
                    ₹{stats.collectedRevenue.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-amber-600 font-medium mt-2">
                  ₹{stats.pendingRevenue.toLocaleString('en-IN')} pending / cycle renewal
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Avg. Batch Attendance
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900">{stats.avgAttendance}%</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    8-session cycle
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2">2 online sessions/week per batch</p>
              </div>
            </div>

            {/* Middle Split: Live & Today's Classes + Level Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Online Batches */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Live & Upcoming Online Batches</h3>
                    <p className="text-xs text-slate-500">Launch integrated video room with built-in Soroban abacus</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    Full Timetable <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {batches.map((batch) => {
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
                                isLive
                                  ? 'bg-rose-100 text-rose-700'
                                  : 'bg-amber-100 text-amber-800'
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
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-slate-400" />
                              {enrolledCount} Students
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleJoinClassroom(batch.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 transition cursor-pointer ${
                            isLive
                              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                              : 'bg-white hover:bg-indigo-50 text-indigo-700 border border-indigo-200'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          Join Classroom
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Abacus Curriculum Level Breakdown */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Abacus Level Distribution</h3>
                  <p className="text-xs text-slate-500 mb-4">Active student progression across levels</p>

                  <div className="space-y-3.5">
                    {[
                      { label: 'Foundation (Level 1–2)', count: students.filter((s) => s.level.includes('Level 1') || s.level.includes('Level 2')).length, color: 'bg-teal-500' },
                      { label: 'Intermediate (Level 3–4)', count: students.filter((s) => s.level.includes('Level 3') || s.level.includes('Level 4')).length, color: 'bg-indigo-500' },
                      { label: 'Advanced (Level 5–6)', count: students.filter((s) => s.level.includes('Level 5') || s.level.includes('Level 6')).length, color: 'bg-violet-500' },
                      { label: 'Grandmaster (Level 7–8)', count: students.filter((s) => s.level.includes('Level 7') || s.level.includes('Level 8')).length, color: 'bg-amber-500' }
                    ].map((tier) => {
                      const pct = Math.round((tier.count / (students.length || 1)) * 100);
                      return (
                        <div key={tier.label}>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-slate-700">{tier.label}</span>
                            <span className="text-slate-900">{tier.count} students ({pct}%)</span>
                          </div>
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${tier.color} rounded-full`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Fee Renewal Alert Box */}
                <div className="mt-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-amber-900">
                        {students.filter((s) => s.feeStatus !== 'Paid').length} Students Completed 8-Session Cycle
                      </p>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        Monthly fee renewal & 50% staff payout calculation ready.
                      </p>
                      <button
                        onClick={() => setActiveTab('payments')}
                        className="mt-2 text-xs font-bold text-amber-900 underline hover:text-amber-700 cursor-pointer"
                      >
                        Review Fee Tracker →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 2: INTEGRATED LIVE VIDEO CLASSROOM + DIGITAL SOROBAN              */}
        {/* ===================================================================== */}
        {activeTab === 'classroom' && (
          <div className="space-y-5">
            {/* Classroom Top Control Strip */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  ON AIR
                </span>
                <div>
                  <div className="flex items-center gap-2">
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
                    <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                      Room: {currentLiveBatch.roomCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Audio / Video Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMicOn(!micOn)}
                  className={`p-2.5 rounded-xl border transition cursor-pointer ${
                    micOn
                      ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                      : 'bg-rose-600 border-rose-500 text-white'
                  }`}
                  title={micOn ? 'Mute Mic' : 'Unmute Mic'}
                >
                  {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setCamOn(!camOn)}
                  className={`p-2.5 rounded-xl border transition cursor-pointer ${
                    camOn
                      ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700'
                      : 'bg-rose-600 border-rose-500 text-white'
                  }`}
                  title={camOn ? 'Turn Camera Off' : 'Turn Camera On'}
                >
                  {camOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setScreenSharing(!screenSharing);
                    triggerToast(!screenSharing ? 'Sharing Digital Soroban screen with students' : 'Stopped screen share');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    screenSharing
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <MonitorUp className="w-4 h-4" />
                  <span>{screenSharing ? 'Sharing Soroban' : 'Share Screen'}</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('overview');
                    triggerToast('Ended live session & saved attendance log');
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition cursor-pointer"
                >
                  <PhoneOff className="w-4 h-4" />
                  <span>End Class</span>
                </button>
              </div>
            </div>

            {/* Classroom Main Workspace: Left (Video Grid + Soroban) | Right (Anzan + Live Chat) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-2 space-y-5">
                {/* Video Tiles Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Trainer Tile */}
                  <div className="relative aspect-video bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl border-2 border-teal-400 overflow-hidden flex flex-col items-center justify-center p-3 shadow-md">
                    <div className="w-12 h-12 rounded-full bg-teal-500 text-slate-950 font-black flex items-center justify-center text-base mb-1.5 shadow">
                      RG
                    </div>
                    <span className="text-xs font-bold text-white text-center">
                      {getTrainerName(currentLiveBatch.trainerId)}
                    </span>
                    <span className="text-[10px] text-teal-300 font-semibold">Host • Trainer</span>
                    <div className="absolute top-2 right-2 bg-slate-950/70 p-1 rounded-lg">
                      {micOn ? <Mic className="w-3 h-3 text-emerald-400" /> : <MicOff className="w-3 h-3 text-rose-400" />}
                    </div>
                  </div>

                  {/* Student Video Tiles */}
                  {(liveBatchStudents.length ? liveBatchStudents : students.slice(0, 3)).map((stu) => {
                    const hasHand = !!raisedHands[stu.id];
                    return (
                      <div
                        key={stu.id}
                        className={`relative aspect-video bg-slate-900 rounded-2xl border overflow-hidden flex flex-col items-center justify-center p-3 ${
                          hasHand ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-700'
                        }`}
                      >
                        <div className="w-11 h-11 rounded-full bg-indigo-600/80 text-white font-bold flex items-center justify-center text-sm mb-1.5">
                          {stu.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <span className="text-xs font-bold text-white text-center truncate w-full">
                          {stu.name}
                        </span>
                        <span className="text-[10px] text-slate-400">{stu.level}</span>

                        {hasHand && (
                          <button
                            onClick={() => setRaisedHands((prev) => ({ ...prev, [stu.id]: false }))}
                            title="Lower Student Hand"
                            className="absolute top-2 left-2 bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md text-[10px] font-extrabold flex items-center gap-1 cursor-pointer"
                          >
                            <Hand className="w-3 h-3" /> Doubt
                          </button>
                        )}
                        <div className="absolute bottom-2 right-2 flex gap-1">
                          <button
                            onClick={() => handleMarkAttendance(stu.id, 'Present')}
                            title="Quick Mark Present"
                            className="px-1.5 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 text-[10px] font-semibold cursor-pointer"
                          >
                            ✓ Present
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Live Interactive Digital Soroban */}
                <InteractiveSoroban />
              </div>

              {/* Right Column: Mental Math Flashcards + Classroom Chat */}
              <div className="space-y-5 flex flex-col">
                <MentalMathFlashcard />

                {/* Live Class Chat */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col flex-1 min-h-[290px]">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">Classroom Chat & Answers</h4>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {liveBatchStudents.length + 1} Online
                    </span>
                  </div>

                  <div className="flex-1 p-3.5 space-y-2.5 overflow-y-auto max-h-[240px]">
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
                      placeholder="Send formula or question..."
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
        {/* TAB 3: STUDENTS DIRECTORY & LEVEL TRACKER                             */}
        {/* ===================================================================== */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            {/* Search & Filters */}
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
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Abacus Level</th>
                    <th className="py-3.5 px-4">Assigned Trainer</th>
                    <th className="py-3.5 px-4">Monthly Cycle (8 Sessions)</th>
                    <th className="py-3.5 px-4">Attendance</th>
                    <th className="py-3.5 px-4">Fee Status</th>
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
                          <div className="text-xs text-slate-500">Age {stu.age} yrs • {stu.parentPhone}</div>
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
                              <span>
                                {stu.sessionsCompleted} / {stu.totalCycleSessions} sessions
                              </span>
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
                        <td className="py-3.5 px-4">
                          <span className="text-xs font-bold text-slate-800">{stu.attendanceRate}%</span>
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
                            {stu.feeStatus} (₹{stu.monthlyFee})
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
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
        {/* TAB 4: STAFF & TRAINERS MANAGEMENT                                    */}
        {/* ===================================================================== */}
        {activeTab === 'staff' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div>
                <h3 className="text-base font-bold text-slate-900">Certified Abacus Trainers & Staff</h3>
                <p className="text-xs text-slate-500">
                  Manage trainer batches, student allocations, and 50–50 revenue sharing
                </p>
              </div>
              <button
                onClick={() => setShowAddStaffModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Onboard New Trainer
              </button>
            </div>

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
                            <p className="text-[11px] text-slate-400 mt-0.5">{member.email} • {member.phone}</p>
                          </div>
                        </div>

                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                            member.status === 'In Live Class'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {member.status}
                        </span>
                      </div>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {member.specialties.map((spec) => (
                          <span
                            key={spec}
                            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics Strip */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
                      <div className="bg-slate-50 rounded-xl p-2.5">
                        <div className="text-lg font-extrabold text-slate-900">{assignedStudents.length}</div>
                        <div className="text-[11px] text-slate-500 font-medium">Students</div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2.5">
                        <div className="text-lg font-extrabold text-slate-900">{member.classesThisWeek}</div>
                        <div className="text-[11px] text-slate-500 font-medium">Classes / Wk</div>
                      </div>
                      <div className="bg-indigo-50 rounded-xl p-2.5">
                        <div className="text-lg font-extrabold text-indigo-700">
                          ₹{trainerPayout.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-indigo-600 font-semibold">
                          {member.sharePercent}% Share
                        </div>
                      </div>
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
        {activeTab === 'schedule' && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Weekly Online Abacus Batch Schedule</h3>
                  <p className="text-xs text-slate-500">
                    All batches run 2 sessions per week (50 mins each • 8 sessions/month cycle)
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700">
                  IST (Asia/Kolkata) Timezone
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
                          <span>
                            Enrolled ({batchStudents.length}):{' '}
                            {batchStudents.map((s) => s.name).join(', ') || 'Open for enrollment'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-slate-200/70">
                        <button
                          onClick={() => handleJoinClassroom(batch.id)}
                          className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <Video className="w-3.5 h-3.5" />
                          Launch Video Room
                        </button>
                        <button
                          onClick={() => {
                            setAttendanceBatchId(batch.id);
                            setActiveTab('attendance');
                          }}
                          className="py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition cursor-pointer"
                        >
                          Mark Attendance
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 6: SESSION ATTENDANCE TRACKER                                     */}
        {/* ===================================================================== */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Session Attendance & 8-Class Cycle Tracker</h3>
                <p className="text-xs text-slate-500">
                  Marking a student Present/Late automatically increments their 8-session monthly cycle
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
                          Cycle Progress: <strong className="text-slate-800">{stu.sessionsCompleted} / 8 sessions</strong> • Overall Rate: {stu.attendanceRate}%
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
        {/* TAB 7: FEE & PAYMENT TRACKER + 50-50 TRAINER PAYOUTS                  */}
        {/* ===================================================================== */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            {/* Trainer 50-50 Revenue Share Summary */}
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
                        {trStudents.length} Paid Students • {tr.sharePercent}% Split
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

            {/* Student Fee Ledger */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Student Monthly Fee Ledger (8-Session Cycles)</h3>
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
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {students.map((stu) => (
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
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {stu.paymentMode} • {stu.lastPaidDate}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {stu.feeStatus !== 'Paid' ? (
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => triggerToast(`WhatsApp payment reminder sent to ${stu.name}'s parent!`)}
                                className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition cursor-pointer"
                              >
                                Remind
                              </button>
                              <button
                                onClick={() => handleRecordPayment(stu.id)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                              >
                                Mark Paid
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs font-semibold text-emerald-600 inline-flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Settled
                            </span>
                          )}
                        </td>
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
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-slate-900">Enroll New Abacus Student</h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age (Years)</label>
                  <input
                    type="number"
                    min="4"
                    max="16"
                    value={newStudent.age}
                    onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Abacus Level</label>
                  <select
                    value={newStudent.level}
                    onChange={(e) => setNewStudent({ ...newStudent, level: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                  >
                    <option>Level 1</option>
                    <option>Level 2</option>
                    <option>Level 3</option>
                    <option>Level 4</option>
                    <option>Level 5</option>
                    <option>Level 6</option>
                    <option>Level 7</option>
                    <option>Level 8 (Grandmaster)</option>
                  </select>
                </div>
              </div>

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
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
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
      {/* MODAL: ONBOARD NEW STAFF TRAINER                                      */}
      {/* ===================================================================== */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-slate-900">Onboard Abacus Staff Trainer</h3>
              <button
                onClick={() => setShowAddStaffModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Certified Levels / Specialties</label>
                <input
                  type="text"
                  value={newStaff.specialties}
                  onChange={(e) => setNewStaff({ ...newStaff, specialties: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                    placeholder="+91 98400 ..."
                    className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-sm cursor-pointer"
                >
                  Add Trainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}