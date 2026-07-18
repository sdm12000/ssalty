---
name: site-builder
description: "웹사이트 코드 구현 스킬. Next.js 15 App Router, Tailwind CSS v4, Framer Motion, GSAP을 사용하여 디자인 시스템을 프로덕션급 코드로 구현한다. 사이트 구현, 코딩, 개발, 빌드, 프론트엔드 작업을 언급하면 이 스킬을 사용하라. 사이트 수정, 코드 변경, 컴포넌트 추가, 기능 구현 등 후속 작업에도 이 스킬을 사용하라."
---

# 사이트 빌더 스킬

디자인 시스템을 Next.js 15 프로젝트로 구현한다. 픽셀 퍼펙트한 디자인 구현과 부드러운 애니메이션이 핵심이다.

## 프로젝트 초기화

### Step 1: Next.js 프로젝트 생성

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

### Step 2: 필수 의존성 설치

```bash
npm install framer-motion gsap @gsap/react lenis clsx tailwind-merge
```

선택적 의존성 (컨셉에 따라):
```bash
npm install @react-three/fiber @react-three/drei three    # 3D 요소
npm install lucide-react                                    # 아이콘
npm install @radix-ui/react-dialog @radix-ui/react-tooltip  # 접근성 좋은 UI 프리미티브
```

### Step 3: Tailwind CSS v4 설정

`src/app/globals.css`에서 `@theme` 블록으로 디자인 토큰을 정의한다:

```css
@import "tailwindcss";

@theme {
  /* 디자인 시스템의 컬러를 여기에 매핑 */
  --color-background: /* 디자인 시스템 값 */;
  --color-foreground: /* 디자인 시스템 값 */;
  /* ... */

  /* 폰트 */
  --font-display: /* 디자인 시스템 값 */;
  --font-body: /* 디자인 시스템 값 */;

  /* 애니메이션 이징 */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

  /* 커스텀 값 */
}
```

### Step 4: 루트 레이아웃 설정

`src/app/layout.tsx`:
- next/font로 폰트 로딩 (display: 'swap')
- 메타데이터 설정 (title, description, Open Graph)
- Lenis 스무스 스크롤 프로바이더 (클라이언트 컴포넌트)
- 전역 grain 오버레이 (필요 시)

## 코드 아키텍처

### 컴포넌트 구성 원칙

```
src/components/
├── ui/          → 원자 단위 (Button, Badge, Input)
├── sections/    → 페이지 섹션 (Hero, Features, About)
├── layout/      → 구조 (Header, Footer, Container)
└── motion/      → 애니메이션 래퍼 (FadeIn, StaggerChildren, Parallax)
```

**motion/ 컴포넌트 패턴:**

재사용 가능한 애니메이션 래퍼를 만들어 일관된 모션을 적용한다:

```tsx
// components/motion/fade-in.tsx
"use client";
import { motion } from "framer-motion";

export function FadeIn({ children, delay = 0, direction = "up" }) {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

### 서버/클라이언트 컴포넌트 분리

| 서버 컴포넌트 (기본) | 클라이언트 컴포넌트 ("use client") |
|---------------------|--------------------------------|
| 정적 콘텐츠 | 애니메이션 (Framer Motion) |
| 레이아웃 구조 | 인터랙티브 UI (호버, 클릭) |
| 메타데이터 | 스크롤 이벤트 리스너 |
| 데이터 표시 | 상태 관리 (useState, useEffect) |

**원칙**: 클라이언트 바운더리를 최대한 아래로 내린다. 전체 페이지가 아닌 개별 인터랙티브 컴포넌트만 클라이언트로 만든다.

### 유틸리티 함수

```tsx
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## 디자인 구현 규칙

### Tailwind 클래스 작성 순서

```
포지셔닝 → 디스플레이 → 크기 → 스페이싱 → 타이포그래피 → 비주얼 → 인터랙티브 → 반응형

예: "absolute top-0 left-0 flex items-center w-full h-16 px-6 text-sm font-medium text-foreground bg-background/80 backdrop-blur-xl transition-all duration-300 hover:bg-background/95 md:h-20 md:px-8"
```

### 이미지 처리

- 모든 이미지에 `next/image` 사용
- `sizes` 속성을 정확히 설정 (반응형 크기 힌트)
- 히어로 이미지에 `priority` 속성
- 아직 실제 이미지가 없으면 `placeholder="blur"` + 생성된 블러 데이터 또는 Unsplash 임베드 URL을 사용
- 순수 장식 이미지가 아니면 `alt` 텍스트 필수

### 폰트 로딩

```tsx
// lib/fonts.ts
import { Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";

export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// 한국어 폰트 (로컬 또는 CDN)
export const fontKo = localFont({
  src: "../assets/fonts/Pretendard-Variable.woff2",
  variable: "--font-ko",
  display: "swap",
});
```

## 애니메이션 구현

### Framer Motion 패턴

React 컴포넌트의 entrance/exit, 호버, 탭 애니메이션에 사용한다. 상세는 `references/animation-patterns.md` 참조.

### GSAP + ScrollTrigger 패턴

복잡한 스크롤 기반 애니메이션, 핀 섹션, 타임라인 시퀀스에 사용한다. 상세는 `references/animation-patterns.md` 참조.

### Lenis 스무스 스크롤

```tsx
// components/smooth-scroll.tsx
"use client";
import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
```

## 성능 최적화

| 항목 | 기법 |
|------|------|
| LCP | 히어로 이미지 priority, 폰트 preload |
| CLS | 이미지 크기 명시, 폰트 display swap |
| FID | 클라이언트 컴포넌트 최소화, 동적 임포트 |
| 번들 크기 | GSAP은 필요한 플러그인만 import |
| 애니메이션 | transform/opacity만 애니메이트, will-change 설정 |
| 이미지 | WebP/AVIF 자동 변환 (Next.js Image), 적절한 sizes |

## 빌드 확인

구현 완료 후 반드시 실행:

```bash
npm run build
```

빌드 성공을 확인하고, 빌드 에러가 있으면 모두 수정한다. TypeScript 에러, import 에러, 미사용 변수 등을 해결한다.

## 산출물

구현 완료 후 `_workspace/03_implementation_manifest.md`에 다음을 기록한다:

```markdown
# 구현 매니페스트

## 생성된 파일 목록
| 파일 경로 | 역할 | 비고 |
|----------|------|------|
| src/app/layout.tsx | 루트 레이아웃 | 폰트, 메타데이터, 스무스 스크롤 |
| ... | ... | ... |

## 사용된 기술
- Next.js 15.x
- Tailwind CSS 4.x
- ...

## 빌드 상태
- [성공/실패]: [상세]

## 알려진 제한사항
- [있으면 기술]
```
