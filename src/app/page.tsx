'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [language, setLanguage] = useState<'en' | 'ja'>('en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const selectLanguage = (lang: 'en' | 'ja') => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  return (
    <main className="flex min-h-[92svh] flex-col items-center justify-start sm:justify-center pt-10 sm:pt-0 px-6 sm:px-12 lg:px-16 text-center relative">
      {/* Top Page only Window Border */}
      <div
        className="fixed inset-0 border-[15px] md:border-[25px] border-solid pointer-events-none z-50 rotating-border"
      ></div>

      {/* Language Selector */}
      <div className="fixed bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center w-auto">
        {isDropdownOpen && (
          <div className="bg-white border border-black mb-[-1px] w-full min-w-[140px]">
            <button
              onClick={() => selectLanguage('ja')}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-200 last:border-b-0 text-sm font-sans"
            >
              日本語
            </button>
            <button
              onClick={() => selectLanguage('en')}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm font-sans"
            >
              English
            </button>
          </div>
        )}
        <button
          onClick={toggleDropdown}
          className="bg-white border border-black px-4 py-2 flex items-center gap-3 min-w-[140px] justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            {/* Globe Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span className="text-sm font-sans">Language</span>
          </div>
          {/* Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* 星5つ（タイトルとの間隔を詰める） */}
      <div className="flex justify-center text-[#f5a623] mb-4 gap-1 sm:gap-2 text-3xl sm:text-4xl lg:text-5xl">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      {/* タイトル：常に2行固定 */}
      <h1 className="font-bold leading-[0.9] lg:leading-[0.8] mb-6">
        <span className="block text-[12vw] sm:text-7xl lg:text-[6.5rem]">Value</span>
        <span className="block text-[10vw] sm:text-7xl lg:text-7xl lg:-mt-2">of the day</span>
      </h1>

      {/* 説明文：スマホは改行あり、PCは改行なし */}
      <div
        className={`text-[#333333] mb-8 font-medium leading-relaxed mx-auto
                   max-w-[34ch] sm:max-w-none
                   [text-wrap:balance] sm:[text-wrap:initial] ${language === 'en' ? 'text-sm sm:text-base space-y-3' : 'text-[12.67px] sm:text-[14.67px] space-y-3'}`}
      >
        {language === 'en' && (
          <>
            <p>How many stars are you giving today?</p>
            <p>This site lets you rate each day with stars and a short review.</p>
            <p>The calendar shows the average star rating for each date.</p>
            <p>Click on the date to see the review details.</p>
            <p>The average rating and shared reflections together define the value of the day.</p>
            <p>* All reviews are completely anonymous.</p>
          </>
        )}
        {language === 'ja' && (
          <>
            <p>あなたの今日は星いくつですか？</p>
            <p>このサイトは、1日を星評価とレビューで評価する場です。</p>
            <p>各ページのカレンダーには、その日の平均の星数が表示されており、</p>
            <p>日付をクリックするとレビューの詳細を見ることができます。</p>
            <p>星の平均やレビューの集合で、その日の価値が決まります。</p>
            <p>※投稿は完全に匿名で行われます。</p>
          </>
        )}
      </div>

      {/* ボタン：中央寄せ */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pb-32 sm:pb-0">
        <button
          className="border border-black px-6 py-2 text-sm sm:text-base font-semibold transition-colors duration-200
                     hover:bg-black hover:text-white active:bg-black active:text-white bg-white"
          onClick={() => router.push('/calendar')}
        >
          Check reviews
        </button>

        <button
          className="border border-black px-6 py-2 text-sm sm:text-base font-semibold transition-colors duration-200
                     hover:bg-black hover:text-white active:bg-black active:text-white bg-white"
          onClick={() => router.push('/post')}
        >
          Post review
        </button>
      </div>
    </main>
  );
}