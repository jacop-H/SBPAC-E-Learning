import React, { useState, useEffect } from 'react';
import { Course, Chapter, BookmarkItem } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Bookmark,
  Volume2,
  VolumeX,
  ALargeSmall,
  ExternalLink,
  Share2,
  CheckCircle,
  Menu,
  Shield,
  Sparkles,
  Globe,
  Award,
  HelpCircle,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { CertificateModal } from './CertificateModal';
import { QUIZ_QUESTIONS } from '../data/coursesData';

interface CourseReaderProps {
  course: Course;
  onBack: () => void;
  onSaveBookmark: (item: Omit<BookmarkItem, 'id' | 'savedAt'>) => void;
  bookmarks: BookmarkItem[];
  completedChapterIds?: string[];
  onToggleChapterCompletion?: (courseId: string, chapterId: string) => void;
}

type ModeType = 'reader' | 'webportal' | 'slides' | 'quiz';

export const CourseReader: React.FC<CourseReaderProps> = ({
  course,
  onBack,
  onSaveBookmark,
  bookmarks,
  completedChapterIds = [],
  onToggleChapterCompletion
}) => {
  const [activeMode, setActiveMode] = useState<ModeType>('reader');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [readerTheme, setReaderTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [showTocDrawer, setShowTocDrawer] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  
  // Slide presentation state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSlideAutoPlaying, setIsSlideAutoPlaying] = useState(false);

  // Web portal state
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreenWeb, setIsFullscreenWeb] = useState(false);
  const [portalMode, setPortalMode] = useState<'proxy' | 'direct'>('proxy');

  const portalTargetUrl = course.officialUrl || "https://learningportal.ocsc.go.th/learningportal";
  const proxyIframeSrc = `/api/web-proxy?url=${encodeURIComponent(portalTargetUrl)}&key=${iframeKey}`;

  // Quiz state inside reader
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizIsSubmitted, setQuizIsSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCurrentIndex, setQuizCurrentIndex] = useState(0);

  const currentChapter: Chapter = course.chapters[currentChapterIndex] || course.chapters[0];

  // Course specific questions
  const courseQuizzes = QUIZ_QUESTIONS.filter(q => q.courseId === course.id || q.courseTitle.includes(course.title));
  const activeQuiz = courseQuizzes[quizCurrentIndex] || QUIZ_QUESTIONS[0];

  const isCurrentChapterCompleted = completedChapterIds.includes(currentChapter.id);
  const completedCount = course.chapters.filter(ch => completedChapterIds.includes(ch.id)).length;
  const progressPercent = Math.round((completedCount / course.chapters.length) * 100);

  const isBookmarked = bookmarks.some(
    (b) => b.courseId === course.id && b.chapterTitle === currentChapter.title
  );

  // Handle Text-to-Speech
  const handleToggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingSpeech) {
        window.speechSynthesis.cancel();
        setIsPlayingSpeech(false);
      } else {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = currentChapter.content;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';

        const utterance = new SpeechSynthesisUtterance(plainText.slice(0, 1200));
        utterance.lang = 'th-TH';
        utterance.rate = speechRate;

        utterance.onend = () => setIsPlayingSpeech(false);
        utterance.onerror = () => setIsPlayingSpeech(false);

        window.speechSynthesis.speak(utterance);
        setIsPlayingSpeech(true);
      }
    } else {
      alert('เบราว์เซอร์ของคุณไม่รองรับระบบอ่านเสียง Text-to-Speech');
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentChapterIndex, activeMode]);

  // Handle Auto-play Slides
  useEffect(() => {
    let interval: any;
    if (isSlideAutoPlaying && activeMode === 'slides') {
      interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % course.chapters.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isSlideAutoPlaying, activeMode, course.chapters.length]);

  const handleBookmarkToggle = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = currentChapter.content;
    const plainText = tempDiv.textContent || '';

    onSaveBookmark({
      courseId: course.id,
      courseTitle: course.title,
      chapterTitle: currentChapter.title,
      snippet: plainText.slice(0, 120) + '...'
    });
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${course.title} - ${currentChapter.title} | SBPAC E-LEARNING`);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    }
  };

  const fontClasses = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
    xl: 'text-xl leading-loose'
  }[fontSize];

  const themeClasses = {
    light: 'bg-white text-neutral-900 border-neutral-200',
    sepia: 'bg-[#fbf0d9] text-[#433422] border-[#e8d7b8]',
    dark: 'bg-neutral-900 text-neutral-100 border-neutral-800'
  }[readerTheme];

  return (
    <div className={`min-h-screen pb-24 ${themeClasses} transition-colors duration-200`}>
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-white/90 dark:bg-neutral-900/90 px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2 shadow-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
          กลับ
        </button>

        <div className="text-center truncate px-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
            {course.code}
          </span>
          <h2 className="font-bold text-xs sm:text-sm truncate max-w-[160px] sm:max-w-xs">
            {course.title}
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          {progressPercent === 100 ? (
            <button
              onClick={() => setShowCertificate(true)}
              className="px-2.5 py-1 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1 animate-bounce shadow-md"
              title="รับวุฒิบัตร"
            >
              <Award className="w-3.5 h-3.5" />
              <span>วุฒิบัตร</span>
            </button>
          ) : (
            <button
              onClick={() => setShowTocDrawer(!showTocDrawer)}
              className="p-2 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-xs flex items-center gap-1"
              title="สารบัญบทเรียน"
            >
              <Menu className="w-4 h-4" />
              <span className="hidden sm:inline">สารบัญ</span>
            </button>
          )}
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="bg-neutral-100 dark:bg-neutral-950 p-1.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-around gap-1 text-xs">
        <button
          onClick={() => setActiveMode('reader')}
          className={`flex-1 py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition ${
            activeMode === 'reader'
              ? 'bg-white dark:bg-neutral-800 text-amber-700 dark:text-amber-400 shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="truncate">เนื้อหาบทเรียน</span>
        </button>

        <button
          onClick={() => setActiveMode('slides')}
          className={`flex-1 py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition ${
            activeMode === 'slides'
              ? 'bg-white dark:bg-neutral-800 text-amber-700 dark:text-amber-400 shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span className="truncate">สไลด์สรุป</span>
        </button>

        <button
          onClick={() => setActiveMode('quiz')}
          className={`flex-1 py-2 px-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition ${
            activeMode === 'quiz'
              ? 'bg-white dark:bg-neutral-800 text-amber-700 dark:text-amber-400 shadow-sm'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span className="truncate">แบบทดสอบ</span>
        </button>
      </div>

      {/* Course Progress Indicator Strip */}
      <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-amber-600" />
          <span>ความก้าวหน้าการเรียน: <strong>{progressPercent}%</strong> ({completedCount}/{course.chapters.length} บท)</span>
        </div>
        <div className="w-24 h-2 bg-amber-200 dark:bg-amber-900/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* MODE 1: CLEAN READER */}
      {activeMode === 'reader' && (
        <div>
          {/* Reader Control Strip */}
          <div className="px-4 py-2 border-b border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs overflow-x-auto gap-2 bg-neutral-50/50 dark:bg-neutral-900/50">
            {/* Font size */}
            <div className="flex items-center gap-1 bg-white dark:bg-neutral-800 p-1 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <ALargeSmall className="w-3.5 h-3.5 text-neutral-400 ml-1" />
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-0.5 rounded font-bold ${fontSize === 'sm' ? 'bg-amber-500 text-white' : ''}`}
              >
                ก-
              </button>
              <button
                onClick={() => setFontSize('md')}
                className={`px-1.5 py-0.5 rounded font-bold ${fontSize === 'md' ? 'bg-amber-500 text-white' : ''}`}
              >
                ก
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 rounded font-bold ${fontSize === 'lg' ? 'bg-amber-500 text-white' : ''}`}
              >
                ก+
              </button>
            </div>

            {/* Reader Theme */}
            <div className="flex items-center gap-1 bg-white dark:bg-neutral-800 p-1 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => setReaderTheme('light')}
                className={`w-5 h-5 rounded-full bg-white border border-neutral-300 ${readerTheme === 'light' ? 'ring-2 ring-amber-500' : ''}`}
                title="โหมดสว่าง"
              />
              <button
                onClick={() => setReaderTheme('sepia')}
                className={`w-5 h-5 rounded-full bg-[#fbf0d9] border border-[#d8c39e] ${readerTheme === 'sepia' ? 'ring-2 ring-amber-500' : ''}`}
                title="โหมดถนอมสายตา"
              />
              <button
                onClick={() => setReaderTheme('dark')}
                className={`w-5 h-5 rounded-full bg-neutral-900 border border-neutral-700 ${readerTheme === 'dark' ? 'ring-2 ring-amber-500' : ''}`}
                title="โหมดมืด"
              />
            </div>

            {/* Speech player & tools */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleToggleSpeech}
                className={`p-1.5 rounded-xl border flex items-center gap-1 transition ${
                  isPlayingSpeech
                    ? 'bg-amber-500 text-white border-amber-600 animate-pulse'
                    : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                title="ฟังเสียงอ่านข้อความ"
              >
                {isPlayingSpeech ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{isPlayingSpeech ? 'หยุดอ่าน' : 'อ่านให้ฟัง'}</span>
              </button>

              <button
                onClick={handleBookmarkToggle}
                className={`p-1.5 rounded-xl border transition ${
                  isBookmarked
                    ? 'bg-amber-500 text-white border-amber-600'
                    : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                title="บันทึกบทเรียน"
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>

              <button
                onClick={handleShare}
                className="p-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                title="คัดลอกลิงก์บทเรียน"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Toast */}
          {copiedToast && (
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 text-white text-xs px-4 py-2 rounded-xl shadow-lg border border-neutral-700 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              คัดลอกข้อมูลบทเรียนเรียบร้อยแล้ว
            </div>
          )}

          {/* Main Article Content */}
          <main className="max-w-2xl mx-auto px-4 py-6">
            {/* Chapter Completion Box */}
            <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 shadow-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 block">
                  สถานะการเรียนบทนี้
                </span>
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                  {isCurrentChapterCompleted ? '✓ เรียนจบแล้ว' : 'ยังไม่ได้ทำเครื่องหมายเรียนเสร็จ'}
                </span>
              </div>

              <button
                onClick={() => onToggleChapterCompletion && onToggleChapterCompletion(course.id, currentChapter.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
                  isCurrentChapterCompleted
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-amber-600 text-white hover:bg-amber-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCurrentChapterCompleted ? 'เรียนจบแล้ว (คลิกเพื่อยกเลิก)' : 'ทำเครื่องหมายเรียนแล้ว'}</span>
              </button>
            </div>

            {/* Chapter Header */}
            <div className="mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                <span>บทที่ {currentChapterIndex + 1} จาก {course.chapters.length}</span>
                <span>{currentChapter.durationMinutes || 45} นาที</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-serif leading-tight">
                {currentChapter.title}
              </h1>
            </div>

            {/* Rendered HTML Article */}
            <article
              className={`prose prose-amber dark:prose-invert max-w-none ${fontClasses}`}
              dangerouslySetInnerHTML={{ __html: currentChapter.content }}
            />

            {/* Navigation Controls */}
            <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setCurrentChapterIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentChapterIndex === 0}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                  currentChapterIndex === 0
                    ? 'opacity-40 cursor-not-allowed border-neutral-200 dark:border-neutral-800'
                    : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                บทก่อนหน้า
              </button>

              <span className="text-xs text-neutral-400 font-mono">
                {currentChapterIndex + 1} / {course.chapters.length}
              </span>

              <button
                onClick={() => {
                  if (!isCurrentChapterCompleted && onToggleChapterCompletion) {
                    onToggleChapterCompletion(course.id, currentChapter.id);
                  }
                  if (currentChapterIndex < course.chapters.length - 1) {
                    setCurrentChapterIndex((prev) => prev + 1);
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 transition shadow-md"
              >
                <span>{currentChapterIndex === course.chapters.length - 1 ? 'จบบทเรียน' : 'บทถัดไป'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      )}

      {/* MODE 2: DIRECT WEB PORTAL VIEW */}
      {activeMode === 'webportal' && (
        <div className={`flex flex-col ${isFullscreenWeb ? 'fixed inset-0 z-50 bg-white dark:bg-neutral-900' : 'min-h-[600px]'}`}>
          {/* Web portal Toolbar */}
          <div className="p-3 bg-neutral-900 text-white flex flex-wrap items-center justify-between gap-2 text-xs border-b border-neutral-800">
            <div className="flex items-center gap-2 truncate">
              <Globe className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-semibold truncate">https://learningportal.ocsc.go.th</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] border border-amber-500/30 font-mono">
                {portalMode === 'proxy' ? 'Web Proxy Active' : 'Direct Live'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setPortalMode(portalMode === 'proxy' ? 'direct' : 'proxy')}
                className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-medium text-[11px] border border-neutral-700 transition"
                title="สลับโหมดการดึงข้อมูล"
              >
                {portalMode === 'proxy' ? 'สลับเป็น Direct URL' : 'สลับเป็น Web Proxy'}
              </button>

              <button
                onClick={() => setIframeKey(prev => prev + 1)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition"
                title="รีโหลดหน้าเว็บ"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsFullscreenWeb(!isFullscreenWeb)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition"
                title="ขยายเต็มจอ"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              <a
                href={portalTargetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] flex items-center gap-1 transition shadow-xs"
              >
                เปิดในแท็บใหม่ <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Portal Notice & Action Bar */}
          <div className="bg-amber-50 dark:bg-amber-950/40 px-4 py-2 text-amber-900 dark:text-amber-200 text-xs border-b border-amber-200 dark:border-amber-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 truncate">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">
                {portalMode === 'proxy' 
                  ? '⚡ ดึงข้อมูลผ่าน OCSC Web Proxy Server เพื่อปลดล็อกข้อจำกัด X-Frame-Options' 
                  : '🌐 ดึงข้อมูลตรงจาก learningportal.ocsc.go.th'}
              </span>
            </div>
            <button
              onClick={() => onToggleChapterCompletion && onToggleChapterCompletion(course.id, currentChapter.id)}
              className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 shrink-0"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>บันทึกความก้าวหน้าการเรียน</span>
            </button>
          </div>

          {/* Live Iframe */}
          <div className="flex-1 w-full relative min-h-[550px] bg-neutral-100 dark:bg-neutral-900">
            <iframe
              key={iframeKey}
              src={portalMode === 'proxy' ? proxyIframeSrc : portalTargetUrl}
              title="OCSC Learning Portal"
              className="w-full h-full min-h-[550px] border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* MODE 3: SLIDE PRESENTATION */}
      {activeMode === 'slides' && (
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative min-h-[380px] flex flex-col justify-between">
            {/* Top Slide Meta */}
            <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-4 pb-3 border-b border-slate-800">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                สไลด์สรุปบทเรียน
              </span>
              <span>สไลด์ที่ {currentSlideIndex + 1} / {course.chapters.length}</span>
            </div>

            {/* Main Slide Content */}
            <div className="my-auto py-4">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block mb-1">
                {course.code} | บทที่ {currentSlideIndex + 1}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-300 mb-4 leading-snug">
                {course.chapters[currentSlideIndex]?.title}
              </h2>

              <div
                className="text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-6 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60"
                dangerouslySetInnerHTML={{ __html: course.chapters[currentSlideIndex]?.content || '' }}
              />
            </div>

            {/* Bottom Slide Controls */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentSlideIndex === 0}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 transition text-xs font-bold text-slate-200 flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                สไลด์ก่อนหน้า
              </button>

              <button
                onClick={() => setIsSlideAutoPlaying(!isSlideAutoPlaying)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isSlideAutoPlaying ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                }`}
              >
                {isSlideAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isSlideAutoPlaying ? 'หยุดเล่นอัตโนมัติ' : 'เล่นอัตโนมัติ'}</span>
              </button>

              <button
                onClick={() => setCurrentSlideIndex((prev) => Math.min(course.chapters.length - 1, prev + 1))}
                disabled={currentSlideIndex === course.chapters.length - 1}
                className="p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-600 disabled:opacity-30 transition text-xs font-bold flex items-center gap-1"
              >
                สไลด์ถัดไป
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 4: COURSE QUIZ */}
      {activeMode === 'quiz' && (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>แบบทดสอบวัดความรู้ประจำหลักสูตร {course.title}</span>
            </div>
            <span className="font-mono font-bold">
              คำถาม {quizCurrentIndex + 1} / {courseQuizzes.length || 1}
            </span>
          </div>

          {activeQuiz ? (
            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-5 border border-neutral-200 dark:border-neutral-700 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                {activeQuiz.question}
              </h3>

              <div className="space-y-2 pt-2">
                {activeQuiz.options.map((opt, idx) => {
                  let style = 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200';
                  if (quizSelectedOption === idx) {
                    style = 'border-amber-500 bg-amber-50 dark:bg-amber-950/60 font-semibold text-amber-900 dark:text-amber-200';
                  }
                  if (quizIsSubmitted) {
                    if (idx === activeQuiz.correctOptionIndex) {
                      style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-900 dark:text-emerald-200';
                    } else if (quizSelectedOption === idx) {
                      style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !quizIsSubmitted && setQuizSelectedOption(idx)}
                      disabled={quizIsSubmitted}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {quizIsSubmitted && idx === activeQuiz.correctOptionIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {quizIsSubmitted && (
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  <strong>💡 คำอธิบาย:</strong>
                  <p>{activeQuiz.explanation}</p>
                </div>
              )}

              <div className="pt-2">
                {!quizIsSubmitted ? (
                  <button
                    onClick={() => {
                      if (quizSelectedOption === null) return;
                      setQuizIsSubmitted(true);
                      if (quizSelectedOption === activeQuiz.correctOptionIndex) {
                        setQuizScore(prev => prev + 1);
                      }
                    }}
                    disabled={quizSelectedOption === null}
                    className="w-full py-3 bg-amber-600 text-white font-bold rounded-2xl shadow-md hover:bg-amber-700 transition disabled:opacity-40 text-xs sm:text-sm"
                  >
                    เฉลยคำตอบ
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setQuizSelectedOption(null);
                      setQuizIsSubmitted(false);
                      if (quizCurrentIndex < courseQuizzes.length - 1) {
                        setQuizCurrentIndex(prev => prev + 1);
                      } else {
                        // Finish quiz
                        alert(`ทำแบบทดสอบเสร็จสิ้น! ได้คะแนน ${quizScore + (quizSelectedOption === activeQuiz.correctOptionIndex ? 1 : 0)} / ${courseQuizzes.length}`);
                        setQuizCurrentIndex(0);
                        setQuizScore(0);
                      }
                    }}
                    className="w-full py-3 bg-amber-600 text-white font-bold rounded-2xl shadow-md hover:bg-amber-700 transition text-xs sm:text-sm"
                  >
                    {quizCurrentIndex < courseQuizzes.length - 1 ? 'ข้อถัดไป' : 'ทำแบบทดสอบอีกครั้ง'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white dark:bg-neutral-800 rounded-3xl text-center text-xs text-neutral-500">
              ไม่มีแบบทดสอบย่อยสำหรับหลักสูตรนี้ สามารถทบทวนบทเรียนในโหมดอ่านเนื้อหาได้
            </div>
          )}
        </div>
      )}

      {/* Table of Contents Drawer Modal */}
      {showTocDrawer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white dark:bg-neutral-900 h-full p-4 overflow-y-auto border-l border-neutral-200 dark:border-neutral-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200 dark:border-neutral-800">
                <h3 className="font-bold text-sm flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                  <BookOpen className="w-4 h-4" />
                  สารบัญบทเรียน ({course.chapters.length})
                </h3>
                <button
                  onClick={() => setShowTocDrawer(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                {course.chapters.map((chap, idx) => {
                  const isDone = completedChapterIds.includes(chap.id);

                  return (
                    <button
                      key={chap.id}
                      onClick={() => {
                        setCurrentChapterIndex(idx);
                        setShowTocDrawer(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl text-xs transition border flex items-start justify-between gap-2 ${
                        currentChapterIndex === idx
                          ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-semibold'
                          : 'border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <div>
                        <div className="text-[10px] text-neutral-400 mb-0.5">บทที่ {idx + 1}</div>
                        <div className="line-clamp-2">{chap.title}</div>
                      </div>
                      {isDone && (
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
              {progressPercent === 100 && (
                <button
                  onClick={() => {
                    setShowTocDrawer(false);
                    setShowCertificate(true);
                  }}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Award className="w-4 h-4" />
                  ดูวุฒิบัตรการเรียนจบ
                </button>
              )}

              <button
                onClick={() => setShowTocDrawer(false)}
                className="w-full py-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 text-center"
              >
                ปิดสารบัญ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          course={course}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};
