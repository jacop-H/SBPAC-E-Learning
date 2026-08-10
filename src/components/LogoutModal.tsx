import React from 'react';
import { GoogleUser } from '../types';
import { LogOut, AlertCircle, CheckCircle2, X } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  currentUser: GoogleUser | null;
  onConfirm: () => void;
  onClose: () => void;
}

export const LogoutConfirmModal: React.FC<LogoutModalProps> = ({
  isOpen,
  currentUser,
  onConfirm,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 relative flex flex-col items-center text-center space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-500 mt-2">
          <LogOut className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
            ยืนยันการออกจากระบบ
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            คุณต้องการออกจากระบบบัญชีผู้ใช้งานใช่หรือไม่?
          </p>
        </div>

        {currentUser && (
          <div className="w-full p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-2xl flex items-center gap-3 text-left">
            <img
              src={currentUser.picture}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full border border-amber-400 object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">
                {currentUser.name}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                {currentUser.email}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2.5 w-full pt-2">
          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            className="py-3 px-4 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-md transition flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
