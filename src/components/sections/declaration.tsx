"use client";

import { motion } from "framer-motion";
import { BlurFade } from "@/components/motion/blur-fade";
import { EVENT } from "@/lib/data";

/** 선언 — "행복에도 헌법이 있다면?" 위트 전환. 딱딱한 고딕이 손글씨로 고쳐 써진다. */
export function Declaration() {
  return (
    <section
      id="declaration"
      className="relative flex min-h-[90svh] items-center px-[var(--gutter,1.25rem)] py-[var(--spacing-40,10rem)]"
    >
      <div className="mx-auto w-full max-w-[var(--container-content)] text-center">
        <BlurFade>
          <p className="font-mono text-[var(--text-caption)] uppercase tracking-[0.28em] text-navy/70">
            宣言 · Declaration
          </p>
        </BlurFade>

        {/* 고딕 → 손글씨 전환 */}
        <div className="relative mt-10">
          <motion.p
            className="font-display text-[var(--text-h2)] font-bold leading-tight tracking-tight text-ink/35 line-through decoration-terracotta/50 decoration-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            행복은 당연히 주어지는 것이다.
          </motion.p>

          <motion.p
            className="mt-4 font-hand text-terracotta-deep"
            style={{ fontSize: "var(--text-hand)", lineHeight: 1.2 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            &ldquo;행복에도 헌법이 있다면?&rdquo;
          </motion.p>
        </div>

        <BlurFade delay={0.2}>
          <p className="mx-auto mt-14 max-w-[var(--container-prose)] font-serif text-[var(--text-quote)] leading-[1.7] text-ink [text-wrap:pretty]">
            제헌절을 맞이하여 그 의미를 우리의 일상과 행복의 관점에서 재해석하고,
            자신의 <span className="underline-draw">행복의 권리</span>를 탐색해보는 시간.
          </p>
        </BlurFade>

        <BlurFade delay={0.32}>
          <p className="mt-8 font-mono text-[var(--text-small)] tracking-[0.08em] text-muted-foreground">
            {EVENT.host} × {EVENT.organizer} · {EVENT.dateShort}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
