"use client";

import { motion } from "framer-motion";
import { BOOTHS } from "@/lib/data";
import type { Booth } from "@/types";
import { cn } from "@/lib/utils";
import { BoothIcon, DashDivider } from "@/components/svg/motifs";
import { CharReveal } from "@/components/motion/char-reveal";
import { BlurFade } from "@/components/motion/blur-fade";
import { DrawInView } from "@/components/motion/draw-in-view";

function BoothArticle({ booth, index }: { booth: Booth; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article
      className={cn(
        "group grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-12",
        booth.lead && "lg:gap-16"
      )}
    >
      {/* 비주얼 (픽토그램) */}
      <div
        className={cn(
          "lg:col-span-5",
          flip ? "lg:order-2 lg:col-start-8" : "lg:order-1"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center rounded-[var(--radius-doc)] border border-border transition-shadow duration-500 group-hover:shadow-[var(--shadow-card)]",
            booth.lead && "max-w-[440px]"
          )}
          style={{ background: "var(--gradient-paper)" }}
        >
          <span
            className="absolute left-5 top-5 font-display text-[var(--text-h1)] font-extrabold leading-none text-terracotta/20"
          >
            {booth.article}
          </span>
          <DrawInView className="w-1/2 text-navy transition-transform duration-500 group-hover:scale-105">
            <BoothIcon type={booth.icon} className="size-full" drawClass="draw-path" />
          </DrawInView>
        </motion.div>
      </div>

      {/* 텍스트 */}
      <div
        className={cn(
          "lg:col-span-6",
          flip ? "lg:order-1 lg:col-start-1" : "lg:order-2 lg:col-start-7"
        )}
      >
        <p className="font-mono text-[var(--text-caption)] font-semibold uppercase tracking-[0.2em] text-terracotta-deep">
          {booth.article} · Booth {booth.articleNo - 1}
        </p>
        <h3
          className={cn(
            "mt-3 font-display font-extrabold leading-[1.1] tracking-tight text-ink",
            booth.lead ? "text-[var(--text-h1)]" : "text-[var(--text-h2)]"
          )}
        >
          <CharReveal text={booth.title} />
        </h3>
        <BlurFade delay={0.1}>
          <p className="mt-4 text-[var(--text-lead)] leading-[1.7] text-ink/80">
            <span className="underline-draw">{booth.space}</span>
          </p>
        </BlurFade>
      </div>
    </article>
  );
}

export function Booths() {
  return (
    <section id="booths" className="relative px-[var(--gutter,1.25rem)] py-[var(--spacing-40,10rem)]">
      <div className="mx-auto max-w-[var(--container-wide)]">
        <BlurFade>
          <div className="max-w-[var(--container-prose)]">
            <p className="font-mono text-[var(--text-caption)] uppercase tracking-[0.28em] text-navy/70">
              第二條 – 第五條 · The Rights
            </p>
            <h2 className="mt-3 font-display text-[var(--text-h1)] font-extrabold leading-tight tracking-tight text-ink">
              행복의 권리를 찾아가는 <span className="text-terracotta-deep">네 개의 공간</span>
            </h2>
            <p className="mt-4 text-[var(--text-body)] leading-[1.8] text-ink/75">
              각 부스는 한 조항이 되어 스크롤과 함께 낭독됩니다. 나를 알고, 표현하고, 선택하고, 연결되는 —
              네 가지 권리의 체험 공간.
            </p>
          </div>
        </BlurFade>

        <div className="mt-[var(--spacing-40,10rem)] flex flex-col gap-[var(--spacing-40,10rem)]">
          {BOOTHS.map((booth, i) => (
            <div key={booth.article}>
              {i > 0 && <DashDivider className="mb-[var(--spacing-40,10rem)]" />}
              <BoothArticle booth={booth} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
