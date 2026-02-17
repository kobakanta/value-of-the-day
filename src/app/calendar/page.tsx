'use client';

import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import Link from 'next/link';

dayjs.locale('ja');
dayjs.extend(isSameOrBefore);

interface Review {
  text: string;
  stars: number;
  createdAt: Timestamp;
}

export default function CalendarPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const snapshot = await getDocs(collection(db, 'reviews'));
      const data = snapshot.docs.map((doc) => doc.data() as Review);
      setReviews(data);
    };
    fetchReviews();
  }, []);

  const reviewsByDate = reviews.reduce((acc, review) => {
    const dateKey = dayjs(review.createdAt.toDate()).format('YYYY-MM-DD');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(review);
    return acc;
  }, {} as Record<string, Review[]>);

  const averageStarsByDate: Record<string, number> = Object.fromEntries(
    Object.entries(reviewsByDate).map(([date, reviews]) => {
      const avg = reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length;
      return [date, avg];
    })
  );

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const calendarDays = [];
  let day = startDate;
  while (day.isSameOrBefore(endDate, 'day')) {
    calendarDays.push(day);
    day = day.add(1, 'day');
  }

  const handlePrev = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNext = () => setCurrentDate(currentDate.add(1, 'month'));

  const renderStars = (rating: number, size: 'normal' | 'large' = 'normal') => {
    const rounded = Math.round(rating * 2) / 2;
    const full = Math.floor(rounded);
    const half = rounded - full === 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    const starClass = size === 'large' ? 'stars-large' : 'stars';

    return (
      <div className={starClass}>
        {Array.from({ length: full }).map((_, i) => (
          <span key={`f-${i}`} className="star full" />
        ))}
        {half && <span className="star half" />}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e-${i}`} className="star" />
        ))}
      </div>
    );
  };

  const checkPostStatus = () => {
    return typeof window !== 'undefined' && sessionStorage.getItem('hasPosted') === 'true';
  };

  const openModal = (dateKey: string) => {
    const dayReviews = reviewsByDate[dateKey];
    if (dayReviews && dayReviews.length > 0) {
      // Check if user has posted
      if (!checkPostStatus()) {
        // Show alert if not posted
        setShowAlert(true);
        // Auto-hide after 5 seconds
        setTimeout(() => setShowAlert(false), 5000);
        return;
      }
      // Show modal if posted
      setAllReviews(dayReviews);
      setSelectedDate(dateKey);
    }
  };

  const closeModal = () => {
    setSelectedDate(null);
    setAllReviews([]);
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-[1024px] mx-auto relative min-h-screen pb-4">
      {/* ---- アラートバナー ---- */}
      {showAlert && (
        <div className="alert-banner">
          <div className="alert-content">
            <span className="alert-text">
              投稿するとレビューの詳細を見ることができます
            </span>
            <div className="alert-actions">
              <Link
                href="/post"
                className="alert-button"
              >
                Post review
              </Link>
              <button
                onClick={() => setShowAlert(false)}
                className="alert-close"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- スマホ用ヘッダー固定ボタン ---- */}
      <div className="md:hidden fixed top-0 left-0 w-full flex justify-around bg-white border-b border-gray-300 py-2 z-10">
        <Link
          href="/"
          className="w-1/2 text-center font-semibold py-2 border-r border-gray-300 
                     hover:bg-black hover:text-white active:bg-black active:text-white transition"
        >
          Back to Top
        </Link>
        <Link
          href="/post"
          className="w-1/2 text-center font-semibold py-2 
                     hover:bg-black hover:text-white active:bg-black active:text-white transition"
        >
          Post review
        </Link>
      </div>

      {/* ---- PC用右上ボタン ---- */}
      <div className="hidden md:absolute md:top-4 md:right-4 md:flex md:flex-col md:items-end md:gap-2">
        <Link
          href="/"
          className="min-w-[160px] text-center border border-black text-black px-3 py-1 text-sm font-semibold 
                     hover:bg-black hover:text-white transition"
        >
          Back to Top
        </Link>
        <Link
          href="/post"
          className="min-w-[160px] text-center border border-black text-black px-3 py-1 text-sm font-semibold 
                     hover:bg-black hover:text-white transition"
        >
          Post review
        </Link>
      </div>

      {/* ---- タイトル ---- */}
      <Link href="/" className="mt-14 md:mt-0">
        <h1 className="text-3xl font-bold mb-4 cursor-pointer">
          Value of the day
        </h1>
      </Link>

      {/* ---- 月切り替え ---- */}
      <div className="flex items-center gap-4 mb-2">
        <button onClick={handlePrev}>&lt;</button>
        <span className="text-lg">{currentDate.locale('en').format('YYYY-MM')}</span>
        <button onClick={handleNext}>&gt;</button>
      </div>

      {/* ---- カレンダー ---- */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 w-full">
        {calendarDays.map((date) => {
          const dateKey = date.format('YYYY-MM-DD');
          const avgRating = averageStarsByDate[dateKey];
          const ratingToShow = typeof avgRating === 'number' ? avgRating : null;
          const isCurrentMonth = date.month() === currentDate.month();

          return (
            <div
              key={dateKey}
              onClick={() => openModal(dateKey)}
              className={`cursor-pointer border h-[90px] sm:h-28 md:h-32 p-0.5 sm:p-1 flex flex-col justify-center items-center text-xs sm:text-sm shadow-sm transition-colors duration-200 
              ${isCurrentMonth ? 'bg-white text-gray-600 hover:bg-yellow-400 hover:text-white active:bg-yellow-400 active:text-white' : 'bg-gray-100 text-gray-400'}`}
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold">{date.format('DD')}</div>
              <div className="flex flex-col items-center mt-0.5 sm:mt-1 md:mt-2 scale-[0.6] sm:scale-[0.8] md:scale-100">
                {ratingToShow !== null ? (
                  <>
                    {renderStars(ratingToShow)}
                    <div className="rating-value mt-0.5 md:mt-1 text-xs md:text-sm">
                      {avgRating.toFixed(2)} / 5
                    </div>
                  </>
                ) : (
                  <>
                    <div className="stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={`empty-${i}`} className="star" />
                      ))}
                    </div>
                    <div className="rating-value mt-0.5 md:mt-1 text-xs md:text-sm">-- / 5</div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- モーダル ---- */}
      {selectedDate && allReviews.length > 0 && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="modal-date-box">
              {dayjs(selectedDate).locale('en').format('DD MMM.YYYY')}
            </div>

            <div className="modal-rating-score-container">
              <span className="modal-rating-main-val">
                {averageStarsByDate[selectedDate].toFixed(2)}
              </span>
              <span className="modal-rating-denom">/5.00</span>
            </div>

            {renderStars(averageStarsByDate[selectedDate], 'large')}

            <div className="modal-review-box">
              <div className="modal-review-header">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                <span>All reviews</span>
              </div>
              <div className="review-text">
                {allReviews.map((review, index) => (
                  <div key={index} className="review-item">
                    <div className="review-item-header">
                      <svg className="user-icon" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M12 14c-6 0-8 3-8 5v1h16v-1c0-2-2-5-8-5z" />
                      </svg>
                    </div>
                    <div className="review-item-text">{review.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}