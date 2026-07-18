"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { decomposeSyllable } from "@/lib/hangul";
import { ARTICLE_10 } from "@/lib/data";
import { Mugunghwa } from "@/components/svg/motifs";
import { DrawInView } from "@/components/motion/draw-in-view";

const WORDS = ["행복", "헌법"];

/** 한 음절 — 자소가 사방에서 날아들어 조립된 뒤 솔리드 글자로 정착 */
function AssembledSyllable({
  char,
  baseDelay,
  reduced,
  short,
}: {
  char: string;
  baseDelay: number;
  reduced: boolean;
  short: boolean;
}) {
  const jamo = useMemo(() => decomposeSyllable(char), [char]);
  const scatter = useMemo(
    () =>
      jamo.map((_, i) => {
        const ang = (i / jamo.length) * Math.PI * 2 + baseDelay * 3;
        return {
          x: Math.cos(ang) * (120 + i * 30),
          y: Math.sin(ang) * (110 + i * 26),
          r: (i % 2 === 0 ? 1 : -1) * (8 + i * 3),
        };
      }),
    [jamo, baseDelay]
  );

  const dur = short ? 0.35 : 0.5;

  return (
    <span className="relative inline-grid place-items-center">
      {/* 조립되는 자소 고스트 */}
      {!reduced &&
        jamo.map((j, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="col-start-1 row-start-1 select-none text-navy-soft/45"
            initial={{ x: scatter[i].x, y: scatter[i].y, rotate: scatter[i].r, opacity: 0 }}
            animate={{ x: 0, y: 0, rotate: 0, opacity: [0, 0.7, 0] }}
            transition={{
              delay: baseDelay + i * (short ? 0.04 : 0.07),
              duration: dur,
              ease: [0.33, 0, 0.15, 1],
              opacity: { times: [0, 0.6, 1] },
            }}
          >
            {j}
          </motion.span>
        ))}

      {/* 최종 정착 솔리드 음절 */}
      <motion.span
        className="col-start-1 row-start-1 select-none text-navy"
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.86, y: 8 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: reduced ? baseDelay : baseDelay + jamo.length * (short ? 0.04 : 0.07) + 0.1,
          duration: reduced ? 0.4 : 0.42,
          ease: [0.34, 1.4, 0.5, 1],
        }}
      >
        {char}
      </motion.span>
    </span>
  );
}

export function Intro() {
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;
  const [skipped, setSkipped] = useState(false);
  const [short, setShort] = useState(false);
  const introRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("hc717-intro");
    if (seen) setShort(true);
    sessionStorage.setItem("hc717-intro", "1");

    const onScroll = () => {
      if (window.scrollY > 20) setSkipped(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 음절별 base delay 계산
  let running = reduced ? 0 : 0.25;
  const delays: number[][] = WORDS.map((w) =>
    Array.from(w).map((ch) => {
      const d = running;
      running += (short ? 0.045 : 0.075) * decomposeSyllable(ch).length + (short ? 0.12 : 0.24);
      return d;
    })
  );
  const totalDelay = running;

  return (
    <section
      id="preamble"
      ref={introRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-[var(--gutter,1.25rem)] pt-24"
    >
      {/* 스킵 버튼 */}
      {!reduced && !skipped && !short && (
        <button
          onClick={() => setSkipped(true)}
          className="fixed right-5 top-20 z-40 font-mono text-[0.7rem] tracking-[0.14em] text-muted-foreground underline decoration-dotted underline-offset-4 transition-colors hover:text-navy lg:top-24"
        >
          건너뛰기 SKIP
        </button>
      )}

      {/* 여백 무궁화 */}
      <DrawInView className="pointer-events-none absolute -left-10 top-16 size-40 text-terracotta-soft/50 md:size-56">
        <Mugunghwa className="size-full" drawClass="draw-path" />
      </DrawInView>
      <DrawInView className="pointer-events-none absolute -bottom-8 right-6 size-32 text-terracotta-soft/40 md:size-52">
        <Mugunghwa className="size-full" drawClass="draw-path" />
      </DrawInView>

      <div className="mx-auto grid w-full max-w-[var(--container-wide)] grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        {/* 좌측 대형 한글 */}
        <div className="relative">
          <p className="mb-5 font-mono text-[var(--text-caption)] uppercase tracking-[0.28em] text-navy/70">
            前文 · Preamble
          </p>
          <h1
            className="font-display font-extrabold leading-[0.92] tracking-[-0.03em]"
            style={{ fontSize: "var(--text-mega)" }}
          >
            {WORDS.map((w, wi) => (
              <span key={w} className="block">
                {Array.from(w).map((ch, ci) => (
                  <AssembledSyllable
                    key={`${w}-${ci}`}
                    char={ch}
                    baseDelay={skipped ? 0 : delays[wi][ci]}
                    reduced={reduced || skipped}
                    short={short}
                  />
                ))}
              </span>
            ))}
          </h1>
        </div>

        {/* 우측 헌법 제10조 인용 */}
        <motion.div
          className="lg:pt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: skipped ? 0.1 : Math.min(totalDelay, 1.4), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[var(--text-small)] font-semibold tracking-[0.1em] text-navy">
            대한민국 헌법 제10조
          </p>
          <blockquote className="mt-4 font-serif text-[var(--text-quote)] leading-[1.7] text-ink [text-wrap:pretty]">
            &ldquo;모든 국민은 인간으로서의 <span className="underline-draw is-drawn">존엄과 가치</span>를 가지며,{" "}
            <span className="underline-draw is-drawn">행복을 추구할 권리</span>를 가진다.&rdquo;
          </blockquote>
          <p className="sr-only">{ARTICLE_10}</p>
        </motion.div>
      </div>

      {/* 스크롤 힌트 */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: skipped ? 0.4 : Math.min(totalDelay + 0.4, 1.8), duration: 0.8 }}
      >
        <span className="font-mono text-[0.7rem] tracking-[0.16em] text-muted-foreground">
          스크롤하여 낭독하기
        </span>
        <span className="float-hint text-navy" aria-hidden>
          <svg viewBox="0 0 24 24" className="size-5" fill="none">
            <path d="M12 4v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.div>
    </section>
  );
}
