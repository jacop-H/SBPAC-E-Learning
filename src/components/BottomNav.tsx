import React from 'react';
import { BookOpen, BookText, Languages, HelpCircle, Bookmark } from 'lucide-react';

export type NavTab = 'courses' | 'reader' | 'malay' | 'quiz' | 'bookmarks';

interface BottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  bookmarksCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  bookmarksCount
}) => {
  const tabs = [
    {
      id: 'courses' as NavTab,
      label: 'วิชาเรียน',
      icon: BookOpen,
      badge: null
    },
    {
      id: 'reader' as NavTab,
      label: 'อ่านบทเรียน',
      icon: BookText,
      badge: null
    },
    {
      id: 'malay' as NavTab,
      label: 'ภาษามลายู',
      icon: Languages,
      badge: 'ถิ่น'
    },
    {
      id: 'quiz' as NavTab,
      label: 'แบบทดสอบ',
      icon: HelpCircle,
      badge: null
    },
    {
      id: 'bookmarks' as NavTab,
      label: 'บันทึกไว้',
      icon: Bookmark,
      badge: bookmarksCount > 0 ? bookmarksCount : null
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 shadow-lg px-2 py-1.5 transition-colors max-w-2xl mx-auto rounded-t-2xl">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-amber-700 dark:text-amber-400 font-semibold'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-amber-500 rounded-full animate-pulse" />
              )}
              <div className="relative mt-1">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                {tab.badge !== null && (
                  <span className="absolute -top-1.5 -right-2 px-1 py-0.2 min-w-[14px] text-[9px] font-bold bg-amber-500 text-white rounded-full text-center leading-tight">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
