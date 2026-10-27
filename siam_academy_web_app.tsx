import React, { useState, useEffect } from 'react';
import {
  BookOpen, GraduationCap, Award, Users, CheckCircle2, ChevronRight, Search, 
  Download, Printer, PlayCircle, Calendar, FileText, Bell, Lock, UserCheck, 
  LogOut, Plus, Trash2, Edit, Shield, Menu, X, ArrowRight, Filter, 
  Eye, Check, Sparkles, LayoutDashboard, Video, FileCheck, Layers, AlertCircle
} from 'lucide-react';

// --- INITIAL DEFAULT SEED DATA ---
const initialCourses = [
  {
    id: 'c1',
    title: 'Class 11 HSC Science Regular Batch',
    category: 'Class 11',
    price: '৳ 4,500 / month',
    duration: '12 Months',
    subjects: ['Physics', 'Chemistry', 'Higher Math', 'ICT'],
    description: 'Comprehensive baseline program designed for HSC first-year science students with foundation building and practical lab sessions.',
    enrolledCount: 1420
  },
  {
    id: 'c2',
    title: 'Class 12 HSC Science Final Boost',
    category: 'Class 12',
    price: '৳ 5,000 / month',
    duration: '10 Months',
    subjects: ['Physics', 'Chemistry', 'Higher Math', 'Biology', 'ICT'],
    description: 'Intensive prep focused on Board Exam mastering, previous year question analysis, and chapter-wise mock tests.',
    enrolledCount: 1850
  },
  {
    id: 'c3',
    title: 'BUET & Engineering Admission Prep',
    category: 'Admission',
    price: '৳ 18,500 (Full)',
    duration: '4 Months',
    subjects: ['Advanced Physics', 'Advanced Chemistry', 'Advanced Mathematics'],
    description: 'Rigorous analytical problem-solving program tailored for BUET, CKRUET, and Top Public Engineering Universities.',
    enrolledCount: 960
  },
  {
    id: 'c4',
    title: 'Medical & Dental College Admission Care',
    category: 'Admission',
    price: '৳ 16,500 (Full)',
    duration: '4 Months',
    subjects: ['Biology Spec', 'Organic Chem', 'Physics Concept', 'General Knowledge & English'],
    description: 'Memory-mapping & rapid daily test system tailored specifically for Armed Forces Medical, MATS & Public Medical colleges.',
    enrolledCount: 1120
  }
];

const initialNotices = [
  {
    id: 'n1',
    title: 'HSC 2026 Model Test Schedule & Seat Plan Released',
    date: '2026-10-24',
    category: 'Exam Routine',
    priority: 'Urgent',
    description: 'The upcoming offline model test starts from Nov 2nd. Students must bring their printed admit cards.'
  },
  {
    id: 'n2',
    title: 'Practical ICT Lab Class on C Programming (Pointers & Arrays)',
    date: '2026-10-20',
    category: 'Academic',
    priority: 'Normal',
    description: 'Special practical session will be held in Lab 2. Shift A: 9 AM, Shift B: 2 PM.'
  },
  {
    id: 'n3',
    title: 'Engineering Physics Special Problem Solving Class by BUET Mentor',
    date: '2026-10-15',
    category: 'Class Update',
    priority: 'High',
    description: 'Live Interactive Masterclass covering Vector & Rotational Dynamics in Room 402.'
  }
];

const initialResults = [
  {
    roll: '1001',
    name: 'Tanvir Hossain',
    batch: 'Class 12 HSC Science',
    examTitle: 'HSC Mid-Term Model Test 2026',
    marks: { Physics: 92, Chemistry: 88, Math: 95, ICT: 90 },
    gpa: '5.00',
    status: 'Passed',
    rank: 1
  },
  {
    roll: '1002',
    name: 'Nusrat Jahan',
    batch: 'Engineering Admission Care',
    examTitle: 'BUET Special Mock Test - 01',
    marks: { Physics: 85, Chemistry: 91, Math: 89, ICT: 88 },
    gpa: '5.00',
    status: 'Passed',
    rank: 2
  },
  {
    roll: '1003',
    name: 'Rafiqul Islam',
    batch: 'Class 11 HSC Science',
    examTitle: 'HSC Foundation Assessment',
    marks: { Physics: 64, Chemistry: 72, Math: 58, ICT: 70 },
    gpa: '3.75',
    status: 'Passed',
    rank: 18
  }
];

const initialVideos = [
  {
    id: 'v1',
    title: 'C Programming Masterclass: Pointers & Arrays Explained',
    subject: 'ICT',
    duration: '45 mins',
    url: 'https://www.youtube.com/embed/zuegQmMdy8M',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80'
  },
  {
    id: 'v2',
    title: 'HTML5 & Responsive Web Structure Demo',
    subject: 'ICT',
    duration: '38 mins',
    url: 'https://www.youtube.com/embed/html_demo',
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80'
  },
  {
    id: 'v3',
    title: '3D Simulation: Electromagnetic Induction & Alternating Current',
    subject: 'Physics',
    duration: '52 mins',
    url: 'https://www.youtube.com/embed/phy_demo',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80'
  },
  {
    id: 'v4',
    title: 'Organic Chemistry: Reaction Mechanisms & Benzene Derivatives',
    subject: 'Chemistry',
    duration: '60 mins',
    url: 'https://www.youtube.com/embed/chem_demo',
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80'
  }
];

export default function App() {
  // --- LOCAL STORAGE STATE SYNCHRONIZATION ---
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'courses', 'notices', 'result', 'student', 'admin'
  const [roleMode, setRoleMode] = useState('public'); // 'public', 'student', 'admin'
  
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('siam_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('siam_notices');
    return saved ? JSON.parse(saved) : initialNotices;
  });

  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem('siam_results');
    return saved ? JSON.parse(saved) : initialResults;
  });

  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem('siam_videos');
    return saved ? JSON.parse(saved) : initialVideos;
  });

  // Notifications Toast State
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('siam_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('siam_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('siam_results', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem('siam_videos', JSON.stringify(videos));
  }, [videos]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // --- RESULT SEARCH STATE ---
  const [searchRoll, setSearchRoll] = useState('');
  const [searchedResult, setSearchedResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleResultSearch = (e) => {
    e.preventDefault();
    if (!searchRoll.trim()) {
      showToast('Please enter a valid Roll Number', 'error');
      return;
    }
    const found = results.find(r => r.roll.trim() === searchRoll.trim());
    setSearchedResult(found || null);
    setHasSearched(true);
    if (!found) {
      showToast('No record found for this roll number', 'error');
    } else {
      showToast(`Marksheet generated for Roll: ${found.roll}`);
    }
  };

  // --- ENROLLMENT MODAL STATE ---
  const [selectedCourseForEnroll, setSelectedCourseForEnroll] = useState(null);
  const [enrollForm, setEnrollForm] = useState({ name: '', phone: '', batch: 'Class 11' });

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    showToast(`Enrollment request submitted for ${enrollForm.name}! Our admission team will call ${enrollForm.phone}.`);
    setSelectedCourseForEnroll(null);
    setEnrollForm({ name: '', phone: '', batch: 'Class 11' });
  };

  // --- STUDENT PORTAL STATE ---
  const [loggedInStudent, setLoggedInStudent] = useState(null);
  const [studentLoginForm, setStudentLoginForm] = useState({ roll: '1001', pass: '123456' });

  const handleStudentLogin = (e) => {
    e.preventDefault();
    const found = results.find(r => r.roll === studentLoginForm.roll);
    if (found) {
      setLoggedInStudent({ ...found, email: `student${found.roll}@siamacademy.edu`, phone: '+880 1712-345678' });
      setRoleMode('student');
      setActiveTab('student');
      showToast(`Welcome back, ${found.name}!`);
    } else {
      showToast('Invalid Roll Number! Try demo roll: 1001', 'error');
    }
  };

  // --- ADMIN PORTAL STATE ---
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  
  // Admin Form States
  const [newNotice, setNewNotice] = useState({ title: '', category: 'Academic', priority: 'Normal', description: '' });
  const [newStudentResult, setNewStudentResult] = useState({
    roll: '', name: '', batch: 'Class 11 HSC Science', examTitle: 'Weekly Practice Exam',
    physics: 80, chemistry: 80, math: 80, ict: 80
  });
  const [newCourse, setNewCourse] = useState({ title: '', category: 'Class 11', price: '৳ 5,000', duration: '10 Months', subjects: '', description: '' });

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPass === 'siam2026' || adminPass === 'admin') {
      setIsAdminAuthenticated(true);
      setRoleMode('admin');
      setActiveTab('admin');
      showToast('Authenticated as SIAM Academy Super Admin!');
    } else {
      showToast('Incorrect Admin Password! Try: admin', 'error');
    }
  };

  const handleAddNotice = (e) => {
    e.preventDefault();
    if (!newNotice.title) return;
    const item = {
      id: 'n' + Date.now(),
      ...newNotice,
      date: new Date().toISOString().split('T')[0]
    };
    setNotices([item, ...notices]);
    setNewNotice({ title: '', category: 'Academic', priority: 'Normal', description: '' });
    showToast('Notice published successfully!');
  };

  const handleDeleteNotice = (id) => {
    setNotices(notices.filter(n => n.id !== id));
    showToast('Notice removed.');
  };

  const handleAddResult = (e) => {
    e.preventDefault();
    if (!newStudentResult.roll || !newStudentResult.name) return;
    const p = Number(newStudentResult.physics);
    const c = Number(newStudentResult.chemistry);
    const m = Number(newStudentResult.math);
    const i = Number(newStudentResult.ict);
    const avg = (p + c + m + i) / 4;
    let gpa = '3.50';
    if (avg >= 80) gpa = '5.00';
    else if (avg >= 70) gpa = '4.00';
    else if (avg >= 60) gpa = '3.50';
    else gpa = '3.00';

    const item = {
      roll: newStudentResult.roll,
      name: newStudentResult.name,
      batch: newStudentResult.batch,
      examTitle: newStudentResult.examTitle,
      marks: { Physics: p, Chemistry: c, Math: m, ICT: i },
      gpa: gpa,
      status: avg >= 40 ? 'Passed' : 'Failed',
      rank: results.length + 1
    };

    setResults([item, ...results]);
    setNewStudentResult({ roll: '', name: '', batch: 'Class 11 HSC Science', examTitle: 'Weekly Practice Exam', physics: 80, chemistry: 80, math: 80, ict: 80 });
    showToast(`Result published for Roll: ${item.roll}`);
  };

  const handleDeleteResult = (roll) => {
    setResults(results.filter(r => r.roll !== roll));
    showToast(`Record for Roll ${roll} deleted.`);
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title) return;
    const item = {
      id: 'c' + Date.now(),
      ...newCourse,
      subjects: newCourse.subjects.split(',').map(s => s.trim()),
      enrolledCount: 0
    };
    setCourses([...courses, item]);
    setNewCourse({ title: '', category: 'Class 11', price: '৳ 5,000', duration: '10 Months', subjects: '', description: '' });
    showToast('New Course added to catalog!');
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
    showToast('Course deleted.');
  };

  // Video Player Modal State
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filters for public courses
  const [courseCategoryFilter, setCourseCategoryFilter] = useState('All');
  const filteredCourses = courseCategoryFilter === 'All' 
    ? courses 
    : courses.filter(c => c.category === courseCategoryFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-white transform transition-all animate-bounce ${
          toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
          <span className="font-medium text-sm">{toast.msg}</span>
        </div>
      )}

      {/* --- TOP BRAND & ROLE SWITCHER BAR --- */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center border-b border-slate-800 gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Admissions Open for HSC 2026 & Engineering Care
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline">Hotline: +880 1700-000000</span>
        </div>
        
        {/* Quick View / Role Switcher */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
          <span className="text-slate-400 text-[10px] uppercase font-bold px-2">Mode:</span>
          <button 
            onClick={() => { setRoleMode('public'); setActiveTab('home'); }}
            className={`px-3 py-1 rounded-md transition font-medium text-xs ${roleMode === 'public' ? 'bg-indigo-600 text-white shadow' : 'hover:text-white'}`}
          >
            Public View
          </button>
          <button 
            onClick={() => {
              if (loggedInStudent) {
                setRoleMode('student');
                setActiveTab('student');
              } else {
                setActiveTab('result'); // prompts login or search
                showToast('Login to Student Portal or use roll search', 'error');
              }
            }}
            className={`px-3 py-1 rounded-md transition font-medium text-xs ${roleMode === 'student' ? 'bg-emerald-600 text-white shadow' : 'hover:text-white'}`}
          >
            Student Portal {loggedInStudent ? `(${loggedInStudent.name.split(' ')[0]})` : ''}
          </button>
          <button 
            onClick={() => {
              if (isAdminAuthenticated) {
                setRoleMode('admin');
                setActiveTab('admin');
              } else {
                setRoleMode('admin_login');
                setActiveTab('admin');
              }
            }}
            className={`px-3 py-1 rounded-md transition font-medium text-xs ${roleMode === 'admin' ? 'bg-amber-600 text-white shadow' : 'hover:text-white'}`}
          >
            Admin Panel
          </button>
        </div>
      </div>

      {/* --- HEADER NAVIGATION --- */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('home'); setRoleMode('public'); }}>
            <div className="w-12 h-12 bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 block leading-tight">SIAM <span className="text-indigo-600">ACADEMY</span></span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">Class 11-12 & Admission Care</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-slate-600">
            <button 
              onClick={() => { setActiveTab('home'); setRoleMode('public'); }}
              className={`px-4 py-2 rounded-xl transition ${activeTab === 'home' && roleMode === 'public' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:text-indigo-600 hover:bg-slate-50'}`}
            >
              Home
            </button>
            <button 
              onClick={() => { setActiveTab('courses'); setRoleMode('public'); }}
              className={`px-4 py-2 rounded-xl transition ${activeTab === 'courses' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:text-indigo-600 hover:bg-slate-50'}`}
            >
              Our Courses
            </button>
            <button 
              onClick={() => { setActiveTab('notices'); setRoleMode('public'); }}
              className={`px-4 py-2 rounded-xl transition ${activeTab === 'notices' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:text-indigo-600 hover:bg-slate-50'}`}
            >
              Notice Board
            </button>
            <button 
              onClick={() => { setActiveTab('result'); setRoleMode('public'); }}
              className={`px-4 py-2 rounded-xl transition ${activeTab === 'result' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:text-indigo-600 hover:bg-slate-50'}`}
            >
              Result Checker
            </button>
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            {loggedInStudent ? (
              <button 
                onClick={() => { setRoleMode('student'); setActiveTab('student'); }}
                className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition"
              >
                <UserCheck className="w-4 h-4" /> Student Dashboard
              </button>
            ) : (
              <button 
                onClick={() => { setActiveTab('courses'); setRoleMode('public'); }}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-indigo-100 hover:shadow-indigo-200 hover:from-indigo-700 hover:to-indigo-800 transition"
              >
                Enroll Now
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-xl">
          <button 
            onClick={() => { setActiveTab('home'); setRoleMode('public'); setMobileMenuOpen(false); }}
            className="w-full text-left px-4 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-indigo-50"
          >
            Home
          </button>
          <button 
            onClick={() => { setActiveTab('courses'); setRoleMode('public'); setMobileMenuOpen(false); }}
            className="w-full text-left px-4 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-indigo-50"
          >
            Our Courses
          </button>
          <button 
            onClick={() => { setActiveTab('notices'); setRoleMode('public'); setMobileMenuOpen(false); }}
            className="w-full text-left px-4 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-indigo-50"
          >
            Notice Board
          </button>
          <button 
            onClick={() => { setActiveTab('result'); setRoleMode('public'); setMobileMenuOpen(false); }}
            className="w-full text-left px-4 py-2.5 rounded-lg text-slate-700 font-medium hover:bg-indigo-50"
          >
            Result Checker
          </button>
        </div>
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1">
        
        {/* ================= PUBLIC HOMEPAGE ================= */}
        {activeTab === 'home' && roleMode === 'public' && (
          <div>
            {/* HERO SECTION */}
            <section className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white py-16 lg:py-24 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Premium Academic & Admission Coaching
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                    Build Your Foundation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-indigo-300">HSC & Public Universities</span>
                  </h1>
                  <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                    SIAM ACADEMY offers specialized physical & digital masterclasses for HSC Science (Class 11 & 12), BUET Engineering Prep, and Medical Care with proven high-yielding results.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                    <button 
                      onClick={() => setActiveTab('courses')}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 transition flex items-center justify-center gap-2"
                    >
                      Explore Courses <ChevronRight className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setActiveTab('result')}
                      className="w-full sm:w-auto px-8 py-4 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold rounded-2xl transition flex items-center justify-center gap-2"
                    >
                      <Search className="w-4 h-4" /> Check Student Result
                    </button>
                  </div>
                </div>

                {/* Hero Feature Showcase Card */}
                <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
                  <div className="absolute -top-4 -right-4 bg-amber-500 text-slate-950 font-black text-xs px-4 py-1.5 rounded-full shadow-lg">
                    ★ #1 Rated Science Care
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-400" /> Featured Interactive Labs
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/50 flex items-start gap-4 hover:border-indigo-500/50 transition">
                      <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                        <Video className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-100 text-sm">C Programming & ICT Practical</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Hands-on coding, dynamic array logic, and live compiler demos.</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/50 flex items-start gap-4 hover:border-indigo-500/50 transition">
                      <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-100 text-sm">3D Physics & Chem Visualizer</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Deep 3D conceptual clarity on Electro-Magnetism and Organic Chem.</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/50 flex items-start gap-4 hover:border-indigo-500/50 transition">
                      <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                        <FileCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-100 text-sm">OMR Daily Assessment</h4>
                        <p className="text-xs text-slate-400 mt-0.5">Instant performance analysis, nationwide rank list & progress card.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK STATS CARD BAR */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100">
                <div className="text-center p-2 border-r border-slate-100 last:border-0">
                  <p className="text-3xl sm:text-4xl font-black text-indigo-600">5,000+</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Enrolled Alumni</p>
                </div>
                <div className="text-center p-2 border-r border-slate-100 last:border-0">
                  <p className="text-3xl sm:text-4xl font-black text-emerald-600">98.5%</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">HSC A+ Pass Rate</p>
                </div>
                <div className="text-center p-2 border-r border-slate-100 last:border-0">
                  <p className="text-3xl sm:text-4xl font-black text-amber-600">420+</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">BUET & Med Selections</p>
                </div>
                <div className="text-center p-2">
                  <p className="text-3xl sm:text-4xl font-black text-purple-600">15+</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">Expert Mentors</p>
                </div>
              </div>
            </section>

            {/* CURATED COURSES HIGHLIGHT */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Premier Batches</h2>
                  <p className="text-slate-500 text-sm mt-1">Carefully structured curriculum for Class 11, 12 and University Admission Care.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('courses')}
                  className="mt-4 md:mt-0 text-indigo-600 font-semibold text-sm hover:text-indigo-700 flex items-center gap-1"
                >
                  View All Courses <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.slice(0, 4).map((course) => (
                  <div key={course.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl transition group">
                    <div>
                      <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full mb-3">
                        {course.category}
                      </span>
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition leading-snug">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                        <div className="flex justify-between text-xs text-slate-600">
                          <span>Duration:</span>
                          <span className="font-semibold text-slate-800">{course.duration}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-600">
                          <span>Fee:</span>
                          <span className="font-bold text-indigo-600">{course.price}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedCourseForEnroll(course)}
                      className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-sm rounded-xl transition"
                    >
                      Enroll Now
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* NOTICE & SEARCH HIGHLIGHT */}
            <section className="bg-slate-100 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
                
                {/* Recent Notices */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-indigo-600" /> Latest Academy Announcements
                    </h3>
                    <button onClick={() => setActiveTab('notices')} className="text-indigo-600 text-xs font-bold hover:underline">
                      See Notice Board
                    </button>
                  </div>

                  <div className="space-y-4">
                    {notices.slice(0, 3).map((notice) => (
                      <div key={notice.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                            notice.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {notice.priority}
                          </span>
                          <span className="text-xs text-slate-400">{notice.date}</span>
                        </div>
                        <h4 className="font-semibold text-slate-900 text-sm mt-2">{notice.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{notice.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Result Checker Widget */}
                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                  <div>
                    <div className="w-10 h-10 bg-indigo-500/20 text-indigo-300 rounded-xl flex items-center justify-center mb-4 border border-indigo-400/30">
                      <Search className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight">Instant Result Portal</h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Check your exam marksheet, GPA, subject-wise scores, and rank instantly using your Roll number.
                    </p>

                    <form onSubmit={(e) => { handleResultSearch(e); setActiveTab('result'); }} className="mt-6 space-y-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 uppercase">Student Roll No.</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 1001" 
                          value={searchRoll}
                          onChange={(e) => setSearchRoll(e.target.value)}
                          className="w-full mt-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-400"
                        />
                      </div>
                      <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-indigo-600/30">
                        View Marksheet
                      </button>
                    </form>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-6 text-center">
                    Demo Student Roll: <span className="font-mono text-amber-300 font-bold">1001</span> or <span className="font-mono text-amber-300 font-bold">1002</span>
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= COURSE CATALOG VIEW ================= */}
        {activeTab === 'courses' && roleMode === 'public' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Academic & Admission Programs</h1>
              <p className="text-slate-500 text-sm mt-2">Select your targeted batch below to view full curriculum, timings, and fee structures.</p>
              
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                {['All', 'Class 11', 'Class 12', 'Admission'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCourseCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      courseCategoryFilter === cat 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full">
                        {course.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        <Users className="w-3.5 h-3.5" /> {course.enrolledCount} Enrolled
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 leading-snug">{course.title}</h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{course.description}</p>

                    <div className="mt-6 space-y-2">
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Covered Subjects:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {course.subjects.map((sub, i) => (
                          <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Course Duration</span>
                        <span className="text-xs font-semibold text-slate-800">{course.duration}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Fee</span>
                        <span className="text-base font-black text-indigo-600">{course.price}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedCourseForEnroll(course)}
                    className="mt-8 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    Enroll In This Batch <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= NOTICE BOARD VIEW ================= */}
        {activeTab === 'notices' && roleMode === 'public' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900">Official Notice Board</h1>
                <p className="text-slate-500 text-sm mt-1">Class schedules, exam seat plans, routines, and emergency notices.</p>
              </div>
            </div>

            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                        notice.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-indigo-50 text-indigo-700'
                      }`}>
                        {notice.priority} Priority
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        {notice.category}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Published: {notice.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{notice.title}</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">{notice.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= RESULT SEARCH & MARKSHEET VIEW ================= */}
        {activeTab === 'result' && roleMode === 'public' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Search Box */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm mb-8">
              <h2 className="text-2xl font-black text-slate-900 mb-2">Student Result Search</h2>
              <p className="text-slate-500 text-sm mb-6">Enter your registered Roll Number to fetch official term results.</p>
              
              <form onSubmit={handleResultSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Enter Roll Number (e.g. 1001, 1002)" 
                    value={searchRoll}
                    onChange={(e) => setSearchRoll(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium focus:outline-none focus:border-indigo-600 focus:bg-white transition"
                  />
                </div>
                <button 
                  type="submit" 
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl transition shadow-md"
                >
                  Search Result
                </button>
              </form>

              <div className="mt-4 flex gap-4 text-xs text-slate-500">
                <span>Try Demo Rolls:</span>
                <button onClick={() => { setSearchRoll('1001'); }} className="text-indigo-600 font-bold hover:underline">1001 (Tanvir)</button>
                <button onClick={() => { setSearchRoll('1002'); }} className="text-indigo-600 font-bold hover:underline">1002 (Nusrat)</button>
                <button onClick={() => { setSearchRoll('1003'); }} className="text-indigo-600 font-bold hover:underline">1003 (Rafiq)</button>
              </div>
            </div>

            {/* MARKSHEET DISPLAY */}
            {hasSearched && searchedResult && (
              <div className="bg-white rounded-3xl border border-slate-300 shadow-xl overflow-hidden print:shadow-none">
                
                {/* Marksheet Header */}
                <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-8 border-b border-indigo-900 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                      <GraduationCap className="w-5 h-5" /> SIAM ACADEMY OFFICIAL ACADEMIC MARKSHEET
                    </div>
                    <h2 className="text-2xl font-black mt-1 text-white">{searchedResult.examTitle}</h2>
                    <p className="text-xs text-slate-300 mt-1">Batch: {searchedResult.batch}</p>
                  </div>
                  <button 
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition border border-indigo-400/30"
                  >
                    <Printer className="w-4 h-4" /> Print / PDF
                  </button>
                </div>

                {/* Student Info Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-slate-50 border-b border-slate-200 text-sm">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">Student Name</span>
                    <span className="font-bold text-slate-800">{searchedResult.name}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">Roll Number</span>
                    <span className="font-bold font-mono text-indigo-600">{searchedResult.roll}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">Overall GPA</span>
                    <span className="font-bold text-emerald-600">{searchedResult.gpa}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-bold block">Merit Rank</span>
                    <span className="font-bold text-amber-600">#{searchedResult.rank}</span>
                  </div>
                </div>

                {/* Subject Wise Marks Table */}
                <div className="p-6">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase">
                        <th className="py-3">Subject Name</th>
                        <th className="py-3 text-center">Full Marks</th>
                        <th className="py-3 text-center">Obtained Marks</th>
                        <th className="py-3 text-right">Grade Point</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {Object.entries(searchedResult.marks).map(([subject, mark]) => (
                        <tr key={subject}>
                          <td className="py-3.5 font-semibold text-slate-800">{subject}</td>
                          <td className="py-3.5 text-center text-slate-500">100</td>
                          <td className="py-3.5 text-center font-bold text-indigo-600">{mark}</td>
                          <td className="py-3.5 text-right font-semibold text-slate-700">
                            {mark >= 80 ? '5.00 (A+)' : mark >= 70 ? '4.00 (A)' : mark >= 60 ? '3.50 (A-)' : '3.00 (B)'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Footer Status */}
                  <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-slate-400">Final Result Status: </span>
                      <span className="ml-2 font-black text-xs px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full uppercase">
                        {searchedResult.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400">Verified by SIAM ACADEMY Controller of Examination</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STUDENT PORTAL DASHBOARD ================= */}
        {roleMode === 'student' && (
          <div className="bg-slate-100 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Student Header */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                    {loggedInStudent ? loggedInStudent.name[0] : 'S'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-black text-slate-900">{loggedInStudent?.name}</h1>
                      <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">Active Enrolled</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Roll: <span className="font-bold text-slate-700 font-mono">{loggedInStudent?.roll}</span> | Batch: <span className="font-bold text-indigo-600">{loggedInStudent?.batch}</span>
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => { setLoggedInStudent(null); setRoleMode('public'); setActiveTab('home'); }}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  <LogOut className="w-4 h-4" /> Log Out
                </button>
              </div>

              {/* Main Student Portal Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Left Column: Recorded Classes & Practical Labs */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <PlayCircle className="w-5 h-5 text-indigo-600" /> Video Masterclasses & Lab Demos
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {videos.map((vid) => (
                        <div key={vid.id} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-400 transition group">
                          <div className="relative aspect-video bg-slate-900">
                            <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                            <button 
                              onClick={() => setActiveVideoModal(vid)}
                              className="absolute inset-0 flex items-center justify-center bg-slate-900/40 group-hover:bg-indigo-600/30 transition text-white"
                            >
                              <PlayCircle className="w-12 h-12 text-white drop-shadow-md" />
                            </button>
                            <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-900/80 text-white text-[10px] font-bold rounded">
                              {vid.duration}
                            </span>
                          </div>
                          <div className="p-4">
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
                              {vid.subject}
                            </span>
                            <h3 className="font-bold text-slate-900 text-sm mt-2 line-clamp-1">{vid.title}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Routine & Practical Schedule */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-indigo-600" /> Weekly Class & Routine Schedule
                    </h2>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div>
                          <p className="font-bold text-sm text-slate-800">Physics 2nd Paper: Electrostatics</p>
                          <p className="text-xs text-slate-500">Every Sun & Tue | 10:00 AM - 11:30 AM</p>
                        </div>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">Room 301</span>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div>
                          <p className="font-bold text-sm text-slate-800">ICT Lab: HTML & C Programming</p>
                          <p className="text-xs text-slate-500">Every Mon & Wed | 02:00 PM - 04:00 PM</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">Computer Lab</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Student Assessment Overview */}
                <div className="space-y-8">
                  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" /> Recent Exam Marks
                    </h3>

                    {loggedInStudent?.marks ? (
                      <div className="space-y-3">
                        {Object.entries(loggedInStudent.marks).map(([sub, mark]) => (
                          <div key={sub} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                            <span className="text-slate-600 font-medium">{sub}</span>
                            <span className="font-black text-indigo-600">{mark} / 100</span>
                          </div>
                        ))}
                        <div className="pt-2 flex justify-between items-center font-bold text-sm">
                          <span className="text-slate-800">Calculated GPA:</span>
                          <span className="text-emerald-600 font-black">{loggedInStudent.gpa}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">No recent exam records available.</p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ================= ADMIN AUTHENTICATION LOGIN ================= */}
        {roleMode === 'admin_login' && (
          <div className="min-h-[70vh] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Admin Authentication</h2>
              <p className="text-xs text-slate-500 mt-1 mb-6">Enter password to manage courses, notices, and student marks.</p>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase">Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter admin password (demo: admin)"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm transition shadow-md">
                  Unlock Admin Dashboard
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= COMPREHENSIVE ADMIN PANEL ================= */}
        {roleMode === 'admin' && isAdminAuthenticated && (
          <div className="bg-slate-100 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Admin Bar */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg mb-8 flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-black flex items-center gap-2">
                    <Shield className="w-6 h-6 text-amber-400" /> SIAM ACADEMY ADMIN MANAGEMENT
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">Real-Time Data Persistence Enabled</p>
                </div>
                <button 
                  onClick={() => { setIsAdminAuthenticated(false); setRoleMode('public'); setActiveTab('home'); }}
                  className="px-4 py-2 bg-slate-800 hover:bg-red-600 text-xs font-bold rounded-xl transition"
                >
                  Exit Admin
                </button>
              </div>

              {/* Admin Overview Cards */}
              <div className="grid sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase">Active Courses</span>
                  <p className="text-3xl font-black text-slate-900 mt-1">{courses.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase">Total Published Results</span>
                  <p className="text-3xl font-black text-indigo-600 mt-1">{results.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase">Active Notices</span>
                  <p className="text-3xl font-black text-emerald-600 mt-1">{notices.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 uppercase">Enrolled Students</span>
                  <p className="text-3xl font-black text-amber-600 mt-1">5,350</p>
                </div>
              </div>

              {/* Admin Action Tabs Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                
                {/* MANAGER 1: NOTICE BOARD EDITOR */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-indigo-600" /> Publish New Notice
                  </h2>

                  <form onSubmit={handleAddNotice} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700">Notice Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. HSC Physics Model Test Seat Plan"
                        value={newNotice.title}
                        onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                        className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700">Category</label>
                        <select 
                          value={newNotice.category}
                          onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                          className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                        >
                          <option>Academic</option>
                          <option>Exam Routine</option>
                          <option>Class Update</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700">Priority</label>
                        <select 
                          value={newNotice.priority}
                          onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                          className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                        >
                          <option>Normal</option>
                          <option>High</option>
                          <option>Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">Details</label>
                      <textarea 
                        rows="3"
                        placeholder="Notice content..."
                        value={newNotice.description}
                        onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
                        className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>

                    <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition">
                      Publish Notice Now
                    </button>
                  </form>

                  {/* List of Existing Notices with Delete */}
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Live Published Notices</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {notices.map(n => (
                        <div key={n.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl text-xs">
                          <span className="font-semibold text-slate-800 truncate max-w-[200px]">{n.title}</span>
                          <button onClick={() => handleDeleteNotice(n.id)} className="text-red-500 hover:text-red-700 font-bold">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* MANAGER 2: EXAM RESULT PUBLISHER */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-600" /> Publish Exam Marksheet
                  </h2>

                  <form onSubmit={handleAddResult} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700">Roll Number</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 1004"
                          value={newStudentResult.roll}
                          onChange={(e) => setNewStudentResult({ ...newStudentResult, roll: e.target.value })}
                          className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-700">Student Name</label>
                        <input 
                          type="text" 
                          placeholder="Full name"
                          value={newStudentResult.name}
                          onChange={(e) => setNewStudentResult({ ...newStudentResult, name: e.target.value })}
                          className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700">Exam Title</label>
                      <input 
                        type="text" 
                        value={newStudentResult.examTitle}
                        onChange={(e) => setNewStudentResult({ ...newStudentResult, examTitle: e.target.value })}
                        className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    {/* Marks Grid */}
                    <div className="grid grid-cols-4 gap-2 pt-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500">Physics</label>
                        <input type="number" value={newStudentResult.physics} onChange={(e) => setNewStudentResult({ ...newStudentResult, physics: e.target.value })} className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500">Chemistry</label>
                        <input type="number" value={newStudentResult.chemistry} onChange={(e) => setNewStudentResult({ ...newStudentResult, chemistry: e.target.value })} className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500">Math</label>
                        <input type="number" value={newStudentResult.math} onChange={(e) => setNewStudentResult({ ...newStudentResult, math: e.target.value })} className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500">ICT</label>
                        <input type="number" value={newStudentResult.ict} onChange={(e) => setNewStudentResult({ ...newStudentResult, ict: e.target.value })} className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs" />
                      </div>
                    </div>

                    <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition mt-4">
                      Save & Calculate GPA
                    </button>
                  </form>

                  {/* List of Published Marks */}
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Recent Published Rolls</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {results.map(r => (
                        <div key={r.roll} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl text-xs">
                          <div>
                            <span className="font-bold font-mono text-indigo-600">Roll {r.roll}</span>
                            <span className="ml-2 font-medium text-slate-800">{r.name}</span>
                          </div>
                          <button onClick={() => handleDeleteResult(r.roll)} className="text-red-500 hover:text-red-700 font-bold">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </main>

      {/* ================= ENROLLMENT MODAL ================= */}
      {selectedCourseForEnroll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
            <button 
              onClick={() => setSelectedCourseForEnroll(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900">Enrollment Application</h3>
            <p className="text-xs text-slate-500 mt-1">Applying for: <span className="font-bold text-indigo-600">{selectedCourseForEnroll.title}</span></p>

            <form onSubmit={handleEnrollSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Student Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Shakil Ahmed"
                  value={enrollForm.name}
                  onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                  className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Guardian Contact Phone</label>
                <input 
                  type="tel" 
                  placeholder="01700-000000"
                  value={enrollForm.phone}
                  onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                  className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  required
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-indigo-200">
                  Confirm Admission Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= VIDEO PLAYER MODAL ================= */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-slate-800">
            <div className="p-4 flex justify-between items-center border-b border-slate-800 text-white">
              <h3 className="font-bold text-sm truncate pr-4">{activeVideoModal.title}</h3>
              <button onClick={() => setActiveVideoModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="aspect-video bg-black flex items-center justify-center">
              <div className="text-center text-slate-400 p-8">
                <Video className="w-16 h-16 mx-auto mb-3 text-indigo-500 animate-pulse" />
                <p className="text-sm font-semibold text-slate-200">{activeVideoModal.title}</p>
                <p className="text-xs text-slate-500 mt-1">Video Stream Ready (Duration: {activeVideoModal.duration})</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-500" />
            <span className="font-bold text-slate-200">SIAM ACADEMY</span> © {new Date().getFullYear()} All rights reserved.
          </div>
          <p>Class 11, 12 HSC Science & University Engineering/Medical Admission Care</p>
        </div>
      </footer>
    </div>
  );
}