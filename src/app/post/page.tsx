'use client';

import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";

export default function PostPage() {
  const router = useRouter();

  const [text, setText] = useState("");
  const [stars, setStars] = useState(0);
  const [date, setDate] = useState(() => dayjs(new Date()).format("YYYY-MM-DD"));

  const handleSubmit = async () => {
    if (!text || stars === 0) {
      alert("すべての項目を入力してください");
      return;
    }
    try {
      const selectedDate = Timestamp.fromDate(new Date(date));
      await addDoc(collection(db, "reviews"), {
        text,
        stars,
        createdAt: selectedDate,
      });
      // Mark user as having posted in this session
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('hasPosted', 'true');
      }
      router.push("/thanks");
    } catch (error) {
      console.error("Firestore保存エラー:", error);
      alert("保存に失敗しました。詳細はコンソールを確認してください。");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-[1024px] mx-auto min-h-screen bg-white relative">
      {/* ---- スマホ用ヘッダー（カレンダーと同仕様：タップで黒地＋白文字） ---- */}
      <div className="md:hidden fixed top-0 left-0 w-full flex justify-around bg-white border-b border-gray-300 py-2 z-10">
        <Link
          href="/"
          className="w-1/2 text-center font-semibold py-2 border-r border-gray-300
                     hover:bg-black hover:text-white active:bg-black active:text-white transition"
          prefetch={false}
        >
          Back to Top
        </Link>
        <Link
          href="/calendar"
          className="w-1/2 text-center font-semibold py-2
                     hover:bg-black hover:text-white active:bg-black active:text-white transition"
          prefetch={false}
        >
          Check reviews
        </Link>
      </div>

      {/* ---- PC用 右上2段 ---- */}
      <div className="hidden md:absolute md:top-4 md:right-4 md:flex md:flex-col md:items-end md:gap-2">
        <Link
          href="/"
          className="min-w-[160px] text-center border border-black text-black px-3 py-1 text-sm font-semibold hover:bg-black hover:text-white transition"
          prefetch={false}
        >
          Back to Top
        </Link>
        <Link
          href="/calendar"
          className="min-w-[160px] text-center border border-black text-black px-3 py-1 text-sm font-semibold hover:bg-black hover:text-white transition"
          prefetch={false}
        >
          Check reviews
        </Link>
      </div>

      {/* ---- タイトル：カレンダーと同じ位置・サイズ ---- */}
      <Link href="/" prefetch={false} className="mt-14 md:mt-0">
        <h1 className="text-3xl font-bold mb-4 cursor-pointer text-center">
          Value of the day
        </h1>
      </Link>

      {/* ---- タイトル下の行：カレンダーの < 2025-10 > と同じ位置感 ---- */}
      <div className="flex items-center justify-center gap-4 mb-2">
        <span className="text-lg">Post review</span>
      </div>

      {/* ---- サブ見出し（1行固定・太さ強め） ---- */}
      <h2
        className="
          mb-4 text-center leading-tight whitespace-nowrap overflow-hidden
          text-[clamp(24px,7vw,55px)] font-extrabold tracking-tight
        "
      >
        How was your day?
      </h2>

      {/* ---- 日付選択 ---- */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="bg-gray-100 text-gray-800 px-6 py-2 rounded-xl text-center text-sm mb-6"
      />

      {/* ---- 星評価 ---- */}
      <div className="flex justify-center gap-2 sm:gap-4 mb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            onClick={() => setStars(i)}
            className={`text-4xl sm:text-5xl transition ${i <= stars ? "text-[#f5a623]" : "text-gray-300"}`}
            type="button"
            aria-label={`${i} star`}
          >
            ★
          </button>
        ))}
      </div>

      {/* ---- レビュー入力 ---- */}
      <textarea
        className="w-[95%] max-w-md bg-gray-100 p-4 rounded-2xl resize-none h-48 placeholder-gray-500 text-base mb-10"
        placeholder="Write your review"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* ---- ボタン ---- */}
      <div className="flex gap-6">
        <button
          onClick={() => router.push("/")}
          className="border border-black text-black bg-white font-semibold px-8 py-2 rounded-none hover:bg-black hover:text-white transition"
          type="button"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-[#f5a623] text-white font-semibold px-8 py-2 rounded-none hover:bg-yellow-400 hover:text-white transition"
          type="button"
        >
          Post review
        </button>
      </div>
    </div>
  );
}
