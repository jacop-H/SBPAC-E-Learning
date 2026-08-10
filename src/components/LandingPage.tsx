import React from 'react';
import { Shield, ChevronRight, BookOpen, Sparkles, Award, Globe, UserCheck } from 'lucide-react';
import { GoogleUser } from '../types';

interface LandingPageProps {
  onStart: () => void;
  currentUser: GoogleUser | null;
  onOpenLoginModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, currentUser, onOpenLoginModal }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-slate-950 text-white font-sans">
      {/* Background Image with Dark Professional Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://img1.pic.in.th/images/IMG_1295b5058060b7f8d1a2.jpg')`,
        }}
      />
      {/* Gradient & Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/75 to-slate-950/90 backdrop-blur-[2px]" />

      {/* Top Header Badge */}
      <div className="relative z-10 pt-6 px-4 flex justify-between items-center max-w-2xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-md shadow-lg">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>ศูนย์อำนวยการบริหารจังหวัดชายแดนภาคใต้ (ศอ.บต.)</span>
        </div>

        {currentUser && (
          <button
            onClick={onOpenLoginModal}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 hover:border-amber-400 text-xs text-slate-200 transition"
          >
            <img src={currentUser.picture} alt={currentUser.name} className="w-5 h-5 rounded-full object-cover" />
            <span className="font-semibold text-[11px] truncate max-w-[120px]">{currentUser.name}</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 px-6 py-8 flex flex-col items-center justify-center text-center my-auto">
        {/* Container Card */}
        <div className="w-full max-w-md bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col items-center">
          
          {/* Logo centered */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur-md opacity-30 group-hover:opacity-60 transition duration-500" />
            <img
              src="https://img1.pic.in.th/images/logo-sbpac_436x436.png"
              alt="SBPAC Logo"
              className="relative w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Text directly underneath the logo */}
          <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-amber-400 mt-5 drop-shadow-md">
            SBPAC E-LEARNING
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed max-w-xs font-normal">
            ระบบการเรียนรู้อิเล็กทรอนิกส์เฉพาะพื้นที่จังหวัดชายแดนภาคใต้
            <br />
            <span className="text-amber-300/90 text-[11px]">
              (ปัตตานี ยะลา นราธิวาส และ 4 อำเภอของสงขลา)
            </span>
          </p>

          {/* Feature Badges */}
          <div className="grid grid-cols-3 gap-2 w-full mt-6 pt-5 border-t border-slate-800">
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex flex-col items-center text-center">
              <BookOpen className="w-4 h-4 text-amber-400 mb-1" />
              <span className="text-[10px] font-medium text-slate-300 leading-tight">6 หลักสูตรเฉพาะ</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex flex-col items-center text-center">
              <Globe className="w-4 h-4 text-amber-400 mb-1" />
              <span className="text-[10px] font-medium text-slate-300 leading-tight">ภาษามลายูถิ่น</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex flex-col items-center text-center">
              <Award className="w-4 h-4 text-amber-400 mb-1" />
              <span className="text-[10px] font-medium text-slate-300 leading-tight">คลังแบบทดสอบ</span>
            </div>
          </div>

          {/* User Status / Account Indicator */}
          {currentUser && (
            <div className="w-full mt-5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-200 text-left">
              <div className="flex items-center gap-2.5">
                <img src={currentUser.picture} alt={currentUser.name} className="w-8 h-8 rounded-full border border-amber-400 object-cover" />
                <div>
                  <div className="font-bold text-white text-xs truncate max-w-[170px]">{currentUser.name}</div>
                  <div className="text-[10px] text-amber-300/80 font-mono truncate max-w-[170px]">{currentUser.email}</div>
                </div>
              </div>
              <button
                onClick={onOpenLoginModal}
                className="text-[10px] text-amber-400 underline font-semibold hover:text-amber-300"
              >
                สลับบัญชี
              </button>
            </div>
          )}

          {/* Google Login Button requested by user */}
          <button
            onClick={onOpenLoginModal}
            className="w-full mt-6 py-3.5 px-5 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs sm:text-sm rounded-2xl shadow-xl shadow-black/40 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 border border-slate-200 cursor-pointer group"
          >
            {/* Google Multi-colored G logo */}
            <div className="w-5 h-5 shrink-0">
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
            <span className="text-slate-900 font-bold leading-tight">
              เข้าระบบด้วย Google Account
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform shrink-0" />
          </button>

          {/* Quick Direct Start Link if logged in */}
          {currentUser && (
            <button
              onClick={onStart}
              className="mt-3 text-xs text-amber-400 hover:text-amber-300 font-bold underline flex items-center gap-1 transition"
            >
              <span>เข้าสู่บทเรียนด้วยบัญชี ({currentUser.name}) ↗</span>
            </button>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 pb-6 px-4 text-center">
        <p className="text-[11px] text-slate-400/80 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>เชื่อมโยงข้อมูลกับระบบ OCSC Learning Portal (สำนักงาน ก.พ.)</span>
        </p>
      </div>
    </div>
  );
};

