export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  role?: string;
  department?: string;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  durationMinutes?: number;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  category: string;
  color: 'amber' | 'emerald' | 'indigo' | 'rose' | 'blue' | 'purple';
  icon: string;
  searchKeywords: string[];
  description: string;
  duration: string;
  totalChapters: number;
  officialUrl: string;
  chapters: Chapter[];
  isCompleted?: boolean;
  progressPercent?: number;
}

export interface VocabularyItem {
  id: string;
  malayWord: string;
  thaiPhonetic: string;
  thaiMeaning: string;
  category: string;
  exampleSentence?: string;
  audioText?: string;
}

export interface QuizQuestion {
  id: string;
  courseId: string;
  courseTitle: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface BookmarkItem {
  id: string;
  courseId: string;
  courseTitle: string;
  chapterTitle: string;
  snippet: string;
  savedAt: string;
  note?: string;
}

export interface ScrapeResult {
  status: 'success' | 'fallback' | 'loading' | 'error';
  source: string;
  scrapedAt: string;
  itemsFound?: number;
  message?: string;
  sampleExtracted?: string[];
}
