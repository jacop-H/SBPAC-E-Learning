import React, { useState } from 'react';
import { MALAY_VOCABULARY } from '../data/coursesData';
import { VocabularyItem } from '../types';
import { Volume2, Search, BookOpen, Layers, Check, Copy, Sparkles, Languages } from 'lucide-react';

export const MalayDictionary: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['ทั้งหมด', 'คำทักทาย', 'การบริการ', 'มารยาท', 'การสอบถาม', 'แนะนำตัว', 'สถานที่'];

  const filteredVocab = MALAY_VOCABULARY.filter((item) => {
    const matchesCat = selectedCategory === 'ทั้งหมด' || item.category === selectedCategory;
    const matchesSearch =
      item.malayWord.toLowerCase().includes(search.toLowerCase()) ||
      item.thaiPhonetic.includes(search) ||
      item.thaiMeaning.includes(search);
    return matchesCat && matchesSearch;
  });

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'th-TH';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (item: VocabularyItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${item.malayWord} (${item.thaiPhonetic}) - ${item.thaiMeaning}`);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  const currentCard = filteredVocab[cardIndex] || filteredVocab[0];

  return (
    <div className="space-y-4 pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-[10px] bg-white/20 backdrop-blur-md font-semibold rounded-full uppercase">
              OCSC-SBP-002
            </span>
            <span className="text-emerald-100 text-xs">ภาษามลายูถิ่นเบื้องต้น</span>
          </div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Languages className="w-5 h-5" />
            คลังคำศัพท์มลายูถิ่น (ยาวี)
          </h2>
          <p className="text-xs text-emerald-100 leading-relaxed max-w-lg">
            รวบรวมคำศัพท์ วลี และบทสนทนาใช้บ่อยสำหรับการบริการประชาชนและการปฏิบัติงานของเจ้าหน้าที่รัฐในจังหวัดชายแดนภาคใต้
          </p>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setIsFlashcardMode(!isFlashcardMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                isFlashcardMode
                  ? 'bg-amber-400 text-neutral-900 shadow-md'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              {isFlashcardMode ? 'สลับเป็นโหมดตารางศัพท์' : 'สลับเป็นโหมดแฟลชการ์ด (Flashcards)'}
            </button>
          </div>
        </div>

        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* FLASHCARD MODE */}
      {isFlashcardMode ? (
        <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-700 shadow-md text-center space-y-6">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>แฟลชการ์ด {cardIndex + 1} / {filteredVocab.length}</span>
            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-full font-semibold">
              {currentCard?.category || 'ทั่วไป'}
            </span>
          </div>

          {currentCard ? (
            <div
              onClick={() => setShowAnswer(!showAnswer)}
              className="min-h-[180px] bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800/60 flex flex-col items-center justify-center cursor-pointer hover:shadow-inner transition"
            >
              <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-200 mb-2">
                {currentCard.malayWord}
              </div>
              <div className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-4">
                ({currentCard.thaiPhonetic})
              </div>

              {showAnswer ? (
                <div className="text-base font-bold text-neutral-800 dark:text-neutral-100 animate-fadeIn pt-2 border-t border-emerald-200 dark:border-emerald-800/80 w-full">
                  แปลว่า: {currentCard.thaiMeaning}
                  {currentCard.exampleSentence && (
                    <p className="text-xs font-normal text-neutral-500 dark:text-neutral-400 mt-2">
                      ตัวอย่าง: {currentCard.exampleSentence}
                    </p>
                  )}
                </div>
              ) : (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 underline">
                  แตะเพื่อดูคำแปล
                </span>
              )}
            </div>
          ) : (
            <p className="text-sm text-neutral-500 py-8">ไม่พบคำศัพท์ในหมวดหมู่นี้</p>
          )}

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setShowAnswer(false);
                setCardIndex((prev) => Math.max(0, prev - 1));
              }}
              disabled={cardIndex === 0}
              className="px-4 py-2 bg-neutral-100 dark:bg-neutral-700 rounded-xl text-xs font-semibold disabled:opacity-40"
            >
              คำก่อนหน้า
            </button>

            {currentCard && (
              <button
                onClick={() => speakText(currentCard.audioText || currentCard.thaiPhonetic)}
                className="p-3 bg-emerald-600 text-white rounded-full shadow-md hover:bg-emerald-700 transition"
                title="ออกเสียง"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={() => {
                setShowAnswer(false);
                setCardIndex((prev) => Math.min(filteredVocab.length - 1, prev + 1));
              }}
              disabled={cardIndex === filteredVocab.length - 1}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold disabled:opacity-40"
            >
              คำถัดไป
            </button>
          </div>
        </div>
      ) : (
        /* TABLE & SEARCH LIST MODE */
        <div className="space-y-3">
          {/* Search & Category Filter */}
          <div className="flex flex-col gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาคำศัพท์มลายู, คำอ่านไทย หรือคำแปล..."
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition border ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Vocab Cards List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filteredVocab.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-neutral-800/90 rounded-2xl p-3.5 border border-neutral-200 dark:border-neutral-700/80 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-emerald-900 dark:text-emerald-200">
                      {item.malayWord}
                    </span>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                      {item.thaiPhonetic}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                    แปลว่า: <span className="text-amber-700 dark:text-amber-400">{item.thaiMeaning}</span>
                  </p>
                  {item.exampleSentence && (
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 italic">
                      "{item.exampleSentence}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => speakText(item.audioText || item.thaiPhonetic)}
                    className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition"
                    title="ฟังเสียงอ่าน"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopy(item)}
                    className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-700/60 text-neutral-500 dark:text-neutral-300 hover:bg-neutral-100 transition"
                    title="คัดลอกคำศัพท์"
                  >
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredVocab.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700">
              <p className="text-sm text-neutral-500">ไม่พบคำศัพท์ที่ค้นหา</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
