import React from 'react';
import { ScrapeResult } from '../types';
import { RefreshCw, CheckCircle, AlertCircle, ShieldCheck, Sparkles, X, Globe, Layers } from 'lucide-react';

interface LiveRefreshModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ScrapeResult | null;
  isRefreshing: boolean;
}

export const LiveRefreshModal: React.FC<LiveRefreshModalProps> = ({
  isOpen,
  onClose,
  result,
  isRefreshing
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white dark:bg-neutral-900 w-full max-w-md rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-2xl space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            {isRefreshing ? (
              <RefreshCw className="w-6 h-6 animate-spin" />
            ) : result?.status === 'success' ? (
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-amber-500" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100">
              {isRefreshing ? 'กำลังดึงข้อมูลสดจาก OCSC Portal...' : 'สถานะการดึงข้อมูลล่าสุด (Real-time)'}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              https://learningportal.ocsc.go.th
            </p>
          </div>
        </div>

        {isRefreshing ? (
          <div className="py-8 text-center space-y-3">
            <div className="inline-block p-3 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 animate-pulse">
              <Globe className="w-8 h-8" />
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium">
              กำลังเชื่อมต่อและคัดแยกเฉพาะวิชาพื้นที่จังหวัดชายแดนภาคใต้...
            </p>
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 rounded-2xl border border-neutral-200 dark:border-neutral-700/80 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-neutral-500">แหล่งข้อมูลต้นทาง:</span>
                <span className="font-mono text-neutral-800 dark:text-neutral-200 font-semibold truncate max-w-[180px]">
                  {result?.source}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">เวลาซิงค์อัปเดต:</span>
                <span className="text-amber-700 dark:text-amber-400 font-semibold">
                  {result?.scrapedAt ? new Date(result.scrapedAt).toLocaleTimeString('th-TH') : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">การคลีน UI / ตัดขยะ:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> ตัด Header/Footer/Ads แล้ว
                </span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 space-y-1">
              <strong className="block font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                6 วิชาชายแดนภาคใต้ที่คัดสรรแล้วพร้อมใช้งาน:
              </strong>
              <ul class="list-disc pl-4 space-y-0.5 text-[11px] opacity-90">
                <li>กฎหมายที่ใช้ในพื้นที่จังหวัดชายแดนภาคใต้</li>
                <li>ภาษามลายูถิ่นเบื้องต้น</li>
                <li>พหุวัฒนธรรมและสังคมจังหวัดชายแดนภาคใต้</li>
                <li>ประวัติศาสตร์จังหวัดชายแดนภาคใต้</li>
                <li>แนวปฏิบัติสำหรับเจ้าหน้าที่ของรัฐในจังหวัดชายแดนภาคใต้</li>
                <li>สิทธิประโยชน์สำหรับเจ้าหน้าที่ของรัฐในจังหวัดชายแดนภาคใต้</li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold rounded-2xl text-xs hover:opacity-90 transition mt-2"
            >
              รับทราบและใช้งานแอปพลิเคชัน
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
