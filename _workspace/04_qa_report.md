# QA 리포트 — 행복헌법 717 시민 페스타

> 검증일: 2026-07-18 · 검증 대상: `C:\Users\jean8\ssalty\site\`
> 입력: `01_concept_brief.md` · `02_design_system.md` · `03_implementation_manifest.md` · 공식 포스터
> 검증자: design-qa

---

## 종합 등급: A− (배포 가능, 소폭 폴리시 권장)

빌드/런타임/팩트/디자인 충실도 모두 통과. 배포 blocker 없음. 검증 중 발견한 **1건의 CRITICAL(한글 명조·손글씨 폰트 미적용)을 직접 수정 후 재빌드 통과** 확인. 남은 항목은 전부 배포를 막지 않는 소폭 개선.

| 항목 | 점수 (/10) |
|------|-----------|
| 디자인 충실도 | 9 (폰트 수정 후) |
| AI 탈취 점수 | 8 |
| 코드 품질 | 8 |
| 반응형 | 8 |
| 애니메이션 | 9 |
| 접근성 | 8 |

- **빌드**: `npm run build` 성공 (Next.js **15.1.6** — 16 아님 ✅). First Load JS 207 kB. 타입 에러 0, 정적 4/4.
- **런타임**: 프로덕션 서버 HTTP 200. SSR HTML에 헌법 제10조·나의 행복헌법·거울의 방·이어온·SSalty·Event JSON-LD(`"price":"5000"`) 정상 포함. 런타임 에러 없음.
- **버전**: `package.json` next `15.1.6` ✅ / react 19 / tailwindcss 4.0.3 / framer-motion 11 / gsap 3.12 — 매니페스트와 일치.

---

## CRITICAL 항목 — 검증 중 직접 수정 완료 ✅

### C-1. 한글 명조·손글씨 폰트가 실제로 적용되지 않음 (수정 완료)
- **파일**: `src/lib/fonts.ts`
- **문제**: `Nanum_Myeongjo`·`Nanum_Pen_Script`를 `subsets: ["latin"]`으로만 로드. 생성된 `@font-face`의 `unicode-range`를 직접 검사한 결과 한글이 **약 13개 음절(가·고·기·다·로·리·사·스·시·이·인·지·하)만** 포함되고 전체 한글 영역(AC00–D7A3)이 누락. 결과적으로 헌법 제10조 인용·나의 행복헌법 카드 조항(명조), "행복에도 헌법이 있다면?"·"나만의 순간을 남기세요"(손글씨) 등 **핵심 한글 텍스트가 브라우저 기본 serif/cursive로 폴백**되어 "공문서 격식(명조) + 손글씨 온기"라는 컨셉의 척추가 시각적으로 무너짐. (빌드는 통과하므로 조용히 깨지는 유형.)
- **수정**: `subsets` 프로퍼티 제거 + `preload: false` 지정. next/font 타입이 이 패밀리의 `"korean"` 서브셋을 노출하지 않으므로, `subsets`를 생략하면 next/font가 **전 서브셋(korean 포함)을 self-host**한다. `preload:false`로 한글 서브셋 용량이 LCP를 침해하지 않도록 `display:swap` 비동기 로드.
- **검증**: 재빌드 후 폰트 CSS의 `unicode-range`에 전체 한글 영역(…u+d79e-d7a3 등) 포함 확인, self-host woff2 수 증가 확인, 빌드/런타임 재통과.

---

## FIX 항목 (배포 무관, 폴리시 권장)

### F-1. `metadataBase`가 placeholder 도메인
- **파일**: `src/app/layout.tsx:11` — `new URL("https://happy-constitution-717.example")`
- **문제**: `.example` 가짜 TLD. OG/트위터 카드의 절대 URL이 가짜 도메인 기준으로 생성되어 실제 공유 시 미리보기 링크가 깨질 수 있음.
- **수정**: Vercel 배포 도메인 확정 후 실제 URL로 교체 (예: `https://<project>.vercel.app`).

### F-2. OG 이미지 부재
- **파일**: `src/app/layout.tsx:19-25` (`openGraph`에 `images` 없음)
- **문제**: 매니페스트가 명시한 "포스터 무드 계승 커스텀 OG 이미지" 미구현. 타겟(청년·인스타 공유)에서 공유 카드에 이미지가 없어 전환력 손실.
- **수정**: 1200×630 OG 이미지 제작(또는 `opengraph-image.tsx`로 동적 생성) 후 `openGraph.images`·`twitter` 추가. 별도 에셋 필요.

### F-3. 모바일 오버레이 메뉴가 닫힘 상태에서도 포커스 가능
- **파일**: `src/components/layout/nav.tsx:93-125`
- **문제**: 닫힘 시 `opacity-0 pointer-events-none`만 적용, DOM/탭 순서에 남아 키보드 사용자가 보이지 않는 메뉴 링크로 탭 이동 가능.
- **수정**: 닫힘일 때 컨테이너에 `inert`(또는 링크 `tabIndex={-1}`) 부여. 예: `<div ... {...(!open && { inert: "" })}>`.

### F-4. 선택 칩 터치 타겟이 44px 미만
- **파일**: `src/components/ui/chip.tsx:31` — `px-5 py-2.5`
- **문제**: 높이 약 40px로 WCAG 권장 44×44px 미달(모바일 주 인터랙션인데 타겟이 작음).
- **수정**: `py-3` 또는 `min-h-11`로 상향.

### F-5. .ics 캘린더 파일 품질
- **파일**: `src/components/sections/factsheet.tsx:15-32`
- **문제**: (a) 2일(7/17–18) 행사인데 `DTSTART/DTEND`가 7/17 하루만 포함, (b) `DTSTAMP` 누락(일부 캘린더 앱이 요구), (c) 타임존/`Z` 없는 floating time. `dt()` 헬퍼는 항등 함수(불필요).
- **수정**: `DTSTAMP` 추가, 이틀 각각 VEVENT로 분리하거나 종료를 `20260718T180000`으로, TZID(`Asia/Seoul`) 명시. `dt` 제거.

---

## 개선 제안 (A로 굳히기)

- **P-1. 디스플레이 웨이트**: 디자인 시스템은 Black(900)을 요구하나 히어로/타이틀이 `font-extrabold`(800). Pretendard Variable은 920까지 지원하므로 `행복/헌법` 메가 타이포와 섹션 타이틀에 `font-black`을 적용하면 포스터의 각지고 두꺼운 조형에 더 근접. (`intro.tsx:141`, 각 섹션 h2/h3)
- **P-2. Pretendard CDN 의존**: `globals.css:100`의 Pretendard가 self-host가 아닌 jsDelivr CDN `@font-face`. 매니페스트는 self-host라 기술. CDN 장애 시 body가 Apple SD Gothic Neo/system으로 폴백. 안정성/성능을 위해 Pretendard도 self-host 또는 next/font화 권장(선택).
- **P-3. Lenis ↔ GSAP ScrollTrigger 통합**: `smooth-scroll.tsx`의 Lenis와 `scale-moment.tsx`의 ScrollTrigger가 명시 연동(`lenis.on('scroll', ScrollTrigger.update)` + gsap ticker) 없이 각자 window 스크롤 사용. 동작은 하나 저울 pin/scrub 구간이 미세하게 덜 매끄러울 수 있음. 통합 시 스크럽 품질 향상.
- **P-4. 조문 인덱스 톤 전이**: `constitution-index.tsx:46`이 progress 0.5 기준 네이비/테라코타 **이분 전환**. 디자인 시스템의 "연속 보간" 의도에 맞춰 색 lerp로 다듬으면 톤 여정과 더 일관됨(선택).
- **P-5. 데드 코드 정리**: `utils.ts`의 `lerp`/`clamp` 미사용, `factsheet.tsx`의 `dt` 항등 함수. 제거 권장(빌드 무관).

---

## PASS 항목 (잘 된 부분)

- **디자인 토큰 100% 이식** — `globals.css @theme`의 core/semantic/톤5단계/그림자/이징/듀레이션/radius/컨테이너가 디자인 시스템 §9와 정확히 일치(HEX 동일).
- **톤 여정 서사 척추 구현** — `tone-journey.tsx`가 `useScroll`로 `#eae6dc→#f0ddc6` 5단계를 `background-color`만 연속 보간. reduced-motion에서도 유지(설계 의도 준수). 고정 `-z-10` 단일 레이어로 성능 안전.
- **핵심 인터랙션 3종 전부 구현**:
  1. 자소 조립 인트로(`intro.tsx`) — `decomposeSyllable` 초·중·종성 분해, `--ease-ink` 수렴 → `--ease-seal` 정착, SKIP·스크롤 즉시완료·세션 재방문 축약·reduced-motion 단순 fade.
  2. 나의 행복헌법 카드(`my-constitution.tsx`) — 침해6칩(네이비)+필요6칩(테라코타) → 조사 자동보정(`josaEulReul`/`josaRo`) → char-by-char 조판 → seal-in 카드 + 무궁화 워터마크 + 붓펜 서명 + html-to-image PNG 저장(4:5). `disabled` 가드까지 처리.
  3. 저울·붓펜 조립(`scale-moment.tsx`) — GSAP `matchMedia`로 데스크탑 pin+scrub 4단계, 모바일 인뷰 3단계, reduced-motion 정적. 저울 미세 흔들림→수평 정지, 붓펜 back.out 정착.
- **AI 탈취 방어 성공** — 3컬럼 동일 카드 그리드 없음(부스는 zig-zag 5:7/7:5 + 리드 대형 카드), 파랑→보라 그라디언트 없음, 좌측 정렬 기본 + 의도적 대칭(포토존=거울 은유)만 예외, 호버 복합(lift+shadow+underline draw), 커스텀 SVG 모티프(무궁화·저울·붓펜·법봉·책·부스 픽토그램) 전부 라인아트로 통일. 스톡·이모지 0.
- **행사 팩트 정확** (포스터 대조) — 일시 `2026.7.17–18 · 14:00–18:00` ✅, 부스 4존 명칭(나를 알/표현할/취향 선택/연결될 권리) 포스터와 정확 일치 ✅, 포토존 거울 ✅, 체험비 5,000원 ✅, 주최 이어온(세대를 잇는 가치)·주관 SSalty(청년 문화 플랫폼) ✅. 하드코딩된 오정보 없음.
- **접근성 기본기** — 전역 `prefers-reduced-motion` 폴백(CSS + 컴포넌트 이중), `focus-visible` 링, 장식 SVG `aria-hidden`, `CharReveal` aria-label + per-char aria-hidden, 인트로 `sr-only` 전문(全文), 햄버거 `aria-label`/`aria-expanded`, `schema.org/Event` 구조화 데이터, `word-break: keep-all`.
- **반응형** — lg 브레이크포인트 기준 단일컬럼↔비대칭, 데스크탑 좌측 인덱스/모바일 상단 프로그레스바, GSAP matchMedia 데스크탑/모바일 분기, clamp fluid 타이포.
- **코드 품질** — TypeScript strict 통과, "use client" 경계 적절(정적 layout/page 서버, 인터랙션만 클라이언트), 컴포넌트 단일 책임 분리, Tailwind 토큰 일관 사용, 인라인 style은 동적 값·gradient에 한정.

---

## 재검증 로그

| 라운드 | 조치 | 결과 |
|--------|------|------|
| 1 | 초기 빌드 | 통과 (15.1.6, 207 kB) |
| 1 | 폰트 unicode-range 검사 | **CRITICAL C-1 발견** (한글 미포함) |
| 2 | `fonts.ts` subsets 제거 + preload:false | 재빌드 통과, 전체 한글 서브셋 포함 확인 |
| 2 | 프로덕션 서버 스모크 | HTTP 200, 핵심 콘텐츠/JSON-LD 정상 |

**배포 판정: GO** (F-1 metadataBase는 도메인 확정 시점에 함께 반영 권장).
