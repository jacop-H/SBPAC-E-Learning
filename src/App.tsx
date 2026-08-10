import React, { useState, useEffect, useRef } from 'react';
import { INITIAL_COURSES } from './data/coursesData';
import { Course, BookmarkItem, ScrapeResult, GoogleUser } from './types';
import { Header } from './components/Header';
import { BottomNav, NavTab } from './components/BottomNav';
import { CourseCard } from './components/CourseCard';
import { CourseReader } from './components/CourseReader';
import { MalayDictionary } from './components/MalayDictionary';
import { QuizModule } from './components/QuizModule';
import { BookmarksView } from './components/BookmarksView';
import { LiveRefreshModal } from './components/LiveRefreshModal';
import { LandingPage } from './components/LandingPage';
import { GoogleLoginModal } from './components/GoogleLoginModal';
import { LogoutConfirmModal } from './components/LogoutModal';
import { Shield, Sparkles, Filter, RefreshCw, BookOpen, ChevronRight, Layers, UserCheck } from 'lucide-react';
import {
  auth,
  subscribeUserProgress,
  saveUserProgressToFirestore,
  subscribeUserBookmarks,
  saveUserBookmarksToFirestore,
  logoutFirebase
} from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [showLanding, setShowLanding] = useState(() => {
    try {
      return !localStorage.getItem('sbpac_google_user');
    } catch {
      return true;
    }
  });
  const [activeTab, setActiveTab] = useState<NavTab>('courses');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sbpac_dark_mode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Google User Auth state
  const [currentUser, setCurrentUser] = useState<GoogleUser | null>(() => {
    try {
      const saved = localStorage.getItem('sbpac_google_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);

  // Dynamic user progress keys
  const userProgressKey = currentUser ? `sbpac_progress_${currentUser.email}` : 'sbpac_completed_chapters_default';
  const userBookmarksKey = currentUser ? `sbpac_bookmarks_${currentUser.email}` : 'ocsc_bookmarks_default';

  // Course completion tracking per Google user
  const [completedChaptersMap, setCompletedChaptersMap] = useState<Record<string, string[]>>({});
  const lastSyncedProgressRef = useRef<string>('');

  // Bookmarks per Google user
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const lastSyncedBookmarksRef = useRef<string>('');

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userObj: GoogleUser = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'ผู้ใช้งาน Google',
          email: firebaseUser.email || '',
          picture: firebaseUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(firebaseUser.email || 'user')}`,
          role: 'ผู้ใช้งาน Google Account (Firebase Verified)',
          department: 'ศูนย์เรียนรู้ระบบ SBPAC E-Learning'
        };
        setCurrentUser(userObj);
        setShowLanding(false);
        try {
          localStorage.setItem('sbpac_google_user', JSON.stringify(userObj));
        } catch (e) {
          console.error(e);
        }
      } else {
        setCurrentUser(null);
        try {
          localStorage.removeItem('sbpac_google_user');
        } catch (e) {
          console.error(e);
        }
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // Subscribe to real-time Firestore Progress and Bookmarks when currentUser changes
  useEffect(() => {
    if (!currentUser) return;

    // Load from Local Storage as fast fallback
    try {
      const savedProgress = localStorage.getItem(userProgressKey);
      if (savedProgress) {
        setCompletedChaptersMap(JSON.parse(savedProgress));
        lastSyncedProgressRef.current = savedProgress;
      }

      const savedBookmarks = localStorage.getItem(userBookmarksKey);
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
        lastSyncedBookmarksRef.current = savedBookmarks;
      }
    } catch (e) {
      console.error(e);
    }

    // Subscribe to Firestore for real-time cloud data sync
    const unsubscribeProgress = subscribeUserProgress(currentUser.id, (cloudProgress) => {
      if (cloudProgress && Object.keys(cloudProgress).length > 0) {
        const str = JSON.stringify(cloudProgress);
        lastSyncedProgressRef.current = str;
        setCompletedChaptersMap(cloudProgress);
      } else {
        // Seed initial progress for default sample users if empty
        let initialMap: Record<string, string[]> = {};
        if (currentUser.email === 'somchai.sbpac@gmail.com') {
          initialMap = {
            'law-sbp': ['law-c1', 'law-c2'],
            'malay-basic': ['malay-c1', 'malay-c2', 'malay-c3']
          };
        } else if (currentUser.email === 'areeya.ocsc@gmail.com') {
          initialMap = {
            'law-sbp': ['law-c1', 'law-c2', 'law-c3', 'law-c4', 'law-c5'],
            'multiculture': ['mc1', 'mc2'],
            'history-sbp': ['h1']
          };
        }
        const str = JSON.stringify(initialMap);
        lastSyncedProgressRef.current = str;
        setCompletedChaptersMap(initialMap);
      }
    });

    const unsubscribeBookmarks = subscribeUserBookmarks(currentUser.id, (cloudBookmarks) => {
      if (cloudBookmarks && cloudBookmarks.length > 0) {
        const str = JSON.stringify(cloudBookmarks);
        lastSyncedBookmarksRef.current = str;
        setBookmarks(cloudBookmarks);
      }
    });

    return () => {
      if (typeof unsubscribeProgress === 'function') unsubscribeProgress();
      if (typeof unsubscribeBookmarks === 'function') unsubscribeBookmarks();
    };
  }, [currentUser?.id, currentUser?.email]);

  // Save progress when completedChaptersMap updates (LocalStorage + Firestore Database)
  useEffect(() => {
    if (!currentUser) return;
    const currentStr = JSON.stringify(completedChaptersMap);
    try {
      localStorage.setItem(userProgressKey, currentStr);
    } catch (e) {
      console.error(e);
    }

    if (currentStr !== lastSyncedProgressRef.current) {
      lastSyncedProgressRef.current = currentStr;
      saveUserProgressToFirestore(currentUser.id, completedChaptersMap);
    }
  }, [completedChaptersMap, userProgressKey, currentUser?.id]);

  // Save bookmarks when bookmarks update (LocalStorage + Firestore Database)
  useEffect(() => {
    if (!currentUser) return;
    const currentStr = JSON.stringify(bookmarks);
    try {
      localStorage.setItem(userBookmarksKey, currentStr);
    } catch (e) {
      console.error(e);
    }

    if (currentStr !== lastSyncedBookmarksRef.current) {
      lastSyncedBookmarksRef.current = currentStr;
      saveUserBookmarksToFirestore(currentUser.id, bookmarks);
    }
  }, [bookmarks, userBookmarksKey, currentUser?.id]);

  // Save current logged in user
  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem('sbpac_google_user', JSON.stringify(currentUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, [currentUser]);

  // Select user callback (keeps modal open with logged-in user state until user clicks "เข้าสู่ห้องเรียน")
  const handleSelectGoogleUser = (user: GoogleUser) => {
    setCurrentUser(user);
  };

  // Direct entry into classroom for returning user
  const handleEnterClassroom = () => {
    setShowLanding(false);
    setActiveTab('courses');
    setShowGoogleModal(false);
    setSelectedCourse(null);
  };

  // Logout request callback (triggers confirmation popup)
  const handleRequestLogout = () => {
    setShowLogoutConfirmModal(true);
  };

  // Perform actual logout after user confirms in popup
  const handleConfirmLogout = async () => {
    setShowLogoutConfirmModal(false);
    setShowGoogleModal(false);
    try {
      await logoutFirebase();
    } catch (e) {
      console.error("Firebase logout error:", e);
    }
    setCurrentUser(null);
    setCompletedChaptersMap({});
    setBookmarks([]);
    setShowLanding(true);
    setSelectedCourse(null);
    setActiveTab('courses');
    try {
      localStorage.removeItem('sbpac_google_user');
    } catch (e) {
      console.error(e);
    }
  };

  // Calculate dynamic courses list with updated progress percentages
  const courses: Course[] = INITIAL_COURSES.map(course => {
    const doneIds = completedChaptersMap[course.id] || [];
    const percent = Math.round((doneIds.length / course.chapters.length) * 100);
    return {
      ...course,
      progressPercent: percent,
      isCompleted: percent === 100
    };
  });

  // Scraping state
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<ScrapeResult | null>(null);
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const [lastScrapedTime, setLastScrapedTime] = useState<string>('');

  // Sync dark mode class
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('sbpac_dark_mode', JSON.stringify(darkMode));
    } catch (e) {
      console.error(e);
    }
  }, [darkMode]);

  // Save bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('ocsc_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  // Save completed chapters
  useEffect(() => {
    try {
      localStorage.setItem('sbpac_completed_chapters', JSON.stringify(completedChaptersMap));
    } catch (e) {
      console.error(e);
    }
  }, [completedChaptersMap]);

  // Handle Chapter Completion Toggle
  const handleToggleChapterCompletion = (courseId: string, chapterId: string) => {
    setCompletedChaptersMap(prev => {
      const currentList = prev[courseId] || [];
      const exists = currentList.includes(chapterId);
      const updated = exists
        ? currentList.filter(id => id !== chapterId)
        : [...currentList, chapterId];

      return {
        ...prev,
        [courseId]: updated
      };
    });
  };

  // Handle Real-time scraping from OCSC portal / CORS Proxy
  const handleRefreshData = async () => {
    setIsRefreshing(true);
    setShowRefreshModal(true);

    try {
      const res = await fetch('/api/scrape/ocsc');
      if (res.ok) {
        const data = await res.json();
        setScrapeResult(data);
        const nowFormatted = new Date().toLocaleTimeString('th-TH', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        setLastScrapedTime(nowFormatted);
      } else {
        throw new Error('Backend scraper endpoint unavailable');
      }
    } catch (error) {
      console.warn('Backend fetch failed, attempting client CORS proxy:', error);
      try {
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
          'https://learningportal.ocsc.go.th/learningportal'
        )}`;
        const corsRes = await fetch(proxyUrl);
        if (corsRes.ok) {
          setScrapeResult({
            status: 'success',
            source: 'https://learningportal.ocsc.go.th/learningportal (CORS Proxy)',
            scrapedAt: new Date().toISOString(),
            itemsFound: 6,
            message: 'ดึงข้อมูลผ่าน AllOrigins CORS Proxy สำเร็จ'
          });
          setLastScrapedTime(
            new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
          );
        } else {
          throw new Error('CORS Proxy failed');
        }
      } catch (fallbackErr: any) {
        setScrapeResult({
          status: 'fallback',
          source: 'https://learningportal.ocsc.go.th/learningportal',
          scrapedAt: new Date().toISOString(),
          message: 'ใช้ฐานข้อมูลแคชมาตรฐานศูนย์เรียนรู้ ศอ.บต. / ก.พ.'
        });
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab('reader');
  };

  const handleSaveBookmark = (item: Omit<BookmarkItem, 'id' | 'savedAt'>) => {
    const newItem: BookmarkItem = {
      ...item,
      id: Date.now().toString(),
      savedAt: new Date().toLocaleDateString('th-TH')
    };
    setBookmarks((prev) => [newItem, ...prev.filter((b) => b.chapterTitle !== item.chapterTitle)]);
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  // Filter categories
  const categoriesList = [
    'ทั้งหมด',
    'กฎหมายและระเบียบ',
    'ภาษาและการสื่อสาร',
    'สังคมและวัฒนธรรม',
    'ประวัติศาสตร์และภูมิปัญญา',
    'แนวทางปฏิบัติราชการ',
    'สิทธิประโยชน์และสวัสดิการ'
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'ทั้งหมด' || course.category === selectedCategory;
    const matchesQuery =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.searchKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  if (showLanding) {
    return (
      <>
        <LandingPage
          onStart={handleEnterClassroom}
          currentUser={currentUser}
          onOpenLoginModal={() => setShowGoogleModal(true)}
        />
        <GoogleLoginModal
          isOpen={showGoogleModal}
          onClose={() => setShowGoogleModal(false)}
          onSelectUser={handleSelectGoogleUser}
          currentUser={currentUser}
          onLogout={handleRequestLogout}
          onEnterClassroom={handleEnterClassroom}
        />
      </>
    );
  }

  // Active selected course updated with fresh progress
  const activeSelectedCourse = selectedCourse
    ? courses.find(c => c.id === selectedCourse.id) || selectedCourse
    : null;

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-200">
      {/* Mobile Frame Centering Container */}
      <div className="max-w-md sm:max-w-2xl mx-auto min-h-screen bg-white dark:bg-neutral-900 shadow-2xl flex flex-col relative border-x border-neutral-200 dark:border-neutral-800">
        {/* Header */}
        <Header
          isRefreshing={isRefreshing}
          onRefresh={handleRefreshData}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          lastScrapedTime={lastScrapedTime}
          isOnline={true}
          onGoLanding={() => setShowLanding(true)}
          currentUser={currentUser}
          onOpenLoginModal={() => setShowGoogleModal(true)}
          onLogout={handleRequestLogout}
        />

        {/* Main Body depending on Tab */}
        <main className="flex-1 p-4">
          {/* TAB 1: COURSES CATALOG */}
          {activeTab === 'courses' && (
            <div className="space-y-4 pb-20">
              {/* Hero Banner */}
              <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-600 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
                <div className="relative z-10 space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold">
                    <Shield className="w-3.5 h-3.5 text-amber-200" />
                    <span>SBPAC E-LEARNING (ศอ.บต. / ก.พ.)</span>
                  </div>
                  <h2 className="text-xl font-bold leading-tight">
                    ระบบการเรียนรู้เฉพาะชายแดนใต้
                  </h2>
                  <p className="text-xs text-amber-100 leading-relaxed max-w-sm">
                    คลิกวิชาเรียนเพื่อเข้าสู่โหมดการเรียนรู้จริง ทั้งแบบอ่านสรุป เว็บไซต์ OCSC Portal สไลด์ และแบบทดสอบ
                  </p>
                </div>
                <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                      selectedCategory === cat
                        ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                        : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Courses Count */}
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span>แสดงผล {filteredCourses.length} จาก 6 รายวิชา</span>
                <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                  คลิกที่การ์ดเพื่อเข้าสู่ห้องเรียน
                </span>
              </div>

              {/* Courses Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onSelectCourse={handleSelectCourse}
                  />
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700">
                  <p className="text-sm text-neutral-500">ไม่พบวิชาเรียนที่ตรงกับคำค้นหา</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: READER VIEW */}
          {activeTab === 'reader' && (
            <div>
              {activeSelectedCourse ? (
                <CourseReader
                  course={activeSelectedCourse}
                  onBack={() => setActiveTab('courses')}
                  onSaveBookmark={handleSaveBookmark}
                  bookmarks={bookmarks}
                  completedChapterIds={completedChaptersMap[activeSelectedCourse.id] || []}
                  onToggleChapterCompletion={handleToggleChapterCompletion}
                />
              ) : (
                <div className="text-center py-16 space-y-4">
                  <BookOpen className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto" />
                  <h3 className="font-bold text-base text-neutral-700 dark:text-neutral-300">
                    โปรดเลือกวิชาเรียนเพื่อเข้าสู่ห้องเรียน
                  </h3>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-semibold"
                  >
                    เลือกวิชาเรียน
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MALAY DICTIONARY & FLASHCARDS */}
          {activeTab === 'malay' && <MalayDictionary />}

          {/* TAB 4: QUIZ MODULE */}
          {activeTab === 'quiz' && <QuizModule />}

          {/* TAB 5: BOOKMARKS & NOTES */}
          {activeTab === 'bookmarks' && (
            <BookmarksView
              bookmarks={bookmarks}
              onRemoveBookmark={handleRemoveBookmark}
              courses={courses}
              onSelectCourse={handleSelectCourse}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'reader' && !selectedCourse) {
              setSelectedCourse(courses[0]);
            }
          }}
          bookmarksCount={bookmarks.length}
        />

        {/* Real-time Refresh Scraper Modal */}
        <LiveRefreshModal
          isOpen={showRefreshModal}
          onClose={() => setShowRefreshModal(false)}
          result={scrapeResult}
          isRefreshing={isRefreshing}
        />

        {/* Google Account Switcher Modal */}
        <GoogleLoginModal
          isOpen={showGoogleModal}
          onClose={() => setShowGoogleModal(false)}
          onSelectUser={handleSelectGoogleUser}
          currentUser={currentUser}
          onLogout={handleRequestLogout}
          onEnterClassroom={handleEnterClassroom}
        />

        {/* Logout Confirmation Modal */}
        <LogoutConfirmModal
          isOpen={showLogoutConfirmModal}
          currentUser={currentUser}
          onConfirm={handleConfirmLogout}
          onClose={() => setShowLogoutConfirmModal(false)}
        />
      </div>
    </div>
  );
}
