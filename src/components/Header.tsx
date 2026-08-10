import React from 'react';
import { RefreshCw, Search, Moon, Sun, Shield, Sparkles, Wifi, User, LogOut } from 'lucide-react';
import { GoogleUser } from '../types';

interface HeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  lastScrapedTime?: string;
  isOnline: boolean;
  onGoLanding?: () => void;
  currentUser?: GoogleUser | null;
  onOpenLoginModal?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isRefreshing,
  onRefresh,
  searchQuery,
  setSearchQuery,
  showSearch,
  setShowSearch,
  darkMode,
  setDarkMode,
  lastScrapedTime,
  isOnline,
  onGoLanding,
  currentUser,
  onOpenLoginModal,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      {/* Mobile Top Status Bar */}
      <div className="bg-neutral-900 text-neutral-300 text-[11px] px-4 py-1 flex justify-between items-center tracking-wide font-mono">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3 h-3 text-amber-400" />
          <span className="font-semibold text-neutral-200">SBPAC E-LEARNING</span>
          <span className="text-neutral-500">|</span>
          <span className="text-amber-400 text-[10px]">จังหวัดชายแดนภาคใต้</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-400">
          <span className="flex items-center gap-1 text-[10px] text-emerald-400">
            <Wifi className="w-3 h-3" />
            {isOnline ? 'เชื่อมต่อสด' : 'ออฟไลน์'}
          </span>
          <span>{new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <div
          onClick={onGoLanding}
          className={`flex items-center gap-2.5 ${onGoLanding ? 'cursor-pointer hover:opacity-90' : ''} transition group`}
          title={onGoLanding ? "กลับสู่หน้าแรก SBPAC E-LEARNING" : undefined}
        >
          <img
            src="https://img1.pic.in.th/images/logo-sbpac_436x436.png"
            alt="SBPAC Logo"
            className="w-10 h-10 object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
          />
          <div>
            <h1 className="font-extrabold text-base leading-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
              SBPAC E-LEARNING
              <span className="px-1.5 py-0.5 text-[9px] bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 rounded font-bold border border-amber-300 dark:border-amber-700">
                ชายแดนใต้
              </span>
            </h1>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
              <span>ศูนย์เรียนรู้ ศอ.บต. / ก.พ.</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {currentUser ? (
            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 rounded-xl p-0.5">
              <button
                onClick={onOpenLoginModal}
                title={`บัญชี Google: ${currentUser.email}`}
                className="p-1 pl-1 pr-2 hover:bg-amber-500/20 rounded-lg transition flex items-center gap-1.5 text-xs text-amber-900 dark:text-amber-200"
              >
                <img src={currentUser.picture} alt={currentUser.name} className="w-6 h-6 rounded-full object-cover border border-amber-400" />
                <span className="font-bold text-[11px] truncate max-w-[80px] sm:max-w-[110px]">{currentUser.name.split(' ')[0]}</span>
              </button>

              {onLogout && (
                <button
                  onClick={onLogout}
                  title="ออกจากระบบ (Logout)"
                  className="p-1.5 px-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-600 dark:text-rose-400 hover:text-rose-700 transition flex items-center gap-1 text-[11px] font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">ออกจากระบบ</span>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLoginModal}
              title="เข้าสู่ระบบด้วยบัญชี Google"
              className="p-1.5 px-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-amber-400 transition flex items-center gap-2 text-xs font-bold text-neutral-800 dark:text-neutral-200 shadow-xs"
            >
              <div className="w-4 h-4">
                <svg className="w-full h-full" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <span className="hidden sm:inline">Google Login</span>
            </button>
          )}

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title="ดึงข้อมูลอัปเดตล่าสุดจากหน้าเว็บ OCSC"
            className={`p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/30 ${
              isRefreshing ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-600' : ''}`} />
            <span className="hidden sm:inline">ดึงข้อมูลใหม่</span>
          </button>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition"
            title="ค้นหาวิชาเรียน"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl transition-all duration-200 border flex items-center gap-1.5 ${
              darkMode
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/25'
                : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:bg-neutral-200'
            }`}
            title={darkMode ? "สลับเป็นโหมดสว่าง (Light Mode)" : "สลับเป็นโหมดมืด (Dark Mode)"}
            aria-label="เปลี่ยนโหมดธีม มืด/สว่าง"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      {showSearch && (
        <div className="px-4 pb-3 pt-1 border-t border-neutral-100 dark:border-neutral-800 animate-fadeIn">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหากฎหมาย, คำศัพท์มลายู, พ.ร.ก.ฉุกเฉิน, สิทธิประโยชน์..."
              className="w-full pl-9 pr-9 py-2 text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Live sync banner info */}
      {lastScrapedTime && (
        <div className="bg-amber-500/10 border-t border-amber-500/20 px-4 py-1 flex items-center justify-between text-[11px] text-amber-800 dark:text-amber-300">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            ซิงค์ล่าสุดกับเว็บต้นทาง OCSC: {lastScrapedTime}
          </span>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
            ตัดโฆษณา & เมนูขยะออกแล้ว
          </span>
        </div>
      )}
    </header>
  );
};
