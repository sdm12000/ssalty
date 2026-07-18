# 구현 매니페스트 — 행복헌법 717 시민 페스타

> 디자인 시스템(`02_design_system.md`)을 100% 반영한 Next.js 15 원페이지 인터랙티브 사이트.
> 위치: `C:\Users\jean8\ssalty\site\`

---

## 1. 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js (App Router) | 15.1.6 | 프레임워크 |
| React | 19.0.0 | UI |
| Tailwind CSS | 4.0.3 (`@tailwindcss/postcss`) | 스타일 · `@theme` 토큰 |
| Framer Motion | 11.x | 진입/UI 모션 · 자소 조립 · 카드 생성 |
| GSAP + ScrollTrigger + @gsap/react | 3.12.x | 저울 pin/scrub 조립 |
| Lenis | 1.x | 스무스 스크롤(reduced-motion 시 비활성) |
| html-to-image | 1.11.x | '나의 행복헌법' 카드 이미지 저장 |
| TypeScript | 5.7 | 타입 |

폰트: **Pretendard Variable**(@font-face, jsDelivr CDN, 본문·디스플레이) + **Nanum Myeongjo**(헌법 인용 명조) + **Nanum Pen Script**(위트 손글씨) + **Fraunces**(영문 accent) + **Space Grotesk**(넘버/날짜) — Google 폰트는 `next/font/google`로 로드(CLS 방지). Gmarket Sans는 미확보로 디자인 시스템 명시 폴백인 Pretendard 900을 디스플레이로 사용.

---

## 2. 생성된 파일 목록

| 파일 경로 | 역할 |
|----------|------|
| `package.json` · `tsconfig.json` · `next.config.ts` · `postcss.config.mjs` | 프로젝트 설정 |
| `src/app/globals.css` | Tailwind v4 `@theme`(디자인 토큰 전체) · 그레인 · 언더라인 드로잉 · draw-path · reduced-motion 폴백 |
| `src/app/layout.tsx` | 루트 레이아웃 · 폰트 · 메타데이터 · **schema.org/Event JSON-LD** · 톤여정/그레인/스무스스크롤/Nav/Index 마운트 |
| `src/app/page.tsx` | 8개 섹션 조립 |
| `src/lib/fonts.ts` | next/font Google 폰트 4종 |
| `src/lib/utils.ts` | `cn`, lerp, clamp |
| `src/lib/data.ts` | 행사 팩트시트 · 부스 4존 · 칩 6지 2세트 · 조문 인덱스 |
| `src/lib/hangul.ts` | 한글 자소 분해 · 조사(을/를, (으)로) 판별 |
| `src/types/index.ts` | 타입 정의 |
| `src/components/svg/motifs.tsx` | **인라인 SVG**: 무궁화 · 저울(부품 id) · 붓펜 깃털 · 법봉 · 책 더미 · 부스 픽토그램 4종 · 캘린더 · 점선 디바이더 |
| `src/components/providers/tone-journey.tsx` | **톤 여정** — 고정 배경 레이어 5단계 색 보간(`useScroll`) |
| `src/components/providers/smooth-scroll.tsx` | Lenis 래퍼(reduced-motion 폴백) |
| `src/components/motion/blur-fade.tsx` | BlurFade · WordReveal(단어 stagger 낭독) |
| `src/components/motion/char-reveal.tsx` | 조항 제목 char-by-char |
| `src/components/motion/draw-in-view.tsx` | 인뷰 시 SVG `stroke-dashoffset` draw-on |
| `src/components/ui/button.tsx` | 버튼 4변형(navy/terracotta/outline wipe/ghost) · 마그네틱 |
| `src/components/ui/chip.tsx` | 선택 칩(캡슐 · 프레스 · stagger) |
| `src/components/layout/nav.tsx` | sticky 네비 · 스크롤 축소/블러 · 모바일 풀스크린 오버레이 |
| `src/components/layout/constitution-index.tsx` | 좌측 sticky 조문 인덱스(데스크탑) · 상단 프로그레스 바(모바일) |
| `src/components/layout/footer.tsx` | 부칙 형식 푸터 |
| `src/components/sections/intro.tsx` | ① **자소 조립 인트로** |
| `src/components/sections/declaration.tsx` | 선언(고딕→손글씨 위트 전환) |
| `src/components/sections/my-constitution.tsx` | ② **나의 행복헌법 카드 실시간 생성 + 이미지 저장** |
| `src/components/sections/booths.tsx` | 제2~5조 부스 zig-zag 서사 + 픽토그램 draw-on |
| `src/components/sections/photozone.tsx` | 거울의 방(대칭 + 반사 타이포) |
| `src/components/sections/scale-moment.tsx` | ③ **저울·붓펜 GSAP pin/scrub 오브제 조립** |
| `src/components/sections/factsheet.tsx` | 팩트시트 · .ics 캘린더 · 네이버 지도 |

---

## 3. 구현한 핵심 인터랙션 3종

1. **자소 조립 인트로** (`intro.tsx`) — '행복/헌법' 4음절을 `decomposeSyllable`로 초·중·종성 분해, 각 자소가 사방에서 `--ease-ink`로 날아들어 조립 후 솔리드 음절이 `--ease-seal`로 정착. 우상단 SKIP · 스크롤 시 즉시 완료 · 세션 재방문 시 축약(0.6s급) · reduced-motion 시 단순 fade.
2. **나의 행복헌법 카드 생성** (`my-constitution.tsx`) — 침해요소 6칩(네이비) + 필요한것 6칩(테라코타) 다중선택 → 조사 자동보정(`josaEulReul`/`josaRo`)으로 명조 조항 문장 조판 → char-by-char 타이핑(명조 커서 blink) → 카드 seal-in(scale 0.92→1) + 무궁화 워터마크 + 붓펜 서명 + 발행일. **html-to-image로 4:5 카드 PNG 저장**(성공 시 success 체크).
3. **저울·붓펜 오브제 조립** (`scale-moment.tsx`) — GSAP `matchMedia`로 데스크탑 pin+scrub: 저울 기둥/받침 상승 → 양팔·접시 결합(미세 흔들림→수평) → 법봉·책 좌하단 쌓임 → 네이비 붓펜 위에서 저울 중앙에 꽂힘 → "내가 쓰는, 나의 헌법" blur-fade. 모바일은 pin 없이 인뷰 3단계 조립, reduced-motion은 정적 표시.

---

## 4. 디자인 시스템 반영 체크

- **컬러 토큰**: `@theme`에 core/semantic/톤5단계/그림자/이징/듀레이션 전부 이식.
- **톤 여정**: 고정 배경 레이어가 스크롤 0→1에 `#EAE6DC→#F0DDC6` 5단계 연속 보간(background-color만 변경, reduced-motion에서도 유지).
- **타이포**: fluid clamp 스케일 · 두 목소리(고딕+명조, 위트 손글씨는 국소) · 커스텀 언더라인 드로잉 · tnum · keep-all.
- **모티프**: 무궁화·저울·붓펜·법봉·책·부스 픽토그램·캘린더 전부 인라인 SVG 라인아트(외부 이미지 0).
- **모션 3종 + 공통 패턴**: blur-fade-up · char reveal · underline draw · path draw-on · tone shift · paper press · magnetic.
- **반응형**: 모바일 단일 컬럼/상단 프로그레스바/오브제 간소화, 데스크탑 좌측 인덱스·pin/scrub·대형 타이포·마그네틱.
- **접근성**: WCAG 대비 준수 색 운용, focus-visible 링, `prefers-reduced-motion` 전역 폴백, 시맨틱 HTML(section/article/blockquote), Event 구조화 데이터.

---

## 5. 빌드 결과

- **`npm run build` 성공** (Next.js 15.1.6, 정적 프리렌더).
- Route `/` — First Load JS **207 kB** (공유 105 kB).
- 타입 에러 0 · 린트 통과 · 정적 페이지 4/4 생성.
- 프로덕션 서버 기동 확인: `HTTP 200`, SSR HTML에 헌법 제10조·나의 행복헌법·거울의 방·Event JSON-LD 정상 포함, 런타임 에러 로그 없음.

---

## 6. 실행 방법

```bash
cd C:\Users\jean8\ssalty\site
npm install      # 최초 1회
npm run dev      # 개발 서버 http://localhost:3000
npm run build && npm start   # 프로덕션
```

---

## 7. 알려진 제한 / design-qa 확인 포인트

- **폰트**: 디스플레이는 Gmarket Sans 미확보로 Pretendard 900 폴백(디자인 시스템 명시 폴백). 실제 Gmarket woff2 확보 시 `--font-display`만 교체하면 됨.
- **자소 조립**: 자소를 실제 결합 렌더가 아닌 "고스트 자소 수렴 → 솔리드 음절 정착" 방식으로 표현(가독성·안정성 우선). 조립 인상은 유지.
- **확인 요망**: ① 인트로 자소 조립 타이밍/스킵/세션 축약, ② 카드 PNG 저장 결과물(html-to-image가 웹폰트 인라인하는지 — 명조 렌더), ③ 데스크탑 저울 pin 구간 스크럽 부드러움과 모바일 폴백, ④ 톤 여정 색 전이 연속성, ⑤ 모바일 <lg 반응형(터치 타겟·오버레이 메뉴), ⑥ reduced-motion 전 구간 폴백.
- 지도는 네이버 지도 검색 링크(외부), 임베드 지도 아님.
