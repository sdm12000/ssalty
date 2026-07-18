import { Nanum_Myeongjo, Nanum_Pen_Script, Fraunces, Space_Grotesk } from "next/font/google";

// 헌법 조항 인용 전용 명조 (문서·법전 질감)
// subsets 미지정 + preload:false → next/font가 korean 포함 전체 서브셋을 self-host.
//   (subsets:["latin"]만 지정하면 한글이 기본 serif로 폴백되어 명조 질감이 사라진다.
//    next/font 타입은 korean 서브셋을 노출하지 않으므로 subsets 생략으로 전체 로드.)
// preload:false → 한글 서브셋 용량이 크므로 LCP 보호(display:swap 비동기 로드).
export const fontSerif = Nanum_Myeongjo({
  weight: ["400", "700", "800"],
  variable: "--font-serif-ko",
  display: "swap",
  preload: false,
});

// 위트 반전 순간 전용 손글씨 — 손글씨 카피가 한글이므로 전체 서브셋 필요
export const fontHand = Nanum_Pen_Script({
  weight: ["400"],
  variable: "--font-hand-ko",
  display: "swap",
  preload: false,
});

// 영문 세리프 accent — "Constitution of Happiness"
export const fontAccent = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-accent-en",
  display: "swap",
});

// 넘버·날짜·라틴 라벨
export const fontMono = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono-en",
  display: "swap",
});
