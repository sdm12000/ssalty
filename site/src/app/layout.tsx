import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontSerif, fontHand, fontAccent, fontMono } from "@/lib/fonts";
import { EVENT } from "@/lib/data";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ToneJourney } from "@/components/providers/tone-journey";
import { Nav } from "@/components/layout/nav";
import { ConstitutionIndex } from "@/components/layout/constitution-index";

// Vercel 배포 시 프로덕션 도메인이 자동 주입됩니다(VERCEL_PROJECT_PRODUCTION_URL).
// 커스텀 도메인을 쓰면 NEXT_PUBLIC_SITE_URL 환경변수로 덮어쓰세요.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "행복헌법 717 시민 페스타 — 행복에도 헌법이 있다면?",
    template: "%s | 행복헌법 717",
  },
  description:
    "제헌절, 헌법 제10조 행복추구권을 청년의 언어로 다시 쓰는 인터랙티브 문화 페스타. 2026.7.17–18, 프레쉬엔지니어드 홍대점. 나만의 행복헌법을 직접 제정해보세요.",
  keywords: ["행복헌법", "제헌절", "행복추구권", "헌법 제10조", "시민 페스타", "이어온", "SSalty"],
  openGraph: {
    title: "행복헌법 717 시민 페스타",
    description: "행복에도 헌법이 있다면? 나만의 행복헌법을 제정하는 청년 문화 체험 페스타.",
    locale: "ko_KR",
    type: "website",
    siteName: "행복헌법 717",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4efe4",
  width: "device-width",
  initialScale: 1,
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: EVENT.title,
  description: "헌법 제10조 행복추구권을 재해석하는 청년 문화 체험 페스타",
  startDate: "2026-07-17T14:00:00+09:00",
  endDate: "2026-07-18T18:00:00+09:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "프레쉬엔지니어드 홍대점",
    address: { "@type": "PostalAddress", addressLocality: "서울 홍대", addressCountry: "KR" },
  },
  offers: {
    "@type": "Offer",
    price: "5000",
    priceCurrency: "KRW",
    availability: "https://schema.org/InStock",
  },
  organizer: { "@type": "Organization", name: EVENT.host },
  performer: { "@type": "Organization", name: EVENT.organizer },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${fontSerif.variable} ${fontHand.variable} ${fontAccent.variable} ${fontMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        <ToneJourney />
        <div className="grain-overlay" aria-hidden />
        <SmoothScroll>
          <Nav />
          <ConstitutionIndex />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
