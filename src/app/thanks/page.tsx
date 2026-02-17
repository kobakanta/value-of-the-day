'use client';

import Link from 'next/link';

export default function ThanksPage() {
  return (
    <div className="flex flex-col items-center p-4 max-w-[1024px] mx-auto min-h-screen bg-white relative">
      {/* 上部タイトルリンク */}
      <Link href="/">
        <h1 className="text-3xl font-bold cursor-pointer mt-4 mb-2 md:mb-4 text-center">
          Value of the day
        </h1>
      </Link>

      {/* 星5つ（タイトルとの間隔を詰める：SPのみ） */}
      <div className="flex justify-center text-[#f5a623] mb-5 md:mb-6 gap-[1px] md:gap-2 text-2xl md:text-3xl -mt-[2px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      {/* 中央メッセージ：一行固定（太さは既存=font-semiboldのまま） */}
      <h2
        className="
          font-semibold mb-4 text-center leading-tight whitespace-nowrap overflow-hidden
          md:text-[55px]
          text-[clamp(18px,5.6vw,28px)]
        "
      >
        Thank you for your submission!!
      </h2>

      <p className="text-base text-gray-700 mb-10 text-center">
        Your review means a lot to today&apos;s value.
      </p>

      <div className="text-sm text-gray-600 mb-8 text-center max-w-md leading-tight">
        <p className="mb-1.5">
          You can now view detailed reviews on the calendar.
        </p>
        <p className="mb-3">
          * If you leave this site or refresh the page, you&apos;ll need to post again to view reviews.
        </p>
        <p className="mb-1 text-xs">
          これでカレンダーで詳細なレビューを見ることができます。
        </p>
        <p className="text-xs">
          ※サイトを離れたりページを更新したりすると、レビューを見るために<br />再度投稿する必要があります。
        </p>
      </div>

      {/* ボタン（ホバー＝黄／タップ＝黒） */}
      <div className="flex gap-4 md:gap-6">
        <Link
          href="/"
          className="border text-black bg-white font-semibold rounded-none transition
                     whitespace-nowrap px-4 py-2 md:px-8 md:py-2 text-sm md:text-base
                     hover:bg-black hover:text-white active:bg-black active:text-white"
        >
          Back to Top
        </Link>
        <Link
          href="/calendar"
          className="border text-black bg-white font-semibold rounded-none transition
                     whitespace-nowrap px-4 py-2 md:px-8 md:py-2 text-sm md:text-base
                     hover:bg-black hover:text-white active:bg-black active:text-white"
        >
          Check reviews
        </Link>
      </div>
    </div>
  );
}
