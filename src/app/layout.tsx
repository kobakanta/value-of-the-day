import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Value of the day",
  description: "今日は星いくつ？ | Value of the day",
  icons: {
    icon: "/icon.jpg",
  },
  openGraph: {
    title: "Value of the day",
    description: "今日は星いくつ？ | あなたの一日に星を付けて価値をつけよう！",
    url: "https://value-of-the-day.vercel.app",
    siteName: "Value of the day",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Value of the day",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Value of the day",
    description: "あなたの一日に星を付けて価値をつけよう！",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.jpg" type="image/jpeg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
