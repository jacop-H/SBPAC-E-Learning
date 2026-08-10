import React from 'react';
import { BookmarkItem, Course } from '../types';
import { Bookmark, Trash2, BookOpen, Clock, ChevronRight, ExternalLink } from 'lucide-react';

interface BookmarksViewProps {
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (id: string) => void;
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarks,
  onRemoveBookmark,
  courses,
  onSelectCourse
}) => {
  return (
    <div className="space-y-5 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-800 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <span className="px-2 py-0.5 text-[10px] bg-white/20 backdrop-blur-md font-semibold rounded-full uppercase">
            Personal Notes & Saved Items
          </span>
          <h2 className="text-xl font-bold mt-1 mb-1 flex items-center gap-2">
            <Bookmark className="w-5 h-5" />
            บทเรียนและเนื้อหาที่บันทึกไว้ ({bookmarks.length})
          </h2>
          <p className="text-xs text-amber-100">
            บันทึกมาตรา กฎหมายพิเศษ สิทธิประโยชน์ข้าราชการ และคำศัพท์มลายูเพื่อทบทวนย้อนหลัง
          </p>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        {bookmarks.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-200 dark:border-neutral-700 p-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <Bookmark className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-200">
              ยังไม่มีเนื้อหาที่บันทึกไว้
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
              คุณสามารถกดปุ่มไอคอนบุ๊กมาร์ก ขณะอ่านบทเรียนเพื่อเซฟเนื้อหามาตรากฎหมายหรือคำศัพท์ที่สนใจไว้ตรงนี้ได้
            </p>
          </div>
        ) : (
          bookmarks.map((bm) => {
            const matchedCourse = courses.find((c) => c.id === bm.courseId);
            return (
              <div
                key={bm.id}
                className="bg-white dark:bg-neutral-800/90 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-700/80 shadow-xs hover:border-amber-400 transition space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                      {bm.courseTitle}
                    </span>
                    <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 mt-1">
                      {bm.chapterTitle}
                    </h4>
                  </div>
                  <button
                    onClick={() => onRemoveBookmark(bm.id)}
                    className="p-1.5 text-neutral-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition"
                    title="ลบรายการบันทึก"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 italic bg-neutral-50 dark:bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800">
                  "{bm.snippet}"
                </p>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                  <span>บันทึกเมื่อ: {bm.savedAt}</span>
                  {matchedCourse && (
                    <button
                      onClick={() => onSelectCourse(matchedCourse)}
                      className="text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1 hover:underline"
                    >
                      เปิดอ่าน <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Progress Summary Card */}
      <div className="bg-white dark:bg-neutral-800/90 rounded-3xl p-5 border border-neutral-200 dark:border-neutral-700 shadow-xs space-y-3">
        <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-600" />
          สรุปการเรียนทั้ง 6 วิชาศูนย์เรียนรู้ ก.พ.
        </h3>

        <div className="space-y-2">
          {courses.map((course) => (
            <div key={course.id} className="text-xs space-y-1">
              <div className="flex justify-between text-neutral-700 dark:text-neutral-300">
                <span className="truncate max-w-[220px] font-medium">{course.title}</span>
                <span className="font-mono text-neutral-500">{course.progressPercent || 0}%</span>
              </div>
              <div className="w-full h-1 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${course.progressPercent || 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
