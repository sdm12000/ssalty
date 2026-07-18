"use client";

import { motion } from "framer-motion";
import { BlurFade } from "@/components/motion/blur-fade";
import { Mugunghwa } from "@/components/svg/motifs";

/** 포토존 — 거울의 방. 이 섹션만 의도적 좌우 대칭(거울 은유). */
export function Photozone() {
  return (
    <section
      id="photozone"
      className="relative flex min-h-[90svh] items-center overflow-hidden px-[var(--gutter,1.25rem)] py-[var(--spacing-40,10rem)]"
    >
      {/* 대칭 무궁화 */}
      <Mugunghwa className="pointer-events-none absolute left-6 top-1/2 size-32 -translate-y-1/2 text-terracotta-soft/25 md:size-48" />
      <Mugunghwa className="pointer-events-none absolute right-6 top-1/2 size-32 -translate-y-1/2 -scale-x-100 text-terracotta-soft/25 md:size-48" />

      <div className="mx-auto w-full max-w-[var(--container-content)] text-center">
        <BlurFade>
          <p className="font-mono text-[var(--text-caption)] uppercase tracking-[0.28em] text-terracotta-deep/80">
            鏡 · The Mirror Room
          </p>
        </BlurFade>

        {/* 거울 반사 타이포 */}
        <div className="relative mt-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[var(--text-display)] font-extrabold leading-[0.95] tracking-tight text-terracotta-deep"
          >
            거울의 방
          </motion.h2>
          {/* 반사상 */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.18 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="pointer-events-none select-none font-display text-[var(--text-display)] font-extrabold leading-[0.95] tracking-tight text-terracotta-deep"
            style={{
              transform: "scaleY(-1)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 70%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 70%)",
              marginTop: "-0.15em",
            }}
          >
            거울의 방
          </motion.div>
        </div>

        <BlurFade delay={0.2}>
          <p className="mx-auto mt-6 max-w-[var(--container-prose)] font-serif text-[var(--text-quote)] leading-[1.7] text-ink [text-wrap:pretty]">
            마주 선 거울 속에서 나를 다시 바라보는 특별한 포토존.
          </p>
        </BlurFade>

        <BlurFade delay={0.3}>
          <p className="mt-4 font-hand text-terracotta-deep" style={{ fontSize: "var(--text-hand)" }}>
            &ldquo;나만의 순간을 남기세요&rdquo;
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
