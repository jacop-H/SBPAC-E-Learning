import React, { useState } from 'react';
import { Course } from '../types';
import { Award, Shield, CheckCircle, Download, Printer, X, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  course: Course;
  userName?: string;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  course,
  userName: initialUserName = 'ข้าราชการ / เจ้าหน้าที่ของรัฐผู้ผ่านการอบรม',
  onClose
}) => {
  const [userName, setUserName] = useState(initialUserName);
  const [isEditingName, setIsEditingName] = useState(false);

  const currentDate = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const certNumber = `SBPAC-OCSC-${course.code}-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-500/40 my-auto">
        
        {/* Modal Top Action Header (non-printable) */}
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <Award className="w-4 h-4" />
            <span>ใบประกาศนียบัตรผ่านการอบรม SBPAC E-LEARNING</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              พิมพ์ / ดาวน์โหลด PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Decorative Border */}
        <div className="p-6 sm:p-10 relative bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30">
          
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <img
              src="https://img1.pic.in.th/images/logo-sbpac_436x436.png"
              alt="SBPAC Watermark"
              className="w-80 h-80 object-contain"
            />
          </div>

          {/* Certificate Inner Border Box */}
          <div className="border-2 border-dashed border-amber-600/40 p-6 sm:p-8 rounded-2xl relative z-10 text-center flex flex-col items-center">
            
            {/* Top Logos */}
            <div className="flex items-center justify-center gap-6 mb-4">
              <img
                src="https://img1.pic.in.th/images/logo-sbpac_436x436.png"
                alt="SBPAC Logo"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
              />
              <div className="w-px h-10 bg-amber-300" />
              <div className="flex flex-col items-start text-left">
                <span className="text-xs font-bold text-slate-800">ศูนย์อำนวยการบริหารจังหวัดชายแดนภาคใต้</span>
                <span className="text-[10px] text-amber-700 font-semibold">ร่วมกับ สำนักงานคณะกรรมการข้าราชการพลเรือน (สำนักงาน ก.พ.)</span>
              </div>
            </div>

            {/* Certificate Header Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-amber-800 font-serif tracking-wide mb-1">
              ใบประกาศนียบัตร
            </h2>
            <p className="text-xs text-slate-500 tracking-wider uppercase font-mono mb-4">
              CERTIFICATE OF COMPLETION
            </p>

            <p className="text-xs text-slate-600 mb-2">ขอมอบใบประกาศนียบัตรฉบับนี้เพื่อแสดงว่า</p>

            {/* User Name - Editable on click */}
            <div className="my-2 py-1 px-4 border-b-2 border-amber-500 min-w-[240px]">
              {isEditingName ? (
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  autoFocus
                  className="text-center font-bold text-lg sm:text-xl text-slate-900 bg-amber-50 rounded px-2 py-1 outline-none w-full"
                />
              ) : (
                <div
                  onClick={() => setIsEditingName(true)}
                  title="คลิกเพื่อแก้ไขชื่อผู้รับวุฒิบัตร"
                  className="font-bold text-lg sm:text-2xl text-slate-900 cursor-pointer hover:text-amber-700 transition flex items-center justify-center gap-2"
                >
                  <span>{userName}</span>
                  <span className="text-[10px] text-slate-400 font-normal print:hidden">(แก้ไขชื่อ)</span>
                </div>
              )}
            </div>

            {/* Course Details */}
            <p className="text-xs text-slate-600 mt-3 leading-relaxed max-w-md">
              ได้ผ่านการศึกษาอบรมและทดสอบความรู้ตามเกณฑ์หลักสูตร E-Learning เฉพาะพื้นที่
            </p>

            <div className="my-3 p-3 bg-amber-100/60 rounded-xl border border-amber-300/60 max-w-lg w-full">
              <span className="text-[10px] font-mono font-bold text-amber-800 block">
                {course.code}
              </span>
              <h3 className="font-extrabold text-base sm:text-lg text-amber-950 mt-0.5">
                {course.title}
              </h3>
              <p className="text-[11px] text-amber-800 mt-0.5">
                หมวดหมู่: {course.category} | จำนวน {course.duration}
              </p>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              ให้ไว้ ณ วันที่ <span className="font-semibold text-slate-800">{currentDate}</span>
            </p>

            {/* Signatures & Seal Footer */}
            <div className="mt-8 pt-6 border-t border-slate-200 w-full grid grid-cols-2 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="h-10 flex items-end justify-center mb-1">
                  <span className="font-serif italic text-slate-700 text-sm border-b border-slate-400 px-4">
                    ศอ.บต. / OCSC
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-800">ผู้อำนวยการศูนย์เรียนรู้ ศอ.บต.</span>
                <span className="text-[9px] text-slate-500">ศูนย์อำนวยการบริหารจังหวัดชายแดนภาคใต้</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="h-10 flex items-center justify-center mb-1">
                  <Shield className="w-8 h-8 text-amber-600 opacity-90" />
                </div>
                <span className="text-[10px] font-mono text-slate-500">รหัสตรวจสอบวุฒิบัตร</span>
                <span className="text-[10px] font-mono font-bold text-slate-800">{certNumber}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-amber-50 px-6 py-2.5 border-t border-amber-200 text-center text-[10px] text-amber-800 flex items-center justify-center gap-1.5 print:hidden">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>วุฒิบัตรฉบับนี้ออกโดยระบบ SBPAC E-LEARNING สามารถอ้างอิงการเรียนรู้การปฏิบัติราชการชายแดนใต้ได้</span>
        </div>

      </div>
    </div>
  );
};
