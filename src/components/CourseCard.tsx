import React from 'react';
import { Course } from '../types';
import { Scale, Languages, Users, Landmark, ShieldCheck, Gift, Clock, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onSelectCourse: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onSelectCourse }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale': return Scale;
      case 'Languages': return Languages;
      case 'Users': return Users;
      case 'Landmark': return Landmark;
      case 'ShieldCheck': return ShieldCheck;
      case 'Gift': return Gift;
      default: return BookOpen;
    }
  };

  const IconComponent = getIcon(course.icon);

  const getColorStyles = (color: Course['color']) => {
    switch (color) {
      case 'amber':
        return {
          badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800',
          iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-amber-500/20',
          borderHover: 'hover:border-amber-400 dark:hover:border-amber-600',
          bar: 'bg-amber-500'
        };
      case 'emerald':
        return {
          badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
          iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-emerald-500/20',
          borderHover: 'hover:border-emerald-400 dark:hover:border-emerald-600',
          bar: 'bg-emerald-500'
        };
      case 'indigo':
        return {
          badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800',
          iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-indigo-500/20',
          borderHover: 'hover:border-indigo-400 dark:hover:border-indigo-600',
          bar: 'bg-indigo-500'
        };
      case 'rose':
        return {
          badge: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800',
          iconBg: 'bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-rose-500/20',
          borderHover: 'hover:border-rose-400 dark:hover:border-rose-600',
          bar: 'bg-rose-500'
        };
      case 'blue':
        return {
          badge: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300 dark:border-blue-800',
          iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-500/20',
          borderHover: 'hover:border-blue-400 dark:hover:border-blue-600',
          bar: 'bg-blue-500'
        };
      case 'purple':
        return {
          badge: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300 dark:border-purple-800',
          iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-purple-500/20',
          borderHover: 'hover:border-purple-400 dark:hover:border-purple-600',
          bar: 'bg-purple-500'
        };
      default:
        return {
          badge: 'bg-neutral-100 text-neutral-800 border-neutral-300',
          iconBg: 'bg-neutral-600 text-white',
          borderHover: 'hover:border-neutral-400',
          bar: 'bg-neutral-500'
        };
    }
  };

  const styles = getColorStyles(course.color);

  return (
    <div
      onClick={() => onSelectCourse(course)}
      className={`group bg-white dark:bg-neutral-800/90 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-700/80 shadow-sm ${styles.borderHover} transition-all duration-300 hover:shadow-md cursor-pointer relative overflow-hidden flex flex-col justify-between`}
    >
      <div>
        {/* Top Header line */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className={`w-11 h-11 rounded-xl ${styles.iconBg} flex items-center justify-center shrink-0 shadow-md`}>
            <IconComponent className="w-6 h-6" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-lg border ${styles.badge}`}>
              {course.category}
            </span>
            <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
              {course.code}
            </span>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug mb-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed mb-4">
          {course.description}
        </p>
      </div>

      <div>
        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[11px] text-neutral-500 dark:text-neutral-400 mb-1">
            <span>ความคืบหน้า</span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">{course.progressPercent || 0}%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${styles.bar} transition-all duration-500 rounded-full`}
              style={{ width: `${course.progressPercent || 0}%` }}
            />
          </div>
        </div>

        {/* Footer Meta */}
        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {course.totalChapters} บทเรียน
            </span>
          </div>

          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            อ่านเนื้อหา <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
