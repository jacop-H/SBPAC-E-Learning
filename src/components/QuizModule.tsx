import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/coursesData';
import { QuizQuestion } from '../types';
import { HelpCircle, CheckCircle2, XCircle, RefreshCw, Award, ArrowRight, ShieldAlert } from 'lucide-react';

export const QuizModule: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctOptionIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsSubmitted(false);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Quiz Banner Header */}
      <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <span className="px-2 py-0.5 text-[10px] bg-white/20 backdrop-blur-md font-semibold rounded-full uppercase">
            OCSC Knowledge Check
          </span>
          <h2 className="text-xl font-bold mt-1 mb-1 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            คลังข้อสอบความรู้ชายแดนใต้
          </h2>
          <p className="text-xs text-amber-100">
            ทดสอบความรู้ กฎหมายพิเศษ ภาษามลายูถิ่น พหุวัฒนธรรม และสิทธิประโยชน์ข้าราชการ
          </p>
        </div>
      </div>

      {quizFinished ? (
        /* Quiz Finished Screen */
        <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 text-center space-y-5 shadow-md">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              ทำแบบทดสอบเสร็จสิ้น!
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              คุณทำได้ <strong className="text-amber-600 dark:text-amber-400 text-lg">{score}</strong> จากทั้งหมด {QUIZ_QUESTIONS.length} คะแนน
            </p>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
            {score === QUIZ_QUESTIONS.length ? (
              <p>🎉 ยอดเยี่ยมมาก! คุณมีความรู้ความเข้าใจในระเบียบปฏิบัติพื้นที่ชายแดนใต้เป็นอย่างดี</p>
            ) : score >= QUIZ_QUESTIONS.length / 2 ? (
              <p>👍 ผ่านเกณฑ์ประเมิน! ทบทวนบทเรียนเพิ่มเติมเพื่อความแม่นยำในการปฏิบัติราชการ</p>
            ) : (
              <p>📚 สามารถกลับไปอ่านบทเรียนทบทวนความรู้ในหลักสูตร OCSC ได้ตลอดเวลา</p>
            )}
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-3 bg-amber-600 text-white font-bold rounded-2xl shadow-md hover:bg-amber-700 transition flex items-center justify-center gap-2 text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            ทำแบบทดสอบอีกครั้ง
          </button>
        </div>
      ) : (
        /* Active Question Card */
        <div className="bg-white dark:bg-neutral-800 rounded-3xl p-5 border border-neutral-200 dark:border-neutral-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="font-semibold text-amber-700 dark:text-amber-400">
              {currentQ.courseTitle}
            </span>
            <span>คำถามที่ {currentIndex + 1} / {QUIZ_QUESTIONS.length}</span>
          </div>

          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((opt, idx) => {
              let optionStyle = 'border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100';

              if (selectedOption === idx) {
                optionStyle = 'border-amber-500 bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-semibold';
              }

              if (isSubmitted) {
                if (idx === currentQ.correctOptionIndex) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (selectedOption === idx) {
                  optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 font-semibold';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isSubmitted}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition flex items-center justify-between gap-3 ${optionStyle}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-mono shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isSubmitted && idx === currentQ.correctOptionIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {isSubmitted && selectedOption === idx && idx !== currentQ.correctOptionIndex && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isSubmitted && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 space-y-1 animate-fadeIn">
              <strong className="block font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                💡 อธิบายคำตอบ:
              </strong>
              <p className="leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="w-full py-3 bg-amber-600 text-white font-bold rounded-2xl shadow-md hover:bg-amber-700 transition disabled:opacity-40 text-xs sm:text-sm"
              >
                ยืนยันคำตอบ
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full py-3 bg-amber-600 text-white font-bold rounded-2xl shadow-md hover:bg-amber-700 transition text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'ข้อถัดไป' : 'ดูสรุปผลคะแนน'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
