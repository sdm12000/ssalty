# 애니메이션 패턴 상세 가이드

## 목차
1. [Framer Motion 패턴](#framer-motion-패턴)
2. [GSAP + ScrollTrigger 패턴](#gsap--scrolltrigger-패턴)
3. [조합 전략](#조합-전략)
4. [성능 최적화](#성능-최적화)
5. [접근성](#접근성)

---

## Framer Motion 패턴

### 1. Viewport 진입 애니메이션

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
>
  {children}
</motion.div>
```

`viewport.margin`을 `-100px`로 설정하면 요소가 뷰포트에 100px 진입했을 때 트리거된다. 사용자가 요소를 보기 직전에 애니메이션이 시작되어 자연스럽다.

### 2. Stagger 애니메이션

```tsx
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

<motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
  {items.map((i) => (
    <motion.li key={i} variants={item}>{i}</motion.li>
  ))}
</motion.ul>
```

### 3. 호버 인터랙션

```tsx
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  <Card />
</motion.div>
```

spring 물리를 사용하면 기계적이지 않은 자연스러운 움직임이 된다.

### 4. Layout 애니메이션

```tsx
<motion.div layout layoutId="card-expand" transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
  {isExpanded ? <ExpandedContent /> : <CollapsedContent />}
</motion.div>
```

`layoutId`로 서로 다른 컴포넌트 간 부드러운 레이아웃 전환을 구현한다.

### 5. 텍스트 Reveal 애니메이션

```tsx
function TextReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1, y: 0,
              transition: { delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
```

### 6. 페이지 전환 (App Router)

```tsx
// components/page-transition.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## GSAP + ScrollTrigger 패턴

### 1. 기본 스크롤 트리거

```tsx
"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".reveal-element", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: containerRef });

  return <div ref={containerRef}>...</div>;
}
```

### 2. 핀 섹션 (Pinning)

```tsx
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".pin-section",
      pin: true,
      start: "top top",
      end: "+=200%",
      scrub: 1,
    },
  });

  tl.to(".step-1", { opacity: 0, y: -50 })
    .from(".step-2", { opacity: 0, y: 50 })
    .to(".step-2", { opacity: 0, y: -50 })
    .from(".step-3", { opacity: 0, y: 50 });
});
```

스크롤하는 동안 섹션이 고정되면서 내부 콘텐츠가 순차적으로 변화한다.

### 3. 수평 스크롤

```tsx
useGSAP(() => {
  const sections = gsap.utils.toArray<HTMLElement>(".h-panel");
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".h-scroll-container",
      pin: true,
      scrub: 1,
      end: () => "+=" + document.querySelector(".h-scroll-container")!.scrollWidth,
    },
  });
});
```

### 4. 패럴랙스

```tsx
useGSAP(() => {
  gsap.to(".parallax-bg", {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: ".parallax-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});
```

### 5. 텍스트 클립 Reveal

```tsx
useGSAP(() => {
  gsap.from(".clip-reveal", {
    clipPath: "inset(100% 0% 0% 0%)",
    duration: 1.2,
    ease: "power4.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".clip-section",
      start: "top 75%",
    },
  });
});
```

### 6. 마그네틱 버튼

```tsx
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const btn = ref.current!;
    const handleMove = (e: MouseEvent) => {
      const { left, top, width, height } = btn.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
    };
    const handleLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    };
    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);
    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  });

  return <button ref={ref}>{children}</button>;
}
```

---

## 조합 전략

| 용도 | 도구 | 이유 |
|------|------|------|
| 컴포넌트 진입/퇴장 | Framer Motion | React 컴포넌트 lifecycle과 통합 |
| 호버/탭 인터랙션 | Framer Motion | whileHover/whileTap이 직관적 |
| 레이아웃 애니메이션 | Framer Motion | layoutId로 자동 보간 |
| 스크롤 기반 복잡 시퀀스 | GSAP ScrollTrigger | 타임라인 + 핀 + scrub |
| 수평 스크롤 | GSAP ScrollTrigger | 안정적 핀닝 |
| 패럴랙스 | GSAP ScrollTrigger | scrub으로 부드러운 연동 |
| 커서 인터랙션 | GSAP | 실시간 위치 추적 성능 |
| 텍스트 분리 애니메이션 | GSAP SplitText 또는 수동 분리 + Framer | 글자별/줄별 제어 |

**같은 요소에 두 라이브러리를 동시에 적용하지 않는다** — 충돌 위험이 있다. 한 요소는 한 라이브러리만 제어한다.

---

## 성능 최적화

- `will-change: transform` — 애니메이션 요소에 미리 GPU 레이어 프로모트. 단, 너무 많은 요소에 적용하면 메모리 낭비.
- `transform`과 `opacity`만 애니메이트 — `width`, `height`, `top`, `left` 등은 레이아웃 리플로우를 유발한다.
- `ScrollTrigger.refresh()` — 동적 콘텐츠 로드 후 호출하여 트리거 위치를 재계산한다.
- `scrollTrigger.kill()` — 컴포넌트 언마운트 시 정리한다 (`useGSAP`이 자동 처리).
- Intersection Observer 기반 lazy 로드 — 뷰포트 밖 요소의 애니메이션은 비활성화한다.

---

## 접근성

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

GSAP에서도 체크한다:
```tsx
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReducedMotion) {
  // 애니메이션 실행
}
```
