import React, { useState } from 'react';
import { GoogleUser } from '../types';
import { LogIn, LogOut, CheckCircle2, Sparkles, ShieldCheck, Mail, ArrowRight, AlertTriangle } from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase';

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: GoogleUser) => void;
  currentUser: GoogleUser | null;
  onLogout?: () => void;
}

export const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({
  isOpen,
  onClose,
  onSelectUser,
  currentUser,
  onLogout
}) => {
  const [loadingFirebase, setLoadingFirebase] = useState(false);
  const [domainError, setDomainError] = useState<string | null>(null);
  const [authErrorMessage, setAuthErrorMessage] = useState<string | null>(null);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');

  if (!isOpen) return null;

  const handleFirebaseGoogleSignIn = async () => {
    setLoadingFirebase(true);
    setDomainError(null);
    setAuthErrorMessage(null);
    try {
      const user = await signInWithGoogle();
      onSelectUser(user);
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/cancelled-popup-request') {
        console.error("Firebase Google Auth error:", err);
        if (err?.code === 'auth/unauthorized-domain') {
          const currentDomain = window.location.hostname;
          setDomainError(currentDomain);
          setShowEmailInput(true);
        } else {
          setAuthErrorMessage(err?.message || 'ไม่สามารถเข้าสู่ระบบด้วย Google Auth ได้ในขณะนี้ โปรดลองอีกครั้งหรือใช้การป้อน Email ด้านล่าง');
          setShowEmailInput(true);
        }
      }
    } finally {
      setLoadingFirebase(false);
    }
  };

  const handleCustomEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) return;
    const nameToUse = customName.trim() || customEmail.split('@')[0];
    const newUser: GoogleUser = {
      id: `google-${Date.now()}`,
      name: nameToUse,
      email: customEmail.trim(),
      picture: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(customEmail)}`,
      role: 'ผู้ใช้งาน Google Account',
      department: 'ศูนย์เรียนรู้ระบบ SBPAC E-Learning'
    };
    onSelectUser(newUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header with Google Brand styling */}
        <div className="p-6 bg-slate-900 text-white relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              {/* Google G Logo SVG */}
              <div className="w-9 h-9 bg-white rounded-full p-1.5 flex items-center justify-center shadow-md">
                <svg className="w-full h-full" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">Google Account Authentication</h3>
                <p className="text-xs text-slate-300">ระบบเข้าสู่ระบบด้วยบัญชี Google จริง</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-sm w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center transition"
            >
              ✕
            </button>
          </div>

          <div className="bg-amber-500/20 border border-amber-500/30 rounded-2xl p-3 text-xs text-amber-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-snug">
              ซิงค์ประวัติบทเรียนและแบบทดสอบโดยอัตโนมัติบนฐานข้อมูล Firebase Cloud
            </p>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          {currentUser ? (
            /* Logged In View */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                <img
                  src={currentUser.picture}
                  alt={currentUser.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900 dark:text-slate-100">
                    <span className="truncate">{currentUser.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                    {currentUser.email}
                  </div>
                  <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-0.5">
                    {currentUser.role}
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                {/* Single Switch / Sign In with another Google account button */}
                <button
                  onClick={handleFirebaseGoogleSignIn}
                  disabled={loadingFirebase}
                  className="w-full py-3 px-4 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 rounded-2xl font-bold text-xs shadow-xs flex items-center justify-center gap-2.5 transition cursor-pointer active:scale-[0.98]"
                >
                  <div className="w-4 h-4 shrink-0">
                    <svg className="w-full h-full" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </div>
                  <span>{loadingFirebase ? 'กำลังเชื่อมต่อ...' : 'สลับไปยัง Google Account อื่น'}</span>
                </button>

                {/* Explicit Logout Button */}
                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="w-full py-3 px-4 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer active:scale-[0.98]"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>ออกจากระบบ (Logout)</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Logged Out View - Single Clear Login Button */
            <div className="space-y-4">
              {domainError && (
                <div className="p-3.5 bg-amber-500/15 border border-amber-500/40 rounded-2xl text-xs space-y-1.5 text-amber-900 dark:text-amber-200 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
                    <span>ข้อผิดพลาด: Authorized Domain (Firebase)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                    โดเมน <code className="bg-amber-500/20 px-1 py-0.5 rounded font-mono font-semibold">{domainError}</code> ยังไม่ได้รับอนุญาตสิทธิ์เข้าใช้งานระบบ Google Auth
                  </p>
                  <p className="text-[11px] font-medium text-amber-700 dark:text-amber-300 pt-0.5">
                    คุณสามารถป้อน Google Email เข้าใช้งานได้โดยตรงด้านล่าง
                  </p>
                </div>
              )}

              {authErrorMessage && !domainError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-xs space-y-1 text-rose-700 dark:text-rose-300 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>เกิดข้อผิดพลาดในการเชื่อมต่อ Google Auth</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">{authErrorMessage}</p>
                </div>
              )}

              {/* SINGLE GOOGLE LOGIN BUTTON */}
              <button
                onClick={handleFirebaseGoogleSignIn}
                disabled={loadingFirebase}
                className="w-full py-4 px-5 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-sm rounded-2xl shadow-lg flex items-center justify-center gap-3 transition cursor-pointer active:scale-[0.98]"
              >
                <div className="w-6 h-6 bg-white rounded-full p-1 flex items-center justify-center shadow-xs shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
                <span>{loadingFirebase ? 'กำลังเข้าสู่ระบบ Google...' : 'เข้าสู่ระบบด้วย Google Account'}</span>
              </button>

              {!showEmailInput ? (
                <div className="pt-2 text-center">
                  <button
                    onClick={() => setShowEmailInput(true)}
                    className="text-xs text-slate-400 hover:text-amber-500 underline transition"
                  >
                    ป้อน Google Email โดยตรง...
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCustomEmailSubmit} className="pt-2 space-y-3 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Google Email:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="user@gmail.com"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      ชื่อผู้ใช้งาน:
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น นายสมชาย ปัตตานี"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowEmailInput(false)}
                      className="flex-1 py-2 text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-xl"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 text-xs font-bold bg-amber-500 text-slate-950 rounded-xl"
                    >
                      ตกลง
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
