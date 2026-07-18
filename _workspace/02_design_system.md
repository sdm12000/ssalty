# 디자인 시스템: 행복헌법 717 시민 페스타

> "공문서의 격식 + 손글씨의 온기" — 정적인 헌법 포스터를, 스크롤로 낭독하고 제정하는 인터랙티브 헌법 경험으로 확장하는 디자인 시스템.
>
> **입력**: `01_concept_brief.md` · `00_user_request.md` · 공식 포스터(`photo_2026-07-18_13-14-46.jpg`)
> **핵심 서사축**: 네이비(법의 격식) → 테라코타(행복의 온기)로 스크롤에 따라 지배색이 전이되는 "톤 여정".

---

## 1. 디자인 철학

포스터가 이미 두 색의 대비(차가운 네이비 = 법 / 따뜻한 테라코타 = 사람)로 컨셉을 말하고 있다. 웹은 이 대비를 **시간축(스크롤)**으로 풀어 정적 포스터가 하지 못한 '이야기'를 만든다.

### 핵심 원칙 3가지

1. **조문이 곧 구조 (Form Follows Constitution)**
   헌법 = 조문의 집합. 이 구조를 그대로 정보 아키텍처로 채택한다. 모든 섹션은 `제○조`로 넘버링되고, 좌측 세로 인덱스(제1조·제2조…)가 스크롤 진행도를 헌법 목차처럼 표시한다. 12컬럼 정렬 그리드(판결문·법전의 격식)를 골격으로 두되, 대형 한글 타이포가 그리드를 깨고 나오는 비대칭 오버랩으로 격식을 배반한다.

2. **종이의 물성 (Tactile Paper, not Screen)**
   순백 스크린이 아니라 '헌법 종이' 위에 있는 감각. 웜 아이보리 베이스 + 미세 그레인 텍스처(opacity 0.03~0.05) + 종이가 눌리는 촉각적 프레스 피드백. 네온·글로우·유리모피즘·3D 블롭은 전면 금지. 그림자는 잉크가 번지듯 부드럽고 낮게(warm-tinted shadow).

3. **격식 속의 위트 (Weight, then Wit)**
   기본 태도는 무게감 있는 우아함(절제된 모션, 넉넉한 여백, 기념비적 타이포). 그러나 "행복에도 헌법이 있다면?" 같은 결정적 순간엔 손글씨·자소 조립·오브제 조립으로 위트가 터진다. 위트는 국소적으로, 여백 위에서만. 남발하면 격식이 무너진다.

---

## 2. 컬러 시스템

포스터에서 추출한 4색을 코어로, 톤 여정을 위한 배경 그라데이션 단계와 시맨틱 매핑을 정의한다. 색은 **oklch**를 마스터로 관리(균일한 밝기 인지 → 톤 전이가 매끄럽다)하고 HEX/HSL을 병기한다.

### 2.1 Core Palette (포스터 계승)

| 토큰 | 역할 | HEX | HSL | OKLCH |
|------|------|-----|-----|-------|
| `--paper` | 베이스 배경 (웜 아이보리) | `#F4EFE4` | `hsl(41 40% 92%)` | `oklch(0.945 0.021 82)` |
| `--paper-deep` | 종이 음영/카드 하단 | `#EBE3D3` | `hsl(41 34% 87%)` | `oklch(0.910 0.026 82)` |
| `--navy` | 프라이머리 (법·권위·서두) | `#1E3A8C` | `hsl(224 64% 33%)` | `oklch(0.372 0.135 265)` |
| `--navy-ink` | 딥 네이비 (대형 타이포) | `#182E6F` | `hsl(226 65% 26%)` | `oklch(0.315 0.120 266)` |
| `--navy-soft` | 네이비 라이트 (아이콘 원형 배경) | `#2C4CA6` | `hsl(224 58% 41%)` | `oklch(0.452 0.135 264)` |
| `--terracotta` | 세컨더리 (사람·행복·결말) | `#A8724E` | `hsl(24 37% 48%)` | `oklch(0.585 0.088 52)` |
| `--terracotta-deep` | 딥 테라코타 (하단 배경 우세) | `#8F5C3C` | `hsl(24 41% 40%)` | `oklch(0.510 0.086 50)` |
| `--terracotta-soft` | 라이트 브라운 (무궁화 라인) | `#C08D63` | `hsl(29 42% 57%)` | `oklch(0.680 0.079 62)` |
| `--ink` | 본문 텍스트 (다크 잉크) | `#2A2622` | `hsl(30 12% 15%)` | `oklch(0.245 0.010 60)` |

### 2.2 톤 여정 배경 단계 (Scroll-linked Tone Journey)

스크롤 진행도(0→1)에 따라 페이지 최하단 배경 레이어가 아래 5단계를 연속 보간한다. 각 섹션은 자신의 앵커 배경색을 가지되, 경계는 그라데이션으로 녹인다. **급격한 컷 금지, 항상 연속 보간.**

| 단계 | 대응 섹션 | 지배 무드 | 배경 HEX | OKLCH |
|------|-----------|-----------|----------|-------|
| Stage 0 | 전문/인트로 (제0조) | 법의 격식·차가움 | `#EAE6DC` (아이보리 + 네이비 미세 침투) | `oklch(0.925 0.014 120)` |
| Stage 1 | 선언 "헌법이 있다면?" | 전이 시작 | `#EDE7D9` | `oklch(0.925 0.020 95)` |
| Stage 2 | 제1조 나의 행복헌법 | 중립 종이 | `#F1EADA` | `oklch(0.930 0.024 82)` |
| Stage 3 | 제2~5조 부스 4존 | 온기 유입 | `#F2E7D3` | `oklch(0.925 0.033 74)` |
| Stage 4 | 포토존·오브제·안내·부칙 | 행복의 온기·완결 | `#F0DDC6` (아이보리 + 테라코타 침투) | `oklch(0.905 0.045 66)` |

**전경 텍스트 색 전이**: 상단 섹션의 헤드라인/앵커는 `--navy` 계열, 하단으로 갈수록 `--terracotta` 계열로 이동. 본문은 항상 `--ink` 고정(가독성·대비 안정).

**구현 노트**: 고정된 `<div>` 배경 레이어에 GSAP ScrollTrigger 또는 Framer `useScroll`로 `background-color`를 5단계 보간. `prefers-reduced-motion`에서도 색 전이는 유지(모션이 아닌 상태 변화이므로 무해). 성능을 위해 배경은 단일 요소, transform/opacity 외 `background-color`만 변경.

### 2.3 Semantic Colors

```
--color-background:        #F4EFE4  (기본, 톤 여정이 이를 오버라이드)
--color-foreground:        #2A2622  (본문)
--color-primary:           #1E3A8C  (네이비 — 링크, 강조, 상단 CTA)
--color-primary-foreground:#F4EFE4
--color-secondary:         #A8724E  (테라코타 — 하단 CTA, 밑줄 강조, accent)
--color-secondary-foreground:#F6F1E7
--color-muted:             #EBE3D3  (카드/표면)
--color-muted-foreground:  #6B6157  (캡션, 메타 — 아이보리 대비 4.6:1)
--color-border:            #D9CDB8  (점선 디바이더·카드 보더)
--color-ring:              #1E3A8C  (focus-visible 링, opacity 0.55)
--color-highlight:         #A8724E  (밑줄 강조 — 포스터의 underline 계승)
```

**시맨틱 상태색 (문서 톤에 맞춘 절제된 채도)**
```
--color-success: #4C6B3C  (차분한 올리브 그린 — 카드 완성/저장 완료)
--color-danger:  #A33B2E  (톤 다운된 벽돌 레드 — '침해 요소' 선택 강조)
```

### 2.4 Gradient Definitions (절제된 사용 — 메시/네온 금지)

```css
/* 톤 여정 전체 배경 — 페이지 최하단 고정 레이어의 정적 폴백 */
--gradient-journey: linear-gradient(
  180deg,
  #EAE6DC 0%, #EDE7D9 22%, #F1EADA 45%, #F2E7D3 70%, #F0DDC6 100%
);

/* 종이 음영 — 카드/섹션에 미세 입체 */
--gradient-paper: linear-gradient(160deg, #F6F1E7 0%, #EBE3D3 100%);

/* 네이비 심볼 하이라이트 (붓펜 깃털 등) */
--gradient-navy: linear-gradient(135deg, #2C4CA6 0%, #182E6F 100%);

/* 테라코타 온기 (하단 CTA·오브제 마감) */
--gradient-terracotta: linear-gradient(135deg, #C08D63 0%, #8F5C3C 100%);
```

### 2.5 그림자 (Warm Ink Shadows)

순수 검정 그림자 금지. 잉크가 종이에 번지듯 warm-tinted, 낮고 넓게.

```css
--shadow-paper:  0 1px 2px rgba(42,38,34,0.04), 0 2px 8px rgba(42,38,34,0.05);
--shadow-card:   0 4px 12px rgba(42,38,34,0.07), 0 12px 32px rgba(42,38,34,0.06);
--shadow-lift:   0 8px 20px rgba(42,38,34,0.10), 0 24px 56px rgba(42,38,34,0.09);
--shadow-press:  inset 0 1px 3px rgba(42,38,34,0.12);   /* 종이 눌림 프레스 */
--shadow-navy:   0 10px 30px rgba(24,46,111,0.18);      /* 네이비 요소 부양 */
```

### 2.6 그레인 텍스처

전 페이지 고정 오버레이. `<feTurbulence>` SVG를 data-URI로, `opacity: 0.04`, `mix-blend-mode: multiply`, `pointer-events: none`, `z-index: 9998`. 종이의 물성을 만드는 핵심 디테일. 다크 없이 라이트 단일 모드이므로 multiply로 종이결 표현.

### 2.7 라이트/다크 전략

이 사이트는 **단일 라이트("헌법 종이") 모드**로 확정한다. 컨셉이 '아이보리 종이 위의 헌법 문서'이므로 다크모드는 컨셉을 훼손한다. 대신 **톤 여정(2.2)**이 명암 대신 색온도 변화로 깊이를 만든다. 대비는 전 구간 WCAG AA(본문 4.5:1, 대형 텍스트 3:1) 이상을 아래에서 검증.

**대비 검증 (배경 `#F4EFE4` / `#F0DDC6` 기준)**
- `--ink #2A2622` on paper: 약 12.5:1 ✅ (본문)
- `--navy #1E3A8C` on paper: 약 8.9:1 ✅ (헤드라인·링크·소형 텍스트 OK)
- `--terracotta #A8724E` on paper: 약 3.4:1 → **대형/강조 전용**. 소형 본문엔 사용 금지, `--terracotta-deep #8F5C3C`(약 4.7:1)를 소형 텍스트에 사용.
- `--muted-foreground #6B6157` on paper: 약 4.9:1 ✅ (캡션)

---

## 3. 타이포그래피

포스터의 초대형 각진 고딕 한글을 계승. **두 목소리 원칙**: 고딕(본문·디스플레이) + 명조(헌법 조항 인용) + 손글씨(위트 accent 국소). 3개 이상 혼용 금지, Inter-only 금지.

### 3.1 Font Stack (전부 무료 임베드 가능)

| 역할 | 폰트 | 소스 | 용도 |
|------|------|------|------|
| **Display (한글)** | **G마켓 산스 (Gmarket Sans Bold/Medium)** | 무료 상업용, self-host (woff2) | 초대형 '행복/헌법' 히어로, 조항 넘버. 포스터의 각지고 두꺼운 조형 재현 |
| Display 대안 | **Pretendard Black (900)** | Pretendard subset (jsDelivr/self-host) | Gmarket 미확보 시 폴백. 자소 조립 인트로 |
| **Body (한글/영문)** | **Pretendard Variable** | jsDelivr dynamic-subset / self-host | 본문·UI·캡션. 100~900 가변, 웹 최적화·가독성 |
| **Serif 인용 (한글)** | **Nanum Myeongjo (나눔명조)** | Google Fonts | 헌법 제10조 조항 인용 — '문서·법전' 질감 |
| Serif 대안 | **Song Myung (송명)** | Google Fonts | 더 강한 클래식 명조가 필요할 때 |
| **손글씨 accent (한글)** | **Nanum Pen Script (나눔손글씨 펜)** | Google Fonts | "행복에도 헌법이 있다면?" 등 위트 카피 (국소·과용 금지) |
| **영문 세리프 accent** | **Fraunces (Variable, Italic)** | Google Fonts | 영문 부제·"Constitution of Happiness" 라벨. editorial serif 회귀 무드 |
| **넘버/영문 그로테스크** | **Space Grotesk** | Google Fonts | 날짜(2026.7.17)·조항 번호 라틴 표기·메타 라벨 |

**로딩 전략**: 인트로에 쓰이는 디스플레이 한글(행복/헌법 8자)은 **subset(해당 글자만)** 하여 preload. Pretendard는 dynamic-subset 또는 자주 쓰는 서브셋 우선 로드. `font-display: swap`, 크리티컬 폰트만 preload로 LCP < 2.5s 보호. 폰트 3~4종이나 실제 뷰포트당 동시 노출은 2종 이내로 통제.

### 3.2 Type Scale (Fluid Typography)

```css
/* 디스플레이 — 히어로 대형 한글 (Gmarket Sans / Pretendard Black) */
--text-mega:    clamp(4.5rem, 16vw, 15rem);   /* '행복/헌법' 자소 조립 주인공 */
--text-display: clamp(3rem, 9vw, 8rem);        /* 섹션 대표 타이틀 */
--text-h1:      clamp(2.25rem, 5.5vw, 4.5rem); /* 조항 제목 */
--text-h2:      clamp(1.75rem, 4vw, 3rem);
--text-h3:      clamp(1.375rem, 2.6vw, 2rem);
--text-h4:      clamp(1.125rem, 1.8vw, 1.5rem);

/* 헌법 조항 인용 (Nanum Myeongjo) */
--text-quote:   clamp(1.375rem, 2.8vw, 2.25rem);

/* 본문 (Pretendard) */
--text-lead:    clamp(1.125rem, 1.5vw, 1.375rem); /* 리드 문단 */
--text-body:    clamp(1rem, 1.15vw, 1.125rem);
--text-small:   clamp(0.875rem, 1vw, 0.9375rem);
--text-caption: clamp(0.75rem, 0.85vw, 0.8125rem);

/* 손글씨 accent (Nanum Pen Script) */
--text-hand:    clamp(1.75rem, 4.5vw, 3.5rem);
```

### 3.3 타이포 디테일 규칙

- **자간 (letter-spacing)**
  - 대형 한글 디스플레이: `-0.02em` (타이트하게 뭉쳐 조형미 강화)
  - 본문 한글: `-0.01em` (Pretendard 최적)
  - 영문 대문자 라벨/조항번호: `+0.14em` (tracking, 문서 라벨 격식)
  - 명조 인용: `-0.005em`, `word-break: keep-all`
- **행간 (line-height)**: 디스플레이 `1.02~1.08` / 조항 제목 `1.15` / 명조 인용 `1.7` / 본문 `1.75` (조문 낭독 리듬)
- **`text-wrap: balance`**: 모든 헤드라인. 조항 인용은 `pretty`.
- **`word-break: keep-all`** + `overflow-wrap: anywhere`: 한글 어절 단위 줄바꿈(가독성 필수).
- **`font-feature-settings: "tnum"`**: 날짜·시간·가격 등 숫자 정렬.
- **밑줄 강조 (포스터 계승)**: 헌법 조항의 핵심 구절("존엄과 가치", "행복을 추구할 권리")은 `text-decoration` 대신 **커스텀 언더라인** — `background: linear-gradient(currentColor,currentColor) no-repeat; background-size: 0% 0.12em; background-position: 0 88%;` 에서 스크롤 인뷰 시 `100% 0.12em`으로 드로잉. 색은 `--terracotta`.

### 3.4 Font Pairing 규칙

1. **한 화면에 최대 2 목소리** — (고딕 + 명조) 또는 (고딕 + 손글씨). 명조와 손글씨를 동시에 크게 쓰지 않는다.
2. **명조 = 헌법 원문 인용 전용** — 방문자가 명조를 보면 "이건 진짜 헌법 조문"으로 읽히게. 창작 카피엔 쓰지 않는다.
3. **손글씨 = 위트 반전 순간 전용** — 딱딱한 고딕 조항이 손글씨로 '고쳐 써지는' 트랜지션 등. 섹션당 1회 이하.
4. **영문(Fraunces/Space Grotesk) = 라벨·메타·장식** — 한글의 보조. 한글보다 크게 쓰지 않는다.

---

## 4. 스페이싱 & 그리드

### 4.1 Spacing Scale (4px base)

```
--space-1: 0.25rem   (4px)   아이콘-텍스트
--space-2: 0.5rem    (8px)   인라인
--space-3: 0.75rem   (12px)  관련 요소
--space-4: 1rem      (16px)  기본
--space-6: 1.5rem    (24px)  컴포넌트 내부 패딩
--space-8: 2rem      (32px)  컴포넌트 간
--space-12: 3rem     (48px)  그룹 간
--space-16: 4rem     (64px)  소섹션
--space-24: 6rem     (96px)  섹션
--space-32: 8rem     (128px) 대섹션
--space-40: 10rem    (160px) 조항 전환 (조문 사이 '침묵'의 여백)
--space-48: 12rem    (192px) 히어로/풀스크린
```

**리듬 원칙**: 조항(섹션) 사이는 `--space-40` 이상으로 크게 벌려 '낭독 후 침묵'을 만든다. 조항 내부 요소는 촘촘히. 긴장(좁음)과 이완(넓음)을 교차. 모든 간격이 같으면 AI스럽다.

### 4.2 Grid System (비대칭 편집 레이아웃)

- **기본**: 12컬럼, gutter `--space-6`(24px), 콘텐츠는 8~10컬럼만 사용해 여백 확보.
- **조문 인덱스 컬럼**: 데스크탑 좌측 1.5컬럼을 조항 넘버 인덱스(sticky)에 고정 예약 → 판결문·법전의 넘버링 인덱스 감각.
- **비대칭 분할**: 부스 조항은 `5:7` 또는 `4:8`(텍스트:비주얼) 비균등 분할. 대칭 반반 금지.
- **오버랩 규칙**: 대형 한글 타이포는 그리드 라인을 의도적으로 넘어 여백/다음 요소와 겹친다(`z-index` 레이어링 + `margin` 음수). 포스터의 좌측 세로 타이포 계승.
- **마르지날리아**: 무궁화 라인아트를 컨텐츠 외곽 여백(margin)에 흘려 배치 → 여백이 죽지 않는다.

### 4.3 Container Sizes

```
--container-prose:  40rem   (640px)  조항 인용·리드 본문 (읽기 최적 폭)
--container-content:72rem   (1152px) 일반 콘텐츠
--container-wide:   90rem   (1440px) 넓은 섹션
--container-full:   100%             풀블리드 (톤 여정 배경·오브제 조립)
--gutter:           clamp(1.25rem, 5vw, 6rem)  좌우 안전 여백
```

### 4.4 Breakpoints

```
sm: 640px   모바일 가로
md: 768px   태블릿 (별도 레이아웃 취급)
lg: 1024px  데스크탑 진입 — 조문 인덱스·스크럽 애니메이션 활성화
xl: 1280px  일반 데스크탑 — 대형 타이포 임팩트 극대화
2xl:1536px  대형 모니터
```

---

## 5. 컴포넌트 스타일

모든 인터랙션은 종이의 물성(프레스·잉크 번짐)을 따르고, 네온 글로우는 전면 금지. 모든 포커스 요소에 `focus-visible` 링(`--color-ring`, 2px offset) 필수.

### 5.1 헌법 조항 카드 (Article Card) — 핵심 컴포넌트

부스 4존·나의 행복헌법 결과에 공통 사용하는 시그니처. '헌법 문서 한 조'의 물성.

- **구조**: 상단 조항 넘버(`제○조` — Gmarket Sans, 좌측 정렬, 테라코타/네이비) + 조항 제목(H2) + 명조 인용 or 본문 + 라인 픽토그램(네이비 원형).
- **표면**: `background: var(--gradient-paper)`, `border: 1px solid --border`, `border-radius: 4px`(문서적 각짐 — 과한 라운드 금지), 상단에 얇은 색 바(`3px`, 네이비→테라코타 해당 조항 톤).
- **깊이**: 기본 `--shadow-card`. 카드 좌상단 모서리에 점선 코너 마크(문서 스탬프 감각) 미세 장식.
- **hover**: `translateY(-4px)` + `--shadow-lift`, 조항 제목에 테라코타 언더라인 드로잉, 픽토그램 미세 회전/드로잉 리플레이. `duration-normal / ease-out-expo`.
- **focus-visible**: 카드 전체에 ring.
- **active**: `translateY(-1px) scale(0.995)` + `--shadow-press`.
- **크기 변주**: 4존 카드를 전부 동일 크기로 나열 금지 — Bento식으로 1개를 크게(제2조 나를 알 권리를 리드 카드로), 나머지 3개를 리듬 있게. 서사형 배치.

### 5.2 부스 존 카드 (Booth Section) — 서사형

카드 나열이 아닌 '조항 낭독 시퀀스'. 각 부스 = 제2~5조. 스크롤 인뷰 시:
1. 조항 넘버가 크게 blur-fade-up (Gmarket)
2. 조항 제목 char-by-char reveal
3. 포스터의 라인 픽토그램(인물/붓/별/사람들)이 SVG `stroke-dashoffset` draw-on
4. 설명 본문 fade-up + 테라코타 언더라인 드로잉
- 레이아웃: `4:8` 또는 `5:7` 비대칭, 좌우 교차(zig-zag)로 단조로움 제거.
- 배경 톤: 제2조→제5조로 갈수록 미세하게 테라코타 유입(2.2 Stage 3 구간 내 미세 보간).

### 5.3 타임라인 / 진행 인덱스 (Constitution Index)

- 데스크탑 좌측 sticky 세로 인덱스: `전문 · 제1조 · 제2조 … 부칙`. 현재 조항은 네이비→테라코타(스크롤 위치 톤) 채움 + 좌측 3px 마커 바 확장. 나머지는 `--muted-foreground`.
- 클릭 시 해당 조항으로 smooth scroll.
- 모바일: 상단 얇은 프로그레스 바(톤 여정 색으로 채워짐) + 현재 조항 라벨.
- 점선 디바이더(`border-top: 1.5px dashed --border`)로 조항 구분 — 포스터의 점선 계승.

### 5.4 버튼 (Button Variants)

공통: `transition: all var(--duration-normal) var(--ease-out-expo)`, `active:scale(0.98)`, `focus-visible` ring, 라운드 `6px`(문서 톤, 캡슐 금지).

- **Primary (Navy Seal)**: `background: --navy`, 텍스트 아이보리. hover: `background: --navy-ink` + `translateY(-2px)` + `--shadow-navy`. active: `--shadow-press`. 상단(법) 구간 CTA.
- **Secondary (Terracotta)**: `background: --terracotta` / 텍스트 아이보리. hover: `--terracotta-deep`. 하단(행복) 구간 CTA — "나의 행복헌법 만들기", "참여 신청".
- **Outline (Document)**: `1.5px solid --navy`, 투명 배경. hover: 배경이 좌→우 wipe로 네이비 채워지며 텍스트 반전. 세컨더리 액션.
- **Ghost / Link**: 텍스트만 + hover 시 언더라인 드로잉(테라코타). 인라인 액션.
- **Chip (선택 칩)**: '나의 행복헌법' 객관식용 — 아래 5.6 참조.
- **Magnetic 적용**: 주요 CTA에만 커서 자석 효과(데스크탑, 미세 8px 이내).

### 5.5 네비게이션 (Nav)

- 상단 sticky. 초기 투명, 스크롤 시 `backdrop-blur(12px)` + `background: rgba(244,239,228,0.8)` + 높이 축소 + `--shadow-paper`.
- 좌측: '행복헌법 717' 워드마크(Gmarket, 스크롤 시 네이비→테라코타 미세 전이). 우측: 조항 앵커 링크 + 참여 CTA(Secondary 버튼).
- 링크 hover: 언더라인 좌→우 드로잉.
- 모바일: 햄버거 → 풀스크린 아이보리 오버레이 메뉴, 링크가 조문처럼 위→아래 stagger fade-up(`delay index*0.06s`), 배경에 무궁화 라인아트 워터마크.

### 5.6 입력 / 폼 — '나의 행복헌법' 인터랙션 (핵심 차별화)

- **선택 칩 (Choice Chip)**: "나의 행복을 침해하는 것은?" 6지선다.
  - 기본: `1.5px solid --border`, 종이 표면, 라운드 `999px`(칩만 예외적 캡슐 — 손으로 집는 감각).
  - hover: 보더 네이비, 미세 `translateY(-2px)` + `--shadow-paper`.
  - selected: `background: --navy`(침해 요소) 또는 상태색, 텍스트 아이보리, 체크 아이콘 fade-in, `--shadow-press`(눌린 상태). 다중 선택 시 stagger 반영.
- **결과 카드 생성 (Constitution Card Generator)**: 선택 완료 → "나의 행복헌법 제1조"가 명조체로 실시간 조판되어 헌법 조항 카드(5.1)로 생성. 카드에 붓펜 아이콘 + 무궁화 워터마크 + 발행일(2026.7.17). 카드가 도장 찍히듯 scale-in + `--shadow-press`→`--shadow-lift`.
  - **공유**: `html-to-canvas`로 이미지 저장/공유 버튼(Secondary). "내 헌법 저장하기". 인스타그래머블 세로 카드(4:5) OG 규격.
- **텍스트 입력**(선택): 밑줄만 있는 원고지풍 입력 필드(border-bottom 1.5px), focus 시 언더라인 네이비 드로잉 + 라벨 상승.

### 5.7 팩트시트 (Fact Sheet)

- 캘린더 아이콘(포스터 계승) + 점선 디바이더로 문서 질감. 항목: 일시 / 장소 / 체험비 / 대상.
- 넘버·날짜는 Space Grotesk `tnum`. "2026. 7. 17–18 · 14:00–18:00"를 크게.
- "캘린더에 추가"(.ics) + "지도 보기" 버튼. 약도/지도 카드.
- 레이아웃: 좌측 큰 날짜 블록 / 우측 상세 리스트 — 비대칭.

---

## 6. 모션 & 애니메이션

절제된 격식 + 결정적 위트. transform/opacity 중심(60fps), `prefers-reduced-motion` 시 전부 정적 fade로 폴백.

### 6.1 Easing Curves

```css
--ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);    /* 기본 — 무게감 있는 감속 */
--ease-out-quart:  cubic-bezier(0.25, 1, 0.5, 1);    /* UI 전환 */
--ease-in-out-quart:cubic-bezier(0.76, 0, 0.24, 1);  /* 스크럽·대칭 */
--ease-ink:        cubic-bezier(0.33, 0, 0.15, 1);   /* 자소 조립·잉크 정착 — 빠르게 붙고 무겁게 멈춤 */
--ease-seal:       cubic-bezier(0.34, 1.4, 0.5, 1);  /* 도장/카드 생성 — 절제된 스프링(과바운스 금지) */
```
기본 `ease-in-out` 금지. 기본은 `--ease-out-expo`.

### 6.2 Duration Scale

```
--duration-fast:   150ms  호버·색
--duration-normal: 320ms  일반 전환
--duration-slow:   560ms  레이아웃
--duration-reveal: 900ms  스크롤 reveal
--duration-intro:  1800ms 자소 조립 인트로 (총 1.5~2s, skip 가능)
```

### 6.3 핵심 인터랙션 3종 (구체 명세)

#### ① 자소 조립 인트로 (Load Intro)
- '행복 / 헌법' 4~8자를 **자소(초성·중성·종성) 단위**로 분해. 각 자소가 화면 사방(여백)에서 제자리로 날아들며 글자를 '조립'. `translate + rotate(±8deg) + opacity`, `--ease-ink`.
- 시퀀스: ㅎ→ㅐ→ㅇ(행) … stagger `60ms`, 글자당 `220ms`. 총 1.5~1.8s. 마지막에 미세 `settle`(잉크 정착) 후 무궁화 라인아트가 여백에서 stroke-draw로 피어남.
- **Skip**: 우상단 "건너뛰기" + 스크롤 시작 시 즉시 완료 상태로 점프. 재방문(session) 시 축약(0.6s).
- **reduced-motion**: 자소 조립 없이 전체 타이틀 단순 fade-in(400ms).
- 구현: SVG path 분해 or 자소 겹침 레이어 + Framer Motion stagger. 폰트는 subset preload로 FOUT 방지.

#### ② 나의 행복헌법 카드 생성 (Card Generation)
- 칩 선택 → 결과 조판: 선택된 단어들이 명조 조항 문장으로 타이핑되듯 char-by-char 삽입(`--ease-ink`, char `18ms`).
- 문장 완성 → 카드 프레임이 도장 찍히듯 `scale(0.92)→1` + `--shadow-press`(순간 눌림)→`--shadow-lift`(부양), `--ease-seal`, 320ms. 무궁화 워터마크 fade-in, 붓펜 아이콘이 서명하듯 stroke-draw.
- 저장 버튼 등장 stagger. 공유 시 마이크로 성공 피드백(success 색 체크).

#### ③ 저울·붓펜 오브제 스크롤 조립 (Object Assembly)
- GSAP ScrollTrigger **pin + scrub**. 섹션 진입 시 화면 고정, 스크롤 진행도(0→1)에 매핑:
  - 0.0–0.3: 저울 기둥·받침이 아래에서 상승 조립
  - 0.3–0.6: 양팔·접시가 좌우에서 날아와 결합, 미세 흔들림 후 수평 정지
  - 0.6–0.85: 법봉·책 더미가 좌하단에 쌓임
  - 0.85–1.0: **네이비 깃털 붓펜**이 위에서 저울 중앙에 꽂히며 정착 → "내가 쓰는 나의 헌법" 카피 blur-fade-up. 이 순간 배경 톤이 테라코타로 완결.
- 전부 SVG `stroke-dashoffset` 드로잉 + `transform`. `--ease-in-out-quart` 스크럽.
- **모바일**: pin/scrub 대신 인뷰 시 3단계 단순 fade/slide 조립(성능).
- **reduced-motion**: 완성된 오브제 정적 표시 + 카피 fade.

### 6.4 공통 애니메이션 패턴

| 패턴 | 대상 | 명세 |
|------|------|------|
| Blur-Fade-Up | 조문 텍스트 낭독 | `opacity 0→1, y 24px→0, blur 8px→0`, 단어/글자 stagger `40ms`, `--ease-out-expo` |
| Char Reveal | 조항 제목·인트로 | SplitText 글자 분해 stagger |
| Underline Draw | 강조 구절·링크·제목 hover | background-size `0%→100%`, `--terracotta`, 560ms |
| Path Draw-on | 무궁화·픽토그램·오브제 | `stroke-dashoffset` 100%→0, 인뷰 트리거 |
| Tone Shift | 페이지 배경 | 스크롤 5단계 색 보간(2.2) |
| Paper Press | 버튼·칩 | `--shadow-press` + scale(0.98) |
| Magnetic | 주요 CTA | 커서 추종 8px 이내, 데스크탑 한정 |
| Marquee (절제) | 조항 라벨 띠(선택) | 저속 무한 수평, 장식 |

### 6.5 마이크로 인터랙션

- 링크/버튼 hover: 언더라인 드로잉 + 미세 색 전이. 카드 hover: lift + 픽토그램 미세 모션.
- 커스텀 커서(데스크탑, 선택·성능 우선): 작은 잉크 도트 or 무궁화 실루엣, 인터랙티브 요소 위에서만 확장. 터치 비활성.
- 스크롤 인디케이터: 인트로 하단 "스크롤하여 낭독하기" + 미세 상하 부유.
- 로딩: 인트로 자체가 로딩. 카드 생성 중 명조 커서 blink.

### 6.6 절제 규칙
- 한 뷰포트에 주 애니메이션 1개만 강조. Fade-Up 10연속 금지 — 패턴 교차.
- 핵심 3종 인터랙션에 예산 집중, 나머지는 조용히.
- 60fps 유지, layout thrash 금지(transform/opacity/`background-color`만).
- `prefers-reduced-motion: reduce` 전역 존중 — 스크럽·자소 조립·자석 전부 정적 폴백, 톤 색상 전이는 유지.

---

## 7. 섹션별 레이아웃 컴포지션

브리프 8섹션을 헌법 조문 IA로. 각 섹션 = 조항. 좌측 sticky 인덱스가 진행 표시. 배경은 2.2 톤 여정을 따른다.

**① 전문(前文)/인트로 — Hook (배경 Stage 0, 네이비 우세)**
포스터 계승 극대화. 화면 좌측을 세로로 압도하는 초대형 '행복/헌법'(자소 조립, `--text-mega`). 우측 상단에 명조로 "대한민국 헌법 제10조 — 모든 국민은…행복을 추구할 권리를 가진다"가 타이핑 낭독. 무궁화 라인아트가 좌상·우하 여백에서 draw-on. 하단 스크롤 힌트. 비대칭: 텍스트 좌 60% / 인용 우 40%, 대형 타이포는 상단 네비까지 오버랩.

**② 선언 "행복에도 헌법이 있다면?" — 전환/위트 (Stage 1)**
중앙 여백을 크게 비우고 손글씨(Nanum Pen Script `--text-hand`) 카피가 stroke-draw. 그 위로 딱딱한 고딕 문장이 손글씨로 '고쳐 써지는' 트랜지션. 행사 한 줄 소개(명조 리드). 배경 톤 전이 시작. 여백 지배적 = '숨 고르기'.

**③ 제1조 — 나의 행복헌법 (Stage 2, 인터랙티브 핵심)**
좌측 프롬프트/우측 결과 카드 `5:7` 비대칭. 상단 "제1조" 대형 넘버 앵커. 침해 요소 6칩 → 필요한 것 → 결과 카드 실시간 생성(5.6/6.3②). 카드는 부유하며 무궁화 워터마크. 저장/공유 CTA(Secondary).

**④ 제2~5조 — 부스 4존 (Stage 3, 서사형 zig-zag)**
각 조항이 좌우 교차 비대칭(`5:7`↔`7:5`)으로 스크롤 낭독. 제2조(나를 알 권리)를 리드 대형 카드로, 나머지 리듬 변주(Bento 감각, 동일크기 금지). 픽토그램 draw-on + 테라코타 언더라인. 조항 사이 `--space-40` 침묵 여백.

**⑤ 포토존 — 거울의 방 (Stage 4 진입, 감성 클라이맥스)**
미러/대칭 비주얼 인터랙션(좌우 반사 레이아웃 — 이 섹션만 의도적 대칭으로 '거울' 은유). "나만의 순간을 남기세요" 손글씨 accent. 테라코타 우세 전환 완료. 풀블리드.

**⑥ 저울의 순간 — 헌법 오브제 (Stage 4, 상징 통합)**
풀스크린 pin/scrub 오브제 조립(6.3③). 화면 중앙 저울, 스크롤로 조립, 붓펜 정착. 최소 텍스트 — 오브제가 주인공. 완결 카피 "내가 쓰는 나의 헌법".

**⑦ 참여 안내 — 팩트시트 (Stage 4)**
좌측 대형 날짜 블록(Space Grotesk) / 우측 상세(장소·체험비 5,000원·대상) 비대칭. 점선 디바이더·캘린더 아이콘. 지도 카드 + .ics/지도 CTA. `Event` 구조화 데이터.

**⑧ 부칙(附則)/푸터 (Stage 4 최종 테라코타)**
헌법 '부칙' 형식 크레딧: 주최 이어온("세대를 잇는 가치") / 주관 SSalty. 조문 형식(제1조 이 사이트는…) 위트. 무궁화 모티프 마감. 최하단 테라코타 톤 완결.

---

## 8. 반응형 전략

**모바일 퍼스트 설계, 데스크탑에서 임팩트 극대화** (타겟이 청년·인스타 공유).

- **모바일(<lg)**: 단일 컬럼, 조문 세로 리듬 유지. 좌측 인덱스 → 상단 프로그레스 바. pin/scrub 오브제·자소 조립 → 단순 fade/slide 3단계. 비대칭 zig-zag → 세로 스택(단, 여백·타이포 품질 유지). 대형 타이포는 `--text-mega` clamp 하한으로 자동 축소. 터치 타겟 ≥44px. 결과 카드는 세로 4:5 그대로(공유 최적).
- **태블릿(md)**: 데스크탑 축소가 아닌 별도 — 2컬럼 부스, 인덱스는 접이식.
- **데스크탑(lg+)**: 좌측 sticky 조문 인덱스, pin/scrub 스크럽, 대형 타이포 오버랩, 커스텀 커서·자석 활성.
- 호버 이펙트는 터치에서 인뷰/탭 대체 인터랙션 제공.

---

## 9. Tailwind CSS v4 설정 (@theme)

```css
@import "tailwindcss";

@theme {
  /* ── Colors: Core ── */
  --color-paper:            #F4EFE4;
  --color-paper-deep:       #EBE3D3;
  --color-navy:             #1E3A8C;
  --color-navy-ink:         #182E6F;
  --color-navy-soft:        #2C4CA6;
  --color-terracotta:       #A8724E;
  --color-terracotta-deep:  #8F5C3C;
  --color-terracotta-soft:  #C08D63;
  --color-ink:              #2A2622;

  /* ── Colors: Semantic ── */
  --color-background:         #F4EFE4;
  --color-foreground:         #2A2622;
  --color-primary:            #1E3A8C;
  --color-primary-foreground: #F4EFE4;
  --color-secondary:          #A8724E;
  --color-secondary-foreground:#F6F1E7;
  --color-muted:              #EBE3D3;
  --color-muted-foreground:   #6B6157;
  --color-border:             #D9CDB8;
  --color-ring:               #1E3A8C;
  --color-highlight:          #A8724E;
  --color-success:            #4C6B3C;
  --color-danger:             #A33B2E;

  /* ── Tone Journey Stages ── */
  --color-stage-0: #EAE6DC;
  --color-stage-1: #EDE7D9;
  --color-stage-2: #F1EADA;
  --color-stage-3: #F2E7D3;
  --color-stage-4: #F0DDC6;

  /* ── Fonts ── */
  --font-display: "Gmarket Sans", "Pretendard Variable", sans-serif;
  --font-sans:    "Pretendard Variable", system-ui, sans-serif;
  --font-serif:   "Nanum Myeongjo", "Song Myung", serif;
  --font-hand:    "Nanum Pen Script", cursive;
  --font-accent:  "Fraunces", serif;
  --font-mono:    "Space Grotesk", ui-monospace, monospace;

  /* ── Font Sizes (fluid) ── */
  --text-mega:    clamp(4.5rem, 16vw, 15rem);
  --text-display: clamp(3rem, 9vw, 8rem);
  --text-h1:      clamp(2.25rem, 5.5vw, 4.5rem);
  --text-h2:      clamp(1.75rem, 4vw, 3rem);
  --text-h3:      clamp(1.375rem, 2.6vw, 2rem);
  --text-h4:      clamp(1.125rem, 1.8vw, 1.5rem);
  --text-quote:   clamp(1.375rem, 2.8vw, 2.25rem);
  --text-lead:    clamp(1.125rem, 1.5vw, 1.375rem);
  --text-body:    clamp(1rem, 1.15vw, 1.125rem);
  --text-small:   clamp(0.875rem, 1vw, 0.9375rem);
  --text-caption: clamp(0.75rem, 0.85vw, 0.8125rem);
  --text-hand:    clamp(1.75rem, 4.5vw, 3.5rem);

  /* ── Spacing (extends default) ── */
  --spacing-40: 10rem;

  /* ── Containers ── */
  --container-prose:   40rem;
  --container-content: 72rem;
  --container-wide:    90rem;

  /* ── Radius ── */
  --radius-doc: 4px;   /* 문서적 각짐 */
  --radius-btn: 6px;
  --radius-chip:999px;

  /* ── Shadows (warm ink) ── */
  --shadow-paper: 0 1px 2px rgba(42,38,34,0.04), 0 2px 8px rgba(42,38,34,0.05);
  --shadow-card:  0 4px 12px rgba(42,38,34,0.07), 0 12px 32px rgba(42,38,34,0.06);
  --shadow-lift:  0 8px 20px rgba(42,38,34,0.10), 0 24px 56px rgba(42,38,34,0.09);
  --shadow-navy:  0 10px 30px rgba(24,46,111,0.18);

  /* ── Easing ── */
  --ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart:   cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out-quart:cubic-bezier(0.76, 0, 0.24, 1);
  --ease-ink:         cubic-bezier(0.33, 0, 0.15, 1);
  --ease-seal:        cubic-bezier(0.34, 1.4, 0.5, 1);

  /* ── Durations ── */
  --duration-fast:   150ms;
  --duration-normal: 320ms;
  --duration-slow:   560ms;
  --duration-reveal: 900ms;
}

/* prefers-reduced-motion 전역 폴백 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 필요 라이브러리 / 플러그인
- **Pretendard Variable** — self-host woff2 또는 jsDelivr dynamic-subset (`@font-face`).
- **Gmarket Sans** — 무료 상업용, self-host woff2 (인트로 8자 subset preload 권장).
- **Google Fonts**: Nanum Myeongjo, Nanum Pen Script, Fraunces(Variable Italic), Space Grotesk, Song Myung(폴백) — `<link preconnect>` + subset(korean).
- **GSAP + ScrollTrigger** — pin/scrub 오브제 조립·스크럽.
- **Framer Motion** — 진입/UI 모션·자소 조립 stagger·카드 생성.
- **html-to-image / html2canvas** — 나의 행복헌법 카드 이미지 저장·공유.
- **SVG 에셋**: 무궁화·저울·붓펜·법봉·책·부스 픽토그램을 벡터화(stroke-dashoffset draw-on용). 인라인 SVG.
- (선택) `@tailwindcss/typography` — 조항 인용 prose 스타일.

---

## 10. 그래픽 모티프 활용 가이드

포스터 DNA를 웹 벡터로 재해석. 전부 인라인 SVG(draw-on·톤 착색 위해).

| 모티프 | 색 | 활용 | 모션 |
|--------|-----|------|------|
| **무궁화(로즈 오브 샤론)** | `--terracotta-soft` 라인아트 | 여백 마르지날리아, 카드 워터마크, 푸터 마감, 인트로 여백 | 인뷰 stroke draw-on, 커스텀 커서 후보 |
| **저울(정의)** | 네이비/테라코타 라인 | 제6조 오브제 조립의 중심, 균형 은유 | pin/scrub 조립, 미세 흔들림→수평 정지 |
| **붓펜 깃털** | `--gradient-navy`(강조) | "내가 쓰는 나의 헌법" 상징, 카드 서명 아이콘 | 저울에 꽂히는 정착, 카드 생성 시 서명 draw |
| **법봉** | 테라코타 | 오브제 조립 보조, 섹션 넘버 장식 | 쌓임 + 미세 임팩트 |
| **책 더미(법전)** | 테라코타/네이비 | 오브제 군집 기반, 팩트시트 장식 | 순차 쌓임 |
| **부스 픽토그램(인물·붓·별·사람들·카메라)** | 네이비 원형 안 라인 | 부스 4존·포토존 아이덴티티(포스터 계승) | 조항 인뷰 시 원형+라인 draw-on |
| **점선 디바이더·캘린더 아이콘** | `--border`/네이비 | 조항 구분, 팩트시트 문서 질감 | 라인 draw |

**운용 규칙**: 모티프는 장식이 아니라 '헌법의 물성'을 전달하는 언어. 한 화면에 모티프 과밀 금지(여백이 죽는다). 무궁화는 은은히(opacity 0.5~0.8), 저울·붓펜은 결정적 순간에만 크게. 스톡 일러스트·이모지 절대 금지 — 전부 포스터 라인 스타일로 통일.

---

## 부록: frontend-engineer 인계 요약

- **컬러**: paper `#F4EFE4` / navy `#1E3A8C`(+ink `#182E6F`) / terracotta `#A8724E` / ink `#2A2622`. 톤 여정 5단계(`#EAE6DC→#F0DDC6`) 스크롤 배경 보간이 서사 척추.
- **서체**: Gmarket Sans(디스플레이) + Pretendard Variable(본문) + Nanum Myeongjo(헌법 인용) + Nanum Pen Script(위트) + Fraunces/Space Grotesk(영문·넘버). 전부 무료. 인트로 한글 subset preload로 LCP 방어.
- **핵심 모션 3종**: ① 자소 조립 인트로(Framer stagger, 1.5~1.8s, skip) ② 나의 행복헌법 카드 실시간 생성+이미지 공유(html-to-image) ③ 저울·붓펜 오브제 pin/scrub 조립(GSAP ScrollTrigger). 전부 reduced-motion 정적 폴백.
- **스택**: Next.js 15 App + Tailwind v4(@theme 위 블록) + Framer Motion + GSAP. 단일 라이트 모드, `schema.org/Event` 구조화 데이터, WCAG AA 검증 완료(테라코타는 대형/강조 전용).
