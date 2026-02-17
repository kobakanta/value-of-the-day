import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import { AccessProvider } from './access-context';
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

const defaultUrl = "https://value-of-the-day.vercel.app";

function getMetadata(lang: string = "ja"): Metadata {
  const isJapanese = lang.startsWith("ja");

  if (isJapanese) {
    return {
      title: "Value of the day",
      description: "今日は星いくつ？ | Value of the day",
      icons: {
        icon: "/icon.jpg",
      },
      openGraph: {
        title: "Value of the day",
        description: "今日は星いくつ？ | 1日に星とレビューで価値をつけよう！",
        url: defaultUrl,
        siteName: "Value of the day",
        locale: "ja_JP",
        alternateLocale: ["en_US"],
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
        description: "1日に星とレビューで価値をつけよう！",
        images: ["/opengraph-image.png"],
      },
    };
  }

  return {
    title: "Value of the day",
    description: "How many stars for today? | Value of the day",
    icons: {
      icon: "/icon.jpg",
    },
    openGraph: {
      title: "Value of the day",
      description: "How many stars for today? | Rate your day with stars and reviews!",
      url: defaultUrl,
      siteName: "Value of the day",
      locale: "en_US",
      alternateLocale: ["ja_JP"],
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
      description: "Rate your day with stars and reviews!",
      images: ["/opengraph-image.png"],
    },
  };
}

export const metadata: Metadata = getMetadata("ja");

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
        <AccessProvider>
          {children}
        </AccessProvider>
      </body>
    </html>
  );
}
