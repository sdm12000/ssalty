# Next.js 15 App Router 패턴 가이드

## 목차
1. [프로젝트 구조](#프로젝트-구조)
2. [라우팅 패턴](#라우팅-패턴)
3. [서버/클라이언트 컴포넌트](#서버클라이언트-컴포넌트)
4. [메타데이터](#메타데이터)
5. [폰트 최적화](#폰트-최적화)
6. [이미지 최적화](#이미지-최적화)
7. [Tailwind CSS v4 통합](#tailwind-css-v4-통합)

---

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx              # 루트 레이아웃
│   ├── page.tsx                # 홈페이지
│   ├── globals.css             # Tailwind + 커스텀 CSS
│   ├── not-found.tsx           # 404 페이지
│   ├── loading.tsx             # 로딩 상태 (선택)
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx            # 목록 페이지
│   │   └── [slug]/
│   │       └── page.tsx        # 상세 페이지
│   └── (marketing)/            # 라우트 그룹 (URL에 영향 없음)
│       ├── pricing/
│       └── contact/
├── components/
│   ├── ui/                     # 재사용 UI 컴포넌트
│   ├── sections/               # 페이지 섹션
│   ├── layout/                 # Header, Footer 등
│   └── motion/                 # 애니메이션 래퍼
├── lib/
│   ├── fonts.ts                # 폰트 설정
│   └── utils.ts                # 유틸리티 (cn 함수 등)
└── types/
    └── index.ts                # 타입 정의
```

## 라우팅 패턴

### 라우트 그룹 활용

URL 구조에 영향을 주지 않으면서 레이아웃을 공유하는 패턴:

```
app/
├── (marketing)/
│   ├── layout.tsx      # 마케팅 페이지 전용 레이아웃
│   ├── page.tsx        # / (홈)
│   ├── about/page.tsx  # /about
│   └── pricing/page.tsx # /pricing
└── (app)/
    ├── layout.tsx      # 앱 전용 레이아웃
    └── dashboard/page.tsx # /dashboard
```

### 동적 라우트

```tsx
// app/projects/[slug]/page.tsx
export default function ProjectPage({ params }: { params: { slug: string } }) {
  // ...
}

// 정적 생성 (선택)
export function generateStaticParams() {
  return [{ slug: "project-1" }, { slug: "project-2" }];
}
```

## 서버/클라이언트 컴포넌트

### 패턴: 서버 컴포넌트가 클라이언트 컴포넌트를 감싼다

```tsx
// app/page.tsx (서버 컴포넌트)
import { HeroAnimation } from "@/components/sections/hero-animation"; // 클라이언트
import { StaticContent } from "@/components/sections/static-content"; // 서버

export default function HomePage() {
  return (
    <main>
      <HeroAnimation>
        <StaticContent />  {/* 서버 컴포넌트를 children으로 전달 */}
      </HeroAnimation>
    </main>
  );
}
```

### 패턴: 인터랙티브 아일랜드

```tsx
// components/sections/features.tsx (서버)
import { FeatureCard } from "@/components/ui/feature-card"; // 클라이언트 (호버 애니메이션)

export function Features() {
  const features = [...]; // 서버에서 데이터 처리
  return (
    <section>
      <h2>Features</h2>
      <div className="grid grid-cols-3 gap-6">
        {features.map(f => <FeatureCard key={f.id} {...f} />)}
      </div>
    </section>
  );
}
```

## 메타데이터

```tsx
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "사이트명",
    template: "%s | 사이트명",
  },
  description: "사이트 설명",
  openGraph: {
    title: "사이트명",
    description: "사이트 설명",
    url: "https://example.com",
    siteName: "사이트명",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

페이지별 메타데이터:
```tsx
// app/about/page.tsx
export const metadata: Metadata = {
  title: "소개",  // → "소개 | 사이트명"
  description: "소개 페이지 설명",
};
```

## 폰트 최적화

```tsx
// lib/fonts.ts
import { Inter } from "next/font/google";
import localFont from "next/font/local";

// Google Fonts
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// 로컬 폰트 (한국어)
export const pretendard = localFont({
  src: [
    { path: "../assets/fonts/Pretendard-Regular.woff2", weight: "400" },
    { path: "../assets/fonts/Pretendard-Medium.woff2", weight: "500" },
    { path: "../assets/fonts/Pretendard-SemiBold.woff2", weight: "600" },
    { path: "../assets/fonts/Pretendard-Bold.woff2", weight: "700" },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

// layout.tsx에서 적용
// <body className={`${inter.variable} ${pretendard.variable}`}>
```

CDN을 통한 한국어 폰트 (로컬 파일 불가 시):
```tsx
// app/layout.tsx <head>에 직접 추가
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
/>
```

## 이미지 최적화

```tsx
import Image from "next/image";

// 히어로 이미지 — LCP 최적화
<Image
  src="/hero.jpg"
  alt="히어로 이미지 설명"
  width={1920}
  height={1080}
  priority
  sizes="100vw"
  className="object-cover"
/>

// 갤러리 이미지 — 반응형 sizes
<Image
  src="/gallery-1.jpg"
  alt="갤러리 이미지"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover rounded-2xl"
/>

// 플레이스홀더 이미지 (실제 이미지 없을 때)
<div className="aspect-[16/9] bg-muted rounded-2xl overflow-hidden">
  <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5" />
</div>
```

## Tailwind CSS v4 통합

### @theme 블록

```css
/* globals.css */
@import "tailwindcss";

@theme {
  /* 컬러 — oklch()로 정의하면 자동 P3 색공간 지원 */
  --color-background: oklch(0.98 0.005 240);
  --color-foreground: oklch(0.15 0.01 240);
  --color-muted: oklch(0.93 0.005 240);
  --color-muted-foreground: oklch(0.45 0.01 240);
  --color-accent: oklch(0.65 0.2 280);
  --color-accent-foreground: oklch(0.98 0.005 280);
  --color-border: oklch(0.9 0.005 240);

  /* 폰트 — next/font의 CSS variable과 연결 */
  --font-display: var(--font-playfair), Georgia, serif;
  --font-body: var(--font-inter), system-ui, sans-serif;

  /* 커스텀 이징 */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

  /* 커스텀 border-radius */
  --radius-xl: 1.25rem;
  --radius-2xl: 1.5rem;
  --radius-3xl: 2rem;
}
```

### 다크모드

Tailwind v4에서는 `@variant dark`를 사용하거나 `@media (prefers-color-scheme: dark)` 기반:

```css
@theme {
  --color-background: oklch(0.98 0.005 240);
  --color-foreground: oklch(0.15 0.01 240);
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: oklch(0.12 0.01 240);
    --color-foreground: oklch(0.93 0.005 240);
  }
}
```

또는 CSS custom property를 class 토글로 전환:
```css
:root {
  --bg: oklch(0.98 0.005 240);
}
.dark {
  --bg: oklch(0.12 0.01 240);
}
```
